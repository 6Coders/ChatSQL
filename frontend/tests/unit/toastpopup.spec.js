import { mount } from '@vue/test-utils';
import ToastPopup from '@/components/ToastPopup.vue';

describe('ToastPopup', () => {

  it('renders toast with message', async () => {
    const wrapper = mount(ToastPopup);
    await wrapper.vm.setTest('Test Message');
    await wrapper.vm.showToast();
    expect(wrapper.find('.toast').isVisible()).toBe(true);
  });

  it('sets message correctly when setTest is called', async () => {
    const wrapper = mount(ToastPopup);
    const testMessage = 'Test Message';
    await wrapper.vm.setTest(testMessage);
    await wrapper.vm.showToast();
    expect(wrapper.find('.toast-body').text()).toContain(testMessage);
  });
});