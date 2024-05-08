import RequestPageViewModel from '@/viewmodel/VMRequest'
import { createPinia, setActivePinia } from 'pinia'
import axios from '@/axios'
import MockAdapter from 'axios-mock-adapter'

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

  it('should call handleMessage when submit is successful', async () => {
    const mock = new MockAdapter(axios)
    const { submitForm, requestStore } = RequestPageViewModel()
    requestStore.setRequestMessage('test message')
    mock.onPost('/generatePrompt').reply(200, { result: 'Success' })
    await submitForm()
    expect(requestStore.messages).toEqual([
      { text: 'test message', type: 'user' },
      { text: 'Success', type: 'response' },
    ])
  })

  it('should call handleMessage when submit is unsuccessful', async () => {
    const mock = new MockAdapter(axios)
    const { submitForm, requestStore } = RequestPageViewModel()
    requestStore.setRequestMessage('test message')
    mock.onPost('/generatePrompt').reply(500)
    await submitForm()
    expect(requestStore.messages).toEqual([
      { text: 'test message', type: 'user' },
      { text: 'Request failed with status code 500', type: 'response' },
    ])
  })

  it('should call handleMessage when submit is cancelled', async () => {
    const mock = new MockAdapter(axios)
    const { submitForm, requestStore } = RequestPageViewModel()
    requestStore.setRequestMessage('test message')
    mock.onPost('/generatePrompt').abortRequest()
    await submitForm()
    expect(requestStore.messages).toEqual([
      { text: 'test message', type: 'user' },
      { text: 'Request aborted', type: 'response' },
    ])
  })

  it('should set selected dictionary', async () => {
    const mock = new MockAdapter(axios)
    const { fetchSelectedDictionary, requestStore } = RequestPageViewModel()
    mock.onGet('/selected').reply(200, { result: 'Dictionary' })
    await fetchSelectedDictionary()
    expect(requestStore.selectedDictionary).toEqual('Dictionary')
  })

  it('should handle error when fetching selected dictionary', async () => {
    const mock = new MockAdapter(axios)
    const { fetchSelectedDictionary, requestStore } = RequestPageViewModel()
    mock.onGet('/selected').reply(500)
    await fetchSelectedDictionary()
    expect(requestStore.selectedDictionary).toEqual('Request failed with status code 500')
  })
})