import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BoardMarkdown from '@/components/board/BoardMarkdown.vue'

describe('BoardMarkdown', () => {
  it('renders markdown from childProps.content', () => {
    const wrapper = mount(BoardMarkdown, {
      props: {
        childProps: {
          content: '# Hello board',
        },
      },
    })

    expect(wrapper.html()).toContain('<h1>')
    expect(wrapper.text()).toContain('Hello board')
  })
})
