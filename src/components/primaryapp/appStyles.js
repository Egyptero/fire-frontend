import { fade } from "@material-ui/core/styles/colorManipulator";

const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: "flex"
  },
  grow: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    boxShadow: "none",
    textTransform: "none",
    backgroundColor: "#fafafa",
    color: theme.palette.secondary.main,
    //backgroundImage: "linear-gradient(45deg, #333232 30%, #666262 90%)",
    borderBottom: `2px solid ${theme.palette.secondary.light}`
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(9),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    //backgroundImage: "linear-gradient(45deg, #333232 30%, #666262 90%)",
    backgroundColor: theme.palette.secondary.dark,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    "&::-webkit-scrollbar": {
      width: "0.2em",
      height: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": theme.palette.secondary //"whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.secondary.main, //"rgba(0,0,0,.1)", dark
      outline: "1px solid slategrey"
    }
  },
  drawerClose: {
    //backgroundImage: "linear-gradient(45deg, #333232 30%, #666262 90%)",
    backgroundColor: theme.palette.secondary.dark,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    },
    "&::-webkit-scrollbar": {
      width: "0.2em",
      height: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": theme.palette.secondary //"whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.secondary.main, //"rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    //backgroundImage: "linear-gradient(#666262, black)",
    //backgroundColor: "#666262",
    // color: theme.palette.primary.main,
    // opacity: 0.9,
    //boxShadow: "none",
    //textTransform: "none",
    ...theme.mixins.toolbar
  },
  icon: {
    fill: theme.palette.secondary.main //"white"
  },
  underline: {
    borderBottom: `0px solid ${theme.palette.secondary.main}`,

    "&:after": {
      // The MUI source seems to use this but it doesn't work
      borderBottom: "0px solid white"
    }
  },
  whiteColor: {
    color: theme.palette.secondary.main, //"white",
    fontWeight: "Bold",
    fontFamily: "Arial"
  },
  formControl: {},
  login: {
    backgroundColor: "#fafafa", //"red"
    //    borderColor: "red",
    //    borderWidth: "2px",
    //    borderStyle: "solid",
    color: "red",
    "&:hover": {
      backgroundColor: "#fafafa"
      //      borderColor: "red"
    },
    width: 35,
    height: 35,
    boxShadow: "none",
    textTransform: "none"
  },
  logout: {
    backgroundColor: "#fafafa", // "green"theme.palette.secondary.main
    //    borderColor: "#7cb342",
    color: "#7cb342",
    //    borderWidth: "2px",
    //    borderStyle: "solid",
    "&:hover": {
      backgroundColor: "#fafafa"
      //      borderColor: "#7cb342"
    },
    width: 35,
    height: 35,
    boxShadow: "none",
    textTransform: "none"
  },
  fireClientStatus: {
    icon: {
      fill: theme.palette.secondary.main //"white"
    },
    whiteColor: {
      color: theme.palette.secondary.main, //"white",
      fontWeight: "Bold",
      fontFamily: "Arial"
    }
  },
  outerPhoneScreen: {
    position: "absolute",
    width: "auto",
    height: "auto",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1
  },
  phoneScreen: {
    width: "15em",
    height: "15em",
    border: "2px solid",
    borderColor: theme.palette.secondary.main,
    "border-radius": "5px"
    //backgroundColor: theme.palette.secondary.light
  },
  phoneScreenGrid: {
    width: "15em",
    height: "15em"
  },
  innerPhoneScreen: {
    position: "absolute",
    bottom: theme.spacing(),
    left: theme.spacing(),
    width: "7em",
    height: "7em",
    border: "2px solid",
    borderColor: theme.palette.secondary.main,
    "border-radius": "5px",
    //backgroundColor: theme.palette.secondary.light,
    zIndex: 1
  },
  masterAdd: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3)
    // zIndex: 3
    //justifyContent: "flex-start",
    //alignItems: "center"
  }
});
export default styles;
