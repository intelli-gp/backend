import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class UserBadgeDto {
  @ApiProperty({
    description: 'The badge id to be added to the user',
    required: true,
    example: 3,
  })
  @IsInt()
  @IsNotEmpty()
  BadgeId: number;
}

export class BadgeDto {
  @ApiProperty({
    description: 'badge title',
    required: true,
    example: 'initial badge',
  })
  @IsNotEmpty()
  Title: string;

  @ApiProperty({
    description: 'badge description',
    required: true,
    example: 'initial badge description',
  })
  @IsNotEmpty()
  Description: string;

  @ApiProperty({
    description: 'badge image url',
    required: true,
    example: 'https://example.com/image.png',
  })
  @IsNotEmpty()
  ImageUrl: string;

  @ApiProperty({
    description: 'required points to get the badge',
    required: true,
    example: 100,
  })
  @IsInt()
  @Min(0)
  RequiredPoints: number;
}
