import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
const styles = theme => ({
  content: {},
  grid: {},
  gridWithBorder: {},
  gridWithoutBorder: {},
  topBar: {},
  list: {},
  card: {},
  graph: {}
});

class RouteSettingsDialog extends Component {
  state = {
    workflowId: ""
  };
  componentDidMount() {
    this.setDialogInitialState();
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      selectedElementView: prevSelectedElementView
    } = prevProps.designer.designerState;
    const { selectedElementView } = this.props.designer.designerState;

    if (selectedElementView && prevSelectedElementView) {
      if (selectedElementView.model.id !== prevSelectedElementView.model.id)
        this.setDialogInitialState();
    } else if (selectedElementView && !prevSelectedElementView)
      this.setDialogInitialState();
  }
  setDialogInitialState = () => {
    const { designer } = this.props;
    const { designerState } = designer;
    const { selectedElementView } = designerState;
    if (selectedElementView) {
      if (selectedElementView.model.attributes.attrs.bodyText.workflowId)
        this.setState({
          workflowId:
            selectedElementView.model.attributes.attrs.bodyText.workflowId
        });
      console.log("Route Configuration Screen");
    }
  };
  handleBotChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  saveBotSetting = () => {
    console.log("Saving Route Setting");
    const { designer } = this.props;
    const { designerState, handleElementSettingsClose } = designer;
    const { workflows } = this.props.app;
    const { selectedElementView } = designerState;
    if (selectedElementView) {
      workflows.forEach(workflow => {
        if (workflow._id === this.state.workflowId) {
          selectedElementView.model.attr({
            bodyText: {
              text: workflow.name,
              workflowId: this.state.workflowId
            }
          });
        }
      });
    }
    handleElementSettingsClose();
  };
  renderWorkflows = () => {
    const { workflows } = this.props.app;

    if (workflows)
      return workflows.map(workflow => {
        if (workflow.type === "ROUTE") {
          return (
            <MenuItem value={workflow._id} key={workflow._id}>
              {workflow.name}
            </MenuItem>
          );
        }
      });
  };
  renderWorkflowSetting = () => {
    const { classes } = this.props;
    return (
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="bot-label-placeholder">
          Route name
        </InputLabel>
        <Select
          value={this.state.workflowId}
          onChange={this.handleBotChange}
          displayEmpty
          name="workflowId"
          className={classes.selectEmpty}
        >
          {this.renderWorkflows()}
        </Select>
        <FormHelperText>Select workflow</FormHelperText>
      </FormControl>
    );
  };
  render() {
    const { designer } = this.props;
    const { designerState, handleElementSettingsClose } = designer;
    return (
      <Dialog
        open={designerState.openElementSetting}
        onClose={handleElementSettingsClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Route settings</DialogTitle>
        <DialogContent>{this.renderWorkflowSetting()}</DialogContent>
        <DialogActions>
          <Button onClick={handleElementSettingsClose} color="secondary">
            Cancel
          </Button>
          <Button color="secondary" onClick={this.saveBotSetting}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

RouteSettingsDialog.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  designer: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(RouteSettingsDialog);
