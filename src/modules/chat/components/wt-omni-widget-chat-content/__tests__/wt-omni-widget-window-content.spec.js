import { shallowMount } from '@vue/test-utils';
import WtOmniWidgetWindowContent from '../wt-omni-widget-window-content.vue';
// import Message from '../message.vue';

const namespace = 'chats';
const messages = [];

const computed = {
  messages() {
    return messages;
  },
};

describe('Chats: WtOmniWidgetWindowContent', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtOmniWidgetWindowContent, {
      propsData: {
        namespace,
      },
      computed,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('calls scrollToBottom at "activated" lifecycle hook', () => {
    const scrollToBottom = jest.fn();

    jest.spyOn(WtOmniWidgetWindowContent.methods, 'scrollToBottom')
      .mockImplementationOnce(scrollToBottom);

    const wrapper = shallowMount(WtOmniWidgetWindowContent, {
      propsData: {
        namespace,
      },
      computed,
    });

    // https://stackoverflow.com/a/64966099
    wrapper.vm.$options.activated[0].call(wrapper.vm);

    expect(scrollToBottom).toHaveBeenCalled();
  });
});
