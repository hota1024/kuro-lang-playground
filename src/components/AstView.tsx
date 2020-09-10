import dynamic from 'next/dynamic'
import { Node } from 'kuro-lang'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core'
const JsonView = dynamic(import('react-json-view'), { ssr: false })

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
  },
  alert: {
    marginBottom: '8px',
  },
}))

/**
 * AstViewProps type.
 */
export type AstViewProps = {
  /**
   * Ast.
   */
  ast: Node | void
}

/**
 * AstView component.
 */
export const AstView: React.FC<AstViewProps> = (props) => {
  const classes = useStyles()

  if (!props.ast) {
    return (
      <Alert variant="filled" severity="info" className={classes.alert}>
        No AST set.
      </Alert>
    )
  }

  return (
    <>
      <div>
        <div className={classes.title}>AST</div>
        <div className={classes.body}>
          <JsonView src={props.ast as any} theme="twilight" />
        </div>
      </div>
    </>
  )
}
