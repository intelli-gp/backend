import { group, group_tag, group_user, user } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';

export class SerializedChatGroup {
  @Expose({ name: 'ID' })
  chat_group_id?: number;

  @Expose({ name: 'GroupTitle' })
  group_title?: string;

  @Expose({ name: 'GroupDescription' })
  group_description?: string;

  @Expose({ name: 'GroupCoverImageUrl' })
  group_cover_image_url?: string;

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
        .map((groupUser: group_user) => {
          return {
            ID: groupUser.user_id,
            username: ((groupUser as any)?.user as user)?.username,
            profileImg: ((groupUser as any)?.user as user)?.cover_image,
            joiningStatus: groupUser.joining_status,
            type: groupUser.type,
          };
        }),
  )
  group_user?: group_user[];

  @Expose({ name: 'GroupOwner' })
  @Transform(({ value }) => {
    return {
      ID: value?.user_id,
      username: value?.username,
      email: value?.email,
      profileImage: value?.profile_image_url,
    };
  })
  user?: user;

  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }
}
