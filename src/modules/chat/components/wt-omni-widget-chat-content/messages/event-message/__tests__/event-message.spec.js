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

  it('renders "joined" text if MessageType is "ERROR"', () => {
    const message = { type: MessageType.ERROR, error: { text: 'error' } };
    const wrapper = shallowMount(EventMessage, {
      propsData: { message },
    });
    expect(wrapper.text()).toBe('chat.events.error');
  });
});
