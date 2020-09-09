import {
  makeStyles,
  createStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core'
import { PlayArrow } from '@material-ui/icons'
import React, { useContext } from 'react'
import { AppContext, ExampleCode } from '../contexts/AppContext'

/**
 * NavBarProps type.
 */
export type NavBarProps = {
  /**
   * Run button click handler.
   */
  onRunClicked(): void

  /**
   * Example select handler.
   *
   * @param example Example code.
   */
  onExampleSelect(example: ExampleCode): void

  /**
   * Whether running.
   */
  running: boolean
}

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      marginRight: '1rem',
    },
    navItem: {
      margin: '0 0.5rem',
    },
    grow: {
      flexGrow: 1,
    },
  })
)

/**
 * NavBar component.
 */
export const NavBar: React.FC<NavBarProps> = (props): React.ReactElement => {
  const classes = useStyles()
  const { examples } = useContext(AppContext)

  const [
    exampleAnchorEl,
    setExampleAnchorEl,
  ] = React.useState<null | HTMLElement>(null)

  const onExampleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setExampleAnchorEl(event.currentTarget)
  }

  const onExampleSelect = (example: ExampleCode) => {
    setExampleAnchorEl(null)
    props.onExampleSelect(example)
  }

  return (
    <>
      <AppBar elevation={0}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Kuro Playground
          </Typography>
          <div className={classes.grow}></div>
          <Button
            variant="contained"
            color="default"
            aria-controls="example-menu"
            aria-haspopup="true"
            onClick={onExampleClick}
            className={classes.navItem}
          >
            Examples
          </Button>
          <Menu
            id="example-menu"
            anchorEl={exampleAnchorEl}
            keepMounted
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={Boolean(exampleAnchorEl)}
            onClose={onExampleSelect}
          >
            {examples.map((example) => (
              <MenuItem
                key={example.title}
                onClick={() => onExampleSelect(example)}
              >
                {example.title}
              </MenuItem>
            ))}
          </Menu>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<PlayArrow />}
            onClick={props.onRunClicked}
            className={classes.navItem}
            disabled={props.running}
          >
            {props.running ? 'Running...' : 'Run(Ctrl + Enter)'}
          </Button>
        </Toolbar>
      </AppBar>
    </>
  )
}
