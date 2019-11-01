import React, { Component } from "react";
import { Grid, IconButton, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  ArrowRight,
  ArrowLeft,
  Edit,
  Delete,
  Visibility,
  Maximize,
  Refresh,
  Save
} from "@material-ui/icons";

const styles = theme => ({
  content: {},
  grid: {},
  gridWithBorder: {},
  gridWithoutBorder: {},
  topBar: {
    display: "flex",
    position: "relative",
    backgroundColor: "lightgrey",
    height: "6vh",
    maxHeight: "6vh"
  },
  list: {},
  card: {},
  graph: {}
});

class TopBar extends Component {
  state = {};
  handleDataChange = event => {
    const { designer } = this.props;
    if (event.target.id === "workflow")
      designer.updateWorkflowName(event.target.value);
  };
  renderIcon = () => {
    const { designer } = this.props;
    if (designer.getToolsBarWidth() === 2) return <ArrowLeft />;
    else return <ArrowRight />;
  };
  render() {
    const { classes, source, designer } = this.props;
    const { sourceState } = source;
    return (
      <React.Fragment>
        <Grid item xs={6} sm={6} className={classes.topBar}>
          <IconButton onClick={designer.switchToolsBarView}>
            {this.renderIcon()}
          </IconButton>
          <TextField
            id="workflow"
            value={sourceState.selectedWorkflow.name}
            onChange={this.handleDataChange}
            disabled={!designer.designerState.canSave}
          />
        </Grid>
        <Grid className={classes.topBar} item xs={6} sm={6}>
          <Grid container justify="flex-end">
            <IconButton
              onClick={designer.saveWorkFlow}
              disabled={!designer.designerState.canSave}
            >
              <Save />
            </IconButton>
            <IconButton
              onClick={designer.refreshWorkFlow}
              disabled={!designer.designerState.canRefresh}
            >
              <Refresh />
            </IconButton>
            <IconButton
              onClick={designer.watchWorkFlow}
              disabled={!designer.designerState.canWatch}
            >
              <Visibility />
            </IconButton>
            <IconButton
              onClick={designer.editWorkFlow}
              disabled={!designer.designerState.canEdit}
            >
              <Edit />
            </IconButton>
            <IconButton onClick={designer.deleteWorkFlow}>
              <Delete />
            </IconButton>
            <IconButton onClick={source.switchDrawerView}>
              <Maximize />
            </IconButton>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

TopBar.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  designer: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(TopBar);
