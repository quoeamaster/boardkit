import type { QueryApi, QueryRequest, QueryResponse } from "./runQueryInterface.ts"

class MockQueryService implements QueryApi {
    async executeQuery(_: QueryRequest): Promise<QueryResponse> {
        return {
            columns: [
                { name: 'label', type: 'string' },
                { name: 'values', type: 'number' },
            ],
            rows: generateMockRows(),
        }
    }
}

function randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateMockRows(): QueryResponse['rows'] {
    const size = randomInteger(4, 10)
    const now = new Date()

    return Array.from({ length: size }, (_, index) => {
        const date = new Date(
            now.getFullYear(),
            now.getMonth() - (size - 1 - index),
            1)
        const label = `${date.getFullYear()}-${String(
            date.getMonth() + 1,
            ).padStart(2, '0')}`
        
        return {
            label,
            values: randomInteger(10, 1000),
        }
    })
}

export default MockQueryService