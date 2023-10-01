import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllQueryParamsDTO {
  @IsNumber()
  @IsOptional()
  skip: number;

  @IsNumber()
  @IsOptional()
  take: number;

  @IsString()
  @IsOptional()
  cursor?: string;

  @IsString()
  @IsOptional()
  orderBy?: string;

  @IsString()
  @IsOptional()
  sort?: 'asc' | 'desc';

  @IsString()
  @IsOptional()
  sex?: string;

  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  crime?: string;
}
