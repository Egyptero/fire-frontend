import React, { Component } from "react";
import { Grid, Card, Divider } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CustomerTopBar from "./Components/CustomerTopBar";
import BasicCustomerInfo from "./Components/BasicCustomerInfo";
import CustomerAdvancedInfo from "./Components/CustomerAdvancedInfo";
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
    maxHeight: "83vh",
    //    minWidth: "100%",
    whiteSpace: "nowrap",
    //width: "auto",
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
    margin: theme.spacing(),
    //maxWidth: "90%"
  },
  list: {},
  listOrganizations: {},
  listUsers: {},
});

class CustomerDetails extends Component {
  state = {};
  componentDidMount() {}
  render() {
    const { classes, source } = this.props;
    return (
      <Grid
        item
        xs={12}
        sm={source.getDetailsWidth()}
        md={source.getDetailsWidth()}
        lg={source.getDetailsWidth()}
        className={classes.grid}
      >
        <Card className={classes.card}>
          <Grid
            container
            style={{
              overflow: "auto",
              position: "relative",
              display: "flex",
            }}
          >
            {/** User Topbar running all user capabilities like save , edit , watch */}
            <CustomerTopBar {...this.props} />
            {/**User Details part. Having user basic info and skill management , and advanced management */}
            <Grid item className={classes.gridWithoutBorder} xs={12}>
              <Grid container className={classes.details}>
                <Grid container spacing={0}>
                  {/**Basic Customer Information like pic , name , email */}
                  <BasicCustomerInfo {...this.props} />
                  {/* Divider */}
                  <Grid item xs={12}>
                    <Divider style={{ margin: "1%" }} />
                  </Grid>
                  {/**Advanced Customer Information like phones , emails , Facebook ... etc */}
                  <CustomerAdvancedInfo {...this.props} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  }
}

CustomerDetails.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CustomerDetails);
