import { makeStyles } from '@material-ui/core'

/**
 * Syntax type..
 */
export type Syntax = {
  syntax: string

  example: string
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
      syntax: 'pg.log(message: any)',
      description: 'Add the message to the Logs tab.',
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
