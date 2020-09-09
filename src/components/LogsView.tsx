import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
const JsonView = dynamic(import('react-json-view'), { ssr: false })

/**
 * LogsViewProps type.
 */
export type LogsViewProps = {
  logs: unknown[]
}

const useStyles = makeStyles(() => ({
  log: {
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '4px',
    background: '#1E1E1E',
  },
  string: {},
  object: {},
  noLogs: {
    color: '#ffaa00',
    textAlign: 'center',
  },
}))

/**
 * LogsView component.
 */
export const LogsView: React.FC<LogsViewProps> = (props) => {
  const classes = useStyles()

  return (
    <>
      <div>
        {props.logs.map((log, key) => {
          if (typeof log === 'string') {
            return (
              <div className={clsx(classes.log, classes.string)} key={key}>
                {log}
              </div>
            )
          } else {
            return (
              <div className={clsx(classes.log, classes.object)} key={key}>
                <JsonView src={log as any} theme="twilight" />
              </div>
            )
          }
        })}
        {props.logs.length === 0 && (
          <div className={clsx(classes.log, classes.noLogs)}>No logs</div>
        )}
      </div>
    </>
  )
}
