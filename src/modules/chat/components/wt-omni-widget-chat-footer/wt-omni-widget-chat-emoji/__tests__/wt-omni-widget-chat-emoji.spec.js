import { shallowMount } from '@vue/test-utils';
import WtOmniWidgetChatEmoji from '../wt-omni-widget-chat-emoji.vue';

describe('WtOmniWidgetChatEmoji', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtOmniWidgetChatEmoji);
    expect(wrapper.isVisible()).toBe(true);
  });
});
