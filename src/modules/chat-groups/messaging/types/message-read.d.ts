import { user } from '@prisma/client';

export type MessageReadReceipt = {
    message_id: number;
    user_id: number;
    read_at: Date;
    user: user;
};
