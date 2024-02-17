import { PartialType as MappedPartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UpdateArticleDto extends PartialType(
  OmitType(CreateArticleDto, ['tags'] as const),
) {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  addedTags?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  removedTags?: string[];
}
