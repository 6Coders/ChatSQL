import { shallowMount } from '@vue/test-utils'
import ViewGeneratedPrompts from '@/components/ViewGeneratedPrompts.vue'

describe('ViewGeneratedPrompts.vue', () => {
  it('renders messages correctly', () => {
    const messages = [
      { type: 'user', text: 'Ciao' },
      { type: 'response', text: 'Salve' },
      { type: 'user', text: 'Come stai?' },
      { type: 'response', text: 'Bene, grazie' }
    ]

    const wrapper = shallowMount(ViewGeneratedPrompts, {
      propsData: { messages }
    })

    const listItems = wrapper.findAll('li')
    expect(listItems.length).toBe(messages.length)

    messages.forEach((message, index) => {
      const listItem = listItems.at(index)
      expect(listItem.text()).toContain(message.text)

      if (message.type === 'user') {
        expect(listItem.text()).toContain('User:')
      } else if (message.type === 'response') {
        expect(listItem.text()).toContain('Response:')
      }
    })
  })
})