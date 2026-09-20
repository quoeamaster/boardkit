import { describe, expect, it } from 'vitest'
import { ZodError } from 'zod'
import { ConfigSchema, layoutFileUrl } from '@/models/config/config'

describe('ConfigSchema', () => {
    it('parses layout_folder and the layouts file list', () => {
        const config = ConfigSchema.parse({
            layout_folder: '/app/layouts/',
            layouts: ['default.json', 'multi_dashboard.json'],
        })

        expect(config.layout_folder).toBe('/app/layouts/')
        expect(config.layouts).toEqual(['default.json', 'multi_dashboard.json'])
    })

    it('rejects a missing layouts list', () => {
        expect(() =>
            ConfigSchema.parse({
                layout_folder: '/app/layouts/',
            }),
        ).toThrow(ZodError)
    })

    it('rejects an empty layouts list', () => {
        expect(() =>
            ConfigSchema.parse({
                layout_folder: '/app/layouts/',
                layouts: [],
            }),
        ).toThrow(ZodError)
    })
})

describe('layoutFileUrl', () => {
    it('joins layout_folder and a layout filename', () => {
        expect(layoutFileUrl('/app/layouts/', 'default.json')).toBe(
            '/app/layouts/default.json',
        )
        expect(layoutFileUrl('/app/layouts', 'default.json')).toBe(
            '/app/layouts/default.json',
        )
    })
})
