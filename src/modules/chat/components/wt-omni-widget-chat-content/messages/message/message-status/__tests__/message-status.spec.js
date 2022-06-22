import { shallowMount } from '@vue/test-utils';
import MessageStatus from '../message-status.vue';

describe('MessageStatus', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(MessageStatus);
    expect(wrapper.isVisible()).toBe(true);
  });
});
