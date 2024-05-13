import { Prisma } from '@prisma/client';
import { SerializedUser } from 'src/modules/users/serialized-types/serialized-user';

export class SerializedArticleComment {
    ID: number;

    Content: string;

    CreatedAt: string;

    ArticleID: number;

    Commenter: SerializedUser;

    LikedBy: SerializedUser[];

    IsNotificationViewed: boolean;

    constructor(
        partial: Partial<
            Omit<Prisma.article_commentWhereInput, 'AND' | 'OR' | 'NOT'>
        >,
    ) {
        this.ID = +partial?.comment_id as number;
        this.Content = partial?.md_content as string;
        this.CreatedAt = partial?.created_at as string;
        this.ArticleID = +partial?.article_id as number;
        this.Commenter = new SerializedUser(partial?.user);
        this.LikedBy = (
            partial?.article_comment_likes as Prisma.article_comment_likeWhereInput[]
        )?.map((articleCommentLike) => {
            return new SerializedUser(articleCommentLike?.user);
        });
        this.IsNotificationViewed = partial?.isNotificationViewed as boolean;
    }
}
