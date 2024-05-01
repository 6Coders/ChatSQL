import { mount } from '@vue/test-utils';
import ViewDictionary from '@/components/ViewDictionary.vue';

describe('ViewDictionary', () => {
    it('emits a "load-button-clicked" event when LoadButton is clicked', async () => {
        const wrapper = mount(ViewDictionary);
        await wrapper.vm.addNewEntry('Nuova voce', '2');
        expect(wrapper.emitted('load-button-clicked')).toBeFalsy();
        await wrapper.findComponent({ name: 'LoadButton' }).trigger('load-click');
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted('load-button-clicked')).toBeTruthy();
      });
    
      it('emits a "delete-button-clicked" event when DeleteButton is clicked', async () => {
        const wrapper = mount(ViewDictionary);
        await wrapper.vm.addNewEntry('Nuova voce', '2');
        expect(wrapper.emitted('delete-button-clicked')).toBeFalsy();
        await wrapper.findComponent({ name: 'DeleteButton' }).trigger('delete-click');
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted('delete-button-clicked')).toBeTruthy();
      });
      it('adds a new entry to the table when newEntry is called', async () => {
        const wrapper = mount(ViewDictionary);
        const initialRowCount = wrapper.findAll('tbody tr').length;
        await wrapper.vm.addNewEntry('New Entry', '1');
        const updatedRowCount = wrapper.findAll('tbody tr').length;
        expect(updatedRowCount).toBeGreaterThan(initialRowCount);
      });
});
