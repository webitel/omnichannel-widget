import WtOmniWidget from './install';
import ChatChannel from './app/enums/WidgetChannel.enum';

export default new WtOmniWidget('#wt-omni-widget', {
  view: {
    borderRadiusStyle: 'rounded', // ['square', 'rounded'],
  },
  chat: {
    url: 'wss://dev.webitel.com/chat/dania-webchat',
  },
  appointment: {
    url: 'https://dev.webitel.com/appointments/dania-webchat',
    showEmailField: true,
    showMessageField: true,
    successSubtitle: 'some',
  },
  alternativeChannels: {
    [ChatChannel.MESSENGER]: {},
    [ChatChannel.TELEGRAM]: {},
    [ChatChannel.VIBER]: 'viber://pa?chatURI=fregatcom',
  },
  call: {
    url: 'wss://dev.webitel.com/sip',
    id: 'dania-webchat',
  },
  reCAPTCHA: {
    sitekey: '',
  },
});
