import RequestPageViewModel from '@/viewmodel/VMRequest'
import { createPinia, setActivePinia } from 'pinia'

describe('RequestPageViewModel', () => {  
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should handle message correctly', () => {
    const { handleMessage, requestStore } = RequestPageViewModel()
    requestStore.clearMessages()
    requestStore.setRequestMessage('test message')
    handleMessage('Success')
    expect(requestStore.messages).toEqual([
      { text: 'test message', type: 'user' },
      { text: 'Success', type: 'response' },
    ])
  })

  it('should handle stopped message', () => {
    const { handleMessage, requestStore } = RequestPageViewModel()
    requestStore.clearMessages()
    requestStore.setRequestMessage('test message')
    handleMessage('Stopped')
    expect(requestStore.messages).toEqual([
      { text: 'test message', type: 'user' },
      { text: 'errore o stoppato', type: 'response' },
    ])
  })

  it('should clear messages', () => {
    const { clearMessages, requestStore } = RequestPageViewModel()
    requestStore.addMessage('user', 'test message')
    requestStore.addMessage('response', 'Success')
    clearMessages()
    expect(requestStore.messages).toEqual([])
  })
})