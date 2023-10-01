import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCriminalDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  nationalities: string;

  @IsNotEmpty()
  dateOfBirth: string;

  @IsNotEmpty()
  @IsString()
  photoUrl: string;

  @IsNotEmpty()
  @IsString()
  sex: string;

  @IsNotEmpty()
  @IsString()
  collectedFrom: string;

  @IsOptional()
  @IsArray()
  crimes: string[];

  @IsString()
  arrestWarrants: string;

  @IsString()
  @IsNotEmpty()
  entityId: string;
}
