import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AceEditor from "react-ace";
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

class ExecuteSettingsDialog extends Component {
  state = {
    expression: `export default interaction => {
};`
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
      if (selectedElementView.model.attributes.attrs.bodyText.function)
        this.setState({
          expression:
            selectedElementView.model.attributes.attrs.bodyText.function
        });
      //We should only load the function of the condition
      console.log("Execute Configuration Screen");
    }
  };
  handleExecuteChange = value => {
    this.setState({ expression: value });
  };
  saveExecuteSetting = () => {
    console.log("Saving Execute Setting");
    const { designer } = this.props;
    const { designerState, handleElementSettingsClose } = designer;
    const { selectedElementView } = designerState;
    if (selectedElementView) {
      selectedElementView.model.attr({
        bodyText: {
          function: this.state.expression
        }
      });
    }
    handleElementSettingsClose();
  };
  renderConditionSetting = () => {
    const { classes } = this.props;
    const { expression } = this.state;
    return (
      <FormControl className={classes.formControl}>
        <AceEditor
          mode="javascript"
          theme="chrome"
          onChange={this.handleExecuteChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          value={expression}
          focus
        />
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
        <DialogTitle id="form-dialog-title">Execute code settings</DialogTitle>
        <DialogContent>{this.renderConditionSetting()}</DialogContent>
        <DialogActions>
          <Button onClick={handleElementSettingsClose} color="secondary">
            Cancel
          </Button>
          <Button color="secondary" onClick={this.saveExecuteSetting}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ExecuteSettingsDialog.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  designer: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ExecuteSettingsDialog);
