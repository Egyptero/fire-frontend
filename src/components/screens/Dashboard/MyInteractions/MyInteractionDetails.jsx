import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, TextField } from "@material-ui/core";

const styles = (theme) => ({
  content: {},
  grid: {},
  gridFull: {},
  card: {},
  cardContent: {},
  formControl: {},
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
    const { theme } = this.props;
    return (
      <Grid
        container
        style={{
          //          border: "2px solid",
          // borderRadius: "2px",
          //          borderColor: this.props.theme.palette.secondary.light,
          backgroundImage: `url("./imgs/chatbackground.png")`,
          //backgroundColor: this.props.theme.palette.common.white,
          backgroundRepeat: true,
          //opacity: 0.05,
          //filter: `grayscale(100%)`,
          height: "100%",
        }}
        direction="column-reverse"
      >
        {/* style={{ padding: theme.spacing(1) }} */}
        <Grid item>
          <TextField
            margin="dense"
            rows="3"
            multiline
            //onChange={this.handleDataChange}
            name="chat"
            //label="Send message"
            //value={this.state.description}
            fullWidth
            variant="filled"
            inputProps={{
              style: {
                fontSize: "0.8rem",
                //backgroundColor: "white",
                //borderColor: this.props.theme.palette.secondary.light,
              },
              disableUnderline: true,
            }}
          />
        </Grid>
        <Grid item style={{ height: "80%" }}>
          Welcome to my board
        </Grid>
      </Grid>
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
