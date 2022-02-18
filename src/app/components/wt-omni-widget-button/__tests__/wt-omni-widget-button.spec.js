import { shallowMount } from '@vue/test-utils';
import WtOmniWidgetButton from '../wt-omni-widget-button.vue';

const stubs = {
  WtIcon: true,
};

describe('WtOmniWidgetButton', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtOmniWidgetButton, {
      propsData: {
        type: 'chat',
      },
      stubs,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a component based on button element, if no url were passed', () => {
    const wrapper = shallowMount(WtOmniWidgetButton, {
      propsData: {
        type: 'chat',
      },
      stubs,
    });
    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.find('a').exists()).toBe(false);
  });

  it('renders a component based on anchor(<a>) element, if no url were passed', () => {
    const wrapper = shallowMount(WtOmniWidgetButton, {
      propsData: {
        type: 'chat',
      },
      stubs,
    });
    expect(wrapper.find('a').exists()).toBe(false);
    expect(wrapper.find('button').exists()).toBe(true);
  });
});
