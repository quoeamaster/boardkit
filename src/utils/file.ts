import { BoardKitError, BoardKitErrorCode } from '@/error/errors'

export async function fetchFile(path: string, type: 'json' | 'yaml' | 'sql') {
    const response = await fetch(path)
    if (!response.ok) {
        throw new BoardKitError(BoardKitErrorCode.FILE_FETCH_FAILED, 
            `Failed to fetch file: ${response.status} ${response.statusText} at path: ${path}`, 
            {
                status: response.status,
                path: path,
            }
        )
    }
    // return the file contents based on type value
    if (type === 'json') {
        return response.json()
    } else if (type === 'yaml' || type === 'sql') {
        const content = await response.text()
        if (content.startsWith('<!doctype html>')) {
            // most likely not found or a html file (not expected)
            throw new BoardKitError(
                BoardKitErrorCode.FILE_NOT_FOUND,
                `File not found: ${path}`,
                {
                    path: path,
                    status: response.status,
                }
            )
        }
        return content
    } else {
        throw new BoardKitError(
            BoardKitErrorCode.FILE_INVALID_TYPE,
            `Invalid file type: ${type} at path: ${path}`,
            {
                path: path,
                status: response.status,
            }
        )
    }
}