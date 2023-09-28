import { PartialType } from '@nestjs/swagger';
import { CreateCrimeDto } from './create-crime.dto';

export class UpdateCrimeDto extends PartialType(CreateCrimeDto) {}
