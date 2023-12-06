import { user } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class SerializedUser {
  id: string;
  full_name: string;
  username: string;
  dob: Date;
  image_url: string;
  level_id: number;
  plan_id: number;

  @Exclude()
  password: string;

  @Exclude()
  renewal_date: Date;

  @Exclude()
  subscription_date: Date;

  @Exclude()
  email: string;

  constructor(partial: Partial<user>) {
    Object.assign(this, partial);
  }
}
