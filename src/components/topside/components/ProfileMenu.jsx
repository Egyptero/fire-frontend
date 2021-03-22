import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../primaryapp/appStyles";
import { Typography } from "@material-ui/core";

class ProfileMenu extends React.Component {
  state = {};
  openProfile = () => {
    const { handleMenuClose } = this.props.primaryApp;
    const { handleScreenChange } = this.props.app;
    handleScreenChange("Profile");
    handleMenuClose();
  };
  render() {
    const { anchorEl, handleMenuClose } = this.props.primaryApp;
    const isMenuOpen = Boolean(anchorEl);

    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={this.openProfile}><Typography variant="caption">Profile</Typography></MenuItem>
        <MenuItem onClick={handleMenuClose}><Typography variant="caption">My account</Typography></MenuItem>
        <MenuItem onClick={this.props.app.onLogout}><Typography variant="caption">Logout</Typography></MenuItem>
      </Menu>
    );
  }
}

ProfileMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ProfileMenu);
