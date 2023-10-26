import { shallowMount } from '@vue/test-utils';
import WtOmniWidgetButtonsMenu from '../wt-omni-widget-buttons-menu.vue';
import AlternativeChannel from '../../../enums/AlternativeChannel.enum';
import WidgetChannel from '../../../enums/WidgetChannel.enum';

describe('WtOmniWidgetButtonsMenu', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtOmniWidgetButtonsMenu, {
      computed: {
        config() {
          return {
            chat: true,
          };
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('correctly computes menu, processing urls: no "https" case', () => {
    const alternativeChannels = {
      [AlternativeChannel.VIBER]: 'viber://co',
    };
    const wrapper = shallowMount(WtOmniWidgetButtonsMenu, {
      computed: {
        config() {
          return { alternativeChannels };
        },
      },
    });
    expect(wrapper.vm.buttons).toEqual([{ type: AlternativeChannel.VIBER, url: 'viber://co' }]);
  });

  it('correctly computes menu, processing urls: "https" case', () => {
    const alternativeChannels = {
      [AlternativeChannel.WHATSAPP]: 'https://whatsapp.co',
    };
    const wrapper = shallowMount(WtOmniWidgetButtonsMenu, {
      computed: {
        config() {
          return { alternativeChannels };
        },
      },
    });
    expect(wrapper.vm.buttons).toEqual([{type: AlternativeChannel.WHATSAPP, url: 'https://whatsapp.co' }]);
  });

  it('correctly computes menu, processing urls: no "mailto:" email case', () => {
    const alternativeChannels = {
      [AlternativeChannel.EMAIL]: 'email@example.com',
    };
    const wrapper = shallowMount(WtOmniWidgetButtonsMenu, {
      computed: {
        config() {
          return { alternativeChannels };
        },
      },
    });
    expect(wrapper.vm.buttons).toEqual([{ type: AlternativeChannel.EMAIL, url: 'mailto:email@example.com' }]);
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
          return {
            chat: true,
          };
        },
      },
    });
    wrapper.findAllComponents({ name: 'wt-omni-widget-button' })
      .wrappers.find((wrapper) => wrapper.vm.$props.type === WidgetChannel.CHAT)
      .vm.$emit('click');
    expect(wrapper.emitted().open).toBeTruthy();
  });
});
