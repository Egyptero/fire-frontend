import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { IconButton, Drawer } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "../primaryapp/appStyles";
import LeftSideBar from "./components/LeftSideBar";
import { ChevronLeft } from "@material-ui/icons";

class LeftSideDrawer extends React.Component {
  state = {};
  render() {
    const { handleDrawerClose, primaryAppState } = this.props.primaryApp;
    const { classes } = this.props;

    return (
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: primaryAppState.open,
          [classes.drawerClose]: !primaryAppState.open
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: primaryAppState.open,
            [classes.drawerClose]: !primaryAppState.open
          })
        }}
        open={primaryAppState.open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft //style={{ color: "white" }} 
            />
          </IconButton>
        </div>
        <LeftSideBar {...this.props} />
      </Drawer>
    );
  }
}

LeftSideDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(LeftSideDrawer);
