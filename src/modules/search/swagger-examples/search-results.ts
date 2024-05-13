export const singleUser = {
    ID: 6,
    FullName: 'Omar Fahmy',
    Username: 'ofahmy143',
    DOB: '2001-12-20T00:00:00.000Z',
    Email: 'ofahmy1234@gmail.com',
    PhoneNumber: '+201060860770',
    Bio: 'A software engineer',
    Headline: 'Backend Developer',
    UserTags: ['software', 'backend', 'web-development'],
};

export const singleGroup = {
    ID: 7,
    GroupTitle: 'Dummy Title Updated',
    GroupDescription: 'Dummy Description',
    GroupCoverImage: 'www.google.com',
    UpdatedAt: '2024-03-05T16:14:17.355Z',
    GroupTags: ['software', 'backend', 'web-development'],
};

export const singleArticle = {
    ID: 1,
    Title: 'My article title updated',
    UpdatedAt: '2024-02-21T20:33:01.069Z',
    CoverImage: 'www.google.com/url/to/image.jpg',
    ArticleTags: ['tag2', 'tag3', 'tag4'],
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
    Author: {
        ID: 1,
        FullName: 'John',
        Username: 'John3142',
        ProfileImage: 'www.google.com',
    },
};

export const usersArray = [singleUser, singleUser, singleUser];
export const groupsArray = [singleGroup, singleGroup, singleGroup];
export const articlesArray = [singleArticle, singleArticle, singleArticle];

export const generalSearchExample = {
    users: usersArray,
    groups: groupsArray,
    articles: articlesArray,
};

export const autoCompleteExample = [
    'software',
    'backend',
    'web-development',
    'frontend',
];
