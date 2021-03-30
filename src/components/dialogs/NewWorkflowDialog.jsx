import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Cancel, Save } from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { Component } from "react";
const styles = (theme) => ({
  content: {},
  grid: {},
  card: {},
  cardContent: {},
  formControl: {},
});

class NewWorkflow extends Component {
  state = {
    name: "",
    type: "ROUTE",
  };
  changeWorkflowType = (event) => {
    this.setState({ type: event.target.value });
  };
  handleDataChange = (event) => {
    if (event.target.id === "name") this.setState({ name: event.target.value });
  };

  handleAddWorkflow = () => {
    const { source } = this.props;
    source.handleAddWorkflow({
      name: this.state.name,
      type: this.state.type,
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
            Add workflow to <b>{tenantName}</b>
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ padding: theme.spacing(1) }}>
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
                //variant="outlined"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" style={{ width: "100%"}} size="small">
                <InputLabel htmlFor="type-label">
                  <Typography variant="caption">Type</Typography>
                </InputLabel>
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
                  <MenuItem value={"ROUTE"}>
                    <Typography variant="caption">ROUTE</Typography>
                  </MenuItem>
                  <MenuItem value={"BOT"}>
                    <Typography variant="caption">BOT</Typography>
                  </MenuItem>
                  <MenuItem value={"IVR"}>
                    <Typography variant="caption">IVR</Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleNewWorkflowClose}
            color="secondary"
            variant="outlined"
            size="small"
          >
            <Cancel fontSize="small" />
          </Button>
          <Button
            onClick={this.handleAddWorkflow}
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
NewWorkflow.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(NewWorkflow);
