import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  DialogTitle,
  Typography,
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

class NewCustomer extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phone: "",
    title: "",
    profession: "",
    facebookId: "",
    twitterId: "",
    linkedId: "",
    smoochId: "",
  };
  componentDidUpdate(prevProps, prevState) {
    const { source } = this.props;
    const { sourceState } = source;
    if (sourceState.openNewCustomer) {
      const { source: preSource } = prevProps;
      const { sourceState: preSourceState } = preSource;
      if (!preSourceState.openNewCustomer) {
        this.setState({
          firstname: "",
          lastname: "",
          username: "",
          email: "",
          phone: "",
          title: "",
          profession: "",
          facebookId: "",
          twitterId: "",
          linkedId: "",
          smoochId: "",
        });
      }
    }
  }

  handleDataChange = (event) => {
    if (event.target.id === "firstname")
      this.setState({ firstname: event.target.value });
    else if (event.target.id === "lastname")
      this.setState({ lastname: event.target.value });
    else if (event.target.id === "username")
      this.setState({ username: event.target.value });
    else if (event.target.id === "email")
      this.setState({ email: event.target.value });
    else if (event.target.id === "phone")
      this.setState({ phone: event.target.value });
    else if (event.target.id === "title")
      this.setState({ title: event.target.value });
    else if (event.target.id === "profession")
      this.setState({ profession: event.target.value });
    else if (event.target.id === "facebookId")
      this.setState({ facebookId: event.target.value });
    else if (event.target.id === "twitterId")
      this.setState({ twitterId: event.target.value });
    else if (event.target.id === "linkedId")
      this.setState({ linkedId: event.target.value });
    else if (event.target.id === "smoochId")
      this.setState({ smoochId: event.target.value });
  };
  handleAddCustomer = () => {
    const { source } = this.props;
    let customer = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: this.state.username,
      email: this.state.email,
      phone: this.state.phone,
      title: this.state.title,
      profession: this.state.profession,
      ids: {
        facebookId: this.state.facebookId,
        twitterId: this.state.twitterId,
        linkedId: this.state.linkedId,
        smoochId: this.state.smoochId,
      },
    };
    source.handleAddCustomer(customer);
  };

  render() {
    const { source, app, theme } = this.props;
    const { sourceState, handleNewCustomerClose } = source;
    const tenantName = app.tenant ? app.tenant.name : "";
    return (
      <Dialog
        open={sourceState.openNewCustomer}
        onClose={handleNewCustomerClose}
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
            Register customer at <b>{tenantName}</b>
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1} style={{ padding: theme.spacing(2) }}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                autoFocus
                margin="dense"
                onChange={this.handleDataChange}
                id="firstname"
                label="First Name"
                value={this.state.firstname}
                fullWidth
                variant="outlined"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                margin="dense"
                onChange={this.handleDataChange}
                id="title"
                label="Tile"
                value={this.state.title}
                fullWidth
                variant="outlined"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                margin="dense"
                onChange={this.handleDataChange}
                id="lastname"
                label="Last Name"
                value={this.state.lastname}
                fullWidth
                variant="outlined"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                margin="dense"
                onChange={this.handleDataChange}
                id="profession"
                label="Profession"
                value={this.state.profession}
                fullWidth
                variant="outlined"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                margin="dense"
                onChange={this.handleDataChange}
                id="username"
                label="User Name"
                value={this.state.username}
                fullWidth
                required
                variant="outlined"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                margin="dense"
                onChange={this.handleDataChange}
                id="phone"
                label="Phone"
                value={this.state.phone}
                fullWidth
                variant="outlined"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                margin="dense"
                onChange={this.handleDataChange}
                id="facebookId"
                label="Facebook Id"
                value={this.state.facebookId}
                fullWidth
                variant="outlined"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                margin="dense"
                onChange={this.handleDataChange}
                id="twitterId"
                label="Twitter Id"
                value={this.state.twitterId}
                fullWidth
                variant="outlined"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                margin="dense"
                onChange={this.handleDataChange}
                id="linkedId"
                label="LinkedIn Id"
                value={this.state.linkedId}
                fullWidth
                variant="outlined"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                margin="dense"
                onChange={this.handleDataChange}
                id="smoochId"
                label="Smooch Id"
                value={this.state.smoochId}
                fullWidth
                variant="outlined"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                margin="dense"
                onChange={this.handleDataChange}
                id="email"
                type="email"
                label="Email"
                value={this.state.email}
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
            onClick={handleNewCustomerClose}
            color="secondary"
            variant="outlined"
            size="small"
          >
            <Cancel fontSize="small" />
          </Button>
          <Button
            onClick={this.handleAddCustomer}
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

NewCustomer.propTypes = {
  source: PropTypes.object.isRequired,
  admin: PropTypes.bool,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  theme: PropTypes.object,
};
export default withStyles(styles, { withTheme: true })(NewCustomer);
