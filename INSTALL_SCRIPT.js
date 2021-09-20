`
const script = document.createElement('script');
script.src = 'https://cloud.webitel.ua/omni-widget/WtOmniWidget.umd.js';
script.onload = function () {
  const body = document.querySelector('body');
  const widgetEl = document.createElement('div');
  widgetEl.setAttribute('id', 'wt-omnichannel-widget');
  body.appendChild(widgetEl);

  const config = {
    wsUrl: "wss://cloud.webitel.ua/chat",
  };

  const app = new WtOmniWidget('#wt-omnichannel-widget', config);
};
document.head.appendChild(script);

const link = document.createElement('link');
link.href = 'https://cloud.webitel.ua/omni-widget/WtOmniWidget.css';
link.type = 'text/css';
link.rel = 'stylesheet';
link.media = 'screen,print';
document.head.appendChild(link);
`;
