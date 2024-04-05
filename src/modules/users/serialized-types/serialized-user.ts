import {
  Prisma,
  article,
  group_user,
  level,
  plan,
  user_tag,
} from '@prisma/client';
import { Exclude } from 'class-transformer';
import { SerializedArticle } from 'src/modules/articles/serialized-types/article.serialized';
import { SerializedChatGroup } from 'src/modules/chat-groups/serialized-types/chat-group/chat-group.serializer';

export class SerializedUser {
  ID: number;

  FullName: string;

  Username: string;

  DOB: string;

  Bio: string;

  Headline: string;

  Email: string;

  PhoneNumber: string;

  ProfileImage: string;

  CoverImage: string;

  SubscriptionPlan: plan;

  UserLevel: level;

  Connected: boolean;

  HashedRefreshToken: string;

  Active: boolean;

  UserTags: string[];

  Articles: SerializedArticle[];

  GroupsCreated: SerializedChatGroup[];

  GroupsJoined: SerializedChatGroup[];

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

  constructor(partial: Partial<Prisma.userWhereInput>) {
    this.ID = +partial?.user_id;
    this.FullName = partial?.full_name as string;
    this.Username = partial?.username as string;

    partial?.headline && (this.Headline = partial?.headline as string);

    partial?.bio && (this.Bio = partial?.bio as string);

    partial?.dob && (this.DOB = partial?.dob as string);

    partial?.email && (this.Email = partial?.email as string);

    partial?.phone_number &&
      (this.PhoneNumber = partial?.phone_number as string);

    partial?.image && (this.ProfileImage = partial?.image as string);

    partial?.cover_image && (this.CoverImage = partial?.cover_image as string);

    if (partial?.connected !== null && partial?.connected !== undefined)
      this.Connected = partial?.connected as boolean;

    this.HashedRefreshToken &&
      (this.HashedRefreshToken = partial?.hashed_refresh_token as string);

    partial?.user_tag &&
      (this.UserTags =
        (partial?.user_tag as user_tag[]).map((tag) => tag.tag_name) || []);

    if (partial?.article)
      this.Articles = (partial?.article as article[]).map((article) => {
        return new SerializedArticle(article);
      });

    if (partial?.group)
      this.GroupsCreated = (partial?.group as Prisma.groupWhereInput[]).map(
        (group) => {
          return {
            ...new SerializedChatGroup(group),
            GroupUsersCount:
              (group?.group_user as group_user[])?.filter(
                (groupUser) => groupUser.joining_status,
              )?.length || 0,
          };
        },
      );

    if (partial?.group_user)
      this.GroupsJoined = (
        partial?.group_user as Prisma.group_userWhereInput[]
      ).map((group_user) => {
        return {
          ...new SerializedChatGroup(group_user.group),
          JoiningStatus: group_user.joining_status,
        };
      });
  }
}
