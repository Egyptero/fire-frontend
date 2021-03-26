import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  DialogTitle,
  Typography,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { Cancel, Save } from "@material-ui/icons";
const styles = (theme) => ({
  content: {},
  grid: {},
  card: {},
  cardContent: {},
  details: {},
  formControl: {},
  listOrganizations: {},
  listUsers: {},
});

class NewInteraction extends Component {
  state = {
    typeId: "",
    customerId: "",
    title: "",
    description: "",
    start: "",
    due: "",
  };
  componentDidMount() {
    // console.log("New interaction dialog opened");
    // const { app } = this.props;
    // if (app.tenant && !app.types) loadTypes(this);
    // if (app.tenant && !app.customers) loadCustomers(this);
  }
  componentDidUpdate(prevProps, prevState) {
    const { source } = this.props;
    const { sourceState } = source;
    if (sourceState.openNewInteraction) {
      const { source: preSource } = prevProps;
      const { sourceState: preSourceState } = preSource;
      if (!preSourceState.openNewInteraction) {
        this.setState({
          typeId: "",
          customerId: "",
          title: "",
          description: "",
          start: "",
          due: "",
        });
      }
    }
  }

  handleDataChange = (event) => {
    if (event.target.name === "type")
      this.setState({ typeId: event.target.value });
    else if (event.target.name === "customer")
      this.setState({ customerId: event.target.value });
    else if (event.target.name === "title")
      this.setState({ title: event.target.value });
    else if (event.target.name === "description")
      this.setState({ description: event.target.value });
    else if (event.target.name === "start")
      this.setState({ start: event.target.value });
    else if (event.target.name === "due")
      this.setState({ due: event.target.value });
  };
  handleAddInteraction = () => {
    const { source } = this.props;
    let interaction = {
      customerId: this.state.customerId,
      typeId: this.state.typeId,
      schedule: this.state.start,
      attached: {
        title: this.state.title,
        description: this.state.description,
        start: this.state.start,
        due: this.state.due,
      },
    };
    source.handleAddInteraction(interaction);
  };
  formattedDate = (d) => {
    if (!d) return "";
    const date = new Date(d);
    return date.toISOString().split("T")[0];
  };

  render() {
    const { source, app, theme } = this.props;
    const { sourceState, handleNewInteractionClose } = source;
    const tenantName = app.tenant ? app.tenant.name : "";
    return (
      <Dialog
        open={sourceState.openNewInteraction}
        onClose={handleNewInteractionClose}
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
            Create interaction
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ padding: theme.spacing(1) }}>
            {/** Interaction type */}
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <FormControl
                variant="outlined"
                style={{ width: "100%" }}
                size="small"
              >
                <InputLabel htmlFor="type-label">
                  <Typography variant="caption">Type</Typography>
                </InputLabel>
                <Select
                  value={this.state.typeId}
                  onChange={this.handleDataChange}
                  input={
                    <OutlinedInput
                      labelWidth={40}
                      name="type"
                      id="type-label"
                    />
                  }
                >
                  {app.types
                    ? app.types.map((type) => {
                        if (
                          type.channel === "Custom" ||
                          type.channel === "Project"
                        )
                          return (
                            <MenuItem value={type._id} key={type._id}>
                              <Typography variant="caption">
                                {type.name}
                              </Typography>
                            </MenuItem>
                          );
                        else return "";
                      })
                    : ""}
                </Select>
              </FormControl>
            </Grid>
            {/** Interaction customer */}
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <FormControl
                variant="outlined"
                style={{ width: "100%" }}
                size="small"
              >
                <InputLabel htmlFor="customer-label">
                  <Typography variant="caption">Customer</Typography>
                </InputLabel>
                <Select
                  value={this.state.customerId}
                  onChange={this.handleDataChange}
                  input={
                    <OutlinedInput
                      labelWidth={80}
                      name="customer"
                      id="customer-label"
                    />
                  }
                >
                  {app.customers
                    ? app.customers.map((customer) => {
                        return (
                          <MenuItem value={customer._id} key={customer._id}>
                            <Typography variant="caption">{`${customer.firstname} ${customer.lastname}`}</Typography>
                          </MenuItem>
                        );
                      })
                    : ""}
                </Select>
              </FormControl>
            </Grid>
            {/** Task title */}
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                margin="dense"
                onChange={this.handleDataChange}
                name="title"
                label="Title"
                value={this.state.title}
                required
                //variant="outlined"
                fullWidth
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </Grid>
            {/** Task description */}
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                margin="dense"
                multiline
                rows="6"
                onChange={this.handleDataChange}
                name="description"
                label="Description"
                value={this.state.description}
                variant="outlined"
                fullWidth
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </Grid>
            {/** Schedule interaction */}
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                margin="dense"
                onChange={this.handleDataChange}
                name="start"
                label="Start"
                value={this.formattedDate(this.state.start)}
                type="Date"
                placeholder=""
                variant="outlined"
                fullWidth
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{
                  style: { fontSize: "0.8rem" },
                  shrink: true,
                }}
              />
            </Grid>
            {/** Due interaction */}
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                margin="dense"
                onChange={this.handleDataChange}
                name="due"
                label="Due"
                value={this.formattedDate(this.state.due)}
                type="Date"
                placeholder=""
                variant="outlined"
                fullWidth
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{
                  style: { fontSize: "0.8rem" },
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleNewInteractionClose}
            color="secondary"
            variant="outlined"
            size="small"
          >
            <Cancel fontSize="small" />
          </Button>
          <Button
            onClick={this.handleAddInteraction}
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

NewInteraction.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(NewInteraction);
