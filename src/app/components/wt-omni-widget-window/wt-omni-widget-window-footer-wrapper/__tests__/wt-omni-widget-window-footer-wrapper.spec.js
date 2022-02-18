import { shallowMount } from '@vue/test-utils';
import WtOmniWidgetWindowFooterWrapper from '../wt-omni-widget-window-footer-wrapper.vue';

describe('WtOmniWidgetWindowFooterWrapper', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtOmniWidgetWindowFooterWrapper);
    expect(wrapper.exists()).toBe(true);
  });
});
