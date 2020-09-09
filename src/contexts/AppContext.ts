import { createContext } from 'react'

/**
 * ExampleCode type.
 */
export type ExampleCode = {
  /**
   * Title.
   */
  title: string

  /**
   * Code lines.
   */
  code: string[]
}

/**
 * AppContextType type.
 */
export type AppContextType = {
  /**
   * Examples.
   */
  examples: ExampleCode[]
}

export const defaultAppContextData: AppContextType = {
  examples: [
    {
      title: 'hello,world',
      code: ['alert("hello,world")'],
    },
  ],
}

export const AppContext = createContext<AppContextType>(defaultAppContextData)
