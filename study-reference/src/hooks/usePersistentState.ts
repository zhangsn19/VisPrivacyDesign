import { useCallback, useState } from 'react'

export function usePersistentState<T>(key: string, createInitial: () => T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = window.localStorage.getItem(key)
      return saved ? (JSON.parse(saved) as T) : createInitial()
    } catch {
      return createInitial()
    }
  })

  const update = useCallback((next: T | ((current: T) => T)) => {
    setValue((current) => {
      const resolved = typeof next === 'function' ? (next as (current: T) => T)(current) : next
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved))
      } catch {
        // Progress still remains available in component state.
      }
      return resolved
    })
  }, [key])

  const clear = useCallback((next: T) => {
    try {
      window.localStorage.removeItem(key)
    } catch {
      // The in-memory reset still works.
    }
    setValue(next)
  }, [key])

  return [value, update, clear] as const
}
