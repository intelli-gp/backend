import { article } from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';

export class DeserializedArticle {
    title: string;

    cover_image_url: string;

    articles_content: string[][];

    constructor(partial: Partial<any>) {
        this.title = partial?.title;
        this.cover_image_url = partial?.coverImageUrl;
        this.articles_content = partial?.sections;
    }
}
