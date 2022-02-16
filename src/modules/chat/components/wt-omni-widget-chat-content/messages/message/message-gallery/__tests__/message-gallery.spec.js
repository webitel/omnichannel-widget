import { shallowMount } from '@vue/test-utils';
import MessageGallery from '../message-gallery.vue';

describe('MessageGallery', () => {
  const file = {};

  it('renders a component', () => {
    const wrapper = shallowMount(MessageGallery, {
      propsData: { file },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
