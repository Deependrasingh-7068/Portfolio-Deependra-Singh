import { createContext, useContext, useEffect, useState } from 'react'

const CursorContext = createContext(null)
const STORAGE_KEY = 'portfolio-cursor-type'

export function CursorProvider({ children }) {
  const [cursorType, setCursorType] = useState('default')

  // Restore the visitor's last choice, if any
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) setCursorType(saved)
    } catch (err) {
      // localStorage unavailable (private browsing etc) — safe to ignore
    }
  }, [])

  const changeCursor = (type) => {
    setCursorType(type)
    try {
      window.localStorage.setItem(STORAGE_KEY, type)
    } catch (err) {
      // ignore — selection still works for the current session
    }
  }

  return (
    <CursorContext.Provider value={{ cursorType, changeCursor }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const ctx = useContext(CursorContext)
  if (!ctx) throw new Error('useCursor must be used inside a CursorProvider')
  return ctx
}