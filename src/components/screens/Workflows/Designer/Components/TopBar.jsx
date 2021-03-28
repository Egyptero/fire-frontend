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
  Save,
} from "@material-ui/icons";

const styles = (theme) => ({
  content: {},
  grid: {},
  gridWithBorder: {},
  gridWithoutBorder: {},
  topBar: {
    display: "flex",
    position: "relative",
    backgroundColor: "lightgrey",
    height: theme.spacing(4),
    maxHeight: theme.spacing(4),
  },
  list: {},
  card: {},
  graph: {},
});

class TopBar extends Component {
  state = {};
  handleDataChange = (event) => {
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
          <IconButton onClick={designer.switchToolsBarView} size="small">
            {this.renderIcon()}
          </IconButton>
          <TextField
            id="workflow"
            value={sourceState.selectedWorkflow.name}
            onChange={this.handleDataChange}
            disabled={!designer.designerState.canSave}
            inputProps={{ style: { fontSize: "0.8rem" } }}
            InputLabelProps={{ style: { fontSize: "0.8rem" } }}
          />
        </Grid>
        <Grid className={classes.topBar} item xs={6} sm={6}>
          <Grid container justify="flex-end">
            <IconButton
              size="small"
              onClick={designer.saveWorkFlow}
              disabled={!designer.designerState.canSave}
            >
              <Save fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={designer.refreshWorkFlow}
              disabled={!designer.designerState.canRefresh}
            >
              <Refresh fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={designer.watchWorkFlow}
              disabled={!designer.designerState.canWatch}
            >
              <Visibility fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={designer.editWorkFlow}
              disabled={!designer.designerState.canEdit}
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton onClick={designer.deleteWorkFlow} size="small">
              <Delete fontSize="small" />
            </IconButton>
            <IconButton onClick={source.switchDrawerView} size="small">
              <Maximize fontSize="small" />
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
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TopBar);
