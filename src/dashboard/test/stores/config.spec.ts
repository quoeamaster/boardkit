import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useConfigStore } from '@/stores/config'

const sampleConfig = {
    layout_folder: '/app/layouts/',
    layouts: ['default.json', 'multi_dashboard.json'],
}

describe('useConfigStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        vi.unstubAllGlobals()
    })

    it('loads layouts from config.json and selects the first layout', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                json: async () => sampleConfig,
            }),
        )

        const store = useConfigStore()
        await store.load('/app/config.json')

        expect(store.getLayouts).toEqual(['default.json', 'multi_dashboard.json'])
        expect(store.getCurrentLayout).toBe('default.json')
        expect(store.getCurrentLayoutUrl).toBe('/app/layouts/default.json')
    })

    it('selects another known layout and updates the layout url', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                json: async () => sampleConfig,
            }),
        )

        const store = useConfigStore()
        await store.load('/app/config.json')
        store.selectLayout('multi_dashboard.json')

        expect(store.getCurrentLayout).toBe('multi_dashboard.json')
        expect(store.getCurrentLayoutUrl).toBe('/app/layouts/multi_dashboard.json')
    })
})
