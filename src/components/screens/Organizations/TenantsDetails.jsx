import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import TenantData from "./TenantData";

const styles = theme => ({
  root: {
    display: "flex"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  button: {
    margin: theme.spacing(1)
  }
});

class TenantsDetails extends Component {
  render() {
    let { classes, source } = this.props;
    let { sourceState } = source;

    if (
      !sourceState.tenants ||
      (sourceState.tenants && sourceState.tenants.length < 1)
    )
      return (
        <Typography paragraph>
          No organizations are registered. Please add one
        </Typography>
      );
    return (
      <React.Fragment>
        {sourceState.tenants.map((tenant, index) => {
          return (
            <Accordion key={tenant.name}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography className={classes.heading}>
                  {tenant.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TenantData
                  app={this.props.app}
                  primaryApp={this.props.primaryApp}
                  enqueueSnackbar={this.props.enqueueSnackbar}
                  source={this.props.source}
                  tenant={tenant}
                  index={index}
                />
              </AccordionDetails>
            </Accordion >
          );
        })}
      </React.Fragment>
    );
  }
}
TenantsDetails.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TenantsDetails);
