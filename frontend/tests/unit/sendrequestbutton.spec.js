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

  it('stops sending when "Interrompi" button is clicked', async () => {
    const mockCancel = jest.fn()
    axios.CancelToken = jest.fn(() => ({
      token: {},
      cancel: mockCancel
    }))

    await wrapper.find('button').trigger('click') // Click "Invia" button
    await wrapper.find('button[title="Interrompi"]').trigger('click') // Click "Interrompi" button

    expect(mockCancel).toHaveBeenCalled()
  })
})