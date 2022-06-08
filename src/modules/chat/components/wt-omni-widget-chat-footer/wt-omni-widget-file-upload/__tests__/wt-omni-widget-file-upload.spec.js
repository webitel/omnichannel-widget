import { shallowMount } from '@vue/test-utils';
import WtOmniWidgetFileUpload from '../wt-omni-widget-file-upload.vue';

describe('WtOmniWidgetFileUpload', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(WtOmniWidgetFileUpload);
    expect(wrapper.isVisible()).toBe(true);
  });
});
