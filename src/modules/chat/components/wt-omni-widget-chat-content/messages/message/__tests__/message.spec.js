import { shallowMount } from '@vue/test-utils';
import Message from '../message.vue';

import MessageAttachment from '../message-attachment/message-attachment.vue';
import MessageGallery from '../message-gallery/message-gallery.vue';
import MessageMenu from '../message-menu/message-menu.vue';
import MessageText from '../message-text/message-text.vue';
import MessageStatus from '../message-status/message-status.vue';

const namespace = 'chats';
const mocks = {
  $store: { getters: { [`${namespace}/IS_MY_MESSAGE`]: jest.fn() } },
};

describe('Message', () => {
  const message = {};

  it('renders a component', () => {
    const wrapper = shallowMount(Message, {
      propsData: {
        message,
        namespace,
      },
      mocks,
    });
    expect(wrapper.exists()).toBe(true);
  });
});

describe('Message: Component appearances', () => {
  it('draws MessageText component, if "text" is passed', () => {
    const message = { text: 'jest' };
    const wrapper = shallowMount(Message, {
      propsData: {
        message,
        namespace,
      },
      mocks,
    });
    expect(wrapper.findComponent(MessageText).isVisible()).toBe(true);
  });
  it('draws MessageAttachment component, if "file" is passed', () => {
    const message = { file: {} };
    const wrapper = shallowMount(Message, {
      propsData: {
        message,
        namespace,
      },
      mocks,
    });
    expect(wrapper.findComponent(MessageAttachment).isVisible()).toBe(true);
  });
  it('draws MessageMenu component, if "buttons" is passed', () => {
    const message = { buttons: [] };
    const wrapper = shallowMount(Message, {
      propsData: {
        message,
        namespace,
      },
      mocks,
    });
    expect(wrapper.findComponent(MessageMenu).isVisible()).toBe(true);
  });
  it('draws MessageGallery component, if "file" with "image" mime type is passed', () => {
    const message = { file: { mime: 'image' } };
    const wrapper = shallowMount(Message, {
      propsData: {
        message,
        namespace,
      },
      mocks,
    });
    expect(wrapper.findComponent(MessageGallery).isVisible()).toBe(true);
  });
  it('draws MessageStatus', () => {
    const message = { file: { mime: 'image' } };
    const wrapper = shallowMount(Message, {
      propsData: {
        message,
        namespace,
      },
      mocks,
    });
    expect(wrapper.findComponent(MessageStatus).isVisible()).toBe(true);
  });
});
