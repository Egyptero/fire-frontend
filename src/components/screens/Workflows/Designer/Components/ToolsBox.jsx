import React, { Component } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  GroupWorkOutlined,
  ControlCameraOutlined,
  FaceOutlined,
  Lens,
  LensOutlined,
  PanTool,
  DeviceHub,
  CallSplit,
  Code,
  VolumeUp,
  Mic,
  ChromeReaderMode,
  RemoveCircleOutline,
  CloudCircleOutlined,
  CloudCircle,
  PlayCircleFilledOutlined,
} from "@material-ui/icons";

const styles = (theme) => ({
  content: {},
  grid: {},
  gridWithBorder: {
    display: "flex",
    position: "relative",
    borderColor: "lightgrey",
    border: 1,
    borderStyle: "solid",
    height: "85vh",
    maxHeight: "85vh",
    overflowY: "auto",
  },
  gridWithoutBorder: {},
  topBar: {},
  list: {
    width: "100%",
  },
  card: {},
  graph: {},
});

class ToolsBox extends Component {
  state = {};
  handleListItemClick = (event, selection) => {
    const { designer } = this.props;
    designer.changeToolsBoxSelection(selection);
  };
  renderBotToolbox = () => {
    const { source, designer } = this.props;
    const { designerState } = designer;
    const { sourceState } = source;
    const { selectedWorkflow } = sourceState;

    if (selectedWorkflow && selectedWorkflow.type === "BOT")
      return (
        <React.Fragment>
          <Divider />
          <ListItem
            button
            selected={designerState.selectedAction === "Wit"}
            onClick={(event) => this.handleListItemClick(event, "Wit")}
            disabled={!designer.designerState.canSave}
          >
            <ListItemIcon>
              <CloudCircleOutlined fontSize="small" />
            </ListItemIcon>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              <ListItemText
                primary="Wit"
                primaryTypographyProps={{ variant: "caption" }}
              />
            </div>
          </ListItem>
          <ListItem
            button
            selected={designerState.selectedAction === "Watson"}
            onClick={(event) => this.handleListItemClick(event, "Watson")}
            disabled={!designer.designerState.canSave}
          >
            <ListItemIcon>
              <CloudCircle fontSize="small" />
            </ListItemIcon>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              <ListItemText
                primary="Watson"
                primaryTypographyProps={{ variant: "caption" }}
              />
            </div>
          </ListItem>
          <ListItem
            button
            selected={designerState.selectedAction === "Speak"}
            onClick={(event) => this.handleListItemClick(event, "Speak")}
            disabled={!designer.designerState.canSave}
          >
            <ListItemIcon>
              <PlayCircleFilledOutlined fontSize="small" />
            </ListItemIcon>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              <ListItemText
                primary="Speak"
                primaryTypographyProps={{ variant: "caption" }}
              />
            </div>
          </ListItem>
        </React.Fragment>
      );
  };
  renderIVRToolbox = () => {
    const { source, designer } = this.props;
    const { designerState } = designer;
    const { sourceState } = source;
    const { selectedWorkflow } = sourceState;

    if (selectedWorkflow && selectedWorkflow.type === "IVR")
      return (
        <React.Fragment>
          <Divider />
          <ListItem
            button
            selected={designerState.selectedAction === "Menu"}
            onClick={(event) => this.handleListItemClick(event, "Menu")}
            disabled={!designer.designerState.canSave}
          >
            <ListItemIcon>
              <ChromeReaderMode fontSize="small" />
            </ListItemIcon>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              <ListItemText
                primary="Menu"
                primaryTypographyProps={{ variant: "caption" }}
              />
            </div>
          </ListItem>
          <ListItem
            button
            selected={designerState.selectedAction === "Input"}
            onClick={(event) => this.handleListItemClick(event, "Input")}
            disabled={!designer.designerState.canSave}
          >
            <ListItemIcon>
              <Mic fontSize="small" />
            </ListItemIcon>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              <ListItemText
                primary="Input"
                primaryTypographyProps={{ variant: "caption" }}
              />
            </div>
          </ListItem>
          <ListItem
            button
            selected={designerState.selectedAction === "Output"}
            onClick={(event) => this.handleListItemClick(event, "Output")}
            disabled={!designer.designerState.canSave}
          >
            <ListItemIcon>
              <VolumeUp fontSize="small" />
            </ListItemIcon>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              <ListItemText
                primary="Output"
                primaryTypographyProps={{ variant: "caption" }}
              />
            </div>
          </ListItem>
          <ListItem
            button
            selected={designerState.selectedAction === "Terminate"}
            onClick={(event) => this.handleListItemClick(event, "Terminate")}
            disabled={!designer.designerState.canSave}
          >
            <ListItemIcon>
              <RemoveCircleOutline fontSize="small" />
            </ListItemIcon>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              <ListItemText
                primary="Terminate"
                primaryTypographyProps={{ variant: "caption" }}
              />
            </div>
          </ListItem>
        </React.Fragment>
      );
  };
  renderRoutingToolbox = () => {
    const { source, designer } = this.props;
    const { designerState } = designer;
    const { sourceState } = source;
    const { selectedWorkflow } = sourceState;

    if (selectedWorkflow && selectedWorkflow.type === "ROUTE")
      return (
        <React.Fragment>
          <ListItem
            button
            selected={designerState.selectedAction === "Queue"}
            onClick={(event) => this.handleListItemClick(event, "Queue")}
            disabled={!designer.designerState.canSave}
          >
            <ListItemIcon>
              <GroupWorkOutlined fontSize="small" />
            </ListItemIcon>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              <ListItemText
                primary="Queue"
                primaryTypographyProps={{ variant: "caption" }}
              />
            </div>
          </ListItem>
        </React.Fragment>
      );
  };

  render() {
    const { classes, designer } = this.props;
    const { designerState } = designer;
    if (designer.getToolsBarWidth() === 2) {
      return (
        <Grid
          item
          className={classes.gridWithBorder}
          xs={designer.getToolsBarWidth()}
        >
          <List className={classes.list} disablePadding>
            <ListItem
              button
              selected={designerState.selectedAction === "Cursor"}
              onClick={(event) => this.handleListItemClick(event, "Cursor")}
              disabled={!designer.designerState.canSave}
            >
              <ListItemIcon>
                <PanTool fontSize="small" />
              </ListItemIcon>
              <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                <ListItemText
                  primary="Cursor"
                  primaryTypographyProps={{ variant: "caption" }}
                />
              </div>
            </ListItem>
            <ListItem
              button
              selected={designerState.selectedAction === "Start"}
              onClick={(event) => this.handleListItemClick(event, "Start")}
              disabled={!designer.designerState.canSave}
            >
              <ListItemIcon>
                <LensOutlined fontSize="small" />
              </ListItemIcon>
              <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                <ListItemText
                  primary="Start"
                  primaryTypographyProps={{ variant: "caption" }}
                />
              </div>
            </ListItem>
            <ListItem
              button
              selected={designerState.selectedAction === "Stop"}
              onClick={(event) => this.handleListItemClick(event, "Stop")}
              disabled={!designer.designerState.canSave}
            >
              <ListItemIcon>
                <Lens fontSize="small" />
              </ListItemIcon>
              <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                <ListItemText
                  primary="Stop"
                  primaryTypographyProps={{ variant: "caption" }}
                />
              </div>
            </ListItem>
            <ListItem
              button
              selected={designerState.selectedAction === "Condition"}
              onClick={(event) => this.handleListItemClick(event, "Condition")}
              disabled={!designer.designerState.canSave}
            >
              <ListItemIcon>
                <ControlCameraOutlined fontSize="small" />
              </ListItemIcon>
              <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                <ListItemText
                  primary="Condition"
                  primaryTypographyProps={{ variant: "caption" }}
                />
              </div>
            </ListItem>
            <Divider />
            {this.renderRoutingToolbox()}
            <ListItem
              button
              selected={designerState.selectedAction === "Bot"}
              onClick={(event) => this.handleListItemClick(event, "Bot")}
              disabled={!designer.designerState.canSave}
            >
              <ListItemIcon>
                <FaceOutlined />
              </ListItemIcon>
              <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                <ListItemText
                  primary="Bot"
                  primaryTypographyProps={{ variant: "caption" }}
                />
              </div>
            </ListItem>
            <ListItem
              button
              selected={designerState.selectedAction === "IVR"}
              onClick={(event) => this.handleListItemClick(event, "IVR")}
              disabled={!designer.designerState.canSave}
            >
              <ListItemIcon>
                <DeviceHub />
              </ListItemIcon>
              <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                <ListItemText
                  primary="IVR"
                  primaryTypographyProps={{ variant: "caption" }}
                />
              </div>
            </ListItem>
            <ListItem
              button
              selected={designerState.selectedAction === "Routing"}
              onClick={(event) => this.handleListItemClick(event, "Routing")}
              disabled={!designer.designerState.canSave}
            >
              <ListItemIcon>
                <CallSplit />
              </ListItemIcon>
              <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                <ListItemText
                  primary="Routing"
                  primaryTypographyProps={{ variant: "caption" }}
                />
              </div>
            </ListItem>
            {this.renderIVRToolbox()}
            <ListItem
              button
              selected={designerState.selectedAction === "Execute"}
              onClick={(event) => this.handleListItemClick(event, "Execute")}
              disabled={!designer.designerState.canSave}
            >
              <ListItemIcon>
                <Code />
              </ListItemIcon>
              <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                <ListItemText
                  primary="Execute"
                  primaryTypographyProps={{ variant: "caption" }}
                />
              </div>
            </ListItem>
            {this.renderBotToolbox()}
          </List>
        </Grid>
      );
    }
    return null;
  }
}

ToolsBox.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  designer: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ToolsBox);
