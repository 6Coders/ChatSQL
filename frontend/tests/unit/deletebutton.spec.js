import { mount } from '@vue/test-utils';
import DeleteButton from '@/components/DeleteButton.vue';

describe('DeleteButton', () => {
  it('emits a "delete-click" event when clicked', async () => {
    const filename = 'TestFile';
    const DeleteButtonClass = 'custom-class';
    const wrapper = mount(DeleteButton, {
      props: {
        filename,
        DeleteButtonClass
      }
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('delete-click')).toBeTruthy();
    expect(wrapper.emitted('delete-click')[0]).toEqual([filename]);
  });

  it('renders the button with the provided class', () => {
    const DeleteButtonClass = 'custom-class';
    const wrapper = mount(DeleteButton, {
      props: {
        DeleteButtonClass
      }
    });
    expect(wrapper.find('button').classes()).toContain(DeleteButtonClass);
  });
});
