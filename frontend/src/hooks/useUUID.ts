import { useCallback, useMemo } from 'react'
import { v4 as uuidV4 } from 'uuid'

/**
 * Create a memorize unique ID
 */
export const useUUID = () => useMemo(() => uuidV4(), [])

/**
 * Create a memorize unique ID function
 */
export const useUUIDFn = () => useCallback(() => uuidV4(), [])
