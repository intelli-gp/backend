import { SerializedMessage } from 'src/modules/chat-groups/serialized-types/messages.serializer';
import { SerializedTask } from 'src/modules/study-planner/serialized-types/serialized-task';

type chatNotification = {
  eventName: 'chat-group-message';
  message: SerializedMessage;
};

type studyPlanNotification = {
  eventName: 'study-plan-notification';
  message: SerializedTask;
};

type warningNotification = {
  eventName: 'warning';
  message: any;
};

export type SseEvents =
  | chatNotification
  | studyPlanNotification
  | warningNotification;
