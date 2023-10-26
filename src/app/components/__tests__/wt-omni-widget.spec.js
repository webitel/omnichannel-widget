import { shallowMount } from '@vue/test-utils';
import WtOmniWidget from '../wt-omni-widget.vue';

import WtOmniWidgetWindow from '../wt-omni-widget-window/wt-omni-widget-window.vue';
import WtOmniWidgetButtonsMenu from '../wt-omni-widget-button/wt-omni-widget-buttons-menu.vue';

const computed = {
  config() {
    return {
      view: {},
    };
  },
};

describe('WtOmniWidget Component', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtOmniWidget, {
      computed,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('Buttons menu is initially visible, Main Window - is not', () => {
    const wrapper = shallowMount(WtOmniWidget, {
      computed,
    });
    expect(wrapper.findComponent(WtOmniWidgetButtonsMenu).isVisible()).toBe(true);
    expect(wrapper.findComponent(WtOmniWidgetWindow).exists()).toBe(false);
  });

  it('Buttons menu is hiding at its "openWidget" event, Main Window - is visible', async () => {
    const wrapper = shallowMount(WtOmniWidget, {
      computed,
    });
    wrapper.findComponent(WtOmniWidgetButtonsMenu).vm.$emit('open', { channel: 'test' });
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(WtOmniWidgetButtonsMenu).exists()).toBe(false);
    expect(wrapper.findComponent(WtOmniWidgetWindow).isVisible()).toBe(true);
  });
});
