import { createContext, useContext } from 'react'

export const ReadyContext = createContext(true)

export function useSiteReady() {
  return useContext(ReadyContext)
}

export default ReadyContext
