import React, { Component } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Cancel, Save } from "@material-ui/icons";
const styles = (theme) => ({
  content: {},
  grid: {},
  card: {},
  cardContent: {},
  formControl: {},
  details: {},
});
const defaultParams = [
  {
    name: "title",
    label: "Title",
    type: "textfield",
    width:12,
    default: "",
    must: true,
    show: true,
    values: "",
    lookup: "empty",
    edit: false,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    width:12,
    default: "",
    must: true,
    show: true,
    values: "",
    lookup: "empty",
    edit: false,
  },
  {
    name: "startdate",
    label: "Start Date",
    type: "date",
    width:6,
    default: "",
    must: true,
    show: true,
    values: "",
    lookup: "empty",
    edit: false,
  },
  {
    name: "enddate",
    label: "End Date",
    type: "date",
    width:6,    
    default: "",
    must: true,
    show: true,
    values: "",
    lookup: "empty",
    edit: false,
  },
];

class NewType extends Component {
  state = {
    name: "",
    description: "",
    channel: "Facebook Page",
  };

  handleDataChange = (event) => {
    if (event.target.name === "name")
      this.setState({ name: event.target.value });
    else if (event.target.name === "description")
      this.setState({ description: event.target.value });
    else if (event.target.name === "channel")
      this.setState({ channel: event.target.value });
  };

  handleAddType = () => {
    const { source } = this.props;
    source.handleAddType({
      name: this.state.name,
      description: this.state.description,
      channel: this.state.channel,
      configuration:{
        kpis:{},
        params : [...defaultParams]
      }
    });
  };

  render() {
    const { source, app, theme } = this.props;
    const { sourceState, handleNewTypeClose } = source;
    const tenantName = app.tenant ? app.tenant.name : "";
    return (
      <Dialog
        open={sourceState.openNewType}
        onClose={handleNewTypeClose}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
      >
        <DialogTitle
          id="form-dialog-title"
          disableTypography
          style={{
            backgroundColor: theme.palette.secondary.dark,
            padding: theme.spacing(1),
          }}
        >
          <Typography
            variant="subtitle1"
            style={{
              color: theme.palette.secondary.contrastText,
            }}
          >
            Add type to <b>{tenantName}</b>
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ padding: theme.spacing(2) }}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                onChange={this.handleDataChange}
                name="name"
                label="Type name"
                value={this.state.name}
                fullWidth
                required
                //variant="outlined"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                multiline
                rows="2"
                onChange={this.handleDataChange}
                name="description"
                label="Description"
                value={this.state.description}
                fullWidth
                required
                variant="outlined"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                style={{ width: "100%" }}
                size="small"
              >
                <InputLabel htmlFor="channel-label">
                  <Typography variant="caption">Channel</Typography>
                </InputLabel>
                <Select
                  value={this.state.channel}
                  name="channel"
                  onChange={this.handleDataChange}
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
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleNewTypeClose}
            color="secondary"
            variant="outlined"
            size="small"
          >
            <Cancel fontSize="small" />
          </Button>
          <Button
            onClick={this.handleAddType}
            color="primary"
            variant="outlined"
            size="small"
          >
            <Save fontSize="small" />
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

NewType.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(NewType);
