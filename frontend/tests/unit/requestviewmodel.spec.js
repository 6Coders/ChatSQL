import { createPinia, setActivePinia } from 'pinia'
import RequestPageViewModel from '@/viewmodel/VMRequest'

describe('VMRequest', () => {

  beforeEach(() => {
    setActivePinia(createPinia())

  })

  it('should call testApiCall and add messages on submitForm', async () => {
    const vm = RequestPageViewModel()
    const testApiCallMock = jest.spyOn(vm.requestStore, 'testApiCall')
    const addMessageMock = jest.spyOn(vm.requestStore, 'addMessage')

    await vm.submitForm()

    expect(testApiCallMock).toHaveBeenCalled()
    expect(addMessageMock).toHaveBeenCalledTimes(2)

    testApiCallMock.mockRestore()
    addMessageMock.mockRestore()
  })

  it('should handle error on submitForm', async () => {
    const vm = RequestPageViewModel()
    jest.spyOn(vm.requestStore, 'testApiCall').mockImplementation(() => {
      throw new Error('Test error')
    })
    const addMessageMock = jest.spyOn(vm.requestStore, 'addMessage')

    await vm.submitForm()

    expect(addMessageMock).toHaveBeenCalledWith('user', vm.requestStore.requestMessage)
    expect(addMessageMock).toHaveBeenCalledWith('response', 'errore o stoppato')
  })

  it('should call cancelRequest on stopSending', () => {
    const vm = RequestPageViewModel()
    const cancelRequestMock = jest.spyOn(vm.requestStore, 'cancelRequest')

    vm.stopSending()

    expect(cancelRequestMock).toHaveBeenCalled()
  })

  it('should call clearMessages on clearMessages', () => {
    const vm = RequestPageViewModel()
    const clearMessagesMock = jest.spyOn(vm.requestStore, 'clearMessages')

    vm.clearMessages()

    expect(clearMessagesMock).toHaveBeenCalled()
  })
})