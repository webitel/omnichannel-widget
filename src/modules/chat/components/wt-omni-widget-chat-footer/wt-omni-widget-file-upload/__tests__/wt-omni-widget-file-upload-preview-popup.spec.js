import { shallowMount } from '@vue/test-utils';
import WtOmniWidgetFileUploadPreviewPopup from '../wt-omni-widget-file-upload-preview-popup.vue';

describe('WtOmniWidgetFileUploadPreviewPopup', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtOmniWidgetFileUploadPreviewPopup);
    expect(wrapper.isVisible()).toBe(true);
  });
});
