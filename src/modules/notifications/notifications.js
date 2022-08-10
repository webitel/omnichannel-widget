import NotificationsStoreModule from '@webitel/ui-sdk/src/modules/Notifications/store/NotificationsStoreModule';
import { ChatActions } from 'webitel-sdk';

const actions = {
  HANDLE_CHAT_MESSAGE: (context) => {
    context.dispatch('PLAY_SOUND', { action: ChatActions.Message });
    context.dispatch('INCREMENT_UNREAD_COUNT');
  },
};

const notifications = new NotificationsStoreModule()
  .getModule({ actions });

export default notifications;
