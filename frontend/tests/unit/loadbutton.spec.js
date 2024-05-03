import { mount } from '@vue/test-utils';
import LoadButton from '@/components/LoadButton.vue';

describe('LoadButton', () => {
  it('emits a "load-click" event when clicked', async () => {
    const filename = 'TestFile';
    const wrapper = mount(LoadButton, {
      props: { filename }
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('load-click')).toBeTruthy();
    expect(wrapper.emitted('load-click')[0]).toEqual([filename]);
  });

  it('renders the button with the provided class', () => {
    const LoadButtonClass = 'custom-class';
    const wrapper = mount(LoadButton, {
      props: {
        LoadButtonClass
      }
    });
    expect(wrapper.find('button').classes()).toContain(LoadButtonClass);
  });
});