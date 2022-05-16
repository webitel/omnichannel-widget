import { shallowMount } from '@vue/test-utils';
import WtOmniWidgetFileUploadPreviewPopupFile from '../wt-omni-widget-file-upload-preview-popup-file.vue';

describe('WtOmniWidgetFileUploadPreviewPopupFile', () => {
  it('renders a component', () => {
    const file = new File([1, 2, 3], 'name');
    const wrapper = shallowMount(WtOmniWidgetFileUploadPreviewPopupFile, { propsData: { file } });
    expect(wrapper.isVisible()).toBe(true);
  });
});
