import { shallowMount } from '@vue/test-utils';
import ChatFooterActions from '../chat-footer-actions.vue';

const namespace = 'chats';

describe('ChatFooterActions', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(ChatFooterActions, {
      propsData: { namespace },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
