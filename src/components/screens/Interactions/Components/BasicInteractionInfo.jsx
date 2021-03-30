import React, { Component } from "react";
import { Grid, TextField, FormControl } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";
import loadCustomer from "../../../../functions/tenant/customer/loadCustomer";
import loadType from "../../../../functions/tenant/type/loadType";

const styles = (theme) => ({
  content: {},
  grid: {
    display: "flex",
    position: "relative",
    maxHeight: "100%",
    minHeight: "100%",
    overflow: "hidden",
  },
  gridWithoutBorder: {
    display: "flex",
    position: "relative", //
    height: "83vh",
    maxHeight: "83vh",
  },
  card: {
    display: "flex",
    position: "relative",
    overflow: "hidden",
    maxHeight: "100%",
    minHeight: "100%",
  },
  details: {
    display: "block",
    position: "absolute",
    overflow: "auto",
    height: "83vh",
    //maxHeight: "83vh",
    whiteSpace: "nowrap",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": "whitesmoke", //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    maxWidth: "100%",
  },
  list: {
    width: "100%",
    marginTop: theme.spacing(1),
    border: "1px solid",
    borderColor: theme.palette.secondary.dark,
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
  listOrganizations: {
    width: "100%",
    marginTop: theme.spacing(1),
    border: "1px solid",
    borderColor: theme.palette.secondary.dark,
    "border-radius": "5px",
    height: "6.2em",
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
  listUsers: {
    width: "100%",
    marginTop: theme.spacing(1),
    border: "1px solid",
    borderColor: theme.palette.secondary.dark,
    "border-radius": "5px",
    height: "14.7em",
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
});

class BasicCustomerInfo extends Component {
  state = {};
  componentDidMount() {}
  onDataChange = (event) => {
    const { source } = this.props;
    let { selectedInteraction } = source.sourceState;
    if (event.target.name === "title")
      selectedInteraction.attached.title = event.target.value;
    if (event.target.name === "description")
      selectedInteraction.attached.description = event.target.value;
    if (event.target.name === "due")
      selectedInteraction.attached.due = event.target.value;

    source.updateSelectedInteraction(selectedInteraction);
  };

  renderTypeData = () => {
    const { source, app } = this.props;
    if (app && app.types) {
      //
      const types = _.filter(
        app.types,
        (type) => type._id === source.sourceState.selectedInteraction.typeId
      );

      if (types.length > 0)
        return (
          <TextField
            name="type"
            label="Type"
            placeholder="Type"
            disabled
            value={`${types[0].name}`}
            fullWidth
            variant="outlined"
            inputProps={{ style: { fontSize: "0.8rem" } }}
            InputLabelProps={{ style: { fontSize: "0.8rem" } }}
          />
        );
      else return <React.Fragment />;
    }
  };
  renderCustomerData = () => {
    const { source, app } = this.props;
    if (app && app.customers) {
      //
      const customers = _.filter(
        app.customers,
        (customer) =>
          customer._id === source.sourceState.selectedInteraction.customerId
      );

      if (customers.length > 0)
        return (
          <TextField
            name="customer"
            label="Customer"
            placeholder="Customer"
            disabled
            value={`${customers[0].firstname} ${customers[0].lastname}`}
            fullWidth
            variant="outlined"
            inputProps={{ style: { fontSize: "0.8rem" } }}
            InputLabelProps={{ style: { fontSize: "0.8rem" } }}
          />
        );
      else return <React.Fragment />;
    }
  };
  render() {
    const { classes, source, theme } = this.props;
    return (
      <React.Fragment>
        {/* Empty space*/}
        <Grid item xs={12}>
          <p style={{ margin: theme.spacing(1) }} />
        </Grid>
        {/* Title and Description */}
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <Grid container direction="column">
            {/* Title */}
            <FormControl className={classes.formControl}>
              <TextField
                name="title"
                label="Title"
                placeholder="Title"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={source.sourceState.selectedInteraction.attached.title}
                fullWidth
                //variant="outlined"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </FormControl>
            {/* Description */}
            <FormControl className={classes.formControl}>
              <TextField
                name="description"
                label="Description"
                multiline
                rows="4"
                placeholder="Description"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={
                  source.sourceState.selectedInteraction.attached.description
                }
                fullWidth
                variant="outlined"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </FormControl>
          </Grid>
        </Grid>
        {/* Type Id , Customer Id*/}
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <Grid container direction="column">
            <FormControl className={classes.formControl} size="small">
              {this.renderTypeData()}
            </FormControl>
            <FormControl className={classes.formControl} size="small">
              {this.renderCustomerData()}
            </FormControl>
            <Grid container>
              <Grid item xs={12} sm={6} lg={6}>
                <Grid container direction="column">
                  <FormControl
                    className={classes.formControl}
                    style={{ width: "90%" }}
                    size="small"
                  >
                    <TextField
                      type="date"
                      label="Start"
                      disabled
                      value={
                        source.sourceState.selectedInteraction.attached.start
                      }
                      //variant="outlined"
                      inputProps={{ style: { fontSize: "0.8rem" } }}
                      InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container direction="column">
                  <FormControl
                    className={classes.formControl}
                    style={{ width: "90%" }}
                    size="small"
                  >
                    <TextField
                      type="date"
                      label="Due"
                      name="due"
                      disabled={!source.sourceState.canSave}
                      onChange={this.onDataChange}
                      value={
                        source.sourceState.selectedInteraction.attached.due
                      }
                      //variant="outlined"
                      inputProps={{ style: { fontSize: "0.8rem" } }}
                      InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
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
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(BasicCustomerInfo);
