import { shallowMount } from '@vue/test-utils';
import WtOmniWidgetWindowHeader from '../wt-omni-widget-window-header.vue';

describe('WtOmniWidgetWindowHeader', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtOmniWidgetWindowHeader, {
      computed: {
        config() {
          return {
            view: {},
          };
        },
        callSessionState() {
          return null;
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
