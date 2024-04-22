export interface GroupSearchResult {
  tags: string[];
  title: string;
  group_id: number;
  description: string;
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
  tags: string[];
  title: string;
  content: string[];
  article_id: number;
}

export interface GeneralSearchResult {
    articles: ArticleSearchResult[];
    groups: GroupSearchResult[];
    users: UserSearchResult[];
}