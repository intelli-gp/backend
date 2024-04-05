import { SerializedMessagesNotifications } from '../serilaized-types/message-notification.serialized';

const singleUserNotificationsExample = {
  Group: {
    ID: 11,
    GroupTitle: '404',
    GroupDescription: 'Nothing',
    GroupCoverImage:
      'http://res.cloudinary.com/demxyvw8w/image/upload/v1710760762/MUJEDD/dia3jfrvpbzovobsavb5.jpg',
    CreatedAt: '2024-03-18T11:19:23.236Z',
    UpdatedAt: '2024-03-18T11:19:23.236Z',
    GroupTags: ['tag1', 'tag2'],
  },
  LastMessage: {
    MessageID: 91,
    Content: 'unread message test',
    User: {
      ID: 8,
      FullName: 'Ahmed Fahmy',
      Username: 'ahmed132',
      DOB: '2001-02-01T00:00:00.000Z',
      Email: 'ahmedfahmy123@gmail.com',
      PhoneNumber: '+201060860770',
      Connected: true,
    },
    IsDeleted: false,
    CreatedAt: '2024-04-04T23:43:16.978Z',
  },
  UnreadMessagesCount: 1,
};

export const multipleUserNotificationsResponseExample = [
  singleUserNotificationsExample,
  singleUserNotificationsExample,
];
