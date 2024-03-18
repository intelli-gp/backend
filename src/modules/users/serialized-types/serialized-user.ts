import {
  Prisma,
  article,
  article_tag,
  group,
  group_tag,
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
  @Transform(
    ({ value }: { value: user_tag[] }) => value?.map((tag) => tag.tag_name),
  )
  user_tag: string[];

  @Expose({ name: 'Articles' })
  @Transform(
    ({ value }: { value: Prisma.articleWhereInput[] }) =>
      value?.map((article) => {
        return {
          ArticleID: article?.article_id,
          ArticleTitle: article?.title,
          ArticleImage: article?.cover_image_url,
          ArticleTags: (article?.article_tag as article_tag[])?.map(
            (tag) => tag.tag_name,
          ),
          ArticleCreatedAt: article?.created_at,
        };
      }),
  )
  article: article[];

  @Expose({ name: 'GroupsCreated' })
  @Transform(
    ({ value }: { value: Prisma.groupWhereInput[] }) =>
      value?.map((group) => {
        return {
          ID: group?.group_id,
          GroupTitle: group?.title,
          GroupCoverImage: group?.cover_image_url,
          GroupTags: (group?.group_tag as group_tag[])?.map(
            (tag) => tag.tag_name,
          ),
          GroupUsersCount:
            (group?.group_user as group_user[])?.filter(
              (groupUser) => groupUser.joining_status,
            )?.length || 0,
        };
      }),
  )
  group: group[];

  @Expose({ name: 'GroupsJoined' })
  @Transform(({ value }: { value: Prisma.group_userWhereInput[] }) => {
    return value?.map((group_user) => {
      return {
        ID: group_user?.group.group_id,
        GroupName: group_user?.group.title,
        GroupCoverImage: group_user?.group.cover_image_url,
        GroupTags: (group_user?.group?.group_tag as group_tag[])?.map(
          (tag) => tag.tag_name,
        ),
        GroupUsersCount:
          (group_user?.group?.group_user as group_user[])?.filter(
            (groupUser) => groupUser.joining_status,
          )?.length || 0,
        JoiningStatus: group_user?.joining_status,
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
