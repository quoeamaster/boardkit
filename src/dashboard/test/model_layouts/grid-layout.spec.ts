import { describe, it, expect } from 'vitest'
import { ZodError } from 'zod'
import { GridLayoutSchema } from '@/models/layouts/grid-layout'

import validMinimal from './fixtures/valid-minimal.json?raw'
import validWithComments from './fixtures/valid-with-comments.json?raw'
import validWidgetSizes from './fixtures/valid-widget-sizes.json?raw'
import validMultipleRows from './fixtures/valid-multiple-rows.json?raw'
import validWidgetId from './fixtures/valid-widget-id.json?raw'
import invalidLayoutType from './fixtures/invalid-layout-type.json?raw'
import invalidMissingLayout from './fixtures/invalid-missing-layout.json?raw'
import invalidMissingVersion from './fixtures/invalid-missing-version.json?raw'
import invalidVersionZero from './fixtures/invalid-version-zero.json?raw'
import invalidWidthOutOfRange from './fixtures/invalid-width-out-of-range.json?raw'
import invalidHeightEnum from './fixtures/invalid-height-enum.json?raw'
import invalidEmptyRows from './fixtures/invalid-empty-rows.json?raw'
import invalidWidgetMissingName from './fixtures/invalid-widget-missing-name.json?raw'
import invalidMissingSizeDefaults from './fixtures/invalid-missing-size-defaults.json?raw'
import unparseableTrailingComma from './fixtures/unparseable-trailing-comma.json?raw'
import unparseableTruncated from './fixtures/unparseable-truncated.json?raw'

function parseGridLayout(raw: string) {
    // [lesson] schema.parse() will be ok if the JSON is valid + obeys the schema rules...
    return GridLayoutSchema.parse(JSON.parse(raw))
}

function expectSchemaRejection(raw: string) {
    expect(() => JSON.parse(raw)).not.toThrow()
    expect(() => parseGridLayout(raw)).toThrow(ZodError)
}

describe('GridLayoutSchema', () => {
    describe('valid JSON', () => {
        it('parses a minimal grid layout', () => {
            const layout = parseGridLayout(validMinimal)

            expect(layout.layout).toBe('grid')
            expect(layout.version).toBe(1)
            expect(layout.size_defaults).toEqual({ width: 3, height: 'small' })
            expect(layout.rows).toHaveLength(1)
            expect(layout.rows[0].widgets.map((widget) => widget.name)).toEqual([
                'revenue',
                'orders',
            ])
        })

        it('parses a grid layout with comments', () => {
            const layout = parseGridLayout(validWithComments)

            expect(layout.comments).toEqual([
                'size_defaults apply when a widget omits size',
                'version is tracked by QuickBoard',
            ])
        })

        it('parses widgets with omitted or partial size', () => {
            const layout = parseGridLayout(validWidgetSizes)
            const [revenue, orders, customers, margin] = layout.rows[0].widgets

            expect(revenue.size).toEqual({ width: 3 })
            expect(orders.size).toEqual({ width: 3, height: 'medium' })
            expect(customers.size).toEqual({ height: 'medium' })
            expect(margin.size).toBeUndefined()
        })

        it('parses a grid layout with multiple rows', () => {
            const layout = parseGridLayout(validMultipleRows)

            expect(layout.rows).toHaveLength(2)
            expect(layout.rows[0].widgets.map((widget) => widget.name)).toEqual(['revenue'])
            expect(layout.rows[1].widgets.map((widget) => widget.name)).toEqual(['orders'])
        })

        it('parses widgets with an optional id', () => {
            const layout = parseGridLayout(validWidgetId)
            const [revenue, orders] = layout.rows[0].widgets

            expect(revenue.id).toBe('cp-revenue')
            expect(orders.id).toBeUndefined()
        })
    })

    describe('schema-invalid JSON', () => {
        it('rejects a non-grid layout type', () => {
            expectSchemaRejection(invalidLayoutType)
        })

        it('rejects a missing layout field', () => {
            expectSchemaRejection(invalidMissingLayout)
        })

        it('rejects a missing version', () => {
            expectSchemaRejection(invalidMissingVersion)
        })

        it('rejects a non-positive version', () => {
            expectSchemaRejection(invalidVersionZero)
        })

        it('rejects a width outside 1-12', () => {
            expectSchemaRejection(invalidWidthOutOfRange)
        })

        it('rejects a height outside the allowed enum', () => {
            expectSchemaRejection(invalidHeightEnum)
        })

        it('rejects an empty rows array', () => {
            expectSchemaRejection(invalidEmptyRows)
        })

        it('rejects a widget without a name', () => {
            expectSchemaRejection(invalidWidgetMissingName)
        })

        it('rejects a missing size_defaults field', () => {
            expectSchemaRejection(invalidMissingSizeDefaults)
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
})
