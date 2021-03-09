import React, { Component } from "react";
import {
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Grid
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { ExpandMore } from "@material-ui/icons";
const styles = theme => ({});
class OfferInteractionSnackbar extends Component {
  state = {};
  handleAcceptInteraction = () => {
    const { interactionDetails, app } = this.props;
    app.closeInteractionOffer(interactionDetails.interaction._id);
    app.handleAcceptInteraction(interactionDetails.interaction._id);
  };
  handleRejectInteraction = () => {
    const { interactionDetails, app } = this.props;
    app.closeInteractionOffer(interactionDetails.interaction._id);
    app.handleRejectInteraction(interactionDetails.interaction._id);
  };
  render() {
    const { classes, interactionDetails, theme } = this.props;
    console.log("trying to render new content");
    return (
      <ExpansionPanel
        expanded
        style={{
          backgroundColor: theme.palette.secondary.light,
          width: "30vw"
        }}
      >
        <ExpansionPanelSummary
          expandIcon={
            <ExpandMore style={{ color: theme.palette.primary.contrastText }} />
          }
          style={{ backgroundColor: theme.palette.secondary.dark }}
        >
          <Typography
            className={classes.heading}
            style={{ color: theme.palette.primary.contrastText }}
          >
            New interaction received
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container direction="column" spacing={2}>
            <Grid style={{ margin: theme.spacing(0.5) }} />
            <Typography style={{ color: theme.palette.primary.contrastText }}>
              New interaction is received with title{" "}
              {interactionDetails.interaction.attached.title}
            </Typography>
            <Grid style={{ margin: theme.spacing(0.5) }} />
            <Grid container direction="row-reverse">
              <Button
                key="accept"
                color="primary"
                size="small"
                variant="contained"
                style={{ marginLeft: theme.spacing(1) }}
                onClick={this.handleAcceptInteraction}
              >
                Accept
              </Button>
              <Button
                key="reject"
                color="secondary"
                size="small"
                variant="contained"
                onClick={this.handleRejectInteraction}
              >
                Reject
              </Button>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

OfferInteractionSnackbar.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  interactionDetails: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(
  OfferInteractionSnackbar
);
