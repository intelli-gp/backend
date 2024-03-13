import { ApiProperty } from '@nestjs/swagger';
import { badges, user } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class SerializedUserBadge {
  @ApiProperty({
    example: 1,
  })
  UpdatedPoints: number;

  constructor(partial: Partial<user>) {
    Object.assign(this, partial);
  }

  @Exclude()
  password: string;

  @Exclude()
  user_id: string;

  @Exclude()
  phone_number: string;

  @Exclude()
  username: string;

  @Exclude()
  email: string;

  @Exclude()
  dob: string;

  @Exclude()
  full_name: string;

  @Exclude()
  bio: string;

  @Exclude()
  cover_image: string;

  @Exclude()
  image: string;

  @Exclude()
  level_id: string;

  @Exclude()
  plan_id: string;

  @Exclude()
  renewal_date: string;

  @Exclude()
  subscription_date: string;

  @Exclude()
  active: string;

  @Exclude()
  hashed_refresh_token: string;
}

export class SerializedBadge {
  @ApiProperty({
    example: 'initial badge',
  })
  Title: string;

  @ApiProperty({
    example: 'initial badge description',
  })
  Description: string;

  @ApiProperty({
    example: 'https://example.com/image.png',
  })
  ImageUrl: string;

  @ApiProperty({
    example: 100,
  })
  RequiredPoints: number;

  constructor(partial: Partial<badges>) {
    Object.assign(this, partial);
    this.Title = partial.title;
    this.Description = partial.description;
    this.ImageUrl = partial.image_url;
    this.RequiredPoints = partial.required_points;
  }

  @Exclude()
  badgeId: number;

  @Exclude()
  title: string;

  @Exclude()
  description: string;

  @Exclude()
  image_url: string;

  @Exclude()
  required_points: number;
}
