import { group, group_tag, group_user, user } from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';

export class SerializedChatGroup {
  @Expose({ name: 'ID' })
  group_id: number;

  @Expose({ name: 'GroupTitle' })
  title: string;

  @Expose({ name: 'GroupDescription' })
  description?: string;

  @Expose({ name: 'GroupCoverImageUrl' })
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
        ?.map((groupUser: group_user) => {
          return {
            ID: groupUser.user_id,
            Username: ((groupUser as any)?.user as user)?.username,
            ProfileImage: ((groupUser as any)?.user as user)?.cover_image,
            JoiningStatus: groupUser.joining_status,
            Type: groupUser.type,
          };
        }),
  )
  group_user?: group_user[];

  @Expose({ name: 'GroupOwner' })
  @Transform(({ value }) => {
    return {
      ID: value?.user_id,
      Username: value?.username,
      Email: value?.email,
      ProfileImage: value?.profile_image_url,
    };
  })
  user?: user;

  @Exclude()
  created_by: number;

  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }
}
