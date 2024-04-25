import { shallowMount } from '@vue/test-utils'
import ViewGeneratedPrompts from '@/components/ViewGeneratedPrompts.vue'

describe('ViewGeneratedPrompts.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(ViewGeneratedPrompts, {
      propsData: {
        messages: [
          { type: 'user', text: 'Test message' },
          { type: 'response', text: 'Test response' }
        ],
        status: true
      }
    })
  })

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders user message correctly', () => {
    expect(wrapper.find('.bi-person-fill').exists()).toBe(true)
    expect(wrapper.find('.bi-person-fill + strong').text()).toBe('User')
    expect(wrapper.find('.bi-person-fill + strong + p').text()).toBe('Test message')
  })

  it('renders response message correctly', () => {
    expect(wrapper.find('.bi-robot').exists()).toBe(true)
    expect(wrapper.find('.bi-robot + strong').text()).toBe('Response')
    expect(wrapper.find('.bi-robot + strong + p').text()).toBe('Test response')
  })

  it('calls copyToClipboard when clipboard icon is clicked', async () => {
    // Mock navigator.clipboard
    global.navigator.clipboard = {
      writeText: jest.fn(),
    }
  
    const copyToClipboardSpy = jest.spyOn(wrapper.vm, 'copyToClipboard')
    await wrapper.find('.copy-icon').trigger('click')
    expect(copyToClipboardSpy).toHaveBeenCalled()
    expect(global.navigator.clipboard.writeText).toHaveBeenCalled()
  })
})