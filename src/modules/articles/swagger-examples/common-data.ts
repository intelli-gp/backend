import { singleEmbeddedUserExample } from 'src/modules/users/swagger-examples';

export const singleCommentExample = {
    ID: 2,
    Content: 'Test comment',
    CreatedAt: '2024-04-05T15:43:53.161Z',
    ArticleID: 1,
    Commenter: singleEmbeddedUserExample,
    LikedBy: [singleEmbeddedUserExample, singleEmbeddedUserExample],
};

export const articleExample = {
    ID: 1,
    Title: 'My article title updated',
    CreatedAt: '2024-02-21T19:52:10.423Z',
    UpdatedAt: '2024-02-21T20:33:01.069Z',
    CoverImage: 'www.google.com/url/to/image.jpg',
    ArticleTags: ['tag2', 'tag3', 'tag4'],
    Author: {
        ID: 1,
        FullName: 'John',
        Username: 'John3142',
        DOB: '2011-01-04T00:00:00.000Z',
        Email: 'johndoe.22@gmail.com',
        PhoneNumber: '+201050790880',
        Connected: false,
        FollowersCount: 0,
    },
    Sections: [
        {
            Value: 'valueOfSection3434343422',
            ContentType: 'text',
        },
        {
            Value: 'typeOfSection1',
            ContentType: 'text',
        },
    ],
    LikedBy: [singleEmbeddedUserExample, singleEmbeddedUserExample],
    Comments: [singleCommentExample, singleCommentExample],
};
