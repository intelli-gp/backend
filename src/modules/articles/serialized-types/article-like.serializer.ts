import { Prisma } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { SerializedUser } from 'src/modules/users/serialized-types/serialized-user';

export class SerializedArticleLike {
  ID: number;

  LikedAt: string;

  Liker: SerializedUser;

  @Exclude()
  user_id: number;
  constructor(
    partial: Partial<Omit<Prisma.article_likeWhereInput, 'AND' | 'OR' | 'NOT'>>,
  ) {
    this.ID = +partial?.article_id;
    this.LikedAt = partial?.liked_at as string;
    this.Liker = new SerializedUser(partial?.user);
  }
}
