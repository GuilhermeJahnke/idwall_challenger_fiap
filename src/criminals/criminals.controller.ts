import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { CriminalsService } from './criminals.service';
import { CreateCriminalDto } from './dto/create-criminal.dto';
import { UpdateCriminalDto } from './dto/update-criminal.dto';

@Controller('criminals')
export class CriminalsController {
  constructor(private readonly criminalsService: CriminalsService) {}

  @Post()
  create(@Body() body: CreateCriminalDto) {
    try {
      const { crimes, ...criminalInput } = body;
      return this.criminalsService.create(criminalInput, crimes);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Get()
  findAll(
    @Param('skip') skip: string,
    @Param('take') take: string,
    @Param('name') name: string,
    @Param('cursor') cursor: string,
    @Param('orderBy') orderBy: string,
    @Param('sort') sort: string,
  ) {
    try {
      return this.criminalsService.findAll({
        where: {
          name,
        },
        skip: skip ? +skip : undefined,
        take: take ? +take : undefined,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          [orderBy]: sort,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.criminalsService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateCriminalDto) {
    try {
      const { crimes, ...criminalInput } = body;

      return this.criminalsService.update(id, criminalInput, crimes);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.criminalsService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }
}
