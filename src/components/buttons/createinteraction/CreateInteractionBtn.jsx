import React, { Component } from "react";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import styles from "../../primaryapp/appStyles";
import { withStyles } from "@material-ui/core/styles";
import NewInteractionDialog from "../../dialogs/NewInteractionDialog";
import addInteraction from "../../../functions/tenant/interaction/addInteraction";

class CreateInteractionBtn extends Component {
  state = {
    openNewInteraction: false,
  };

  handleNewInteractionClickOpen = () => {
    this.setState({ openNewInteraction: true });
  };
  handleNewInteractionClose = () => {
    this.setState({ openNewInteraction: false });
  };
  handleAddInteraction = (interaction) => {
    addInteraction(interaction, this, (result) => {
      if (!result.error) {
        this.handleNewInteractionClose();
      }
    });
  };
  getSharedObject = () => {
    return {
      handleNewInteractionClose: this.handleNewInteractionClose,
      handleAddInteraction: this.handleAddInteraction,

      sourceState: this.state,
    };
  };
  render() {
    return (
      <React.Fragment>
        {/* <Chip icon={<AssignmentLate />} label="New"onClick={this.handleNewTodoOpen}/> */}
        {/* <IconButton
          onClick={this.handleNewTodoOpen}
          style={{color:this.props.theme.palette.info.main}}
          size="small"
        >
          <AssignmentLate fontSize="small" />
        </IconButton> */}

        <Button
          variant="outlined"
          color="inherit"
          onClick={this.handleNewInteractionClickOpen}
          style={{ textTransform: "none" }}
          size="small"
        >
          {/* <AssignmentLate /> */}
          Add interaction
        </Button>
        <NewInteractionDialog
          app={this.props.app}
          primaryApp={this.getSharedObject()}
          enqueueSnackbar={this.props.enqueueSnackbar}
          source={this.getSharedObject()}
        />
      </React.Fragment>
    );
  }
}

CreateInteractionBtn.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  //theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(CreateInteractionBtn);
