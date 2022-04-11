import { shallowMount } from '@vue/test-utils';
import WtOmniWidgetWindow from '../wt-omni-widget-window.vue';

describe('WtOmniWidgetWindow', () => {
  const initializeSession = jest.fn();
  const listenOnMessage = jest.fn();
  const onMessage = jest.fn();

  jest.spyOn(WtOmniWidgetWindow.methods, 'initializeSession')
    .mockImplementation(initializeSession);
  jest.spyOn(WtOmniWidgetWindow.methods, 'listenOnMessage')
    .mockImplementation(listenOnMessage);
  jest.spyOn(WtOmniWidgetWindow.methods, 'onMessage')
    .mockImplementation(onMessage);

  beforeEach(() => {
    initializeSession.mockClear();
    listenOnMessage.mockClear();
    onMessage.mockClear();
  });

  it('renders a component', () => {
    const wrapper = shallowMount(WtOmniWidgetWindow, {
      computed: {
        config() {
          return {};
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a component in preview mode', () => {
    const wrapper = shallowMount(WtOmniWidgetWindow, {
      computed: {
        config() {
          return {};
        },
        isPreviewMode() {
          return true;
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
