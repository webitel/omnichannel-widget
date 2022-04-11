import { shallowMount } from '@vue/test-utils';
import MessageText from '../message-text.vue';

describe('Message Text', () => {
  const text = 'jest';

  it('renders a component', () => {
    const wrapper = shallowMount(MessageText, {
      propsData: { text },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders text as plain text', () => {
    const wrapper = shallowMount(MessageText, {
      propsData: { text },
    });
    expect(wrapper.find('.wt-omni-widget-chat-message-text').text()).toBe(text);
  });

  it('renders link as anchor tag', () => {
    const link = 'https://dev.webitel.com';
    const wrapper = shallowMount(MessageText, {
      propsData: { text: link },
    });
    expect(wrapper.find('.wt-omni-widget-chat-message-text').find('a').exists()).toBe(true);
  });
});
