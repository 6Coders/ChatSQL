import axios from '@/axios';
import VMManager from '@/viewmodel/VMManager';
import MManager from '@/model/MManager.js';
import MockAdapter from 'axios-mock-adapter';
import { mount } from '@vue/test-utils';
import ManagerPage from '@/views/ManagerPage.vue';

const mock = new MockAdapter(axios);

describe('VMManager', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ManagerPage);
  });

  describe('handleFileSelected', () => {
    afterEach(() => {
      mock.reset();
    });

    it('should handle valid file selection', async () => {
      const file = new File(['dummy content'], 'test.json', { type: 'application/json', size: 1024 });
      jest.spyOn(MManager, 'convalidateFile').mockReturnValue(true);
      jest.spyOn(MManager, 'uploadFile').mockResolvedValue('File uploaded successfully');

      await VMManager.handleFileSelected(file);

      expect(MManager.uploadFile).toHaveBeenCalledWith(file);
    });

    it('should handle invalid file selection', async () => {
      const file = new File(['dummy content'], 'test.txt', { type: 'text/plain', size: 600 * 1024 });
      jest.spyOn(MManager, 'convalidateFile').mockReturnValue(false);
      const setToastMessageMock = jest.spyOn(wrapper.vm, 'setToastMessage');
      const showToastMock = jest.spyOn(wrapper.vm, 'showToast');

      await VMManager.handleFileSelected(file);

      expect(setToastMessageMock).toHaveBeenCalledWith('Invalid extension or file too large (max 500KB)');
      expect(showToastMock).toHaveBeenCalled();
    });
  });

  describe('handleDeleteDictionary', () => {
    afterEach(() => {
      mock.reset();
    });

    it('should handle successful dictionary deletion', async () => {
      const filename = 'example.json';
      jest.spyOn(MManager, 'deleteDictionary').mockResolvedValue(true);
      const setToastMessageMock = jest.spyOn(wrapper.vm, 'setToastMessage');
      const showToastMock = jest.spyOn(wrapper.vm, 'showToast');
      const scrollToMock = jest.spyOn(wrapper.vm, 'scrollTo');
      const handleDictionaryMock = jest.spyOn(VMManager, 'handleDictionary');

      await VMManager.handleDeleteDictionary(filename);

      expect(setToastMessageMock).toHaveBeenCalledWith('Dictionary deleted successfully');
      expect(showToastMock).toHaveBeenCalled();
      expect(scrollToMock).toHaveBeenCalledWith('top');
      expect(handleDictionaryMock).toHaveBeenCalled();
    });

    it('should handle error during dictionary deletion', async () => {
      const filename = 'example.json';
      jest.spyOn(MManager, 'deleteDictionary').mockResolvedValue(false);
      const setToastMessageMock = jest.spyOn(wrapper.vm, 'setToastMessage');
      const showToastMock = jest.spyOn(wrapper.vm, 'showToast');
      const scrollToMock = jest.spyOn(wrapper.vm, 'scrollTo');

      await VMManager.handleDeleteDictionary(filename);

      expect(setToastMessageMock).toHaveBeenCalledWith('Internal Server Error');
      expect(showToastMock).toHaveBeenCalled();
      expect(scrollToMock).toHaveBeenCalledWith('top');
    });
  });

  describe('handleLoadDictionary', () => {
    afterEach(() => {
      mock.reset();
    });

    it('should handle successful dictionary loading', async () => {
      const filename = 'example.json';
      jest.spyOn(MManager, 'loadDictionary').mockResolvedValue(true);
      const setToastMessageMock = jest.spyOn(wrapper.vm, 'setToastMessage');
      const showToastMock = jest.spyOn(wrapper.vm, 'showToast');
      const scrollToMock = jest.spyOn(wrapper.vm, 'scrollTo');
      const handleUpdateEntryMock = jest.spyOn(wrapper.vm, 'handleUpdateEntry');

      await VMManager.handleLoadDictionary(filename);

      expect(setToastMessageMock).toHaveBeenCalledWith('Dictionary loaded successfully');
      expect(showToastMock).toHaveBeenCalled();
      expect(scrollToMock).toHaveBeenCalledWith('top');
      expect(handleUpdateEntryMock).toHaveBeenCalled();
    });

    it('should handle error during dictionary loading', async () => {
      const filename = 'example.json';
      jest.spyOn(MManager, 'loadDictionary').mockResolvedValue(false);
      const setToastMessageMock = jest.spyOn(wrapper.vm, 'setToastMessage');
      const showToastMock = jest.spyOn(wrapper.vm, 'showToast');

      await VMManager.handleLoadDictionary(filename);

      expect(setToastMessageMock).toHaveBeenCalledWith('Internal Server Error');
      expect(showToastMock).toHaveBeenCalled();
    });
  });

  describe('handleDictionary', () => {
    afterEach(() => {
      mock.reset();
    });

    it('should handle successful retrieval of dictionaries', async () => {
      const responseData = [{ id: 1, name: 'dictionary1' }];
      jest.spyOn(MManager, 'getDictionaries').mockResolvedValue(responseData);
      const resetEntryMock = jest.spyOn(wrapper.vm, 'resetEntry');
      const printDictionaryMock = jest.spyOn(wrapper.vm, 'printDictionary');
      const setIsRefreshingStopMock = jest.spyOn(wrapper.vm, 'setIsRefreshingStop');
      const setAlertMessageMock = jest.spyOn(wrapper.vm, 'setAlertMessage');

      await VMManager.handleDictionary();

      expect(resetEntryMock).toHaveBeenCalled();
      expect(printDictionaryMock).toHaveBeenCalledWith(responseData);
      expect(setIsRefreshingStopMock).toHaveBeenCalled();
      expect(setAlertMessageMock).toHaveBeenCalled();
    });

    it('should handle no dictionaries found', async () => {
      jest.spyOn(MManager, 'getDictionaries').mockResolvedValue([]);
      const resetEntryMock = jest.spyOn(wrapper.vm, 'resetEntry');
      const setAlertMessageMock = jest.spyOn(wrapper.vm, 'setAlertMessage');
      const setIsRefreshingStopMock = jest.spyOn(wrapper.vm, 'setIsRefreshingStop');

      await VMManager.handleDictionary();

      expect(resetEntryMock).toHaveBeenCalled();
      expect(setAlertMessageMock).toHaveBeenCalled();
      expect(setIsRefreshingStopMock).toHaveBeenCalled();
    });
  });
});