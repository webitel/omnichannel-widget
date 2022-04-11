import { shallowMount } from '@vue/test-utils';
import WtOmniWidgetButtonsMenu from '../wt-omni-widget-buttons-menu.vue';
import ChatChannel from '../../../enum/ChatChannel.enum';

describe('WtOmniWidgetButtonsMenu', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtOmniWidgetButtonsMenu, {
      computed: {
        config() {
          return {};
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('correctly computes menu, processing urls: no "https" case', () => {
    const alternativeChannels = {
      [ChatChannel.VIBER]: 'viber.co',
    };
    const wrapper = shallowMount(WtOmniWidgetButtonsMenu, {
      computed: {
        config() {
          return { alternativeChannels };
        },
      },
    });
    expect(wrapper.vm.buttons).toEqual([{type: ChatChannel.VIBER, url: 'https://viber.co' }]);
  });

  it('correctly computes menu, processing urls: no "http" case', () => {
    const alternativeChannels = {
      [ChatChannel.VIBER]: 'http://viber.co',
    };
    const wrapper = shallowMount(WtOmniWidgetButtonsMenu, {
      computed: {
        config() {
          return { alternativeChannels };
        },
      },
    });
    expect(wrapper.vm.buttons).toEqual([{type: ChatChannel.VIBER, url: 'http://viber.co' }]);
  });

  it('correctly computes menu, processing urls: "https" case', () => {
    const alternativeChannels = {
      [ChatChannel.VIBER]: 'https://viber.co',
    };
    const wrapper = shallowMount(WtOmniWidgetButtonsMenu, {
      computed: {
        config() {
          return { alternativeChannels };
        },
      },
    });
    expect(wrapper.vm.buttons).toEqual([{type: ChatChannel.VIBER, url: 'https://viber.co' }]);
  });

  it('correctly computes menu, processing urls: no "mailto:" email case', () => {
    const alternativeChannels = {
      [ChatChannel.EMAIL]: 'email@example.com',
    };
    const wrapper = shallowMount(WtOmniWidgetButtonsMenu, {
      computed: {
        config() {
          return { alternativeChannels };
        },
      },
    });
    expect(wrapper.vm.buttons).toEqual([{ type: ChatChannel.EMAIL, url: 'mailto:email@example.com' }]);
  });

  it('correctly computes menu, processing urls: "mailto:" email case', () => {
    const alternativeChannels = {
      email: 'mailto:email@example.com',
    };
    const wrapper = shallowMount(WtOmniWidgetButtonsMenu, {
      computed: {
        config() {
          return { alternativeChannels };
        },
      },
    });
    expect(wrapper.vm.buttons).toEqual([{ type: 'email', url: 'mailto:email@example.com' }]);
  });

  it('at omni-widget-button with "type" chat prop click, emits "open" event', () => {
    const wrapper = shallowMount(WtOmniWidgetButtonsMenu, {
      computed: {
        config() {
          return {};
        },
      },
    });
    wrapper.findAllComponents({ name: 'wt-omni-widget-button' })
      .wrappers.find((wrapper) => wrapper.vm.$props.type === ChatChannel.CHAT)
      .vm.$emit('click');
    expect(wrapper.emitted().open).toBeTruthy();
  });
});