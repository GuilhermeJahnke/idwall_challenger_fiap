import { Module } from '@nestjs/common';
import { CriminalsService } from './criminals.service';
import { CriminalsController } from './criminals.controller';

@Module({
  controllers: [CriminalsController],
  providers: [CriminalsService],
})
export class CriminalsModule {}
