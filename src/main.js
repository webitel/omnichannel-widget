import WtOmniWidget from './install';
import ChatChannel from './app/enum/ChatChannel.enum';

export default new WtOmniWidget('#wt-omni-widget', {
  view: {
    borderRadiusStyle: 'rounded', // ['square', 'rounded'],
  },
  chat: {
    url: 'wss://dev.webitel.com/chat/dania-webchat',
  },
  appointment: {
    url: 'https://dev.webitel.com/appointments/dania-webchat',
  },
  alternativeChannels: {
    [ChatChannel.FACEBOOK]: {},
    [ChatChannel.TELEGRAM]: {},
    [ChatChannel.VIBER]: 'viber://pa?chatURI=fregatcom',
  },
});
