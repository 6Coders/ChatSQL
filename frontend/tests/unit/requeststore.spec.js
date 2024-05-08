import { setActivePinia, createPinia } from 'pinia'
import { useRequestStore } from '@/stores/requestStore';

describe('requestPageStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should add a message', () => {
    const store = useRequestStore();
    store.addMessage('info', 'Test message');
    expect(store.messages).toEqual([{ type: 'info', text: 'Test message' }]);
  });

  it('should set request message', () => {
    const store = useRequestStore();
    store.setRequestMessage('New request message');
    expect(store.requestMessage).toBe('New request message');
  });

  it('should clear messages', () => {
    const store = useRequestStore();
    store.addMessage('info', 'Test message');
    store.clearMessages();
    expect(store.messages).toEqual([]);
  });

  it('should set isSending', () => {
    const store = useRequestStore();
    store.setIsSending(true);
    expect(store.isSending).toBe(true);
  });

  it('should set selected dictionary', () => {
    const store = useRequestStore();
    store.setSelectedDictionary('Test dictionary');
    expect(store.selectedDictionary).toBe('Test dictionary');
  });
});