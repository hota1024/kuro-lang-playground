import { makeStyles } from '@material-ui/core'

/**
 * Syntax type..
 */
export type Syntax = {
  syntax: string

  description: string
}

const useStyles = makeStyles(() => ({
  syntax: {
    marginBottom: '16px',
  },
  syntaxTitle: {
    fontSize: '1.4rem',
    background: 'black',
    borderRadius: '4px 4px 0 0',
    padding: '1rem',
    margin: 0,
  },
  syntaxBody: {
    background: '#101010',
    borderRadius: '0 0 4px 4px',
    padding: '1.5rem 1rem',
    margin: 0,
  },
}))

/**
 * ApiDocument component.
 */
export const ApiDocument: React.FC = () => {
  const syntaxes: Syntax[] = [
    {
      syntax: 'pg.log(message: any): void',
      description: 'Add the message to the Logs tab.',
    },
    {
      syntax: 'pg.alert(message: string): Promise',
      description: 'Show playground alert.',
    },
    {
      syntax: 'AskFn<T>',
      description: 'A function that returns Promise<T>.',
    },
    {
      syntax: 'pg.useAskString(message: string): AskFn<string>',
      description:
        'Returns a function that returns string value entered by user.',
    },
    {
      syntax: 'pg.useAskNumber(message: string): AskFn<number>',
      description:
        'Returns a function that returns number value entered by user.',
    },
  ]

  const classes = useStyles()

  return (
    <>
      <div>
        {syntaxes.map((syntax) => {
          return (
            <div key={syntax.syntax} className={classes.syntax}>
              <pre className={classes.syntaxTitle}>
                <code>{syntax.syntax}</code>
              </pre>
              <div className={classes.syntaxBody}>
                <div>{syntax.description}</div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
