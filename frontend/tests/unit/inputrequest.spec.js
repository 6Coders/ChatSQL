import { shallowMount } from '@vue/test-utils'
import InputRequest from '@/components/InputRequest.vue'

describe('InputRequest.vue', () => {
  it('renders input correctly', () => {
    const wrapper = shallowMount(InputRequest)

    const inputElement = wrapper.find('input[name="requestMessage"]')

    expect(inputElement.exists()).toBe(true)
  })

  it('updates requestMessage when input changes', async () => {
    const wrapper = shallowMount(InputRequest)
  
    const inputElement = wrapper.find('input[name="requestMessage"]')
    await inputElement.setValue('Test message')
  
    expect(wrapper.vm.requestMessage).toBe('Test message')
  })
})