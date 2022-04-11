import { shallowMount } from '@vue/test-utils';
import MessageMenu from '../message-menu.vue';
import MenuButton from '../menu-button.vue';
import MenuButtonType from '../../../../../../enums/MenuButtonType.enum';

describe('MessageMenu', () => {
  const buttons = [];

  it('renders a component', () => {
    const wrapper = shallowMount(MessageMenu, {
      propsData: { buttons },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('do not show MessageMenu is buttons prop is passed, but there is no supported buttons', () => {
    const buttons = [{ button: [{ type: 'jest' }] }];

    const wrapper = shallowMount(MessageMenu, {
      propsData: { buttons },
    });
    expect(wrapper.isVisible()).toBe(false);
  });

  it('correctly filters supported button types', () => {
    const buttons = [{
      button: Object.values(MenuButtonType).map((type) => ({ type })),
    }];

    const supportedButtons = [MenuButtonType.REPLY, MenuButtonType.POSTBACK, MenuButtonType.URL]
      .map((type) => ({ type }));
    const wrapper = shallowMount(MessageMenu, {
      propsData: { buttons },
    });
    expect(wrapper.vm.menu).toEqual(supportedButtons);
  });

  it('"REPLY" button type is handled as "sendMenu"', () => {
    const sendMenu = jest.fn();
    jest.spyOn(MessageMenu.methods, 'sendMenu')
        .mockImplementationOnce(sendMenu);

    const button = { type: MenuButtonType.REPLY };
    const buttons = [{ button: [button] }];

    const wrapper = shallowMount(MessageMenu, {
      propsData: { buttons },
    });
    wrapper.findComponent(MenuButton).vm.$emit('click');
    expect(sendMenu).toHaveBeenCalledWith(button);
  });

  it('"POSTBACK" button type is handled as "sendMenu"', () => {
    const sendMenu = jest.fn();
    jest.spyOn(MessageMenu.methods, 'sendMenu')
        .mockImplementationOnce(sendMenu);

    const button = { type: MenuButtonType.POSTBACK };
    const buttons = [{ button: [button] }];

    const wrapper = shallowMount(MessageMenu, {
      propsData: { buttons },
    });
    wrapper.findComponent(MenuButton).vm.$emit('click');
    expect(sendMenu).toHaveBeenCalledWith(button);
  });

  it('"URL" button type is handled as "openLink"', () => {
    const openLink = jest.fn();
    jest.spyOn(MessageMenu.methods, 'openLink')
        .mockImplementationOnce(openLink);

    const button = { type: MenuButtonType.URL };
    const buttons = [{ button: [button] }];

    const wrapper = shallowMount(MessageMenu, {
      propsData: { buttons },
    });
    wrapper.findComponent(MenuButton).vm.$emit('click');
    expect(openLink).toHaveBeenCalledWith(button);
  });
});
