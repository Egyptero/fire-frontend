import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import loadWorkflows from "../../functions/tenant/workflow/loadWorkflows";
import addWorkflow from "../../functions/tenant/workflow/addWorkflow";
import updateWorkflow from "../../functions/tenant/workflow/updateWorkflow";
import WorkflowDetails from "./Workflows/WorkflowDetails";
import WorkflowsList from "./Workflows/WorkflowsList";
import NewWorkflowDialog from "../dialogs/NewWorkflowDialog";
import deleteWorkflow from "../../functions/tenant/workflow/deleteWorkflow";
import _ from "lodash";
const styles = theme => ({
  content: {
    flexGrow: 1,
    position: "relative",
    height: "90vh"
  },
  grid: {
    display: "flex",
    position: "relative",
    maxHeight: "100%",
    minHeight: "100%"
  },
  card: {
    overflow: "auto",
    maxHeight: "100%",
    minHeight: "100%",
    minWidth: "100%"
  }
});

class Workflows extends Component {
  state = {
    openNewWorkflow: false,
    width: 3,
    selectedWorkflow: null
  };
  componentDidMount() {
    const { app } = this.props;
    if (app.tenant && !app.workflows)
      loadWorkflows(this, result => {
        if (!result.error && result.workflows && result.workflows.length > 0)
          this.setState({ selectedWorkflow: result.workflows[0] });
        else this.setState({ selectedWorkflow: null });
      });
    if (
      !this.state.selectedWorkflow &&
      app.workflows &&
      app.workflows.length > 0
    )
      this.setState({ selectedWorkflow: app.workflows[0] });
  }
  componentDidUpdate(prevProps, prevState) {
    const { app } = this.props;
    const { app: prevApp } = prevProps;
    if (app.tenant._id !== prevApp.tenant._id)
      loadWorkflows(this, result => {
        if (!result.error && result.workflows && result.workflows.length > 0)
          this.setState({ selectedWorkflow: result.workflows[0] });
        else this.setState({ selectedWorkflow: null });
      });
  }
  getListWidth = () => {
    return this.state.width;
  };
  getDrawerWidth = () => {
    return 12 - this.state.width;
  };
  switchDrawerView = () => {
    const { width } = this.state;
    if (width === 3) this.setState({ width: 0 });
    else this.setState({ width: 3 });
  };
  handleNewWorkflowClickOpen = () => {
    this.setState({ openNewWorkflow: true });
  };

  handleNewWorkflowClose = () => {
    this.setState({ openNewWorkflow: false });
  };
  handleAddWorkflow = workflow => {
    addWorkflow(workflow, this, result => {
      if (!result.error) {
        this.handleNewWorkflowClose();
        this.setState({ selectedWorkflow: result.workflow });
      }
    });
  };
  handleUpdateWorkflow = workflow => {
    updateWorkflow(
      workflow._id,
      _.pick(workflow, ["name", "data", "type"]),
      this
    );
  };
  handleDeleteWorkflow = workflow => {
    deleteWorkflow(workflow._id, this, result => {
      if (!result.error) this.setState({ selectedWorkflow: null });
    });
  };
  handleUpdateWorkflowName = workflow => {
    this.setState({ selectedWorkflow: workflow });
  };
  handleListItemClick = (event, index) => {
    this.setState({ selectedWorkflow: this.props.app.workflows[index] });
  };
  reloadWorkflows = () => {
    loadWorkflows(this);
  };

  getSharedObject = () => {
    return {
      handleDeleteWorkflow: this.handleDeleteWorkflow,
      handleNewWorkflowClickOpen: this.handleNewWorkflowClickOpen,
      handleNewWorkflowClose: this.handleNewWorkflowClose,
      handleAddWorkflow: this.handleAddWorkflow,
      handleUpdateWorkflow: this.handleUpdateWorkflow,
      handleUpdateWorkflowName: this.handleUpdateWorkflowName,
      handleListItemClick: this.handleListItemClick,
      getDrawerWidth: this.getDrawerWidth,
      getListWidth: this.getListWidth,
      switchDrawerView: this.switchDrawerView,
      reloadWorkflows: this.reloadWorkflows,
      sourceState: this.state
    };
  };

  renderWorkflowsList = () => {
    if (this.getListWidth() > 0) {
      return <WorkflowsList {...this.props} source={this.getSharedObject()} />;
    }
  };
  renderWorkflowDetails = () => {
    if (this.state.selectedWorkflow)
      return (
        <WorkflowDetails {...this.props} source={this.getSharedObject()} />
      );
    else return;
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid className={classes.content} container spacing={1}>
          {this.renderWorkflowsList()}
          {this.renderWorkflowDetails()}
        </Grid>
        <NewWorkflowDialog source={this.getSharedObject()} {...this.props} />
      </React.Fragment>
    );
  }
}

Workflows.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Workflows);
