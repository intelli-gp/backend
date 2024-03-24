import { Prisma, group_tag } from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';
import { SerializedUser } from 'src/modules/users/serialized-types/serialized-user';

export class SerializedChatGroup {
  ID: number;

  GroupTitle: string;

  GroupDescription?: string;

  GroupCoverImage?: string;

  CreatedAt?: string;

  UpdatedAt?: string;

  GroupTags?: string[];

  GroupMembers?: SerializedUser[];

  GroupOwner?: SerializedUser;

  @Exclude()
  created_by: number;

  constructor(partial: Partial<Prisma.groupWhereInput>) {
    this.ID = +partial?.group_id;

    this.GroupTitle = partial?.title as string;

    this.GroupDescription = partial?.description as string;

    this.GroupCoverImage = partial?.cover_image_url as string;

    this.CreatedAt = partial?.created_at as string;

    this.UpdatedAt = partial?.updated_at as string;

    this.GroupTags =
      (partial?.group_tag as group_tag[])?.map((tag) => tag.tag_name) || [];

    this.GroupOwner = new SerializedUser(partial?.user);

    this.GroupMembers = (partial?.group_user as Prisma.group_userWhereInput[])
      ?.filter((groupUser) => groupUser.joining_status !== false)
      .map((groupUser) => {
        return {
          ...new SerializedUser(groupUser?.user),
          Type: groupUser.type,
        };
      });
  }
}
