import { ApiProperty } from '@nestjs/swagger';
import { user } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class SerializedPoints {
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
