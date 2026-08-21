import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BoardButton from '@/components/board/BoardButton.vue'

describe('BoardButton', () => {
    it('renders correctly', () => {
        const wrapper = mount(BoardButton)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('sets the native button type to submit', () => {
        const wrapper = mount(BoardButton, {
            props: { type: 'submit' },
        })
        expect(wrapper.find('button').attributes('type')).toBe('submit')
    })

    it('sets the native button variant and size', () => {
        const wrapper = mount(BoardButton, {
            props: { type: 'reset', variant: 'danger', size: 'lg' },
        })
        expect(wrapper.find('button').attributes('type')).toBe('reset')
        // classes
        expect(wrapper.find('button').classes()).toContain('bg-red-600')
        expect(wrapper.find('button').classes()).toContain('text-white')
        expect(wrapper.find('button').classes()).toContain('hover:bg-red-700')
        expect(wrapper.find('button').classes()).toContain('text-lg')
        expect(wrapper.find('button').classes()).toContain('font-bold')
    })

    it('applies native button attributes correctly', () => {
        const wrapper = mount(BoardButton, {
            props: {
                disabled: true,
                type: 'reset',
            },
            slots: {
                default: 'Port Button',
            },
        })
        const btn = wrapper.find('button')
    
        expect(btn.attributes('type')).toBe('reset')
        expect(btn.attributes('disabled')).toBeDefined()
        expect(btn.text()).toBe('Port Button')
    })
})


