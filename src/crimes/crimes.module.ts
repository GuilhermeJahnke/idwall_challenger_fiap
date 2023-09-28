import { Module } from '@nestjs/common';
import { CrimesService } from './crimes.service';
import { CrimesController } from './crimes.controller';

@Module({
  controllers: [CrimesController],
  providers: [CrimesService],
  exports: [CrimesService],
})
export class CrimesModule {}
