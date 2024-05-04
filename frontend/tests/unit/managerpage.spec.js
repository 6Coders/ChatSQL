import { mount } from '@vue/test-utils';
import ManagerPage from '@/views/ManagerPage.vue';
import VMManager from '@/viewmodel/VMManager.js';

jest.mock('@/viewmodel/VMManager.js', () => ({
    handleFileSelected: jest.fn(),
    handleLoadDictionary: jest.fn(),
    handleDeleteDictionary: jest.fn(),
    handleDictionary: jest.fn(),
    setVueComponent: jest.fn(), // Simula la funzione setVueComponent
  }));

describe('ManagerPage', () => {
  it('handles file selected', () => {
    const wrapper = mount(ManagerPage);
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    wrapper.vm.handleFileSelected(file);
    expect(VMManager.handleFileSelected).toHaveBeenCalledWith(file);
  });

  it('handles load button clicked', () => {
    const wrapper = mount(ManagerPage);
    wrapper.vm.handleLoadButton(1);
    expect(VMManager.handleLoadDictionary).toHaveBeenCalledWith(1);
  });

  it('handles delete button clicked', () => {
    const wrapper = mount(ManagerPage);
    wrapper.vm.handleDeleteButtonClicked(1);
    expect(VMManager.handleDeleteDictionary).toHaveBeenCalledWith(1);
  });

  it('handles update entry', () => {
    const wrapper = mount(ManagerPage);
    wrapper.vm.handleUpdateEntry();
    expect(VMManager.handleDictionary).toHaveBeenCalled();
  });

  it('prints dictionary', () => {
    const wrapper = mount(ManagerPage);
    const addNewEntrySpy = jest.spyOn(wrapper.vm.$refs.Dictionary, 'addNewEntry');
    const response = [
      { name: 'Test', extension: 'txt', date: '2024-05-03', size: 1024, loaded: true }
    ];
    wrapper.vm.printDictionary(response);
    expect(addNewEntrySpy).toHaveBeenCalledWith('Test', 'txt', '2024-05-03', 1024, true);
    addNewEntrySpy.mockRestore();
  });

  it('sets is refreshing stop', () => {
    const wrapper = mount(ManagerPage);
    const dictionaryMock = jest.spyOn(wrapper.vm.$refs.Dictionary, 'isRefreshingStop');
    wrapper.vm.setIsRefreshingStop();
    expect(dictionaryMock).toHaveBeenCalled();
  });

  it('sets alert message', () => {
    const wrapper = mount(ManagerPage);
    const dictionaryMock = jest.spyOn(wrapper.vm.$refs.Dictionary, 'setAlertMessage');
    wrapper.vm.setAlertMessage('Test message');
    expect(dictionaryMock).toHaveBeenCalledWith('Test message');
  });

  it('resets entry', () => {
    const wrapper = mount(ManagerPage);
    const dictionaryMock = jest.spyOn(wrapper.vm.$refs.Dictionary, 'resetEntry');
    wrapper.vm.resetEntry();
    expect(dictionaryMock).toHaveBeenCalled();
  });

  it('sets toast message', () => {
    const wrapper = mount(ManagerPage);
    const toastMock = jest.spyOn(wrapper.vm.$refs.Toast, 'setTest');
    wrapper.vm.setToastMessage('Test message');
    expect(toastMock).toHaveBeenCalledWith('Test message');
  });

  it('sets is uploading', () => {
    const wrapper = mount(ManagerPage);
    const fileInputMock = jest.spyOn(wrapper.vm.$refs.fileInput, 'setIsUploading');
    wrapper.vm.setIsUploading(true);
    expect(fileInputMock).toHaveBeenCalledWith(true);
  });

  it('shows toast', () => {
    const wrapper = mount(ManagerPage);
    const toastMock = jest.spyOn(wrapper.vm.$refs.Toast, 'showToast');
    wrapper.vm.showToast();
    expect(toastMock).toHaveBeenCalled();
  });

  it('scrolls to element', () => {
    const wrapper = mount(ManagerPage);
    document.getElementById = jest.fn(() => ({ scrollIntoView: jest.fn() }));
    wrapper.vm.scrollTo('top');
    expect(document.getElementById).toHaveBeenCalledWith('top');
  });
});
