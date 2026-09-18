export const BoardKitErrorCode = {
  CONFIG_LOAD_FAILED: 'CONFIG_LOAD_FAILED',
  CONFIG_INVALID: 'CONFIG_INVALID',
  WIDGET_ATTRIBUTES_LOAD_FAILED: 'WIDGET_ATTRIBUTES_LOAD_FAILED',
  WIDGET_QUERY_LOAD_FAILED: 'WIDGET_QUERY_LOAD_FAILED',
  FILE_FETCH_FAILED: 'FILE_FETCH_FAILED',
  FILE_INVALID_TYPE: 'FILE_INVALID_TYPE',
  FILE_NOT_FOUND: 'FILE_NOT_FOUND',
} as const

export type BoardKitErrorCode = (typeof BoardKitErrorCode)[keyof typeof BoardKitErrorCode]

export class BoardKitError extends Error {
  readonly code: BoardKitErrorCode
  readonly details?: {
    status?: number
    path?: string
    widgetId?: string
  }

  constructor(
    code: BoardKitErrorCode,
    message: string,
    details?: {
      status?: number
      path?: string
      widgetId?: string
    },
    options?: ErrorOptions,
  ) {
    super(message, options)

    this.name = 'BoardKitError'
    this.code = code
    this.details = details
  }
}