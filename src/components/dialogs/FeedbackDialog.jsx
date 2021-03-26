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
  OutlinedInput,
  Divider,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";
import updateFeedback from "../../functions/user/feedback/updateFeedback";
import addFeedback from "../../functions/user/feedback/addFeedback";
import styles from "../primaryapp/appStyles";
import { Cancel, Save } from "@material-ui/icons";
class FeedbackDialog extends Component {
  state = {
    head: "Your feedback is valuable to us!",
    title: "",
    description: "",
    module: "Others",
    type: "Defect",
  };
  componentDidMount() {
    const { edit, app, feedbackId } = this.props;
    if (edit) {
      const feedback = _.filter(
        app.myFeedbacks,
        (feedback) => feedback._id === feedbackId
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
          (feedback) => feedback._id === feedbackId
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
  setInitialState = (feedback) => {
    if (feedback)
      this.setState({
        head: "Edit your feedback",
        title: feedback.title,
        description: feedback.description,
        module: feedback.module,
        type: feedback.type,
      });
    else
      this.setState({
        head: "Your feedback is valuable to us!",
        title: "",
        description: "",
        module: "Others",
        type: "Defect",
      });
  };

  handleDataChange = (event) => {
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
      type: this.state.type,
    };
    if (edit)
      updateFeedback(feedbackId, data, this, (result) => {
        if (!result.error) handleClose();
      });
    else
      addFeedback(data, this, (result) => {
        if (!result.error) handleClose();
      });
  };

  formattedDate = (d) => {
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
            {this.state.head}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={1} style={{ padding: theme.spacing(1) }}>
            <Grid item xs={6}>
              <FormControl
                variant="outlined"
                style={{ width: "100%" }}
                size="small"
              >
                <InputLabel shrink htmlFor="module-label">
                  <Typography variant="caption">Module</Typography>
                </InputLabel>
                <Select
                  value={this.state.module}
                  onChange={this.handleDataChange}
                  name="module"
                  input={<OutlinedInput labelWidth={60} id="module-label" />}
                >
                  <MenuItem value="Types">
                    <Typography variant="caption">Types</Typography>
                  </MenuItem>
                  <MenuItem value="Workflows">
                    <Typography variant="caption">Workflows</Typography>
                  </MenuItem>
                  <MenuItem value="Skillgroups">
                    <Typography variant="caption">Skillgroups</Typography>
                  </MenuItem>
                  <MenuItem value="Users">
                    <Typography variant="caption">Users</Typography>
                  </MenuItem>
                  <MenuItem value="Dashboard">
                    <Typography variant="caption">Dashboard</Typography>
                  </MenuItem>
                  <MenuItem value="Queues">
                    <Typography variant="caption">Queues</Typography>
                  </MenuItem>
                  <MenuItem value="History">
                    <Typography variant="caption">History</Typography>
                  </MenuItem>
                  <MenuItem value="Organization">
                    <Typography variant="caption">Organization</Typography>
                  </MenuItem>
                  <MenuItem value="Welcome">
                    <Typography variant="caption">Welcome</Typography>
                  </MenuItem>
                  <MenuItem value="Others">
                    <Typography variant="caption">Others</Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                variant="outlined"
                style={{ width: "100%" }}
                size="small"
              >
                <InputLabel shrink htmlFor="type-label">
                  <Typography variant="caption">Type</Typography>
                </InputLabel>
                <Select
                  value={this.state.type}
                  onChange={this.handleDataChange}
                  name="type"
                  fullWidth
                  input={<OutlinedInput labelWidth={60} id="type-label" />}
                >
                  <MenuItem value="Feedback">
                    <Typography variant="caption">Feedback</Typography>
                  </MenuItem>
                  <MenuItem value="Question">
                    <Typography variant="caption">Question</Typography>
                  </MenuItem>
                  <MenuItem value="Request">
                    <Typography variant="caption">Request</Typography>
                  </MenuItem>
                  <MenuItem value="Recommendation">
                    <Typography variant="caption">Recommendation</Typography>
                  </MenuItem>
                  <MenuItem value="Requirements">
                    <Typography variant="caption">Requirements</Typography>
                  </MenuItem>
                  <MenuItem value="Defect">
                    <Typography variant="caption">Defect</Typography>
                  </MenuItem>
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
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                //variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                rows="6"
                multiline
                onChange={this.handleDataChange}
                name="description"
                label="Description"
                value={this.state.description}
                fullWidth
                variant="outlined"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="secondary"
            variant="outlined"
            size="small"
          >
            <Cancel fontSize="small" />
          </Button>
          <Button
            onClick={this.handleAddFeedback}
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
FeedbackDialog.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  feedbackId: PropTypes.object,
  open: PropTypes.bool.isRequired,
};
export default withStyles(styles, { withTheme: true })(FeedbackDialog);
