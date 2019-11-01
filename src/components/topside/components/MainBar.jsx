import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Divider
} from "@material-ui/core";
import { Menu, AccountCircle, MoreVert, TouchApp } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../primaryapp/appStyles";
import OrganizationSelect from "../../primaryapp/OrganizationSelect";
import FireClientConnect from "../../io/FireClientConnect";
import FireClientStatus from "../../io/FireClientStatus";
import PhoneClient from "../../phone/PhoneClient";
import FeedbackAdd from "../../buttons/add/FeedbackAdd";

//import FireClient from "../../io/FireClient";

class MainBar extends Component {
  state = {};
  render() {
    const {
      anchorEl,
      primaryAppState,
      handleDrawerOpen,
      handleProfileMenuOpen,
      handleMobileMenuOpen
    } = this.props.primaryApp;
    const { app } = this.props;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const { myInteractions } = this.props.app;
    return (
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: primaryAppState.open
        })}
      >
        <Toolbar disableGutters={!primaryAppState.open}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={classNames(classes.menuButton, {
              [classes.hide]: primaryAppState.open
            })}
          >
            <Menu />
          </IconButton>

          <img
            src="./imgs/firemisc.png"
            alt="firemisc"
            height={this.props.theme.spacing(8)}
            width={this.props.theme.spacing(13)}
          />
          <Divider
            style={{
              width: "2px",
              height: "3em",
              marginLeft: "1em",
              marginRight: "1em"
            }}
          />
          <div className={classes.sectionDesktop}>
            <div>
              <OrganizationSelect {...this.props} />
            </div>
            <Divider
              style={{
                width: "2px",
                height: "3em",
                marginLeft: "1em",
                marginRight: "1em"
              }}
            />
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              {app.screen}
            </Typography>
            <Divider
              style={{
                width: "2px",
                height: "3em",
                marginLeft: "1em",
                marginRight: "1em"
              }}
            />
          </div>
          {app.user && app.sipUA ? (
            <React.Fragment>
              <div>
                <PhoneClient {...this.props} />
              </div>
              <Divider
                style={{
                  width: "2px",
                  height: "3em",
                  marginLeft: "1em",
                  marginRight: "1em"
                }}
              />
            </React.Fragment>
          ) : (
            ""
          )}
          {app.user && app.user.odi ? (
            <React.Fragment>
              <div>
                <FireClientConnect {...this.props} />
              </div>
              <div>
                <FireClientStatus {...this.props} />
              </div>
            </React.Fragment>
          ) : (
            ""
          )}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop} />

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <CreateOrganizationButton
              app={this.props.app}
              primaryApp={this.props.primaryApp}
              enqueueSnackbar={this.props.enqueueSnackbar}
              classes={classes}
            /> */}
            <Typography
              className={classes.title}
              variant="body1"
              color="inherit"
              noWrap
            >
              {app.user.firstname + " " + app.user.lastname}
            </Typography>
            {myInteractions.length > 0 ? (
              <IconButton
                color="inherit"
                onClick={() => {
                  this.props.app.handleScreenChange("My work");
                }}
              >
                <Badge badgeContent={myInteractions.length} color="primary">
                  <TouchApp />
                </Badge>
              </IconButton>
            ) : (
              ""
            )}
            <FeedbackAdd {...this.props} />

            <IconButton
              aria-owns={isMenuOpen ? "material-appbar" : undefined}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreVert />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

MainBar.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MainBar);
