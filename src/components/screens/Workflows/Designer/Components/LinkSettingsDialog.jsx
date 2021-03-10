import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  Select,
  MenuItem
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import "brace/mode/javascript";
import "brace/theme/chrome";
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

class LinkSettingsDialog extends Component {
  state = {
    type: `Yes`
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
      if (selectedElementView.model.attributes.attrs.label.text)
        this.setState({
          type: selectedElementView.model.attributes.attrs.label.text
        });
      //We should only load the function of the condition
      console.log("Link Configuration Screen");
    }
  };
  handleLinkChange = event => {
    this.setState({ type: event.target.value });
  };
  saveLinkSetting = () => {
    console.log("Saving Condition Setting");
    const { designer } = this.props;
    const { designerState, handleElementSettingsClose } = designer;
    const { selectedElementView } = designerState;
    let linkColor = "#000000";
    if (this.state.type !== "Yes") linkColor = "#FF0000";
    if (selectedElementView) {
      selectedElementView.model.attr({
        label: {
          text: this.state.type
        },
        line: {
          stroke: linkColor,
          "stroke-dasharray": 0
        }
      });

      if (this.state.type === "Error") {
        selectedElementView.model.attr({
          line: {
            "stroke-dasharray": 2
          }
        });
      }
      if (this.state.type === "Yes")
        selectedElementView.model.label(0, {
          attrs: {
            text: {
              text: ""
            }
          }
        });
      else
        selectedElementView.model.label(0, {
          attrs: {
            text: {
              text: this.state.type
            }
          }
        });
    }
    handleElementSettingsClose();
  };
  renderLinkSetting = () => {
    const { classes } = this.props;
    return (
      <FormControl className={classes.formControl}>
        <Select
          value={this.state.type}
          onChange={this.handleLinkChange}
          fullWidth
          className={classes.selectEmpty}
        >
          <MenuItem value={"Yes"}>Default</MenuItem>
          <MenuItem value={"No"}>No</MenuItem>
          <MenuItem value={"Error"}>Error</MenuItem>
        </Select>
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
        <DialogTitle id="form-dialog-title">Link settings</DialogTitle>
        <DialogContent>{this.renderLinkSetting()}</DialogContent>
        <DialogActions>
          <Button onClick={handleElementSettingsClose} color="secondary">
            Cancel
          </Button>
          <Button color="secondary" onClick={this.saveLinkSetting}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

LinkSettingsDialog.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  designer: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(LinkSettingsDialog);
