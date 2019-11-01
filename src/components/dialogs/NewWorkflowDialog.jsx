import React, { Component } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  DialogTitle,
  MenuItem,
  Select,
  FormHelperText,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  content: {},
  grid: {},
  card: {},
  cardContent: {},
  formControl: {}
});

class NewWorkflow extends Component {
  state = {
    name: "",
    type: "ROUTE"
  };
  changeWorkflowType = event => {
    this.setState({ type: event.target.value });
  };
  handleDataChange = event => {
    if (event.target.id === "name") this.setState({ name: event.target.value });
  };

  handleAddWorkflow = () => {
    const { source } = this.props;
    source.handleAddWorkflow({
      name: this.state.name,
      type: this.state.type
    });
  };

  render() {
    const { source, classes, theme, app } = this.props;
    const { sourceState, handleNewWorkflowClose } = source;
    const tenantName = app && app.tenant ? app.tenant.name : "FIRE MISC";
    return (
      <Dialog
        open={sourceState.openNewWorkflow}
        onClose={handleNewWorkflowClose}
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
            Add workflow to <b>{tenantName}</b>
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ padding: theme.spacing(2) }}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                onChange={this.handleDataChange}
                id="name"
                label="Workflow Name"
                value={this.state.name}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <InputLabel htmlFor="type-label">Type</InputLabel>
                <Select
                  value={this.state.type}
                  displayEmpty
                  fullWidth
                  className={classes.selectEmpty}
                  onChange={this.changeWorkflowType}
                  input={
                    <OutlinedInput
                      labelWidth={40}
                      name="type"
                      id="type-label"
                    />
                  }
                >
                  <MenuItem value={"ROUTE"}>ROUTE</MenuItem>
                  <MenuItem value={"BOT"}>BOT</MenuItem>
                  <MenuItem value={"IVR"}>IVR</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleNewWorkflowClose}
            color="secondary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={this.handleAddWorkflow}
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
NewWorkflow.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
export default withStyles(styles, { withTheme: true })(NewWorkflow);
