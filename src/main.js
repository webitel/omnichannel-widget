import WtOmniWidget from './install';
import ChatChannel from './app/enum/ChatChannel.enum';

export default new WtOmniWidget('#wt-omni-widget', {
  wsUrl: 'wss://dev.webitel.com/chat/fcbsxhfdjsarjrwuocozmdxdlozjmro',
  borderRadiusStyle: 'rounded', // ['square', 'rounded'],
  alternativeChannels: {
    [ChatChannel.FACEBOOK]: {},
    [ChatChannel.TELEGRAM]: {},
  },
});
