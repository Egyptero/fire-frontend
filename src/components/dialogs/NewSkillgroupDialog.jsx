import React, { Component } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  DialogTitle,
  Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  content: {},
  grid: {},
  card: {},
  cardContent: {},
  details: {},
  formControl: {},
  listOrganizations: {},
  listUsers: {}
});

class NewSkillgroup extends Component {
  state = {
    name: "",
    description: ""
  };

  handleDataChange = event => {
    if (event.target.id === "name") this.setState({ name: event.target.value });
    else if (event.target.id === "description")
      this.setState({ description: event.target.value });
  };

  handleAddSkillgroup = () => {
    const { source } = this.props;
    source.handleAddSkillgroup({
      name: this.state.name,
      description: this.state.description
    });
  };

  render() {
    const { source, app, theme } = this.props;
    const { sourceState, handleNewSkillgroupClose } = source;
    const tenantName = app.tenant ? app.tenant.name : "";
    return (
      <Dialog
        open={sourceState.openNewSkillgroup}
        onClose={handleNewSkillgroupClose}
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
            Add skillgroup to <b>{tenantName}</b>
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
                label="Skill Name"
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
                id="description"
                label="Description"
                value={this.state.description}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleNewSkillgroupClose}
            color="secondary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={this.handleAddSkillgroup}
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

NewSkillgroup.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
export default withStyles(styles, { withTheme: true })(NewSkillgroup);
