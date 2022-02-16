import { shallowMount } from '@vue/test-utils';
import EventMessage from '../event-message.vue';
import MessageType from '../../../../../enums/MessageType.enum';

describe('EventMessage', () => {
  it('renders a component', () => {
    const message = {};
    const wrapper = shallowMount(EventMessage, {
      propsData: { message },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders "joined" text if MessageType is "JOINED"', () => {
    const message = { type: MessageType.JOINED };
    const wrapper = shallowMount(EventMessage, {
      propsData: { message },
    });
    expect(wrapper.text()).toBe('chat.events.joined');
  });

  it('renders "left" text if MessageType is "LEFT"', () => {
    const message = { type: MessageType.LEFT };
    const wrapper = shallowMount(EventMessage, {
      propsData: { message },
    });
    expect(wrapper.text()).toBe('chat.events.left');
  });

  it('renders "closed" text if MessageType is "CLOSED"', () => {
    const message = { type: MessageType.CLOSED };
    const wrapper = shallowMount(EventMessage, {
      propsData: { message },
    });
    expect(wrapper.text()).toBe('chat.events.closed');
  });
});
