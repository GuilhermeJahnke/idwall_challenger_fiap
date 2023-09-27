import { PartialType } from '@nestjs/swagger';
import { CreateCriminalDto } from './create-criminal.dto';

export class UpdateCriminalDto extends PartialType(CreateCriminalDto) {}
