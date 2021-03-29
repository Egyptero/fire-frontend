import React, { Component } from "react";
import {
  Grid,
  TextField,
  FormControl,
  Select,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Divider,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import loadWorkflows from "../../../../functions/tenant/workflow/loadWorkflows";
const styles = (theme) => ({
  content: {
    flexGrow: 1,
    height: "86vh",
  },
  grid: {
    display: "flex",
    position: "relative",
    maxHeight: "100%",
    minHeight: "100%",
    overflow: "hidden",
  },
  gridWithoutBorder: {},
  card: {},
  details: {},
  formControl: {
    margin: theme.spacing(1),
  },
  list: {},
  listOrganizations: {},
  listUsers: {},
});

class BasicTypeInfo extends Component {
  state = {};
  componentDidMount() {
    const { workflows } = this.props.app;
    if (!workflows) loadWorkflows(this);
  }
  onDataChange = (event) => {
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
    const { classes, source, app, theme } = this.props;
    const { workflows } = app;
    return (
      <React.Fragment>
        {/* Empty space*/}
        <Grid item xs={12}>
          <p style={{ margin: theme.spacing(1) }} />
        </Grid>
        {/* Type name */}
        <Grid item xs={6} sm={5} md={3} lg={3}>
          <Grid container direction="column">
            <FormControl className={classes.formControl} size="small">
              <TextField
                name="name"
                label="Type name"
                placeholder="Type name"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={source.sourceState.selectedType.name}
                fullWidth
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={5} md={6} lg={6}></Grid>
        <Grid item xs={6} sm={5} md={3} lg={3}>
          <Grid container direction="column">
            <FormControl className={classes.formControl} size="small">
              <TextField
                name="_id"
                value={source.sourceState.selectedType._id}
                label="Id"
                placeholder="Type Id"
                disabled
                fullWidth
                //variant="outlined"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </FormControl>
          </Grid>
        </Grid>
        {/* Type description */}
        <Grid item xs={12}>
          <Grid container direction="column">
            <FormControl className={classes.formControl} size="small">
              <TextField
                name="description"
                label="Description"
                multiline
                rows="2"
                placeholder="Type description"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={source.sourceState.selectedType.description}
                variant="outlined"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </FormControl>
          </Grid>
        </Grid>
        {/* Type channel */}
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Grid container direction="column">
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel htmlFor="channel-label">
                <Typography variant="caption">Channel</Typography>
              </InputLabel>
              <Select
                value={source.sourceState.selectedType.channel}
                name="channel"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                input={<OutlinedInput labelWidth={60} id="channel-label" />}
              >
                <MenuItem key="Facebook Page" value="Facebook Page">
                  <Typography variant="caption">Facebook Page</Typography>
                </MenuItem>
                <MenuItem key="Facebook DM" value="Facebook DM">
                  <Typography variant="caption">Facebook DM</Typography>
                </MenuItem>
                <MenuItem key="Twitter Account" value="Twitter Account">
                  <Typography variant="caption">Twitter Account</Typography>
                </MenuItem>
                <MenuItem key="Twitter DM" value="Twitter DM">
                  <Typography variant="caption">Twitter DM</Typography>
                </MenuItem>
                <MenuItem key="Intsagram Account" value="Intsagram Account">
                  <Typography variant="caption">Intsagram Account</Typography>
                </MenuItem>
                <MenuItem key="Youtube" value="Youtube">
                  <Typography variant="caption">Youtube</Typography>
                </MenuItem>
                <MenuItem key="Voice" value="Voice">
                  <Typography variant="caption">Voice</Typography>
                </MenuItem>
                <MenuItem key="Vedio" value="Vedio">
                  <Typography variant="caption">Vedio</Typography>
                </MenuItem>
                <MenuItem key="SMS" value="SMS">
                  <Typography variant="caption">SMS</Typography>
                </MenuItem>
                <MenuItem key="Chat" value="Chat">
                  <Typography variant="caption">Chat</Typography>
                </MenuItem>
                <MenuItem key="Email" value="Email">
                  <Typography variant="caption">Email</Typography>
                </MenuItem>
                <MenuItem key="Webrtc" value="Webrtc">
                  <Typography variant="caption">Webrtc</Typography>
                </MenuItem>
                <MenuItem key="WhatsApp Business" value="WhatsApp Business">
                  <Typography variant="caption">WhatsApp Business</Typography>
                </MenuItem>
                <MenuItem key="Project" value="Project">
                  <Typography variant="caption">Project</Typography>
                </MenuItem>
                <MenuItem key="Custom" value="Custom">
                  <Typography variant="caption">Custom</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {/* Type Workflow */}
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Grid container direction="column">
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel htmlFor="workflow-label">
                <Typography variant="caption">Workflow</Typography>
              </InputLabel>
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
                  ? workflows.map((workflow) => {
                      return (
                        <MenuItem key={workflow._id} value={workflow._id}>
                          <Typography variant="caption">
                            {workflow.name}
                          </Typography>
                        </MenuItem>
                      );
                    })
                  : ""}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {/* Divider */}
        <Grid item xs={12}>
          <Divider style={{ margin: "1%" }} />
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
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(BasicTypeInfo);
