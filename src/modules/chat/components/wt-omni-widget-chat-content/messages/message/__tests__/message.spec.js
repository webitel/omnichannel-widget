import { shallowMount } from '@vue/test-utils';

import MessageAttachment from '../message-attachment/message-attachment.vue';
import MessageGallery from '../message-gallery/message-gallery.vue';
import MessageMenu from '../message-menu/message-menu.vue';
import MessageStatus from '../message-status/message-status.vue';
import MessageText from '../message-text/message-text.vue';
import Message from '../message.vue';

const namespace = 'chats';

let showButtons = false;
const mocks = {
  $store: {
    getters: {
      [`${namespace}/IS_MY_MESSAGE`]: jest.fn(),
      [`${namespace}/SHOW_BUTTONS`]: jest.fn(() => showButtons),
    },
  },
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
    showButtons = true;
    const message = { buttons: [] };
    const wrapper = shallowMount(Message, {
      propsData: {
        message,
        namespace,
      },
      mocks,
    });
    expect(wrapper.findComponent(MessageMenu).isVisible()).toBe(true);
    showButtons = false;
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
