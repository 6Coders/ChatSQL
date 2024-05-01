import RequestPageViewModel from '@/viewmodel/VMRequest'
import { createPinia, setActivePinia } from 'pinia'

describe('RequestPageViewModel', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should handle message correctly', () => {
    const { handleMessage, requestStore } = RequestPageViewModel()
    requestStore.clearMessages()
    requestStore.setRequestMessage('test message')
    handleMessage('Success')
    expect(requestStore.messages.length).toBe(2)
  })
})