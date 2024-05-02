import { mount } from '@vue/test-utils';
import RedirectButton from '@/components/RedirectButton.vue';
import { useRouter } from 'vue-router';

jest.mock('vue-router', () => ({
  useRouter: jest.fn()
}));

describe('RedirectButton', () => {
  it('navigates to the specified destination when clicked', async () => {
    const mockPush = jest.fn();
    useRouter.mockReturnValue({
      push: mockPush
    });

    const destination = '/example';
    const buttonClass = 'btn-primary';
    const wrapper = mount(RedirectButton, {
      props: {
        destination,
        buttonClass
      },
      slots: {
        default: 'Click me'
      }
    });
    await wrapper.find('button').trigger('click');
    expect(useRouter).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith({ path: destination });
    expect(wrapper.find('button').classes()).toContain(buttonClass);
  });
});