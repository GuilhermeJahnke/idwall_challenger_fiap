import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Criminal, Prisma } from '@prisma/client';
import { CustomError } from 'src/exception/customError.exception';
import { CrimesService } from 'src/crimes/crimes.service';

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
      throw new CustomError({
        message: 'Something went wrong during the database request',
        status: 500,
        log: error.message,
      });
    }
  }

  findAll(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.CriminalWhereUniqueInput;
      where?: Prisma.CriminalWhereInput;
      orderBy?: Prisma.CrimeOrderByWithAggregationInput;
    } = {},
  ) {
    try {
      return this.prisma.criminal.findMany(params);
    } catch (error) {
      throw new CustomError({
        message: 'Something went wrong during the database request',
        status: 500,
        log: (error.meta.cause as string) || error.message,
      });
    }
  }

  findOne(id: string) {
    try {
      return this.prisma.criminal.findUnique({
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

  update(
    id: string,
    input: Prisma.CriminalUpdateWithoutCrimesInput,
    crimesIds?: number[],
  ) {
    try {
      return this.prisma.criminal.update({
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
      throw new CustomError({
        message: 'Something went wrong during the database request',
        status: 500,
        log: error.message,
      });
    }
  }

  remove(id: string) {
    try {
      return this.prisma.criminal.delete({
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
}
