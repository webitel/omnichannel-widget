import { shallowMount } from '@vue/test-utils';
import WtOmniWidgetWindowFooter from '../wt-omni-widget-window-footer.vue';
import ChatInput from '../chat-input.vue';

const namespace = 'chats';

describe('Chats: WtOmniWidgetWindowFooter', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtOmniWidgetWindowFooter, {
      propsData: {
        namespace,
      },
      computed: {
        isConnectionClosed() { return false; },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('if connection is opened, draw textarea instead of "openConnection" wt-button', () => {
    const isConnectionClosed = false;

    const wrapper = shallowMount(WtOmniWidgetWindowFooter, {
      propsData: { namespace },
      computed: {
        isConnectionClosed() { return isConnectionClosed; },
      },
    });
    expect(wrapper.findComponent(ChatInput).isVisible()).toBe(true);
    expect(wrapper.findComponent({ name: 'wt-button' }).exists()).toBe(false);
  });

  it('if closed is opened, draw "openConnection" wt-button instead of textarea', () => {
    const isConnectionClosed = true;

    const wrapper = shallowMount(WtOmniWidgetWindowFooter, {
      propsData: { namespace },
      computed: {
        isConnectionClosed() { return isConnectionClosed; },
      },
    });
    expect(wrapper.findComponent(ChatInput).exists()).toBe(false);
    expect(wrapper.findComponent({ name: 'wt-button' }).exists()).toBe(true);
  });
});
