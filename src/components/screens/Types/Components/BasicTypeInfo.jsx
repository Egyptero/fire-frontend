import React, { Component } from "react";
import {
  Grid,
  TextField,
  FormControl,
  Select,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Divider
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import loadWorkflows from "../../../../functions/tenant/workflow/loadWorkflows";
const styles = theme => ({
  content: {
    flexGrow: 1,
    height: "86vh"
  },
  grid: {
    display: "flex",
    position: "relative",
    maxHeight: "100%",
    minHeight: "100%",
    overflow: "hidden"
  },
  gridWithoutBorder: {},
  card: {},
  details: {},
  formControl: {
    margin: theme.spacing(1)
  },
  list: {},
  listOrganizations: {},
  listUsers: {}
});

class BasicTypeInfo extends Component {
  state = {};
  componentDidMount() {
    const { workflows } = this.props.app;
    if (!workflows) loadWorkflows(this);
  }
  onDataChange = event => {
    const { source } = this.props;
    let { selectedType } = source.sourceState;
    if (event.target.name === "name") selectedType.name = event.target.value;
    if (event.target.name === "description")
      selectedType.description = event.target.value;
    if (event.target.name === "channel")
      selectedType.channel = event.target.value;
    if (event.target.name === "workflow")
      selectedType.workflowId = event.target.value;

    source.updateSelectedType(selectedType);
  };
  render() {
    const { classes, source, app } = this.props;
    const { workflows } = app;
    return (
      <React.Fragment>
        {/* Empty space*/}
        <Grid item xs={12}>
          <p style={{ margin: "2%" }} />
        </Grid>
        {/* Type name */}
        <Grid item xs={6} sm={5} md={3} lg={3}>
          <Grid container direction="column">
            <FormControl className={classes.formControl}>
              <TextField
                name="name"
                label="Type name"
                placeholder="Type name"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={source.sourceState.selectedType.name}
                fullWidth
              />
            </FormControl>
          </Grid>
        </Grid>
        {/* Empty space*/}
        <Grid item xs={12}>
          <p style={{ margin: "2%" }} />
        </Grid>
        {/* Type description */}
        <Grid item xs={12}>
          <Grid container direction="column">
            <FormControl className={classes.formControl}>
              <TextField
                name="description"
                label="Description"
                multiline
                rows="4"
                placeholder="Type description"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={source.sourceState.selectedType.description}
                variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
        {/* Divider */}
        <Grid item xs={12}>
          <Divider style={{ margin: "1%" }} />
        </Grid>
        {/* Type channel */}
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Grid container direction="column">
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="channel-label">Channel</InputLabel>
              <Select
                value={source.sourceState.selectedType.channel}
                name="channel"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                input={<OutlinedInput labelWidth={60} id="channel-label" />}
              >
                <MenuItem key="Facebook Page" value="Facebook Page">
                  Facebook Page
                </MenuItem>
                <MenuItem key="Facebook DM" value="Facebook DM">
                  Facebook DM
                </MenuItem>
                <MenuItem key="Twitter Account" value="Twitter Account">
                  Twitter Account
                </MenuItem>
                <MenuItem key="Twitter DM" value="Twitter DM">
                  Twitter DM
                </MenuItem>
                <MenuItem key="Intsagram Account" value="Intsagram Account">
                  Intsagram Account
                </MenuItem>
                <MenuItem key="Youtube" value="Youtube">
                  Youtube
                </MenuItem>
                <MenuItem key="Voice" value="Voice">
                  Voice
                </MenuItem>
                <MenuItem key="Vedio" value="Vedio">
                  Vedio
                </MenuItem>
                <MenuItem key="SMS" value="SMS">
                  SMS
                </MenuItem>
                <MenuItem key="Chat" value="Chat">
                  Chat
                </MenuItem>
                <MenuItem key="Email" value="Email">
                  Email
                </MenuItem>
                <MenuItem key="Webrtc" value="Webrtc">
                  Webrtc
                </MenuItem>
                <MenuItem key="WhatsApp Business" value="WhatsApp Business">
                  WhatsApp Business
                </MenuItem>
                <MenuItem key="Project" value="Project">
                  Project
                </MenuItem>
                <MenuItem key="Custom" value="Custom">
                  Custom
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {/* Type Workflow */}
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Grid container direction="column">
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="workflow-label">Workflow</InputLabel>
              <Select
                value={
                  source.sourceState.selectedType.workflowId
                    ? source.sourceState.selectedType.workflowId
                    : ""
                }
                name="workflow"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                input={<OutlinedInput labelWidth={60} id="workflow-label" />}
              >
                {workflows
                  ? workflows.map(workflow => {
                      return (
                        <MenuItem key={workflow._id} value={workflow._id}>
                          {workflow.name}
                        </MenuItem>
                      );
                    })
                  : ""}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container direction="column">
            <FormControl className={classes.formControl}>
              <TextField
                name="_id"
                value={source.sourceState.selectedType._id}
                label="Id"
                disabled
                variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

BasicTypeInfo.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(BasicTypeInfo);
