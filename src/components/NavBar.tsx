import {
  makeStyles,
  createStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core'
import { PlayArrow } from '@material-ui/icons'

/**
 * NavBarProps type.
 */
export type NavBarProps = {
  /**
   * Run button click handler.
   */
  onRunClicked(): void
}

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
)

/**
 * NavBar component.
 */
export const NavBar: React.FC<NavBarProps> = (props): React.ReactElement => {
  const classes = useStyles()

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Kuro Playground
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<PlayArrow />}
            onClick={props.onRunClicked}
          >
            Run(Ctrl + Enter)
          </Button>
        </Toolbar>
      </AppBar>
    </>
  )
}
