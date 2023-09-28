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
import { CrimesService } from './crimes.service';
import { CreateCrimeDto } from './dto/create-crime.dto';
import { UpdateCrimeDto } from './dto/update-crime.dto';

@Controller('crimes')
export class CrimesController {
  constructor(private readonly crimesService: CrimesService) {}

  @Post()
  create(@Body() createCrimeDto: CreateCrimeDto) {
    try {
      return this.crimesService.create(createCrimeDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Get()
  findAll() {
    try {
      return this.crimesService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.crimesService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrimeDto: UpdateCrimeDto) {
    try {
      return this.crimesService.update(+id, updateCrimeDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.crimesService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }
}
