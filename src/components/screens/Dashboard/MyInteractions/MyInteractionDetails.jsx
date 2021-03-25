import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  AccountCircle,
  Adb,
  AddCircle,
  Assignment,
  CheckCircle,
  Close,
  Group,
  PauseCircleFilled,
  Send,
  SwapHorizontalCircle,
} from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { Component } from "react";
import MyInteractionButtons from "./MyInteractionButtons";

const styles = (theme) => ({
  content: {},
  grid: {},
  gridFull: {},
  card: {},
  cardContent: {
    position: "relative",
    overflow: "auto",
    padding: theme.spacing(0),
    height: "63.5vh",
    minWidth: "100%",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  floatButton: {
    position: "absolute",
    bottom: theme.spacing(2) + (theme.spacing(1) & 0.5),
    right: theme.spacing(3),
    // width: theme.spacing(4),
    // height: theme.spacing(4),
    zIndex: 1,
  },
  formControl: {},
  messageBox: {
    fontSize: "0.8rem",
    paddingRight: theme.spacing(8),
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
});

class MyInteractionDetails extends Component {
  state = {
    type: null,
    typeName: null,
  };
  componentDidMount() {
    //We should load type now
    const { app } = this.props;
    if (!app.myInteraction) return;
    else this.updateType();
    //We need to load customer information
    //We need to load Skillgroup information
  }
  componentDidUpdate(prevProps, prevState) {
    const { app } = this.props;
    const { app: prevApp } = prevProps;

    if (app.myInteraction !== prevApp.myInteraction) {
      this.updateType();
    }
  }
  updateType = () => {
    console.log("Updating type information");
    const { app } = this.props;
    if (!app.types) return { error: true };
    let channel = null;
    let typeName = null;
    app.types.forEach((type) => {
      if (type._id === app.myInteraction.interaction.typeId) {
        channel = type.channel;
        typeName = type.name;
      }
    });
    this.setState({ type: channel, typeName });
  };
  selectRenderScreen = () => {
    console.log("Selected Type", this.state.type);
    if (!this.state.type) return this.renderUnknownType();
    switch (this.state.type) {
      case "Facebook Page":
        return this.renderFacebookPageType();
      case "Facebook DM":
        return this.renderFacebookMsgType();
      case "Twitter Account":
        return this.renderTwitterType();
      case "Twitter DM":
        return this.renderTwitterMsgType();
      case "Instagram Account":
        return this.renderInstagramType();
      case "Instagram DM":
        return this.renderInstagramMsgType();
      case "WhatsApp Business":
        return this.renderWhatsAppType();
      case "LinkedIn":
        return this.renderLinkedinType();
      case "Youtube":
        return this.renderYoutubeType();
      case "Voice":
        return this.renderCallType();
      case "Vedio":
        return this.renderVedioType();
      case "SMS":
        return this.renderSMSType();
      case "Chat":
        return this.renderChatType();
      case "Email":
        return this.renderEmailType();
      case "Webrtc":
        return this.renderWebrtcType();
      case "Project":
        return this.renderWhatsAppType();
      //return this.renderProjectType();
      case "Custom":
        return this.renderCustomType();
      default:
        return this.renderUnknownType();
    }
  };
  renderUnknownType = () => {
    console.log("We should render unknown type now");
    return <React.Fragment />;
  };
  renderFacebookMsgType = () => {};
  renderFacebookPageType = () => {};
  renderTwitterType = () => {};
  renderTwitterMsgType = () => {};
  renderInstagramType = () => {};
  renderInstagramMsgType = () => {};
  renderLinkedinType = () => {};
  renderChatType = () => {};
  renderProjectType = () => {
    console.log("We should render project type now");
    return <React.Fragment />;
  };
  renderFacebookPostType = () => {};
  renderWhatsAppType = () => {
    const { theme, classes } = this.props;
    return (
      <Card
        style={{
          backgroundImage: `url("./imgs/chatbackground.png")`,
          backgroundRepeat: true,
          //height: "100%",
          boxShadow: "none",
        }}
      >
        <CardHeader
          title="Omar Mamdouh"
          titleTypographyProps={{ variant: "body2" }}
          style={{
            padding: theme.spacing(1),
          }}
          action={<MyInteractionButtons {...this.props}/>}
        />
        <Divider />
        <CardContent className={classes.cardContent}>
          <Grid
            container
            direction="column"
            style={{ padding: theme.spacing(2) }}
          >
            <Grid item xs={12}>
              <Grid container>
                <Card style={{ maxWidth: "50%", padding: theme.spacing(1) }}>
                  <CardHeader
                    title="Omar mamdouh"
                    titleTypographyProps={{
                      variant: "body2",
                      paddingleft: theme.spacing(1),
                    }}
                    style={{ padding: theme.spacing(0) }}
                  />
                  <CardContent style={{ padding: theme.spacing(0) }}>
                    <Typography variant="caption" gutterBottom={false}>
                      Hello firemisc sales team , i want to see a demo for
                      whatsapp services
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row-reverse">
                <Card
                  style={{
                    maxWidth: "50%",
                    padding: theme.spacing(1),
                    backgroundColor: theme.palette.success.light,
                  }}
                >
                  <CardContent style={{ padding: theme.spacing(0) }}>
                    <Typography variant="caption" gutterBottom={false}>
                      Hello Mr. Omar. Thank you for contacting us.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Card style={{ maxWidth: "50%", padding: theme.spacing(1) }}>
                  <CardHeader
                    title="Omar mamdouh"
                    titleTypographyProps={{
                      variant: "body2",
                      paddingLeft: theme.spacing(1),
                    }}
                    style={{ padding: theme.spacing(0) }}
                  />
                  <CardContent style={{ padding: theme.spacing(0) }}>
                    <Typography variant="caption" gutterBottom={false}>
                      How can i subscribe!!!
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions
          style={{
            padding: theme.spacing(1),
          }}
        >
          <TextField
            margin="dense"
            rows="2"
            multiline
            //onChange={this.handleDataChange}
            name="chat"
            //label="Send message"
            //value={this.state.description}
            fullWidth
            variant="filled"
            inputProps={{
              className: classes.messageBox,
            }}
          />
          <IconButton className={classes.floatButton}>
            <Send />
          </IconButton>
        </CardActions>
      </Card>
    );
  };
  renderCallType = () => {};
  renderCustomType = () => {};
  renderWebrtcType = () => {};
  renderEmailType = () => {};
  renderVedioType = () => {};
  renderSMSType = () => {};
  renderCustomType = () => {};
  renderYoutubeType = () => {};
  render() {
    return <React.Fragment>{this.selectRenderScreen()}</React.Fragment>;
  }
}

MyInteractionDetails.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  //source: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(MyInteractionDetails);
