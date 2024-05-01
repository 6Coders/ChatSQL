import { mount } from '@vue/test-utils';
import DeleteButton from '@/components/DeleteButton.vue';

describe('DeleteButton', () => {
  it('emits a "delete-click" event when clicked', async () => {
    const id = '123';
    const DeleteButtonClass = 'custom-class';
    const wrapper = mount(DeleteButton, {
      props: {
        id,
        DeleteButtonClass
      }
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('delete-click')).toBeTruthy();
    expect(wrapper.emitted('delete-click')[0]).toEqual([id]);
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
