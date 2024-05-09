import ArticleNotification from './article-notifications';
import { FollowNotification } from './follow-notifications';
import { chatNotification } from './messages-notifications';

type SseEvents = chatNotification | ArticleNotification | FollowNotification;
