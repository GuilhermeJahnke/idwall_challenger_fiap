import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCrimeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
