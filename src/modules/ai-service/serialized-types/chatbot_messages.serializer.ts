import { ApiProperty } from '@nestjs/swagger';
import { Prisma, message_ai } from '@prisma/client';
import { SerializedUser } from 'src/modules/users/serialized-types/serialized-user';

export class SerializedChatbotMessages {
    @ApiProperty({
        example: 'Hello',
        description: 'Prompt message from user',
    })
    Prompt: string;

    @ApiProperty({
        example: 'Hi',
        description: 'Reply message from chatbot',
    })
    Reply: string;

    @ApiProperty({
        example: '2021-08-20T12:00:00.000Z',
        description: 'Date and time the message was created',
    })
    CreatedAt: Date;

    @ApiProperty({
        description: 'User that sent the message',
        example: {
            Username: 'user1',
            ProfileImage: 'https://example.com/image.jpg',
        },
    })
    User: SerializedUser;

    constructor(partial: Partial<Prisma.message_aiWhereInput>) {
        this.Prompt = partial?.prompt as string;
        this.Reply = partial?.reply as string;
        this.CreatedAt = partial?.created_at as Date;

        this.User = new SerializedUser(partial?.user as Prisma.userWhereInput);
    }
}
