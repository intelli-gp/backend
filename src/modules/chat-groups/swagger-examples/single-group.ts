export const singleGroupExample = {
  ID: 1,
  GroupTitle: 'Example Group',
  GroupDescription: 'This is an example group description.',
  GroupCoverImageUrl: 'https://example.com/group-cover.jpg',
  CreatedAt: '2024-03-09T08:00:00.000Z',
  UpdatedAt: '2024-03-09T08:30:00.000Z',
  GroupTags: ['Tag1', 'Tag2', 'Tag3'],
  GroupMembers: [
    {
      ID: 1,
      username: 'user1',
      profileImg: 'https://example.com/user1-profile.jpg',
      joiningStatus: true,
      type: 'admin',
    },
    {
      ID: 2,
      username: 'user2',
      profileImg: 'https://example.com/user2-profile.jpg',
      joiningStatus: true,
      type: 'member',
    },
  ],
  GroupOwner: {
    ID: 3,
    username: 'owner',
    email: 'owner@example.com',
    profileImage: 'https://example.com/owner-profile.jpg',
  },
};
