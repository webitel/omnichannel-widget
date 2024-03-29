import { shallowMount } from '@vue/test-utils';
import WidgetChannel from '../../../enums/WidgetChannel.enum';
import WtOmniWidgetWindow from '../wt-omni-widget-window.vue';

describe('WtOmniWidgetWindow', () => {

  it('renders a component', () => {
    const wrapper = shallowMount(WtOmniWidgetWindow, {
      propsData: {
        channel: WidgetChannel.CHAT,
      },
      computed: {
        config() {
          return {
            view: {},
            chat: {},
          };
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a component in preview mode', () => {
    const wrapper = shallowMount(WtOmniWidgetWindow, {
      propsData: {
        channel: WidgetChannel.CHAT,
      },
      computed: {
        config() {
          return {
            view: {},
            chat: {},
          };
        },
        isPreviewMode() {
          return true;
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
