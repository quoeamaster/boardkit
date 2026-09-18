export interface QueryRequest {
    query: string
  }
  
  export interface QueryColumn {
    name: string
    type: string
  }
  
  export interface QueryResponse {
    columns: QueryColumn[]
    rows: Record<string, unknown>[]
  }
  
  export interface QueryApi {
    // indirectly saying this fn is async-able
    executeQuery(
      request: QueryRequest,
    ): Promise<QueryResponse>
  }