import { shallowMount } from '@vue/test-utils'
import SendRequestButton from '@/components/SendRequestButton.vue'

describe('SendRequestButton.vue', () => {
  it('renders the send button when the status is false', () => {
    const wrapper = shallowMount(SendRequestButton, {
      propsData: {
        status: false,
        disabled: false,
        sendButtonClass: 'send',
        stopSendButtonClass: 'stop',
        submitMethod: () => {},
        stopSubmitMethod: () => {}
      }
    })

    expect(wrapper.find('button.send').exists()).toBe(true)
    expect(wrapper.find('button.stop').exists()).toBe(false)
  })

  it('renders the stop button when the status is true', () => {
    const wrapper = shallowMount(SendRequestButton, {
      propsData: {
        status: true,
        disabled: false,
        sendButtonClass: 'send',
        stopSendButtonClass: 'stop',
        submitMethod: () => {},
        stopSubmitMethod: () => {}
      }
    })

    expect(wrapper.find('button.send').exists()).toBe(false)
    expect(wrapper.find('button.stop').exists()).toBe(true)
  })

  it('calls submitMethod when the send button is clicked', async () => {
    const submitMethod = jest.fn()
    const wrapper = shallowMount(SendRequestButton, {
      propsData: {
        status: false,
        disabled: false,
        sendButtonClass: 'send',
        stopSendButtonClass: 'stop',
        submitMethod,
        stopSubmitMethod: () => {}
      }
    })

    await wrapper.find('button.send').trigger('click')
    expect(submitMethod).toHaveBeenCalled()
  })

  it('calls stopSubmitMethod when the stop button is clicked', async () => {
    const stopSubmitMethod = jest.fn()
    const wrapper = shallowMount(SendRequestButton, {
      propsData: {
        status: true,
        disabled: false,
        sendButtonClass: 'send',
        stopSendButtonClass: 'stop',
        submitMethod: () => {},
        stopSubmitMethod
      }
    })

    await wrapper.find('button.stop').trigger('click')
    expect(stopSubmitMethod).toHaveBeenCalled()
  })
})