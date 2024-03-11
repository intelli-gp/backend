import {
  Prisma,
  group,
  group_user,
  level,
  plan,
  user,
  user_tag,
} from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';

export class SerializedUser {
  @Expose({ name: 'ID' })
  user_id: string;

  @Expose({ name: 'FullName' })
  full_name: string;

  @Expose({ name: 'Username' })
  username: string;

  @Expose({ name: 'DOB' })
  dob: Date;

  @Expose({ name: 'Bio' })
  bio: string;

  @Expose({ name: 'Email' })
  email: string;

  @Expose({ name: 'PhoneNumber' })
  phone_number: string;

  @Expose({ name: 'ProfileImage' })
  image: string;

  @Expose({ name: 'CoverImage' })
  cover_image: string;

  @Expose({ name: 'SubscriptionPlan' })
  plan: plan;

  @Expose({ name: 'UserLevel' })
  level: level;

  @Expose({ name: 'Connected' })
  connected: boolean;

  @Expose({ name: 'HashedRefreshToken' })
  hashed_refresh_token: string;

  @Expose({ name: 'Active' })
  active: boolean;

  @Expose({ name: 'UserTags' })
  @Transform(({ value }: { value: user_tag[] }) =>
    value.map((tag) => tag.tag_name),
  )
  user_tag: string[];

  @Expose({ name: 'GroupsCreated' })
  @Transform(({ value }: { value: Prisma.groupWhereInput[] }) =>
    value.map((group) => {
      return {
        GroupID: group?.group_id,
        GroupName: group?.title,
        GroupImage: group?.cover_image_url,
        GroupUsersCount: (group as any)?._count?.group_user,
      };
    }),
  )
  group: group[];

  @Expose({ name: 'GroupsJoined' })
  @Transform(({ value }: { value: Prisma.group_userWhereInput[] }) => {
    return value.map((group_user) => {
      return {
        GroupID: group_user?.group.group_id,
        GroupName: group_user?.group.title,
        GroupImage: group_user?.group.cover_image_url,
        GroupUsersCount: (group_user?.group as any)?._count.group_user,
      };
    });
  })
  group_user: group_user;

  @Exclude()
  renewal_date: Date;

  @Exclude()
  subscription_date: Date;

  @Exclude()
  password: string;

  @Exclude()
  level_id: number;

  @Exclude()
  plan_id: number;

  constructor(partial: Partial<user>) {
    Object.assign(this, partial);
  }
}
