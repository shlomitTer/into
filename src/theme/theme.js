import { createTheme } from '@mui/material/styles';

export const colors = createTheme({
  palette: {
    primary: {
      light: '#8aaffe',
      main: '#6886C5',
      dark: '#264078',
      contrastText: '#fffff',
    },
    secondary: {
      light: '#FFE0AC',
      main: '#faca77',
      dark: '#f9bc53',
      contrastText: '#ffffff',
    },
    tertiary: {
      light: '#FFACB7',
      main: '#fd8b9a',
      dark: '#f9576d',
      contrastText: '#ffffff',
    },
    background: '#FEFBF6'
    // background: '#F9F9F9'
  },
});
