import 'reflect-metadata'
import { NextPage } from 'next'
import {
  makeStyles,
  createStyles,
  Grid,
  AppBar,
  Tabs,
  Tab,
  Button,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { NavBar } from '../components/NavBar'
import { KuroParser } from 'kuro-lang/lib/classes'
import { JsTranspiler } from 'kuro-lang/lib/impls'
import React, { useState, useEffect } from 'react'
import { ExampleCode } from '../contexts/AppContext'
import { Editor } from '../components/Editor'
import {
  ChatBubble,
  Error,
  Description,
  Delete,
  AccountTree,
} from '@material-ui/icons'
import { ApiDocument } from '../components/ApiDocument'
import { LogsView } from '../components/LogsView'
import { ErrorView } from '../components/ErrorView'
import { Program } from 'kuro-lang'
import { AstView } from '../components/AstView'
import { JsCode } from '../components/JsCode'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      marginTop: '64px',
      display: 'flex',
    },
    tabContent: {
      padding: '16px',
      height: 'calc(100vh - 72px - 64px)',
      overflow: 'scroll',
    },
    clearLogsButton: {
      marginBottom: '16px',
    },
  })
)

const Home: NextPage = (): React.ReactElement => {
  const parser = new KuroParser()
  const transpiler = new JsTranspiler()

  const classes = useStyles()
  const [code, setCode] = useState('')
  const [transpiledCode, setTranspiledCode] = useState('')
  const [ast, setAst] = useState<Program | void>()
  const [logs, setLogs] = useState<unknown[]>([])
  const [error, setError] = useState<Error | void>()
  const [errorCode, setErrorCode] = useState('')
  const [running, setRunning] = useState(false)

  const [askMessage, setAskMessage] = useState<string | undefined>()
  const [askStringDialog, setAskStringDialog] = useState(false)
  const [askNumberDialog, setAskNumberDialog] = useState(false)
  const [messageDialog, setMessageDialog] = useState(false)
  const [askValue, setAskValue] = useState<unknown>()
  const [askAction, setAskAction] = useState<() => void | undefined>()

  useEffect(() => {
    if (process.browser && location.hash) {
      const codeFromHash = atob(location.hash.replace(/^#/, ''))

      if (codeFromHash !== code) {
        setCode(codeFromHash)
      }

      if (typeof window['pg'] === 'undefined') {
        const pg = {
          value: undefined,
          log(message) {
            setLogs((logs) => [message, ...logs])
          },
          useAskString(message: string) {
            return async () => {
              setAskMessage(message)
              setAskValue('')
              setAskStringDialog(true)

              return new Promise((resolve) => {
                setAskAction(() => () => {
                  setAskStringDialog(false)
                  resolve(pg.value)
                })
              })
            }
          },
          useAskNumber(message: string) {
            return async () => {
              setAskMessage(message)
              setAskValue(0)
              setAskNumberDialog(true)

              return new Promise((resolve) => {
                setAskAction(() => () => {
                  setAskNumberDialog(false)
                  resolve(Number(pg.value))
                })
              })
            }
          },
          alert(message: string) {
            setAskMessage(message)
            setMessageDialog(true)

            return new Promise((resolve) => {
              setAskAction(() => () => {
                setMessageDialog(false)
                resolve()
              })
            })
          },
        }

        window['pg'] = pg
      }

      window['pg'].value = askValue
    }
  })

  const onCodeChange = (value: string) => {
    if (value === '') {
      location.hash = ''
    } else {
      location.hash = btoa(value)
    }

    setCode(value)
  }

  const onExampleSelect = (example: ExampleCode) => {
    if (!example || !example.code) {
      return
    }

    const code = example.code.join('\n') + '\n'
    location.hash = btoa(code)
    setCode(code)
  }

  const onRunClick = () => {
    setError(void 0)
    setErrorCode('')
    setAst(void 0)
    setRunning(true)
    setTranspiledCode(void 0)

    setTimeout(() => {
      try {
        const program = parser.parse({
          code,
        })
        setAst(program)
        const js = transpiler.transpile(program)
        setTranspiledCode(js)
        new Function(`return (async () => { ${js} })()`)()
          .catch((error) => {
            setError(error)
            setErrorCode(code)
            setRunning(false)
          })
          .finally(() => {
            setRunning(false)
          })
      } catch (error) {
        setError(error)
        setErrorCode(code)
        setRunning(false)
      }
    }, 500)
  }

  const [tab, setTab] = useState(0)

  return (
    <>
      <div className={classes.root}>
        <Grid container className={classes.container}>
          <NavBar
            onRunClicked={onRunClick}
            onExampleSelect={onExampleSelect}
            running={running}
          />
          <Grid item xs={7}>
            <Editor value={code} onChange={onCodeChange} />
          </Grid>
          <Grid item xs={5}>
            <AppBar position="static">
              <Tabs value={tab} onChange={(_, tab) => setTab(tab)} centered>
                <Tab label={`Logs(${logs.length})`} icon={<ChatBubble />} />
                <Tab
                  label="Errors"
                  icon={<Error color={error ? 'error' : 'inherit'} />}
                />
                <Tab
                  label="Inspect"
                  icon={<AccountTree color={ast ? 'secondary' : 'inherit'} />}
                />
                <Tab label="API" icon={<Description />} />
              </Tabs>
            </AppBar>
            <div className={classes.tabContent}>
              {tab === 0 && (
                <div>
                  {logs.length > 0 && (
                    <Button
                      onClick={() => setLogs([])}
                      variant="text"
                      className={classes.clearLogsButton}
                      fullWidth
                      startIcon={<Delete />}
                    >
                      Clear
                    </Button>
                  )}
                  <LogsView logs={logs} />
                </div>
              )}
              {tab === 1 && <ErrorView code={errorCode} error={error} />}
              {tab === 2 && (
                <>
                  <JsCode js={transpiledCode} />
                  <AstView ast={ast} />
                </>
              )}
              {tab === 3 && <ApiDocument />}
            </div>
          </Grid>
        </Grid>
      </div>

      <Dialog open={askStringDialog}>
        <DialogTitle>{askMessage ?? 'no message'}</DialogTitle>
        <DialogContent>
          <TextField onChange={(event) => setAskValue(event.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={askAction}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={askNumberDialog}>
        <DialogTitle>{askMessage ?? 'no message'}</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(event) => setAskValue(event.target.value)}
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={askAction}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={messageDialog}>
        <DialogTitle>{askMessage ?? 'no message'}</DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={askAction}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={!!error}
        color="error"
      >
        <Alert
          severity="error"
          variant="filled"
          elevation={6}
          action={<Button onClick={() => setTab(1)}>Show</Button>}
        >
          An error has occurred.
        </Alert>
      </Snackbar>
    </>
  )
}

export default Home
