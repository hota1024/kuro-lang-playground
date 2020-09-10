import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  title: {
    padding: '1rem',
    borderRadius: '4px 4px 0 0',
    background: 'black',
  },
  body: {
    padding: '1rem',
    borderRadius: '0 0 4px 4px',
    marginBottom: '4px',
    background: '#1E1E1E',
    overflow: 'scroll',
  },
  alert: {
    marginBottom: '8px',
  },
}))

/**
 * JsCodeProps type.
 */
export type JsCodeProps = {
  /**
   * JS.
   */
  js: string | void
}

/**
 * JsCode component.
 */
export const JsCode: React.FC<JsCodeProps> = (props) => {
  const classes = useStyles()

  if (!props.js) {
    return (
      <Alert variant="filled" severity="info" className={classes.alert}>
        No transpiled JavaScript code.
      </Alert>
    )
  }

  return (
    <>
      <div>
        <div className={classes.title}>Transpiled code</div>
        <div className={classes.body}>
          <pre>
            <code>{props.js}</code>
          </pre>
        </div>
      </div>
    </>
  )
}
