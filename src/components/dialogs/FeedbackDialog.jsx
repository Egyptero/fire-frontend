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
  InputLabel,
  FormControl,
  Typography,
  OutlinedInput
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";
import updateFeedback from "../../functions/user/feedback/updateFeedback";
import addFeedback from "../../functions/user/feedback/addFeedback";
import styles from "../primaryapp/appStyles";
class FeedbackDialog extends Component {
  state = {
    head: "New feedback",
    title: "",
    description: "",
    module: "Others",
    type: "Defect"
  };
  componentDidMount() {
    const { edit, app, feedbackId } = this.props;
    if (edit) {
      const feedback = _.filter(
        app.myFeedbacks,
        feedback => feedback._id === feedbackId
      );
      if (feedback.length > 0) this.setInitialState(feedback[0]);
    } else this.setInitialState();
  }
  componentDidUpdate(prevProps, prevState) {
    const { app, edit, feedbackId } = this.props;
    const prevFeedbackId = prevProps.feedbackId;
    if (feedbackId && feedbackId !== prevFeedbackId) {
      // Reload in case of new todoId
      if (edit) {
        const feedback = _.filter(
          app.myFeedbacks,
          feedback => feedback._id === feedbackId
        );
        if (feedback.length > 0) this.setInitialState(feedback[0]);
      }
    } else if (feedbackId === null) {
      if (
        this.props.source.sourceState.openFeedback !==
        prevProps.source.sourceState.openFeedback
      )
        this.setInitialState();
    }
  }
  setInitialState = feedback => {
    if (feedback)
      this.setState({
        head: "Edit feedback",
        title: feedback.title,
        description: feedback.description,
        module: feedback.module,
        type: feedback.type
      });
    else
      this.setState({
        head: "New feedback",
        title: "",
        description: "",
        module: "Others",
        type: "Defect"
      });
  };

  handleDataChange = event => {
    if (event.target.name === "title")
      this.setState({ title: event.target.value });
    else if (event.target.name === "description")
      this.setState({ description: event.target.value });
    else if (event.target.name === "module")
      this.setState({ module: event.target.value });
    else if (event.target.name === "type")
      this.setState({ type: event.target.value });
  };

  handleAddFeedback = () => {
    const { handleClose, edit, feedbackId } = this.props;
    const data = {
      title: this.state.title,
      description: this.state.description,
      module: this.state.module,
      type: this.state.type
    };
    if (edit)
      updateFeedback(feedbackId, data, this, result => {
        if (!result.error) handleClose();
      });
    else
      addFeedback(data, this, result => {
        if (!result.error) handleClose();
      });
  };

  formattedDate = d => {
    const date = new Date(d);
    return date.toISOString().split("T")[0];
  };
  render() {
    const { theme, handleClose, open } = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
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
            {this.state.head}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1} style={{ padding: theme.spacing(2) }}>
            <Grid item xs={6}>
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <InputLabel shrink htmlFor="module-label">
                  Module
                </InputLabel>
                <Select
                  value={this.state.module}
                  onChange={this.handleDataChange}
                  name="module"
                  input={<OutlinedInput labelWidth={60} id="module-label" />}
                >
                  <MenuItem value="Types">Types</MenuItem>
                  <MenuItem value="Workflows">Workflows</MenuItem>
                  <MenuItem value="Skillgroups">Skillgroups</MenuItem>
                  <MenuItem value="Users">Users</MenuItem>
                  <MenuItem value="Dashboard">Dashboard</MenuItem>
                  <MenuItem value="Queues">Queues</MenuItem>
                  <MenuItem value="History">History</MenuItem>
                  <MenuItem value="Organization">Organization</MenuItem>
                  <MenuItem value="Welcome">Welcome</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <InputLabel shrink htmlFor="type-label">
                  Type
                </InputLabel>
                <Select
                  value={this.state.type}
                  onChange={this.handleDataChange}
                  name="type"
                  fullWidth
                  input={<OutlinedInput labelWidth={60} id="type-label" />}
                >
                  <MenuItem value="Feedback">Feedback</MenuItem>
                  <MenuItem value="Question">Question</MenuItem>
                  <MenuItem value="Request">Request</MenuItem>
                  <MenuItem value="Recommendation">Recommendation</MenuItem>
                  <MenuItem value="Requirements">Requirements</MenuItem>
                  <MenuItem value="Defect">Defect</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                onChange={this.handleDataChange}
                name="title"
                label="Title"
                value={this.state.title}
                fullWidth
                required
                //variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                rows="4"
                multiline
                onChange={this.handleDataChange}
                name="description"
                label="Description"
                value={this.state.description}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button
            onClick={this.handleAddFeedback}
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
FeedbackDialog.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  feedbackId: PropTypes.object,
  open: PropTypes.bool.isRequired
};
export default withStyles(styles, { withTheme: true })(FeedbackDialog);
