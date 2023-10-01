import { Injectable } from '@nestjs/common';
import { CustomError } from 'src/exception/customError.exception';

import { Crime, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CrimesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createCrimeDto: Prisma.CrimeCreateWithoutCriminalsInput,
  ): Promise<Crime> {
    try {
      return await this.prisma.crime.create({
        data: {
          name: createCrimeDto.name,
        },
      });
    } catch (error) {
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

  async findAll(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.CrimeWhereUniqueInput;
      where?: Prisma.CrimeWhereInput;
      orderBy?: Prisma.CrimeOrderByWithAggregationInput;
    } = {},
  ) {
    try {
      return await this.prisma.crime.findMany(params);
    } catch (error) {
      throw new CustomError({
        message: 'Something went wrong during the database request',
        status: 500,
        log: (error.meta.cause as string) || error.message,
      });
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.crime.findFirstOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new CustomError({
          message: error.message as string,
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

  async update(id: number, input: Prisma.CrimeUpdateWithoutCriminalsInput) {
    try {
      return await this.prisma.crime.update({
        where: {
          id,
        },
        data: input,
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

  async remove(id: number) {
    try {
      return await this.prisma.crime.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error.code);
      if (error.code === 'P2025') {
        throw new CustomError({
          message: error.meta.cause as string,
          status: 404,
        });
      }
      if (error.code === 'P2016') {
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
