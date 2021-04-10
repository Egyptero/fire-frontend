import React, { Component } from "react";
import { Grid, Card } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TypeTopBar from "./Components/TypeTopBar";
import BasicTypeInfo from "./Components/BasicTypeInfo";
import ProjectTypeDetails from "./Components/ProjectTypeDetails";
import CustomTypeDetails from "./Components/CustomTypeDetails";
import WABTypeDetails from "./Components/WABTypeDetails";
const styles = (theme) => ({
  content: {
    flexGrow: 1,
    //height: "86vh"
  },
  grid: {
    display: "flex",
    position: "relative",
    maxHeight: "100%",
    minHeight: "100%",
    overflow: "hidden",
  },
  gridWithoutBorder: {
    display: "flex",
    position: "relative", //
    height: "83vh",
    maxHeight: "83vh",
  },
  card: {
    display: "flex",
    position: "relative",
    overflow: "hidden",
    maxHeight: "100%",
    minHeight: "100%",
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  details: {
    display: "block",
    position: "absolute",
    overflow: "auto",
    height: "83vh",
    //maxHeight: "83vh",
    //    minWidth: "100%",
    whiteSpace: "nowrap",
    //width: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": "whitesmoke", //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  formControl: {
    margin: theme.spacing(1) * 0.4,
    // maxWidth: "90%",
  },
  list: {
    width: "100%",
    marginTop: theme.spacing(1),
    border: "1px solid",
    borderColor: theme.palette.secondary.dark,
    "border-radius": "5px",
    height: "18em",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": theme.palette.secondary, //"whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.secondary.dark, //"rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
});

class TypeDetails extends Component {
  state = {};
  componentDidMount() {}
  renderTypeDetails = () => {
    const { selectedType } = this.props.source.sourceState;
    switch (selectedType.channel) {
      case "Facebook Page":
        break;
      case "Facebook DM":
        break;
      case "Twitter Account":
        break;
      case "Twitter DM":
        break;
      case "Instagram Account":
        break;
      case "Instagram DM":
        break;
      case "WhatsApp Business":
        return <WABTypeDetails {...this.props} />;
      case "LinkedIn":
        break;
      case "Youtube":
        break;
      case "Voice":
        break;
      case "Vedio":
        break;
      case "SMS":
        break;
      case "Chat":
        break;
      case "Email":
        break;
      case "Webrtc":
        break;
      case "Project":
        return <ProjectTypeDetails {...this.props} />;
      case "Custom":
        return <CustomTypeDetails {...this.props} />;
      default:
        break;
    }
  };
  render() {
    const { classes, source } = this.props;
    return (
      <Grid
        item
        xs={12}
        sm={source.getDetailsWidth()}
        md={source.getDetailsWidth()}
        lg={source.getDetailsWidth()}
        className={classes.grid}
      >
        <Card className={classes.card}>
          <Grid
            container
            style={{
              overflow: "auto",
              position: "relative",
              display: "flex",
            }}
          >
            {/** User Topbar running all user capabilities like save , edit , watch */}
            <TypeTopBar {...this.props} />
            {/**User Details part. Having user basic info and skill management , and advanced management */}
            <Grid item className={classes.gridWithoutBorder} xs={12}>
              <Grid container className={classes.details}>
                <Grid container spacing={0}>
                  {/**Basic User Information like pic , name , email */}
                  <BasicTypeInfo {...this.props} />
                  {/* Render details based on channel */}
                  {this.renderTypeDetails()}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  }
}

TypeDetails.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TypeDetails);
