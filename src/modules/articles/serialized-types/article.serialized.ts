import { Logger } from '@nestjs/common';
import { article, article_tag, articles_content, user } from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';
import { SerializedUser } from 'src/modules/users/serialized-types/serialized-user';

export class SerializedArticle {
  @Expose({ name: 'ID' })
  article_id?: number;

  @Exclude()
  user_id?: number;

  @Expose({ name: 'Title' })
  title?: string;

  @Expose({ name: 'CoverImage' })
  cover_image_url?: string;

  @Expose({ name: 'CreatedAt' })
  created_at?: Date;

  @Expose({ name: 'UpdatedAt' })
  updated_at?: Date;

  @Expose({ name: 'Author' })
  @Transform(({ value }: { value: user }) => {
    if (!value) return;

    return {
      ...new SerializedUser(value),
      FollowersCount: (value as any).followed_by?.length || 0,
    };
  })
  user?: user;

  @Expose({ name: 'Sections' })
  @Transform(
    ({ value }: { value: articles_content[] }) =>
      value?.map((content: articles_content) => {
        return {
          Value: content?.value,
          ContentType: content?.content_type,
        };
      }),
  )
  articles_content?: articles_content[];

  @Expose({ name: 'ArticleTags' })
  @Transform(
    ({ value }: { value: article_tag[] }) =>
      value?.map((tag: article_tag) => tag?.tag_name),
  )
  article_tag?: article_tag[];

  constructor(partial: Partial<article>) {
    // assign values to object
    Object.assign(this, partial);
  }
}
