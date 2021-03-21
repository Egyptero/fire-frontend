import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import styles from "../../primaryapp/appStyles";
import { TouchApp } from "@material-ui/icons";

class MainMenu extends React.Component {
  state = {};
  render() {
    const {
      mobileMoreAnchorEl,
      handleMainMenuClose,
      handleProfileMenuOpen
    } = this.props.primaryApp;
    const isMainMenuOpen = Boolean(mobileMoreAnchorEl);
    return (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMainMenuOpen}
        onClose={handleMainMenuClose}
      >
        {/* <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem> */}
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <TouchApp fontSize="small"/>
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle fontSize="small"/>
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
  }
}

MainMenu.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MainMenu);
