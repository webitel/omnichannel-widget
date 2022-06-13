import WtOmniWidget from './install';
import ChatChannel from './app/enum/ChatChannel.enum';

export default new WtOmniWidget('#wt-omni-widget', {
  // wsUrl: 'wss://dev.webitel.com/chat/ws8/fcbsxhfdjsarjrwuocozmdxdlozjmro',
  wsUrl: 'wss://dev.webitel.com/chat/dania-webchat',
  borderRadiusStyle: 'rounded', // ['square', 'rounded'],
  alternativeChannels: {
    [ChatChannel.FACEBOOK]: {},
    [ChatChannel.TELEGRAM]: {},
  },
});
