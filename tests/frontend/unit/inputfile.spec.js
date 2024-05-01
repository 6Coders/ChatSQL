import { shallowMount } from '@vue/test-utils';
import InputFile from '@/components/InputFile.vue';

// Funzione per creare un oggetto FileList simulato
function createFileList(files) {
  return {
    length: files.length,
    item(index) {
      return files[index];
    },
  };
}

describe('InputFile', () => {
  it('does not emit "file-selected" event when an invalid file is uploaded', () => {
    const wrapper = shallowMount(InputFile);
    const file = new File(['file content'], 'test.txt', { type: 'text/plain' });
    const fileList = createFileList([file]);

    wrapper.vm.isExtensionAllowed = jest.fn().mockReturnValue(false);
    wrapper.vm.isSizeValid = jest.fn().mockReturnValue(true);

    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, 'files', {
      value: fileList,
      writable: false,
    });
    input.trigger('change');

    expect(wrapper.emitted('file-selected')).toBeFalsy();
  });
 /* it('emits "file-selected" event when a valid file is uploaded', () => {
    const wrapper = shallowMount(InputFile);
    const file = new File(['file content'], 'test.json', { type: 'application/json' });
    const fileList = createFileList([file]);

    wrapper.vm.isExtensionAllowed = jest.fn().mockReturnValue(true);
    wrapper.vm.isSizeValid = jest.fn().mockReturnValue(true);

    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, 'files', {
      value: fileList,
      writable: false,
    });
    input.trigger('change');

    expect(wrapper.emitted('file-selected')).toBeTruthy();
  });
  */
});
