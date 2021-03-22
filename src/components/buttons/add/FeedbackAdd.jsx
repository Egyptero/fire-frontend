import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "../../primaryapp/appStyles";
import { withStyles } from "@material-ui/core/styles";
import { IconButton, Tooltip } from "@material-ui/core";
import { Feedback } from "@material-ui/icons";
import FeedbackDialog from "../../dialogs/FeedbackDialog";
class FeedbackAdd extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <React.Fragment>
        <Tooltip title="Report issue">
          <IconButton color="inherit" onClick={this.handleOpen} size="small">
            <Feedback fontSize="small" />
          </IconButton>
        </Tooltip>
        <FeedbackDialog
          {...this.props}
          handleClose={this.handleClose}
          open={this.state.open}
        />
      </React.Fragment>
    );
  }
}

FeedbackAdd.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FeedbackAdd);
