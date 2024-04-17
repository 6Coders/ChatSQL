import { mount } from '@vue/test-utils';
import RedirectButton from '@/components/RedirectButton.vue';

describe('RedirectButton', () => {
    /*
    it('redirects to the correct destination when clicked', async () => {
        const assignMock = jest.fn();
        delete window.location;
        window.location = { assign: assignMock };
      
        const wrapper = mount(RedirectButton, {
          props: {
            destination: '/manager'
          }
        });
      
        await wrapper.find('button').trigger('click');
      
        expect(assignMock).toHaveBeenCalledWith('http://localhost/manager');
      });
      */
  it('renders the button with the correct class request', () => {
    const wrapper = mount(RedirectButton, {
      props: {
        destination: '/request',
        buttonClass: 'test-button-class'
      }
    });

    expect(wrapper.find('button').classes()).toContain('test-button-class');
  });
  it('renders the button with the correct class manager', () => {
    const wrapper = mount(RedirectButton, {
      props: {
        destination: '/manager',
        buttonClass: 'test-button-class'
      }
    });

    expect(wrapper.find('button').classes()).toContain('test-button-class');
  });
  it('renders the button with the correct class ', () => {
    const wrapper = mount(RedirectButton, {
      props: {
        destination: '/',
        buttonClass: 'test-button-class'
      }
    });

    expect(wrapper.find('button').classes()).toContain('test-button-class');
  });


  it('logs a warning to console when an invalid destination is provided', () => {
    const consoleError = console.error;
    console.error = jest.fn();

    mount(RedirectButton, {
      props: {
        destination: '/invalid'
      }
    });

    expect(console.error).toHaveBeenCalledWith('Invalid destination provided: /invalid');

    console.error = consoleError;
  });
});
