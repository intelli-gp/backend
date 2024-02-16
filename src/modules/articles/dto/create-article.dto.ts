import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { IsValidArticleSections } from '../../../utils/class-validator-decorators';

export class CreateArticleDto {
  @ApiProperty({
    example: 'My article title',
    description: 'The title of the article',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'www.google.com/url/to/image.jpg',
    description: 'The cover image of the article',
  })
  @IsUrl()
  @IsNotEmpty()
  coverImageUrl: string;

  @ApiProperty({
    example: ['tag1', 'tag2', 'tag3'],
    description: 'The tags of the article',
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(25)
  @Length(1, 512, { each: true })
  tags: string[];

  @ApiProperty({
    example: [
      ['section1', 'typeOfSection1'],
      ['section2', 'typeOfSection2'],
    ],
    description: 'The sections of the article',
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ArrayNotEmpty({ each: true })
  @IsArray({ each: true })
  @ArrayMinSize(2, { each: true })
  @ArrayMaxSize(2, { each: true })
  @IsValidArticleSections()
  sections: string[][];
}
