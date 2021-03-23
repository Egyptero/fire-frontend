import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    secondary: {
      light: "#9e9e9e", //948f8f", //948f8f //cfcfcf
      main: "#666262", //666262", //666262  ... fafafa //9e9e9e
      dark: "#707070", //3c3838", //3c3838 //707070
      contrastText: "#ffffff",
    },
    primary: {
      light: "#ff5131", //ff817d", //ff817d //5D31A7
      main: "#d50000", //c95151", //c95151 //482887
      dark: "#9b0000", //931f29", //931f29 //38245C
      contrastText: "#ffffff",
    },
  },
  direction: "ltr",
});

export default theme;
