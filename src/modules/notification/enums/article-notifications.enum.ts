export const ARTICLE_NOTIFICATION_TYPES = {
  LIKE: 'like',
  COMMENT: 'comment',
  COMMENT_REPLY: 'commentReply',
} as const;

export type ArticleNotificationType<
  T extends keyof typeof ARTICLE_NOTIFICATION_TYPES | void,
> = T extends keyof typeof ARTICLE_NOTIFICATION_TYPES
  ? (typeof ARTICLE_NOTIFICATION_TYPES)[T]
  : (typeof ARTICLE_NOTIFICATION_TYPES)[keyof typeof ARTICLE_NOTIFICATION_TYPES];
