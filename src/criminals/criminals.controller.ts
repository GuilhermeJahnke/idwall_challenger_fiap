import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  Query,
} from '@nestjs/common';
import { CriminalsService } from './criminals.service';
import { CreateCriminalDto } from './dto/create-criminal.dto';
import { UpdateCriminalDto } from './dto/update-criminal.dto';
import { FindAllQueryParamsDTO } from './dto/findAll-criminals.dto';

@Controller('criminals')
export class CriminalsController {
  constructor(private readonly criminalsService: CriminalsService) {}

  @Get('/scrape')
  async scrape() {
    try {
      return await this.criminalsService.scrape();
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Post()
  async create(@Body() body: CreateCriminalDto) {
    try {
      const { crimes, ...criminalInput } = body;
      return await this.criminalsService.create(criminalInput, crimes);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Get()
  async findAll(
    @Query()
    query: FindAllQueryParamsDTO,
  ) {
    if (query.sort !== ('asc' || 'desc') && query.sort) {
      throw new HttpException('Invalid sort parameter', 400);
    }
    if (query.orderBy && query.orderBy === ('id' || 'fullName')) {
      throw new HttpException(
        'Invalid orderBy parameter, should be: "id" or "fullName"',
        400,
      );
    }
    try {
      const response = await this.criminalsService.findAll({
        where: {
          AND: [
            {
              fullName: {
                contains: query.fullName,
                mode: 'insensitive',
              },
            },
            {
              sex: {
                contains: query.sex,
                mode: 'insensitive',
              },
            },
            {
              crimes: {
                some: {
                  name: {
                    contains: query.crime,
                    mode: 'insensitive',
                  },
                },
              },
            },
          ],
        },
        skip: query.skip,
        take: query.take,
        cursor: query.cursor ? { id: query.cursor } : undefined,
        orderBy:
          query.orderBy && query.sort
            ? {
                [query.orderBy]: query.sort,
              }
            : undefined,
      });

      return response;
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.criminalsService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateCriminalDto) {
    try {
      const { crimes, ...criminalInput } = body;

      return await this.criminalsService.update(id, criminalInput, crimes);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.criminalsService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }
}
