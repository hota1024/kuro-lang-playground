import { SourceCode, LocatedError } from 'kuro-lang'
import { makeStyles, Card, CardHeader } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import clsx from 'clsx'

/**
 * ErrorViewProps type.
 */
export type ErrorViewProps = {
  code: string

  error?: Error | void
}

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '1.2rem',
    background: 'black',
    borderRadius: '4px 4px 0 0',
    padding: '1rem',
    margin: 0,
    color: 'white',
  },
  body: {
    background: '#101010',
    borderRadius: '0 0 4px 4px',
    padding: '1.5rem 1rem',
    margin: 0,
  },
  line: {
    fontSize: '1.2rem',
  },
  errorText: {
    color: theme.palette.error.dark,
  },
}))

/**
 * ErrorView component.
 */
export const ErrorView: React.FC<ErrorViewProps> = (props) => {
  const classes = useStyles()
  const error = props.error

  if (!error) {
    return (
      <Alert variant="filled" severity="info">
        No errors.
      </Alert>
    )
  }

  if (error instanceof LocatedError) {
    const loc = error.loc
    const code = props.code
    let line = 1
    let lineStart = 0

    for (let i = 0; i < loc.start; ++i) {
      if (code[i] === '\n') {
        ++line
        ++lineStart
      }
    }

    let lineEnd = 0

    for (let i = loc.end; i < code.length; ++i) {
      if (code[i] === '\n') {
        lineEnd = i - 1
        break
      }
    }

    const lineString = line.toString() + ' │ '
    const left = code.slice(lineStart, loc.start)
    const body = code.slice(loc.start, loc.end)
    const right = code.slice(loc.end, lineEnd)

    return (
      <>
        <div>
          <div className={classes.title}>
            {error.name}: {error.message}
          </div>
          <pre className={clsx(classes.body, classes.line)}>
            <code>
              <div>
                <span>{lineString}</span>
                <span>{left}</span>
                <span className={classes.errorText}>{body}</span>
                <span>{right}</span>
              </div>
              <div className={classes.errorText}>
                {' '.repeat(left.length + lineString.length)}└
                {body.length > 1 &&
                  '─'.repeat(Math.max(0, body.length - 2)) + '┴'}
                ─{error.message}
              </div>
            </code>
          </pre>
        </div>
      </>
    )
  }

  return (
    <>
      <div>
        <div className={classes.title}>
          {error.name}: {error.message}
        </div>
        <pre className={classes.body}>
          <code>{error.stack}</code>
        </pre>
      </div>
    </>
  )
}
