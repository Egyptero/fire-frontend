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
  Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  content: {},
  grid: {},
  card: {},
  cardContent: {},
  formControl: {},
  details: {}
});

class NewType extends Component {
  state = {
    name: "",
    description: "",
    channel: "Facebook Page"
  };

  handleDataChange = event => {
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
      channel: this.state.channel
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
      >
        <DialogTitle
          id="form-dialog-title"
          disableTypography
          style={{
            backgroundColor: theme.palette.secondary.dark
          }}
        >
          <Typography
            variant="h6"
            style={{
              color: theme.palette.secondary.contrastText
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
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                multiline
                rows="3"
                onChange={this.handleDataChange}
                name="description"
                label="Description"
                value={this.state.description}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <InputLabel htmlFor="channel-label">Channel</InputLabel>
                <Select
                  value={this.state.channel}
                  name="channel"
                  onChange={this.handleDataChange}
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
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleNewTypeClose}
            color="secondary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={this.handleAddType}
            color="primary"
            variant="contained"
          >
            Save
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
  theme: PropTypes.object.isRequired
};
export default withStyles(styles, { withTheme: true })(NewType);
