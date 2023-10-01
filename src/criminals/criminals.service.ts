import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Criminal, Prisma } from '@prisma/client';
import { CustomError } from 'src/exception/customError.exception';
import { CrimesService } from 'src/crimes/crimes.service';
import WebScrapper from 'src/web_scraper/entities/web_scraper.js';
@Injectable()
export class CriminalsService {
  @Inject(CrimesService)
  private readonly crimesService: CrimesService;
  constructor(private readonly prisma: PrismaService) {}
  async create(
    input: Prisma.CriminalCreateWithoutCrimesInput,
    crimesIds?: number[],
  ): Promise<Criminal> {
    try {
      let crimes = [];
      console.log(crimesIds);
      if (crimesIds.length !== 0) {
        crimes = await this.crimesService.findAll({
          where: {
            id: {
              in: crimesIds,
            },
          },
        });
        const crimesNotFound = crimesIds.reduce((acc, id) => {
          if (!crimes.find((crime) => crime.id === id)) {
            acc.push(id);
          }
          return acc;
        }, []);
        if (crimesNotFound.length !== 0) {
          throw new CustomError({
            message:
              'Some of the crimes Id were not found: ' +
              crimesNotFound.toString(),
            status: 404,
          });
        }
      }
      console.log('parsed Data', new Date(input.dateOfBirth));
      const response = await this.prisma.criminal.create({
        data: {
          ...input,

          crimes: {
            connect: crimes.map((crime) => ({ id: crime.id })),
          },
        },
      });
      return response;
    } catch (error) {
      if (error.code === 'P2002') {
        console.log(error);
        throw new CustomError({
          message:
            'Something wrong with your input, please check the application logs for more details',
          status: 400,
          log: error.message,
        });
      }
      if (error.code === 'P2025') {
        console.log(error);
        throw new CustomError({
          message: error.meta.cause as string,
          status: 404,
        });
      }
      console.log(error);
      throw new CustomError({
        message: 'Something went wrong during the database request',
        status: 500,
        log: error.message,
      });
    }
  }

  async findAll(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.CriminalWhereUniqueInput;
      where?: Prisma.CriminalWhereInput;
      orderBy?: Prisma.CrimeOrderByWithAggregationInput;
    } = {},
  ) {
    try {
      return await this.prisma.criminal.findMany({
        ...params,
        include: { crimes: true },
      });
    } catch (error) {
      throw new CustomError({
        message: 'Something went wrong during the database request',
        status: 500,
        log: (error.meta.cause as string) || error.message,
      });
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.criminal.findFirstOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new CustomError({
          message: error.message,
          status: 404,
        });
      }

      throw new CustomError({
        message: 'Something went wrong during the database request',
        status: 500,
        log: error.message,
      });
    }
  }

  async update(
    id: string,
    input: Prisma.CriminalUpdateWithoutCrimesInput,
    crimesIds?: number[],
  ) {
    try {
      if (!crimesIds?.length) {
        await this.prisma.criminal.update({
          where: {
            id,
          },
          data: {
            ...input,
          },
        });
      }

      return await this.prisma.criminal.update({
        where: {
          id,
        },
        data: {
          ...input,
          crimes: {
            set: crimesIds?.map((id) => ({ id: id })),
          },
        },
      });
    } catch (error) {
      console.log('cheguei');
      if (error.code === 'P2002') {
        throw new CustomError({
          message:
            'Something wrong with your input, please check the application logs for more details',
          status: 400,
          log: error.message,
        });
      }
      if (error.code === 'P2025') {
        throw new CustomError({
          message: error.meta.cause as string,
          status: 404,
        });
      }
      throw new CustomError({
        message: 'Something went wrong during the database request',
        status: 500,
        log: error.message,
      });
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.criminal.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new CustomError({
          message: error.meta.cause as string,
          status: 404,
        });
      }

      throw new CustomError({
        message: 'Something went wrong during the database request',
        status: 500,
        log: error.message,
      });
    }
  }

  async scrape() {
    try {
      const webScrapper = new WebScrapper();
      console.log('Scraping started');
      const allCriminals = await webScrapper.execute();
      console.log('Scraping finished');
      console.log(allCriminals.length);

      await this.prisma.criminal.deleteMany({});
      const crimes = await this.crimesService.findAll();
      const allCrimesWithCrimesId = allCriminals.map((criminal) => {
        const crimesIds = criminal.crimes.map((crime) => {
          const crimeFound = crimes.find((c) => c.name === crime);
          if (crimeFound) {
            return crimeFound.id;
          }
        });
        return {
          ...criminal,
          crimes: crimesIds,
        };
      });

      // let insertPromises = allCrimesWithCrimesId.map((criminal) => {
      //   const crimes = criminal.crimes;
      //   return this.prisma.criminal.create({
      //     data: {
      //       ...criminal,
      //       crimes: {
      //         connect: crimes.map((crime: number[]) => ({ id: crime })),
      //       },
      //     },
      //   });
      // });
      // let promises = await Promise.all(insertPromises);

      // promises.map((response) => {
      //   console.log(response?.fullName + ' created');
      // });

      for await (const criminal of allCrimesWithCrimesId) {
        const crimes = criminal.crimes;
        const response = await this.prisma.criminal.create({
          data: {
            ...criminal,
            crimes: {
              connect: crimes.map((crime: number[]) => ({
                id: crime,
              })) as Prisma.CrimeWhereUniqueInput[],
            },
          },
        });
        console.log(response?.fullName + ' created');
      }

      console.log('Scraping finished');

      return allCriminals;
    } catch (error) {
      console.log(error);
      throw new CustomError({
        message: 'Something went wrong during the database request',
        status: 500,
        log: error.message,
      });
    }
  }
}
