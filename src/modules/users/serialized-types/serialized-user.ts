import { level, plan, user } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class SerializedUser {
  id: string;
  full_name: string;
  username: string;
  dob: Date;
  email: string;
  phone_number: string;
  image: string;
  plan: plan;
  level: level;
  interests: string[];

  @Exclude()
  plan_id: number;

  @Exclude()
  level_id: number;

  @Exclude()
  password: string;

  @Exclude()
  renewal_date: Date;

  @Exclude()
  subscription_date: Date;

  constructor(partial: Partial<user>) {
    Object.assign(this, partial);
  }
}

export class FailureResponse {
  data: any;
}
