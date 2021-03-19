import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { IconButton, Drawer, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "../primaryapp/appStyles";
import LeftSideBar from "./components/LeftSideBar";
import { ChevronLeft } from "@material-ui/icons";

class LeftSideDrawer extends React.Component {
  state = {};
  render() {
    const { handleDrawerClose, primaryAppState } = this.props.primaryApp;
    const { classes, theme } = this.props;

    return (
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: primaryAppState.open,
          [classes.drawerClose]: !primaryAppState.open,
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: primaryAppState.open,
            [classes.drawerClose]: !primaryAppState.open,
          }),
        }}
        open={primaryAppState.open}
      >
        {/* <div className={classes.toolbar}> */}
        <Grid
          container
          style={{ height: theme.spacing(10) }}
          alignItems="center"
          alignContent="center"
          justify="center"
        >
          {primaryAppState.open ? (
            <React.Fragment>
              <Grid item xs={9}>
                <Grid
                  container
                  alignItems="center"
                  alignContent="center"
                  justify="center"
                >
                  <img
                    src="./imgs/firemisc.png"
                    alt="firemisc"
                    height={theme.spacing(9)}
                    width={theme.spacing(15)}
                  />
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeft //style={{ color: "white" }}
                  />
                </IconButton>
              </Grid>
            </React.Fragment>
          ) : (
            ""
          )}
        </Grid>
        {/* </div> */}
        <LeftSideBar {...this.props} />
      </Drawer>
    );
  }
}

LeftSideDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(LeftSideDrawer);
