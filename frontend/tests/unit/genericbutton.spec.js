import { mount } from '@vue/test-utils';
import GenericButton from '@/components/GenericButton.vue';

describe('GenericButton', () => {
  it('emits a "clicked" event when clicked', async () => {
    const wrapper = mount(GenericButton, {
      props: {
        buttonClass: 'test-button-class'
      }
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted().clicked).toBeTruthy();
  });

  it('renders the button with the correct class', () => {
    const wrapper = mount(GenericButton, {
      props: {
        buttonClass: 'test-button-class'
      }
    });
    expect(wrapper.find('button').classes()).toContain('test-button-class');
  });
});
