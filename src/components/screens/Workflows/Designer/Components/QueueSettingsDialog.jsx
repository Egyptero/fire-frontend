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
import loadSkillgroups from "../../../../../functions/tenant/skillgroup/loadSkillgroups";
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

class QueueSettingsDialog extends Component {
  state = {
    skillId: "",
    skillgroups: null
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
      loadSkillgroups(this, payload => {
        if (!payload.error) {
          this.setState({ skillgroups: payload.skillgroups });
          if (selectedElementView.model.attributes.attrs.bodyText.skillId)
            this.setState({
              skillId:
                selectedElementView.model.attributes.attrs.bodyText.skillId
            });
        }
      });
      console.log("Queue Configuration Screen");
    }
  };
  handleQueueSkillChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  saveQueueSetting = () => {
    console.log("Saving Queue Setting");
    const { designer } = this.props;
    const { designerState, handleElementSettingsClose } = designer;
    const { selectedElementView } = designerState;
    if (selectedElementView) {
      this.state.skillgroups.forEach(skillgroup => {
        if (skillgroup._id === this.state.skillId) {
          selectedElementView.model.attr({
            bodyText: {
              text: skillgroup.name,
              skillId: this.state.skillId
            }
          });
        }
      });
    }
    handleElementSettingsClose();
  };
  renderSkillgroups = () => {
    if (this.state.skillgroups)
      return this.state.skillgroups.map(skillgroup => {
        return (
          <MenuItem value={skillgroup._id} key={skillgroup._id}>
            {skillgroup.name}
          </MenuItem>
        );
      });
  };
  renderQueueSetting = () => {
    const { classes } = this.props;
    return (
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="skill-label-placeholder">
          Skill name
        </InputLabel>
        <Select
          value={this.state.skillId}
          onChange={this.handleQueueSkillChange}
          displayEmpty
          name="skillId"
          className={classes.selectEmpty}
        >
          {this.renderSkillgroups()}
        </Select>
        <FormHelperText>Select skill group</FormHelperText>
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
        <DialogTitle id="form-dialog-title">Queue settings</DialogTitle>
        <DialogContent>{this.renderQueueSetting()}</DialogContent>
        <DialogActions>
          <Button onClick={handleElementSettingsClose} color="secondary">
            Cancel
          </Button>
          <Button color="secondary" onClick={this.saveQueueSetting}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

QueueSettingsDialog.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  designer: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(QueueSettingsDialog);
