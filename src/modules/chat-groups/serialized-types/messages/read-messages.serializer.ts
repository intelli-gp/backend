import { Prisma } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { SerializedMessage } from './messages.serializer';
import { MessageReadReceipt } from '../../messaging/types/message-read';

export class SerializedReadMessageInfo {
    MessageID: number;

    UserID: number;

    Username: string;

    FullName: string;

    ReadAt: Date;

    ProfileImage: string;

    @Exclude()
    user: any;

    constructor(partial: Partial<MessageReadReceipt>) {
        this.MessageID = Number(partial?.message_id);
        this.UserID = Number(partial?.user?.user_id);
        this.Username = partial?.user?.username as string;
        this.FullName = partial?.user?.full_name as string;
        this.ProfileImage = partial?.user?.image as string;
        this.ReadAt = partial?.read_at as Date;
    }
}
