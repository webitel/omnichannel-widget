import { shallowMount } from '@vue/test-utils';
import WtIcon from '../wt-icon.vue';

describe('WtIcon', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtIcon, {
      propsData: {
        icon: 'icon-name',
      },
    });
    expect(wrapper.classes('wt-icon')).toBe(true);
  });
  it('correctly computes icon name', () => {
    const iconName = '#bucket';
    const wrapper = shallowMount(WtIcon, {
      propsData: {
        icon: 'bucket',
        size: 'sm',
      },
    });
    expect(wrapper.vm.iconName).toBe(iconName);
  });
});
