import { mount } from '@vue/test-utils';
import UploadButton from '@/components/UploadButton.vue';

describe('UploadButton', () => {

  it('emits an "upload-click" event when clicked', async () => {
    const wrapper = mount(UploadButton);
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('upload-click')).toBeTruthy();
  });

  it('correctly assigns props', () => {
    const UploadButtonClass = 'custom-class';
    const disabled = true;
    const isuploading = false;

    const wrapper = mount(UploadButton, {
      props: {
        UploadButtonClass,
        disabled,
        isuploading
      }
    });
    expect(wrapper.props('UploadButtonClass')).toBe(UploadButtonClass);
    expect(wrapper.props('disabled')).toBe(disabled);
    expect(wrapper.props('isuploading')).toBe(isuploading);
  });

  it('renders upload button with spinner when uploading', async () => {
    const wrapper = mount(UploadButton, {
      props: {
        isuploading: true
      }
    });

    // Verifica che il pulsante sia renderizzato correttamente
    expect(wrapper.find('.bi-cloud-arrow-up-fill').exists()).toBe(false);
    expect(wrapper.find('.spinner-grow').exists()).toBe(true);
  });
});