import { Button, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
const styles = (theme) => ({});
class OfferInteractionSnackbarMinimum extends Component {
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
    //interactionDetails,
    const {   theme } = this.props;
    console.log("trying to render new content");
    return (
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
    );
  }
}

OfferInteractionSnackbarMinimum.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  interactionDetails: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(
  OfferInteractionSnackbarMinimum
);
