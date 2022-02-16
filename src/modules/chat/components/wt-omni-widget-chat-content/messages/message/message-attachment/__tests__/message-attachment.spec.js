import { shallowMount } from '@vue/test-utils';
import MessageAttachment from '../message-attachment.vue';

describe('Message Attachment', () => {
  const stubs = { WtIcon: true };

  const file = {};

  it('renders a component', () => {
    const wrapper = shallowMount(MessageAttachment, {
      propsData: { file },
      stubs,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders text as plain text', () => {
    const wrapper = shallowMount(MessageAttachment, {
      propsData: { file },
      stubs,
    });
    const link = {
      click: jest.fn(),
    };
    jest.spyOn(document, 'createElement')
        .mockImplementationOnce(() => link);
    wrapper.vm.downloadDocument();
    expect(link.click).toHaveBeenCalled();
  });
});
