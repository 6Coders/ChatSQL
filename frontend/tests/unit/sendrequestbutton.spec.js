import { shallowMount } from '@vue/test-utils'
import axios from 'axios'
import SendRequestButton from '@/components/SendRequestButton.vue'

jest.mock('axios')

describe('SendRequestButton.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(SendRequestButton, {
      propsData: {
        requestMessage: 'test message'
      }
    })
  })

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('sends request when "Invia" button is clicked', async () => {
    const mockResponse = { data: { result: 'test result' } }
    axios.post.mockResolvedValue(mockResponse)

    await wrapper.find('button').trigger('click')

    expect(axios.post).toHaveBeenCalledWith('/generateprompt', { userRequest: 'test message' }, expect.anything())
    expect(wrapper.emitted().submit[0]).toEqual(['test result'])
  })

  /* it('stops sending when "Interrompi" button is clicked', async () => {
    let resolvePromise
    const promise = new Promise(resolve => {
      resolvePromise = resolve
    })
  
    const mockCancel = jest.fn(() => {
      resolvePromise()
    })
  
    axios.CancelToken.source = jest.fn(() => ({
      token: {},
      cancel: mockCancel
    }))
  
    axios.post = jest.fn(() => promise)
  
    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.find('button[title="Interrompi"]').trigger('click')
  
    expect(mockCancel).toHaveBeenCalled()
  }) */
})