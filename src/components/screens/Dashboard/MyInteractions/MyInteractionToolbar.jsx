import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import getType from "./getType";
const styles = (theme) => ({
  content: {},
  grid: {},
  gridFull: {},
  card: {},
  cardContent: {},
  formControl: {},
  divider: {
    width: "2px",
    height: theme.spacing(3),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
});

class MyInteractionToolbar extends Component {
  state = {};
  getCustomerName = () => {
    const { theme, classes, app } = this.props;
    const { myInteraction, customers } = app;
    console.log("My interaction", myInteraction);
    if (!myInteraction) return;
    if (!customers) return "Unknown";
    let customerName = "";
    customers.forEach((customer) => {
      console.log("Customer", customer);
      if (customer._id === myInteraction.interaction.customerId)
        customerName = customer.firstname + " " + customer.lastname;
    });
    return customerName;
  };
  openCRMLink = () => {};
  render() {
    const { theme, classes, app } = this.props;
    let { myInteraction } = app;
    let typeinfo = getType(app);
    let customerName = this.getCustomerName();
    //myInteraction.interaction.fromAddress = "+966552735808";
    //myInteraction.interaction.crmlink = "https://www.google.com/search?q="+customerName;

    if (!myInteraction) return <React.Fragment />;

    return (
      <Grid container direction="row">
        <Typography variant="body1">
          <b>{customerName}</b>
        </Typography>
        <Divider className={classes.divider} />
        <Chip
          label={myInteraction.interaction.stage}
          size="small"
          style={{
            width: theme.spacing(10),
            backgroundColor:
              myInteraction.interaction.stage === "Handle"
                ? theme.palette.info.light
                : myInteraction.interaction.stage === "Offer"
                ? theme.palette.error.light
                : myInteraction.interaction.stage === "Hold"
                ? theme.palette.warning.light
                : "inherit",
          }}
        />
        {myInteraction.interaction.fromAddress ? (
          <React.Fragment>
            <Divider className={classes.divider} />
            <Typography variant="body1">
              {myInteraction.interaction.fromAddress}
            </Typography>
          </React.Fragment>
        ) : (
          ""
        )}
        <Divider className={classes.divider} />
        <Typography variant="caption">
          <b>Type:</b> {getType(this.props.app).channel}
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="caption">
          <b>Name:</b> {getType(this.props.app).typeName}
        </Typography>
        {myInteraction.interaction.crmlink ? (
          <React.Fragment>
            <Divider className={classes.divider} />
            <Link
              href={myInteraction.interaction.crmlink}
              onClick={((e) => {
                if (e) e.preventDefault();
              })()}
              variant="caption"
              color="primary"
              target="_blank"
            >
              <b>Open CRM</b>
            </Link>
          </React.Fragment>
        ) : (
          ""
        )}
      </Grid>
    );
  }
}

MyInteractionToolbar.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(MyInteractionToolbar);
