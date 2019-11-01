import React, { Component } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { ExpandMore } from "@material-ui/icons";

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
    minWidth: "100%"
  }
});

class Setting extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid className={classes.content} container spacing={1}>
          <Grid item xs={12} sm={6} md={6} lg={6} className={classes.grid}>
            <Card className={classes.card}>
              <CardHeader title="Tenant Management" />
              <CardContent>
                <ExpansionPanel key="Workflow">
                  <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                    <Typography className={classes.heading}>
                      Workflows setting
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails />
                </ExpansionPanel>
                <ExpansionPanel key="Interaction">
                  <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                    <Typography className={classes.heading}>
                      Interaction types setting
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails />
                </ExpansionPanel>
                <ExpansionPanel key="Skillgroup">
                  <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                    <Typography className={classes.heading}>
                      Skillgroups setting
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails />
                </ExpansionPanel>
                <ExpansionPanel key="User">
                  <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                    <Typography className={classes.heading}>
                      Users setting
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails />
                </ExpansionPanel>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} className={classes.grid}>
            <Card className={classes.card}>
              <CardHeader title="User Management" />
              <CardContent />
            </Card>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

Setting.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Setting);
