import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ToolsBox from "./Components/ToolsBox";
import TopBar from "./Components/TopBar";
import joint from "jointjs/index";
import initiateEvents from "./Events/initiateEvents";
import unhighlightCells from "./Events/unhighlightCells";
import addLinkTools from "./Events/addLinkTools";
import ElementSettingsDialog from "./Components/ElementSettingsDialog";
const styles = theme => ({
  content: {},
  grid: {},
  gridWithBorder: {},
  gridWithoutBorder: {
    display: "flex",
    position: "relative", //
    height: "79vh",
    maxHeight: "79vh"
  },
  topBar: {},
  list: {},
  card: {},
  graph: {
    display: "block",
    position: "absolute",
    overflow: "auto",
    height: "79vh",
    maxHeight: "79vh",
    whiteSpace: "nowrap",
    width: "100%",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": "whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  }
});

class Designer extends Component {
  state = {
    toolsBarWidth: 0,
    selectedAction: "Cursor",
    canSave: false,
    canRefresh: false,
    canEdit: true,
    canWatch: true,
    openElementSetting: false,
    selectedElementView: null
  };
  constructor(props) {
    super(props);
    this.graph = new joint.dia.Graph();
  }
  componentDidMount() {
    const { selectedWorkflow } = this.props.source.sourceState;

    this.paper = new joint.dia.Paper({
      el: this.refs.placeholder,
      width: 10000,
      height: 10000,
      gridSize: 10,
      drawGrid: true,
      background: { color: "whitesmoke" },
      autoResize: true,
      model: this.graph
    });
    this.refs.placeholder.scrollIntoView({
      behavior: "auto",
      block: "center",
      inline: "center"
    });
    if (selectedWorkflow && selectedWorkflow.data) {
      this.graph.addCells(selectedWorkflow.data);
      addLinkTools(null, this);
      this.setState({
        selectedAction: "Cursor",
        canSave: false,
        canRefresh: false,
        canEdit: true,
        canWatch: true
      });
      this.paper.drawBackground({ color: "whitesmoke" });
    }

    initiateEvents(this);
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      selectedWorkflow: prevSelectedWorkflow
    } = prevProps.source.sourceState;
    const { selectedWorkflow } = this.props.source.sourceState;

    if (selectedWorkflow._id !== prevSelectedWorkflow._id) {
      this.graph.clear();
      if (selectedWorkflow.data) this.graph.addCells(selectedWorkflow.data);
      addLinkTools(null, this);
      this.setState({
        selectedAction: "Cursor",
        canSave: false,
        canRefresh: false,
        canEdit: true,
        canWatch: true
      });
      this.paper.drawBackground({ color: "whitesmoke" });
    }
  }
  changeToolsBoxSelection = selection => {
    this.setState({ selectedAction: selection });
  };
  switchToolsBarView = () => {
    if (this.getToolsBarWidth() === 2) this.setState({ toolsBarWidth: 0 });
    else this.setState({ toolsBarWidth: 2 });
  };
  getToolsBarWidth = () => {
    return this.state.toolsBarWidth;
  };
  getDrawerWidth = () => {
    return 12 - this.getToolsBarWidth();
  };
  updateWorkflowName = name => {
    const { source } = this.props;
    let { selectedWorkflow } = source.sourceState;
    selectedWorkflow.data = [];
    this.graph.getCells().forEach(cell => {
      selectedWorkflow.data.push(cell);
    });
    selectedWorkflow.name = name;
    source.handleUpdateWorkflowName(selectedWorkflow);
  };
  saveWorkFlow = () => {
    const { source } = this.props;
    let { selectedWorkflow } = source.sourceState;
    unhighlightCells(this);
    selectedWorkflow.data = [];
    this.graph.getCells().forEach(cell => {
      selectedWorkflow.data.push(cell);
    });
    source.handleUpdateWorkflow(selectedWorkflow);
  };
  editWorkFlow = () => {
    console.log("Edit workflow is clicked");
    this.setState({
      canSave: true,
      canRefresh: false,
      canEdit: false,
      canWatch: true
    });
    this.paper.drawBackground({ color: "white" });
  };
  watchWorkFlow = () => {
    console.log("Watch Workflow is clicked");

    this.setState({
      selectedAction: "Cursor",
      canSave: false,
      canRefresh: true,
      canEdit: true,
      canWatch: true
    });
    if (this.state.canSave) this.saveWorkFlow();
    this.paper.drawBackground({ color: "whitesmoke" });
  };
  refreshWorkFlow = () => {
    console.log("Refresh Workflow is clicked");
  };
  deleteWorkFlow = () => {
    console.log("Delete Workflow is clicked");
    const { source } = this.props;
    let { selectedWorkflow } = source.sourceState;
    source.handleDeleteWorkflow(selectedWorkflow);
  };
  handleElementSettingsClose = () => {
    this.setState({ openElementSetting: false, selectedElementView: null });
  };
  handleElementSettingsOpen = selectedElementView => {
    this.setState({ openElementSetting: true, selectedElementView });
  };
  getSharedObject = () => {
    return {
      designerState: this.state,
      getDrawerWidth: this.getDrawerWidth,
      getToolsBarWidth: this.getToolsBarWidth,
      switchToolsBarView: this.switchToolsBarView,
      changeToolsBoxSelection: this.changeToolsBoxSelection,
      saveWorkFlow: this.saveWorkFlow,
      editWorkFlow: this.editWorkFlow,
      watchWorkFlow: this.watchWorkFlow,
      refreshWorkFlow: this.refreshWorkFlow,
      deleteWorkFlow: this.deleteWorkFlow,
      updateWorkflowName: this.updateWorkflowName,
      handleElementSettingsOpen: this.handleElementSettingsOpen,
      handleElementSettingsClose: this.handleElementSettingsClose
    };
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid
          container
          style={{
            overflow: "auto",
            position: "relative",
            display: "flex"
          }}
        >
          <TopBar {...this.props} designer={this.getSharedObject()} />
          <ToolsBox {...this.props} designer={this.getSharedObject()} />
          <Grid
            item
            className={classes.gridWithoutBorder}
            xs={this.getDrawerWidth()}
          >
            <Grid container className={classes.graph} spacing={0}>
              <div
                style={{
                  position: "absolute"
                }}
                ref="placeholder"
              />
            </Grid>
          </Grid>
        </Grid>
        <ElementSettingsDialog
          {...this.props}
          designer={this.getSharedObject()}
        />
      </React.Fragment>
    );
  }
}

Designer.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Designer);
