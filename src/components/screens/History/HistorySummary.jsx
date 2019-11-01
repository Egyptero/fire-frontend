import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Chip, Typography } from "@material-ui/core";
import loadMyHistorySummary from "../../../functions/user/tenant/loadMyHistorySummary";
const styles = theme => ({
  content: {},
  grid: {},
  fullgrid: {},
  card: {},
  cardContent: {},
  gridContent: {}
});

class HistorySummary extends Component {
  state = {
    loading: true,
    error: false,
    facebook: 0,
    twitter: 0,
    instagram: 0,
    call: 0,
    chat: 0,
    email: 0,
    whatsapp: 0,
    project: 0
  };
  componentDidMount() {
    this.setState({ loading: true });
    this.loadHistorySummary();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.range !== prevProps.range ||
      this.props.app.tenant !== prevProps.app.tenant
    )
      this.loadHistorySummary();
  }
  loadHistorySummary = () => {
    loadMyHistorySummary(this, this.props.range)
      .then(result => {
        let facebook = 0,
          twitter = 0,
          instagram = 0,
          call = 0,
          chat = 0,
          email = 0,
          whatsapp = 0,
          project = 0;
        result.forEach(typeCount => {
          switch (typeCount._id) {
            case "Facebook DM":
            case "Facebook Page":
              facebook += typeCount.count;
              break;
            case "Twitter Account":
            case "Twitter DM":
              twitter += typeCount.count;
              break;
            case "Instagram Account":
            case "Instagram DM":
              instagram += typeCount.count;
              break;
            case "WhatsApp Business":
              whatsapp += typeCount.count;
              break;
            case "LinkedIn":
              break;
            case "Youtube":
              break;
            case "Voice":
            case "Vedio":
              call += typeCount.count;
              break;
            case "SMS":
              break;
            case "Chat":
              chat += typeCount.count;
              break;
            case "Email":
              email += typeCount.count;
              break;
            case "Webrtc":
              call += typeCount.count;
              break;
            case "Project":
            case "Custom":
              project += typeCount.count;
              break;
            default:
              break;
          }
        });
        this.setState({
          facebook,
          twitter,
          instagram,
          call,
          chat,
          email,
          whatsapp,
          project,
          loading: false,
          error: false
        });
      })
      .catch(error => {
        console.log(error.message);
        this.setState({
          loading: false,
          error: true
        });
      });
  };
  render() {
    const { theme } = this.props;
    if (this.state.error) {
      return (
        <Grid container direction="row">
          <Typography variant="h6">Error loading summary ...</Typography>
        </Grid>
      );
    } else
      return (
        <Grid container direction="row">
          {this.state.loading ? (
            <Typography variant="h6">Loading ...</Typography>
          ) : (
            <React.Fragment>
              <Chip
                icon={
                  <img
                    src="./imgs/facebookwhitelogo.png"
                    alt="twitter"
                    height={theme.spacing(2)}
                    width={theme.spacing(2)}
                  />
                }
                label={this.state.facebook}
                style={{
                  backgroundColor: "#3b5998",
                  color: "white",
                  margin: theme.spacing(1) * 0.5
                }}
              />
              <Chip
                icon={
                  <img
                    src="./imgs/twitterwhitelogo.png"
                    alt="twitter"
                    height={theme.spacing(2)}
                    width={theme.spacing(2)}
                  />
                }
                label={this.state.twitter}
                style={{
                  backgroundColor: "#00acee",
                  color: "white",
                  margin: theme.spacing(1) * 0.5
                }}
              />
              <Chip
                icon={
                  <img
                    src="./imgs/instagramwhitelogo.png"
                    alt="instagram"
                    height={theme.spacing(2)}
                    width={theme.spacing(2)}
                  />
                }
                label={this.state.instagram}
                style={{
                  backgroundColor: "#7f1734",
                  color: "white",
                  margin: theme.spacing(1) * 0.5
                }}
              />
              <Chip
                icon={
                  <img
                    src="./imgs/phonewhitelogo.png"
                    alt="call"
                    height={theme.spacing(2)}
                    width={theme.spacing(2)}
                  />
                }
                label={this.state.call}
                style={{
                  backgroundColor: "#548235",
                  color: "white",
                  margin: theme.spacing(1) * 0.5
                }}
              />
              <Chip
                icon={
                  <img
                    src="./imgs/emailwhitelogo.png"
                    alt="email"
                    height={theme.spacing(2)}
                    width={theme.spacing(2)}
                  />
                }
                label={this.state.email}
                style={{
                  backgroundColor: "#7c9cb0",
                  color: "white",
                  margin: theme.spacing(1) * 0.5
                }}
              />
              <Chip
                icon={
                  <img
                    src="./imgs/chatwhitelogo.png"
                    alt="chat"
                    height={theme.spacing(2)}
                    width={theme.spacing(2)}
                  />
                }
                label={this.state.chat}
                style={{
                  backgroundColor: "#203864",
                  color: "white",
                  margin: theme.spacing(1) * 0.5
                }}
              />
              <Chip
                icon={
                  <img
                    src="./imgs/whatsappwhitelogo.png"
                    alt="whatsapp"
                    height={theme.spacing(2)}
                    width={theme.spacing(2)}
                  />
                }
                label={this.state.whatsapp}
                style={{
                  backgroundColor: "#25d366",
                  color: "white",
                  margin: theme.spacing(1) * 0.5
                }}
              />
              <Chip
                icon={
                  <img
                    src="./imgs/projectwhitelogo.png"
                    alt="email"
                    height={theme.spacing(2)}
                    width={theme.spacing(2)}
                  />
                }
                label={this.state.project}
                style={{
                  backgroundColor: "#468078",
                  color: "white",
                  margin: theme.spacing(1) * 0.5
                }}
              />
            </React.Fragment>
          )}
        </Grid>
      );
  }
}

HistorySummary.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  range: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(HistorySummary);
