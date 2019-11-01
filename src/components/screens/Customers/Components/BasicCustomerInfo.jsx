import React, { Component } from "react";
import {
  Grid,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Button,
  Select,
  FormControlLabel,
  Switch,
  Avatar
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  content: {
    flexGrow: 1,
    height: "86vh"
  },
  grid: {
    display: "flex",
    position: "relative",
    maxHeight: "100%",
    minHeight: "100%",
    overflow: "hidden"
  },
  gridWithoutBorder: {
    display: "flex",
    position: "relative", //
    height: "79vh",
    maxHeight: "79vh"
  },
  card: {
    display: "flex",
    position: "relative",
    overflow: "hidden",
    maxHeight: "100%",
    minHeight: "100%"
  },
  details: {
    display: "block",
    position: "absolute",
    overflow: "auto",
    height: "78vh",
    maxHeight: "78vh",
    //    minWidth: "100%",
    whiteSpace: "nowrap",
    //width: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": "whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  },
  formControl: {
    margin: theme.spacing(),
    maxWidth: "90%"
  },
  list: {
    width: "100%",
    marginTop: theme.spacing(),
    border: "1px solid",
    borderColor: theme.palette.secondary.dark,
    "border-radius": "5px",
    height: "18em",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": theme.palette.secondary //"whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.secondary.dark, //"rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  },
  listOrganizations: {
    width: "100%",
    marginTop: theme.spacing(),
    border: "1px solid",
    borderColor: theme.palette.secondary.dark,
    "border-radius": "5px",
    height: "6.2em",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": theme.palette.secondary //"whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.secondary.dark, //"rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  },
  listUsers: {
    width: "100%",
    marginTop: theme.spacing(),
    border: "1px solid",
    borderColor: theme.palette.secondary.dark,
    "border-radius": "5px",
    height: "14.7em",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": theme.palette.secondary //"whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.secondary.dark, //"rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  }
});

class BasicCustomerInfo extends Component {
  state = {};
  componentDidMount() {}
  onDataChange = event => {
    const { source } = this.props;
    let { selectedCustomer } = source.sourceState;
    if (event.target.name === "firstname")
      selectedCustomer.firstname = event.target.value;
    if (event.target.name === "lastname")
      selectedCustomer.lastname = event.target.value;
    if (event.target.name === "email")
      selectedCustomer.email = event.target.value;
    if (event.target.name === "username")
      selectedCustomer.username = event.target.value;
    if (event.target.name === "profession")
      selectedCustomer.profession = event.target.value;
    if (event.target.name === "title")
      selectedCustomer.title = event.target.value;

    source.updateSelectedCustomer(selectedCustomer);
  };

  render() {
    const { classes, source } = this.props;
    return (
      <React.Fragment>
        {/* Empty space*/}
        <Grid item xs={12}>
          <p style={{ margin: "2%" }} />
        </Grid>
        {/* Customer profile pic */}
        <Grid item xs={6} sm={5} md={3} lg={3}>
          <FormControl className={classes.formControl}>
            <Avatar
              src="/imgs/nopic.jpg"
              style={{ width: "5em", height: "5em" }}
            />
          </FormControl>
        </Grid>
        {/* Empty space*/}
        <Grid item xs={1} sm={2} md={6} lg={6} />
        {/* Customer Score*/}
        <Grid item xs={6} sm={5} md={3} lg={3}>
          <FormControl className={classes.formControl}>
            <TextField
              name="score"
              label="Score"
              placeholder="Score"
              disabled
              onChange={this.onDataChange}
              value={source.sourceState.selectedCustomer.score}
              fullWidth
              variant="outlined"
            />
          </FormControl>
        </Grid>
        {/* Group First Name , Email */}
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Grid container direction="column">
            {/* User First Name */}
            <FormControl className={classes.formControl}>
              <TextField
                name="firstname"
                label="First name"
                placeholder="First name"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={source.sourceState.selectedCustomer.firstname}
                fullWidth
                //variant="outlined"
              />
            </FormControl>
            {/* User Email */}
            <FormControl className={classes.formControl}>
              <TextField
                name="email"
                label="Email"
                placeholder="Email"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={source.sourceState.selectedCustomer.email}
                type="Email"
                fullWidth
                //variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
        {/* Group Last Name , User Name */}
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Grid container direction="column">
            {/* User Last Name */}
            <FormControl className={classes.formControl}>
              <TextField
                name="lastname"
                label="Last name"
                placeholder="Last name"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={source.sourceState.selectedCustomer.lastname}
                fullWidth
                //variant="outlined"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                name="phone"
                label="Primary Phone"
                placeholder="Primary Phone"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={source.sourceState.selectedCustomer.phone}
                fullWidth
                //variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
        {/* Empty Space*/}
        <Grid item xs={12} sm={6} md={3} lg={3} />
        {/* Group Change Password Button , Shared Agent */}
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Grid container direction="column">
            {/* Title */}
            <FormControl className={classes.formControl}>
              <TextField
                name="title"
                label="Title"
                placeholder="Title"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={source.sourceState.selectedCustomer.title}
                fullWidth
                //variant="outlined"
              />
            </FormControl>
            {/* Profession */}
            <FormControl className={classes.formControl}>
              <TextField
                name="profession"
                label="Profession"
                placeholder="Profession"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={source.sourceState.selectedCustomer.profession}
                fullWidth
                //variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

BasicCustomerInfo.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(BasicCustomerInfo);
