import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Criminal, Prisma } from '@prisma/client';
import { CustomError } from 'src/exception/customError.exception';

@Injectable()
export class CriminalsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(input: Prisma.CriminalCreateInput): Promise<Criminal> {
    try {
      const response = await this.prisma.criminal.create({
        data: input,
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

  update(id: string, input: Prisma.CriminalUpdateInput) {
    try {
      return this.prisma.criminal.update({
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
