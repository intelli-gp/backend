import { singleEmbeddedUserExample } from 'src/modules/users/swagger-examples';

export const singleGroupExample = {
    ID: 7,
    GroupTitle: 'Dummy Title Updated',
    GroupDescription: 'Dummy Description',
    GroupCoverImage: 'www.google.com',
    CreatedAt: '2024-02-17T21:09:02.050Z',
    UpdatedAt: '2024-03-05T16:14:17.355Z',
    GroupTags: ['software', 'backend', 'web-development'],
    GroupOwner: singleEmbeddedUserExample,
    GroupMembers: [
        {
            ...singleEmbeddedUserExample,
            Type: 'ADMIN',
        },
        {
            ...singleEmbeddedUserExample,
            Type: 'MEMBER',
        },
    ],
};
