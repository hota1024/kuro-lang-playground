import { createMuiTheme } from '@material-ui/core'
import { deepPurple } from '@material-ui/core/colors'

export const mainTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#000000',
    },
    secondary: deepPurple,
  },
})
