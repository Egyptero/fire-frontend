import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import UserReportCard from "./Reports/UserReportCard";
import TeamReportCard from "./Reports/TeamReportCard";
import OrganizationReportCard from "./Reports/OrganizationReportCard";
import SkillgroupReportCard from "./Reports/SkillgroupReportCard";
const styles = theme => ({
  content: {
    flexGrow: 1,
    height: "86vh"
  },
  grid: {
    display: "flex",
    position: "relative",
    maxHeight: "100%",
    minHeight: "100%"
  },
  card: {
    overflow: "auto",
    maxHeight: "100%",
    minHeight: "100%",
    minWidth: "100%",
    "&::-webkit-scrollbar": {
      width: "0.4em"
      //height: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  },
  cardContentLong: {
    position: "relative",
    overflow: "auto",
    height: "77.7vh",
    minWidth: "100%",
    "&::-webkit-scrollbar": {
      width: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  }
});

class Reports extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={1}>
        <Grid item lg={8}>
          <Grid container spacing={1}>
            <Grid item lg={4} className={classes.grid}>
              <UserReportCard {...this.props} />
            </Grid>
            <Grid item lg={4} className={classes.grid}>
              <TeamReportCard {...this.props} />
            </Grid>
            <Grid item lg={4} className={classes.grid}>
              <OrganizationReportCard {...this.props} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={4}>
          <Grid item className={classes.grid}>
            <SkillgroupReportCard {...this.props} />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Reports.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Reports);
