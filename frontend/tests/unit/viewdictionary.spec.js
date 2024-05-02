import { mount } from '@vue/test-utils';
import ViewDictionary from '@/components/ViewDictionary.vue';

describe('ViewDictionary', () => {
  it('adds a new entry to the dictionary', () => {
    const wrapper = mount(ViewDictionary);
    wrapper.vm.addNewEntry(1, 'example', 'txt', '2024-05-03', 1024, true);
    expect(wrapper.vm.dictionaryEntries.length).toBe(1);
  });

  it('does not add a new entry when one or more parameters are missing', () => {
    const wrapper = mount(ViewDictionary);
    wrapper.vm.addNewEntry(1, 'example', 'txt', '2024-05-03'); // Missing size and load
    expect(wrapper.vm.dictionaryEntries.length).toBe(0);
  });

  it('does not add a new entry when one or more parameters are undefined', () => {
    const wrapper = mount(ViewDictionary);
    wrapper.vm.addNewEntry(undefined, 'example', 'txt', '2024-05-03', 1024, true); // Missing id
    expect(wrapper.vm.dictionaryEntries.length).toBe(0);
  });

  it('does not add a new entry when one or more parameters are empty or falsy', () => {
    const wrapper = mount(ViewDictionary);
    wrapper.vm.addNewEntry(0, '', '', '', 0, false); // Empty or falsy parameters
    expect(wrapper.vm.dictionaryEntries.length).toBe(0);
  });

  it('does not add a new entry when one or more parameters are null', () => {
    const wrapper = mount(ViewDictionary);
    wrapper.vm.addNewEntry(null, 'example', 'txt', '2024-05-03', 1024, true); // Null id
    expect(wrapper.vm.dictionaryEntries.length).toBe(0);
  });

  it('calls loadButtonClick with the provided id', () => {
    const wrapper = mount(ViewDictionary);
    const id = 'example-id';
    wrapper.vm.addNewEntry(1, 'example', 'txt', '2024-05-03', 1024, true); // Aggiungi manualmente un'entry
    wrapper.vm.loadButtonClick(id);
    expect(wrapper.emitted('load-button-clicked')).toBeTruthy();
    expect(wrapper.emitted('load-button-clicked')[0][0]).toBe(id);
  });

  it('emits deleteButtonClick with the provided id', () => {
    const wrapper = mount(ViewDictionary);
    const id = 'example-id';
    wrapper.vm.addNewEntry(1, 'example', 'txt', '2024-05-03', 1024, true); // Aggiungi manualmente un'entry
    wrapper.vm.deleteButtonClick(id);
    expect(wrapper.emitted('delete-button-clicked')).toBeTruthy();
    expect(wrapper.emitted('delete-button-clicked')[0][0]).toBe(id);
  });

  it('updates the entry in the dictionary and emits update-entry event', () => {
    const wrapper = mount(ViewDictionary);
    wrapper.vm.updateEntry();
    expect(wrapper.vm.alertMessage.value).toBe('');
    expect(wrapper.vm.isRefreshing).toBe(true);
    expect(wrapper.emitted('update-entry')).toBeTruthy();
  });

  it('resets the dictionary entries', () => {
    const wrapper = mount(ViewDictionary);
    wrapper.vm.addNewEntry(1, 'example', 'txt', '2024-05-03', 1024, true);
    wrapper.vm.resetEntry();
    expect(wrapper.vm.dictionaryEntries.length).toBe(0);
  });

  it('sets the alert message', () => {
    const wrapper = mount(ViewDictionary);
    const message = 'This is an alert message';
    wrapper.vm.setAlertMessage(message);
    expect(wrapper.vm.alertMessage.value).toBe(message);
  });

  it('stops the refreshing process', () => {
    const wrapper = mount(ViewDictionary);
    wrapper.vm.isRefreshingStop();
    expect(wrapper.vm.isRefreshing).toBe(false);
  });

  it('correctly assigns loadButtonClass and deleteButtonClass props', () => {
    const loadButtonClass = 'load-btn';
    const deleteButtonClass = 'delete-btn';
    const wrapper = mount(ViewDictionary, {
      props: {
        loadButtonClass: loadButtonClass,
        deleteButtonClass: deleteButtonClass
      }
    });

    // Verifica l'assegnazione dei props loadButtonClass e deleteButtonClass
    expect(wrapper.vm.loadButtonClass).toBe(loadButtonClass);
    expect(wrapper.vm.deleteButtonClass).toBe(deleteButtonClass);
  });
});
