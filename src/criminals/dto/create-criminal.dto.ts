import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCriminalDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  forename: string;

  @IsNotEmpty()
  @IsString()
  nationality: string;

  @IsNotEmpty()
  dateOfBirth: string;

  @IsNotEmpty()
  @IsString()
  photoUrl: string;

  @IsNotEmpty()
  @IsString()
  sex: string;

  @IsNotEmpty()
  @IsNumber()
  reward: number;

  @IsNotEmpty()
  @IsString()
  collectedFrom: string;

  @IsOptional()
  @IsArray()
  crimes: number[];
}
