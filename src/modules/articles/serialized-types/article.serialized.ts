import { article_tag, articles_content, tag, user } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';

export class SerializedArticle {
  @Exclude()
  article_id: number;

  @Exclude()
  user_id: number;

  title: string;

  cover_image_url: string;

  created_at: Date;

  updated_at: Date;

  @Transform(({ value }: { value: user }) => ({
    user_id: value.user_id,
    username: value.username,
    image: value.image,
  }))
  user: user;

  @Transform(({ value }: { value: articles_content[] }) =>
    value.map((content: articles_content) => {
      return {
        content_id: content.content_id,
        value: content.value,
        content_type: content['content_type'],
      };
    }),
  )
  articles_content: articles_content[];

  @Transform(({ value }: { value: article_tag[] }) =>
    value.map((tag: article_tag) => tag.tag_name),
  )
  article_tag: article_tag[];

  constructor(partial: Partial<user>) {
    Object.assign(this, partial);
  }
}
