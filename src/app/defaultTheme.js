import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    secondary: {
      light: "#948f8f", //948f8f
      main: "#666262", //666262  ... fafafa
      dark: "#3c3838", //3c3838
      contrastText: "#ffffff"
    },
    primary: {
      light: "#ff817d", //ff817d //5D31A7
      main: "#c95151", //c95151 //482887
      dark: "#931f29", //931f29 //38245C
      contrastText: "#ffffff"
    }
  },
  direction: "ltr"
});

export default theme;
