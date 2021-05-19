import { BulletinsAction } from './bulletin.actions';
import { NotificationsAction } from './notifications.actions';
import { VisitorsAction } from './visitors.actions';
import { MessagesAction } from './messages.actions';

export type Action = BulletinsAction | VisitorsAction | MessagesAction | NotificationsAction;
