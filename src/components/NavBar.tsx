import {
  makeStyles,
  createStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core'
import { PlayArrow } from '@material-ui/icons'

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
export const NavBar = (): React.ReactElement => {
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
          >
            Run(Ctrl + Enter)
          </Button>
        </Toolbar>
      </AppBar>
    </>
  )
}
