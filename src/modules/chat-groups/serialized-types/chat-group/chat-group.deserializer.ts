import { group_tag } from '@prisma/client';

export class DeserializedChatGroup {
    title: string;

    description: string;

    cover_image_url: string;

    constructor(partial: Partial<any>) {
        this.title = partial?.GroupTitle;
        this.description = partial?.GroupDescription;
        this.cover_image_url = partial?.GroupCoverImageUrl;
    }
}
