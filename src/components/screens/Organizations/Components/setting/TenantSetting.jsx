import {
  Grid
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import QualityConfiguration from "./components/QualityConfiguration";
import TenantConfiguration from "./components/TenantConfiguration";
import UserConfiguration from "./components/UserConfiguration";

const styles = (theme) => ({
  content: {},
  grid: {},
  gridWithoutBorder: {},
  card: {},
  details: {},
  formControl: {},
  list: {},
  listOrganizations: {},
  listUsers: {},
});

class TenantSetting extends Component {
  state = {};
  render() {
    const { classes, source, theme } = this.props;
    const { tenant } = source.sourceState;
    if (!tenant) return <React.Fragment />;

    return (
      <React.Fragment>
        {/* Tenant configuration part */}
        <Grid item xs={12} sm={12} md={9} lg={9}>
          <Grid
            container
            direction="column"
            style={{ padding: theme.spacing(2) }}
          >
            <UserConfiguration {...this.props} />
            <QualityConfiguration {...this.props} />
            <TenantConfiguration {...this.props} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

TenantSetting.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TenantSetting);
