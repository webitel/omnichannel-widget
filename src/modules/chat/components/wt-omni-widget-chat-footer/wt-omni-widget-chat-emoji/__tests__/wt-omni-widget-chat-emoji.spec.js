import { shallowMount } from '@vue/test-utils';
import WtOmniWidgetChatEmoji from '../wt-omni-widget-chat-emoji.vue';
import '../../../../../../../tests/unit/mock/indexedDBMock';

describe('WtOmniWidgetChatEmoji', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtOmniWidgetChatEmoji);
    expect(wrapper.isVisible()).toBe(true);
  });
});
