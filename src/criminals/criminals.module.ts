import { Module } from '@nestjs/common';
import { CriminalsService } from './criminals.service';
import { CriminalsController } from './criminals.controller';

import { CrimesModule } from 'src/crimes/crimes.module';

@Module({
  controllers: [CriminalsController],
  providers: [CriminalsService],
  imports: [CrimesModule],
})
export class CriminalsModule {}
