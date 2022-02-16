import { shallowMount } from '@vue/test-utils';
import ChatInput from '../chat-input.vue';

const namespace = 'chats';

describe('ChatInput', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(ChatInput, {
      propsData: {
        namespace,
      },
      computed: {
        draft() { return ''; },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('calls sendDraft method at textarea "enter"', () => {
    const sendDraft = jest.fn();

    jest.spyOn(ChatInput.methods, 'sendDraft')
      .mockImplementationOnce(sendDraft);

    const wrapper = shallowMount(ChatInput, {
      propsData: {
        namespace,
      },
      computed: {
        draft() { return ''; },
      },
    });
    wrapper.find('textarea').trigger('keypress.enter');
    expect(sendDraft).toHaveBeenCalled();
  });
});
