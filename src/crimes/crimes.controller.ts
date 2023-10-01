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
  async create(@Body() createCrimeDto: CreateCrimeDto) {
    try {
      return await this.crimesService.create(createCrimeDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.crimesService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.crimesService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCrimeDto: UpdateCrimeDto,
  ) {
    try {
      return await this.crimesService.update(+id, updateCrimeDto);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.crimesService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }
}
