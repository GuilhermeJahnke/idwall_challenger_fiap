import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CriminalsService } from './criminals.service';
import { CreateCriminalDto } from './dto/create-criminal.dto';
import { UpdateCriminalDto } from './dto/update-criminal.dto';

@Controller('criminals')
export class CriminalsController {
  constructor(private readonly criminalsService: CriminalsService) {}

  @Post()
  create(@Body() createCriminalDto: CreateCriminalDto) {
    return this.criminalsService.create(createCriminalDto);
  }

  @Get()
  findAll() {
    return this.criminalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.criminalsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCriminalDto: UpdateCriminalDto,
  ) {
    return this.criminalsService.update(+id, updateCriminalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.criminalsService.remove(+id);
  }
}
