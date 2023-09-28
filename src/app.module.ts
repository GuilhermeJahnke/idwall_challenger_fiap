import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CriminalsModule } from './criminals/criminals.module';
import { CrimesModule } from './crimes/crimes.module';

@Module({
  imports: [PrismaModule, CriminalsModule, CrimesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
