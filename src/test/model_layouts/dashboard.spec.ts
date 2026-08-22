import { describe, it, expect } from 'vitest'
import { ZodError } from 'zod'
import { DashboardSchema } from '@/models/dashboard'

import validGrid from './fixtures/valid-grid.json?raw'
import validGridMultipleRows from './fixtures/valid-grid-multiple-rows.json?raw'
import validFreeflow from './fixtures/valid-freeflow.json?raw'
import validMixed from './fixtures/valid-mixed.json?raw'
import unparseableTrailingComma from './fixtures/dashboard-unparseable-trailing-comma.json?raw'
import unparseableTruncated from './fixtures/dashboard-unparseable-truncated.json?raw'
import invalidMissingName from './fixtures/invalid-missing-name.json?raw'
import invalidMissingLayouts from './fixtures/invalid-missing-layouts.json?raw'
import invalidUnknownLayoutType from './fixtures/invalid-unknown-layout-type.json?raw'
import invalidGridMissingVersion from './fixtures/invalid-grid-missing-version.json?raw'
import invalidFreeflowMissingVersion from './fixtures/invalid-freeflow-missing-version.json?raw'
import invalidFreeflowMissingWidgets from './fixtures/invalid-freeflow-missing-widgets.json?raw'
import invalidFreeflowWidgetMissingName from './fixtures/invalid-freeflow-widget-missing-name.json?raw'
import invalidFreeflowWidgetMissingCoords from './fixtures/invalid-freeflow-widget-missing-coords.json?raw'

function parseDashboard(raw: string) {
    return DashboardSchema.parse(JSON.parse(raw))
}

function expectSchemaRejection(raw: string) {
    expect(() => JSON.parse(raw)).not.toThrow()
    expect(() => parseDashboard(raw)).toThrow(ZodError)
}

function expectGridLayout(layout: ReturnType<typeof parseDashboard>['layouts'][number]) {
    expect(layout.layout).toBe('grid')
    if (layout.layout !== 'grid') {
        throw new Error('expected grid layout')
    }
    return layout
}

function expectFreeflowLayout(layout: ReturnType<typeof parseDashboard>['layouts'][number]) {
    expect(layout.layout).toBe('freeflow')
    if (layout.layout !== 'freeflow') {
        throw new Error('expected freeflow layout')
    }
    return layout
}

describe('DashboardSchema', () => {
    describe('valid JSON', () => {
        it('parses a dashboard with a grid layout', () => {
            const dashboard = parseDashboard(validGrid)

            expect(dashboard.name).toBe('Sales Dashboard')
            expect(dashboard.layouts).toHaveLength(1)

            const layout = expectGridLayout(dashboard.layouts[0])
            expect(layout.version).toBe(1)
            expect(layout.size_defaults).toEqual({ width: 3, height: 'small' })
            expect(layout.rows).toHaveLength(1)
            expect(layout.rows[0].widgets.map((widget) => widget.name)).toEqual([
                'revenue',
                'orders',
            ])
        })

        it('parses a dashboard with a multi-row grid layout and optional widget ids', () => {
            const dashboard = parseDashboard(validGridMultipleRows)
            const layout = expectGridLayout(dashboard.layouts[0])

            expect(layout.rows).toHaveLength(2)
            expect(layout.rows[0].widgets[0]).toEqual({ name: 'revenue', id: 'cp-revenue' })
            expect(layout.rows[1].widgets[0]).toEqual({ name: 'orders' })
        })

        it('parses a dashboard with a freeflow layout', () => {
            const dashboard = parseDashboard(validFreeflow)

            expect(dashboard.name).toBe('Sales Dashboard')
            expect(dashboard.layouts).toHaveLength(1)

            const layout = expectFreeflowLayout(dashboard.layouts[0])
            expect(layout.version).toBe(1)
            expect(layout.widgets).toEqual([
                { name: 'revenue', x: 0, y: 0, width: 300, height: 200 },
                { name: 'orders', x: 320, y: 0, width: 300, height: 200 },
            ])
        })

        it('parses a dashboard with both grid and freeflow layouts', () => {
            const dashboard = parseDashboard(validMixed)

            expect(dashboard.layouts).toHaveLength(2)
            expect(dashboard.layouts.map((layout) => layout.layout)).toEqual([
                'grid',
                'freeflow',
            ])

            const freeflow = expectFreeflowLayout(dashboard.layouts[1])
            expect(freeflow.comments).toEqual([
                'freeflow widgets use absolute x/y coordinates',
            ])
            expect(freeflow.widgets).toEqual([
                { name: 'orders', x: 0, y: 0, width: 240, height: 160 },
            ])
        })
    })

    describe('unparseable JSON', () => {
        it('rejects JSON with a trailing comma', () => {
            expect(() => JSON.parse(unparseableTrailingComma)).toThrow(SyntaxError)
        })

        it('rejects truncated JSON', () => {
            expect(() => JSON.parse(unparseableTruncated)).toThrow(SyntaxError)
        })
    })

    describe('schema-invalid JSON', () => {
        it('rejects a missing name', () => {
            expectSchemaRejection(invalidMissingName)
        })

        it('rejects a missing layouts field', () => {
            expectSchemaRejection(invalidMissingLayouts)
        })

        it('rejects an unknown layout type', () => {
            expectSchemaRejection(invalidUnknownLayoutType)
        })

        it('rejects a grid layout without a version', () => {
            expectSchemaRejection(invalidGridMissingVersion)
        })

        it('rejects a freeflow layout without a version', () => {
            expectSchemaRejection(invalidFreeflowMissingVersion)
        })

        it('rejects a freeflow layout without widgets', () => {
            expectSchemaRejection(invalidFreeflowMissingWidgets)
        })

        it('rejects a freeflow widget without a name', () => {
            expectSchemaRejection(invalidFreeflowWidgetMissingName)
        })

        it('rejects a freeflow widget without coordinates', () => {
            expectSchemaRejection(invalidFreeflowWidgetMissingCoords)
        })
    })
})
