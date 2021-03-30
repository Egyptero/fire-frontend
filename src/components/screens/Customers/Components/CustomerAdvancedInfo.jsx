import React, { Component } from "react";
import {
  Grid,
  FormControl,
  TextField,
  FormLabel,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";
const styles = (theme) => ({
  content: {},
  grid: {},
  gridWithoutBorder: {},
  card: {},
  details: {},
  formControl: {
    margin: theme.spacing(),
    maxWidth: "90%",
  },
  list: {
    width: "100%",
    marginTop: theme.spacing(),
    border: "1px solid",
    borderColor: theme.palette.secondary.light,
    "border-radius": "5px",
    height: "18em",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": theme.palette.secondary, //"whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.secondary.dark, //"rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  listOrganizations: {},
  listUsers: {},
});

class CustomerAdvancedInfo extends Component {
  state = {
    selectedUserEmail: "",
    selectedUserPhone: "",
    newPhone: "",
    newEmail: "",
  };
  onChange = (event) => {
    if (event.target.name === "newemail")
      this.setState({ newEmail: event.target.value });
    if (event.target.name === "newphone")
      this.setState({ newPhone: event.target.value });
  };
  onDataChange = (event) => {
    const { source } = this.props;
    let { selectedCustomer } = source.sourceState;
    if (event.target.name === "phone")
      selectedCustomer.phone = event.target.value;
    if (event.target.name === "facebookId")
      selectedCustomer.ids.facebookId = event.target.value;
    if (event.target.name === "twitterId")
      selectedCustomer.ids.twitterId = event.target.value;
    if (event.target.name === "linkedId")
      selectedCustomer.ids.linkedId = event.target.value;
    if (event.target.name === "googleId")
      selectedCustomer.ids.googleId = event.target.value;
    if (event.target.name === "instagramId")
      selectedCustomer.ids.instagramId = event.target.value;
    if (event.target.name === "smoochId")
      selectedCustomer.ids.smoochId = event.target.value;

    source.updateSelectedCustomer(selectedCustomer);
  };
  removeEmail = () => {
    const { source } = this.props;
    let { selectedCustomer } = source.sourceState;
    selectedCustomer.emails = _.filter(
      selectedCustomer.emails,
      (email) => email !== this.state.selectedUserEmail
    );
    source.updateSelectedCustomer(selectedCustomer);
    this.setState({ selectedUserEmail: "" });
  };
  addEmail = () => {
    if (!this.state.newEmail) return;
    const { source, enqueueSnackbar } = this.props;
    let { selectedCustomer } = source.sourceState;
    if (selectedCustomer.email === this.state.newEmail) {
      enqueueSnackbar("Same email exist already");
      return;
    }
    if (selectedCustomer.emails) {
      const found = _.filter(
        selectedCustomer.emails,
        (email) => email === this.state.newEmail
      );
      if (found && found.length > 0) {
        enqueueSnackbar("Same email exist already");
        return;
      }
    } else selectedCustomer.emails = [];
    selectedCustomer.emails.push(this.state.newEmail);
    source.updateSelectedCustomer(selectedCustomer);
    this.setState({ newEmail: "" });
  };
  renderUserEmail = (email) => {
    const { source ,theme} = this.props;
    return (
      <ListItem
        disabled={!source.sourceState.canSave}
        selected={email === this.state.selectedUserEmail}
        style={{ padding: "2%" }}
        key={email}
        onClick={() => {
          if (source.sourceState.canSave)
            this.setState({ selectedUserEmail: email });
        }}
        style={{padding:theme.spacing(1) * 0.2}}
      >
        <ListItemText
          primary={email}
          primaryTypographyProps={{ variant: "caption" }}
          style={{padding:theme.spacing(0)}}
        />
        {email === this.state.selectedUserEmail ? (
          <ListItemSecondaryAction style={{padding:theme.spacing(0)}}>
            <Button
              disabled={!source.sourceState.canSave}
              variant="text"
              size="small"
              color="primary"
              onClick={this.removeEmail}
              style={{ textTransform: "none" }}
            >
              <Typography variant="small">Remove</Typography>
            </Button>
          </ListItemSecondaryAction>
        ) : (
          ""
        )}
      </ListItem>
    );
  };
  removePhone = () => {
    const { source } = this.props;
    let { selectedCustomer } = source.sourceState;
    selectedCustomer.phones = _.filter(
      selectedCustomer.phones,
      (phone) => phone !== this.state.selectedUserPhone
    );
    source.updateSelectedCustomer(selectedCustomer);
    this.setState({ selectedUserPhone: "" });
  };
  addPhone = () => {
    if (!this.state.newPhone) return;
    const { source, enqueueSnackbar } = this.props;
    let { selectedCustomer } = source.sourceState;
    if (selectedCustomer.phone === this.state.newPhone) {
      enqueueSnackbar("Same phone exist already");
      return;
    }
    if (selectedCustomer.phones) {
      const found = _.filter(
        selectedCustomer.phones,
        (phone) => phone === this.state.newPhone
      );
      if (found && found.length > 0) {
        enqueueSnackbar("Same phone exist already");
        return;
      }
    } else selectedCustomer.phones = [];
    selectedCustomer.phones.push(this.state.newPhone);
    source.updateSelectedCustomer(selectedCustomer);
    this.setState({ newPhone: "" });
  };
  renderUserPhone = (phone) => {
    const { source,theme } = this.props;
    return (
      <ListItem
        disabled={!source.sourceState.canSave}
        selected={phone === this.state.selectedUserPhone}
        style={{ padding: "2%" }}
        key={phone}
        onClick={() => {
          if (source.sourceState.canSave)
            this.setState({ selectedUserPhone: phone });
        }}
        style={{padding:theme.spacing(1) * 0.2}}
      >
        <ListItemText
          primary={phone}
          primaryTypographyProps={{ variant: "caption" }}
          style={{padding:theme.spacing(0)}}
        />
        {phone === this.state.selectedUserPhone ? (
          <ListItemSecondaryAction style={{padding:theme.spacing(0)}}>
            <Button
              disabled={!source.sourceState.canSave}
              variant="text"
              size="small"
              color="primary"
              onClick={this.removePhone}
              style={{ textTransform: "none" }}
            >
              <Typography variant="caption">Remove</Typography>
            </Button>
          </ListItemSecondaryAction>
        ) : (
          ""
        )}
      </ListItem>
    );
  };
  render() {
    const { classes, source,theme } = this.props;
    const { selectedCustomer } = source.sourceState;
    return (
      <React.Fragment>
        {/** Other emails */}
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <Grid container direction="column">
            {/** Other emails */}
            <FormControl className={classes.formControl} size="small">
              <FormLabel disabled={!source.sourceState.canSave}>
                <Typography variant="caption">Other emails</Typography>
              </FormLabel>
              <List
                disabled={!source.sourceState.canSave}
                className={classes.list}
                disablePadding
              >
                <ListItem style={{padding:theme.spacing(1) * 0.2}}>
                  <TextField
                    disabled={!source.sourceState.canSave}
                    value={this.state.newEmail}
                    name="newemail"
                    onChange={this.onChange}
                    style={{
                      width: "80%",
                      padding: "0",
                    }}
                    inputProps={{ style: { fontSize: "0.8rem" } }}
                    InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                    
                  />

                  <ListItemSecondaryAction style={{padding:theme.spacing(0)}}>
                    <Button
                      disabled={!source.sourceState.canSave}
                      variant="text"
                      color="primary"
                      size="small"
                      onClick={this.addEmail}
                      style={{ textTransform: "none" }}
                    >
                      <Typography variant="caption">Add</Typography>
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
                {selectedCustomer && selectedCustomer.emails
                  ? selectedCustomer.emails.map((email) => {
                      return this.renderUserEmail(email);
                    })
                  : ""}
              </List>
            </FormControl>
          </Grid>
        </Grid>
        {/** Other phones */}
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <Grid container direction="column">
            {/** Other phones */}
            <FormControl className={classes.formControl} size="small">
              <FormLabel disabled={!source.sourceState.canSave}>
                <Typography variant="caption">Other phones</Typography>
              </FormLabel>
              <List
                disabled={!source.sourceState.canSave}
                className={classes.list}
                disablePadding
              >
                <ListItem style={{padding:theme.spacing(1) * 0.2}}>
                  <TextField
                    disabled={!source.sourceState.canSave}
                    value={this.state.newPhone}
                    name="newphone"
                    onChange={this.onChange}
                    style={{
                      width: "80%",
                      padding: "0",
                    }}
                    inputProps={{ style: { fontSize: "0.8rem" } }}
                    InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                  />

                  <ListItemSecondaryAction style={{padding:theme.spacing(0)}}>
                    <Button
                      disabled={!source.sourceState.canSave}
                      variant="text"
                      color="primary"
                      size="small"
                      onClick={this.addPhone}
                      style={{ textTransform: "none" }}
                    >
                      <Typography variant="caption">Add</Typography>
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
                {selectedCustomer && selectedCustomer.phones
                  ? selectedCustomer.phones.map((phone) => {
                      return this.renderUserPhone(phone);
                    })
                  : ""}
              </List>
            </FormControl>
          </Grid>
        </Grid>
        {/* IDs*/}
        <Grid item xs={12} sm={3} md={3} lg={3}>
          <Grid container direction="column">
            {/* Customer User Name */}
            <FormControl className={classes.formControl} size="small">
              <TextField
                name="username"
                label="User"
                placeholder="User"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={source.sourceState.selectedCustomer.username}
                fullWidth
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}

                //variant="outlined"
              />
            </FormControl>
            <FormControl className={classes.formControl} size="small">
              <TextField
                name="facebookId"
                label="Facebook ID"
                placeholder="Facebook ID"
                disabled
                onChange={this.onDataChange}
                value={source.sourceState.selectedCustomer.ids.facebookId}
                fullWidth
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}

                //variant="outlined"
              />
            </FormControl>
            <FormControl className={classes.formControl} size="small">
              <TextField
                name="twitterId"
                label="Twitter ID"
                placeholder="Twitter ID"
                disabled
                onChange={this.onDataChange}
                value={source.sourceState.selectedCustomer.ids.twitterId}
                fullWidth
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}

                //variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
        {/* Group of controls (Mode , Manager , Organization , Add Organization*/}
        <Grid item xs={12} sm={3} md={3} lg={3}>
          <Grid container direction="column">
            <FormControl className={classes.formControl} size="small">
              <TextField
                name="linkedId"
                label="Linkedin ID"
                placeholder="Linkedin ID"
                disabled
                onChange={this.onDataChange}
                value={source.sourceState.selectedCustomer.ids.linkedId}
                fullWidth
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}

                //variant="outlined"
              />
            </FormControl>
            <FormControl className={classes.formControl} size="small">
              <TextField
                name="googleId"
                label="Google ID"
                placeholder="Google ID"
                disabled
                onChange={this.onDataChange}
                value={source.sourceState.selectedCustomer.ids.googleId}
                fullWidth
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}

                //variant="outlined"
              />
            </FormControl>
            <FormControl className={classes.formControl} size="small">
              <TextField
                name="instagramId"
                label="Instagram ID"
                placeholder="Instagram ID"
                disabled
                onChange={this.onDataChange}
                value={source.sourceState.selectedCustomer.ids.instagramId}
                fullWidth
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}

                //variant="outlined"
              />
            </FormControl>
            <FormControl className={classes.formControl} size="small">
              <TextField
                name="smoochId"
                label="Smooch ID"
                placeholder="Smooch ID"
                disabled
                onChange={this.onDataChange}
                value={source.sourceState.selectedCustomer.ids.smoochId}
                fullWidth
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}

                //variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

CustomerAdvancedInfo.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CustomerAdvancedInfo);
