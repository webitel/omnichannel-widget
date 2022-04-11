import { shallowMount } from '@vue/test-utils';
import MenuButton from '../menu-button.vue';

describe('MenuButton', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(MenuButton, {
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders passed content via default slot', () => {
    const defaultSlot = 'jest';
    const wrapper = shallowMount(MenuButton, {
      slots: { default: defaultSlot },
    });
    expect(wrapper.text()).toBe(defaultSlot);
  });
});
