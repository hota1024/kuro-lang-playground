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
    {
      title: 'greeting',
      code: [
        `fn usePrefix(prefix) {`,
        `  fn (value) {`,
        `    prefix + value`,
        `  }`,
        `}`,
        ``,
        `const greet = usePrefix("Hello ")`,
        `const askName = pg.useAskString("What's your name?")`,
        ``,
        `await askName() -> greet -> await pg.alert`,
      ],
    },
    {
      title: 'number game',
      code: [
        `const answer = Math.floor(Math.random() * 100)`,
        `const askNumber = pg.useAskNumber("0~99")`,
        ``,
        `while true {`,
        `  const input = await askNumber()`,
        ``,
        `  incase input == answer {`,
        `    break`,
        `  } else incase input < answer {`,
        `    await pg.alert("Less!")`,
        `  } else {`,
        `    await pg.alert("Large!")`,
        `  }`,
        `}`,
        ``,
        `await pg.alert("Correct!")`,
      ],
    },
  ],
}

export const AppContext = createContext<AppContextType>(defaultAppContextData)
