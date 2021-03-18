import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Dashboard, HourglassEmpty, Traffic } from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "../../primaryapp/appStyles";

class TopList extends Component {
  render() {
    const { handleScreenChange } = this.props.primaryApp;
    const { app } = this.props;
    const { theme } = this.props;
    return (
      <React.Fragment>
        <List>
          {/* <ListItem
            button
            key="My work"
            onClick={() => handleScreenChange("My work")}
            selected={app.screen === "My work"}
            style={
              app.screen === "My work"
                ? {
                    backgroundColor: theme.palette.primary.dark,
                    boxShadow: "1px 1px 2px black"
                  }
                : {}
            }
          >
            <ListItemIcon>
              <Work style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="subtitle2" style={{ color: "white" }}>
                  My work
                </Typography>
              }
            />
          </ListItem> */}

          {/** */}
          <ListItem
            button
            key="Dashboard"
            onClick={() => handleScreenChange("Dashboard")}
            selected={app.screen === "Dashboard"}
            style={
              app.screen === "Dashboard"
                ? {
                    backgroundColor: theme.palette.primary.dark,
                    boxShadow: "1px 1px 2px black",
                  }
                : {}
            }
          >
            <ListItemIcon>
              <Dashboard //style={{ color: "white" }}
                style={
                  app.screen === "Dashboard"
                    ? {
                        color: theme.palette.common.white,
                      }
                    : {}
                }
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle2" //style={{ color: "white" }}
                  style={
                    app.screen === "Dashboard"
                      ? {
                          color: theme.palette.common.white,
                        }
                      : {}
                  }
                >
                  Dashboard
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            button
            key="Queues"
            onClick={() => handleScreenChange("Queues")}
            selected={app.screen === "Queues"}
            style={
              app.screen === "Queues"
                ? {
                    backgroundColor: theme.palette.primary.dark,
                    boxShadow: "1px 1px 2px black",
                  }
                : {}
            }
          >
            <ListItemIcon>
              <HourglassEmpty //style={{ color: "white" }}
                style={
                  app.screen === "Queues"
                    ? {
                        color: theme.palette.common.white,
                      }
                    : {}
                }
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle2" //style={{ color: "white" }}
                  style={
                    app.screen === "Queues"
                      ? {
                          color: theme.palette.common.white,
                        }
                      : {}
                  }
                >
                  Queues
                </Typography>
              }
            />
          </ListItem>
        </List>
        <Divider />
      </React.Fragment>
    );
  }
}
TopList.propTypes = {
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TopList);
