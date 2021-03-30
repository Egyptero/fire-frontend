import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Divider,
  LinearProgress,
  CircularProgress,
  Button,
  Box,
  Grid,
} from "@material-ui/core";
import { Menu, AccountCircle, MoreVert, TouchApp } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../primaryapp/appStyles";
import OrganizationSelect from "../../primaryapp/OrganizationSelect";
import FireClientConnect from "../../io/FireClientConnect";
import FireClientStatus from "../../io/FireClientStatus";
import PhoneClient from "../../phone/PhoneClient";
import FeedbackAdd from "../../buttons/add/FeedbackAdd";
import CreateInteractionBtn from "../../buttons/createinteraction/CreateInteractionBtn";
import StatusTimer from "../../io/StatusTimer";

//import FireClient from "../../io/FireClient";

class MainBar extends Component {
  state = {};
  render() {
    const {
      anchorEl,
      primaryAppState,
      handleDrawerOpen,
      handleProfileMenuOpen,
      handleMobileMenuOpen,
    } = this.props.primaryApp;
    const { app } = this.props;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const { myInteractions } = this.props.app;
    return (
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: primaryAppState.open,
        })}
        style={{ height: this.props.theme.spacing(6) }}
      >
        {/* {app.loader.progress != 0 && app.loader.progress != 100 ? (
          <LinearProgress
            variant="determinate"
            value={app.loader.progress} // Reading from progress
          />
        ) : (
          ""
        )} */}

        <Toolbar
          disableGutters={!primaryAppState.open}
          style={{
            minHeight: this.props.theme.spacing(6),
            margin: 0,
            padding: 0,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={classNames(classes.menuButton, {
              [classes.hide]: primaryAppState.open,
            })}
            size="small"
          >
            <Menu />
          </IconButton>

          <div className={classes.sectionDesktop}>
            <div>
              <OrganizationSelect {...this.props} />
            </div>
            <Divider
              style={{
                width: "2px",
                height: "2em",
                marginLeft: "1em",
                marginRight: "1em",
              }}
            />
            <Typography
              className={classes.title}
              variant="caption"
              color="inherit"
              noWrap
            >
              <b>{app.screen}</b>
            </Typography>
            <Divider
              style={{
                width: "2px",
                height: "2em",
                marginLeft: "1em",
                marginRight: "1em",
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
                  height: "2em",
                  marginLeft: "1em",
                  marginRight: "1em",
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
              {this.props.app.buttons &&
              (this.props.app.buttons.ready ||
                this.props.app.buttons.notready ||
                this.props.app.buttons.wrapup) ? (
                <Box>
                  <Grid container direction="column" justify="center" alignItems="center">
                    <Typography variant="caption">In state since</Typography>
                    <StatusTimer {...this.props} variant="subtitle1" />
                  </Grid>
                </Box>
              ) : (
                ""
              )}
            </React.Fragment>
          ) : (
            ""
          )}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop} />

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <CreateInteractionBtn {...this.props} />
            <Divider
              style={{
                width: "2px",
                height: "2em",
                marginLeft: "1em",
                marginRight: "1em",
              }}
            />

            {myInteractions.length > 0 ? (
              <React.Fragment>
                <IconButton
                  color="inherit"
                  onClick={() => {
                    this.props.app.handleScreenChange("My work");
                  }}
                  size="small"
                >
                  <Badge badgeContent={myInteractions.length} color="primary">
                    <TouchApp fontSize="small" />
                  </Badge>
                </IconButton>
                <Divider
                  style={{
                    width: "2px",
                    height: "2em",
                    marginLeft: "1em",
                    marginRight: "1em",
                  }}
                />
              </React.Fragment>
            ) : (
              ""
            )}
            <FeedbackAdd {...this.props} />
            <Divider
              style={{
                width: "2px",
                height: "2em",
                marginLeft: "1em",
                marginRight: "1em",
              }}
            />
            <Typography
              className={classes.title}
              variant="caption"
              color="inherit"
              noWrap
            >
              {app.user.firstname + " " + app.user.lastname + "  "}
            </Typography>

            <IconButton
              aria-owns={isMenuOpen ? "material-appbar" : undefined}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              size="small"
            >
              <AccountCircle fontSize="small" />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              size="small"
            >
              <MoreVert fontSize="small" />
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
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MainBar);
