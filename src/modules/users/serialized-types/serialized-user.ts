import { level, plan, user, user_tag } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';

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

  @Transform(({ value }: { value: user_tag[] }) =>
    value.map((tag) => tag.tag_name),
  )
  user_tag: string[];

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
