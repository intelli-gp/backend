import { Prisma, group, group_tag, group_user, user } from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';

export class SerializedChatGroup {
  @Expose({ name: 'ID' })
  group_id: number;

  @Expose({ name: 'GroupTitle' })
  title: string;

  @Expose({ name: 'GroupDescription' })
  description?: string;

  @Expose({ name: 'GroupCoverImage' })
  cover_image_url?: string;

  @Expose({ name: 'CreatedAt' })
  created_at?: Date;

  @Expose({ name: 'UpdatedAt' })
  updated_at?: Date;

  @Expose({ name: 'GroupTags' })
  @Transform(({ value }) => value?.map((tag: group_tag) => tag.tag_name))
  group_tag?: group_tag[];

  @Expose({ name: 'GroupMembers' })
  @Transform(
    ({ value }) =>
      value
        ?.filter((groupUser: group_user) => groupUser.joining_status !== false)
        ?.map((groupUser: Prisma.group_userWhereInput) => {
          return {
            ID: groupUser.user_id,
            FullName: groupUser?.user?.full_name,
            Username: groupUser?.user?.username,
            ProfileImage: groupUser?.user?.image,
            Type: groupUser.type,
            ConnectedStatus: groupUser?.user?.connected,
          };
        }),
  )
  group_user?: group_user[];

  @Expose({ name: 'GroupOwner' })
  @Transform(({ value }: { value: user }) => {
    return {
      ID: value?.user_id,
      FullName: value?.full_name,
      Username: value?.username,
      Email: value?.email,
      ProfileImage: value?.image,
    };
  })
  user?: user;

  @Exclude()
  created_by: number;

  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }
}
