import { articles_content, user, group_tag } from '@prisma/client';

export interface GroupSearchResult {
    group_id: number;
    title: string;
    description: string;
    cover_image_url: string;
    group_tag: string[];
}

export interface UserSearchResult {
    bio: string;
    tags: string[];
    email: string;
    user_id: number;
    headline: string;
    username: string;
    full_name: string;
    phone_number: string;
}

export interface ArticleSearchResult {
    user: Partial<user>; // Author
    title: string;
    article_id: number;
    updated_at: Date;
    cover_image_url: string;
    article_tag: string;
    articles_content: articles_content[];
}

export interface GeneralSearchResult {
    articles: ArticleSearchResult[];
    groups: GroupSearchResult[];
    users: UserSearchResult[];
}
