import { article_tag, articles_content, user } from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';

export class SerializedArticle {
  @Exclude()
  article_id: number;

  @Exclude()
  user_id: number;

  title: string;

  @Expose({ name: 'coverImageUrl' })
  cover_image_url: string;

  @Expose({ name: 'createdAt' })
  created_at: Date;

  @Expose({ name: 'updatedAt' })
  updated_at: Date;

  @Expose({ name: 'author' })
  @Transform(({ value }: { value: user }) => ({
    fullName: value.full_name,
    username: value.username,
    image: value.image,
  }))
  user: user;

  @Expose({ name: 'sections' })
  @Transform(({ value }: { value: articles_content[] }) =>
    value.map((content: articles_content) => {
      return {
        value: content.value,
        contentType: content.content_type,
      };
    }),
  )
  articles_content: articles_content[];

  @Expose({ name: 'tags' })
  @Transform(({ value }: { value: article_tag[] }) =>
    value.map((tag: article_tag) => tag.tag_name),
  )
  article_tag: article_tag[];

  constructor(partial: Partial<user>) {
    Object.assign(this, partial);
  }
}
