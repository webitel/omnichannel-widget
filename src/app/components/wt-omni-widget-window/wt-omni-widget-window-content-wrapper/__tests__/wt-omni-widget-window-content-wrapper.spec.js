import { shallowMount } from '@vue/test-utils';
import WtOmniWidgetWindowContentWrapper from '../wt-omni-widget-window-content-wrapper.vue';

describe('WtOmniWidgetWindowContentWrapper', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtOmniWidgetWindowContentWrapper);
    expect(wrapper.exists()).toBe(true);
  });
});
