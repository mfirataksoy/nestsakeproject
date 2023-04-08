import { PartialType } from '@nestjs/mapped-types';
import { CreateFamilyDto } from './create-family.dto';
import { IsOptional, IsString, IsArray } from 'class-validator';

export class UpdateFamilyDto extends PartialType(CreateFamilyDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  members?: string[];
}
