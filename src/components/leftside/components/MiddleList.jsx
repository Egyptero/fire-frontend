import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Assignment, History, Event } from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "../../primaryapp/appStyles";

class MiddelList extends Component {
  state = {};
  render() {
    const { handleScreenChange } = this.props.primaryApp;
    const { app } = this.props;
    const { theme } = this.props;
    return (
      <React.Fragment>
        <List
        // style={{ backgroundColor: this.props.theme.palette.secondary.main }}
        >
          {/* Code was disabled as email and chat function are not ready yet.
          <ListItem
            button
            key="Email"
            onClick={() => handleScreenChange("Email")}
          >
            <ListItemIcon>
              <Email />
            </ListItemIcon>
            <ListItemText primary="Email" />
          </ListItem>
          <ListItem
            button
            key="Chat"
            onClick={() => handleScreenChange("Chat")}
          >
            <ListItemIcon>
              <Chat />
            </ListItemIcon>
            <ListItemText primary="Chat" />
          </ListItem> */}
          <ListItem
            button
            key="Activities"
            onClick={() => handleScreenChange("Activities")}
            selected={app.screen === "Activities"}
            style={
              app.screen === "Activities"
                ? {
                    backgroundColor: theme.palette.primary.dark,
                    boxShadow: "1px 1px 2px black",
                    padding: theme.spacing(1),
                  }
                : {
                    padding: theme.spacing(1),
                  }
            }
          >
            <ListItemIcon
              style={{ margin: theme.spacing(0), minWidth: theme.spacing(5) }}
            >
              <Event //style={{ color: "white" }}
                style={
                  app.screen === "Activities"
                    ? {
                        color: theme.palette.common.white,
                        fontSize:18
                      }
                    : {
                      fontSize:18
                    }
                }
                //fontSize="small"
              />
            </ListItemIcon>
            <ListItemText
              style={{ margin: theme.spacing(0) }}
              primary={
                <Typography
                  variant="caption" //style={{ color: "white" }}
                  style={
                    app.screen === "Activities"
                      ? {
                          color: theme.palette.common.white,
                        }
                      : {}
                  }
                >
                  Activities
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            button
            key="History"
            onClick={() => handleScreenChange("History")}
            selected={app.screen === "History"}
            style={
              app.screen === "History"
                ? {
                    backgroundColor: theme.palette.primary.dark,
                    boxShadow: "1px 1px 2px black",
                    padding: theme.spacing(1),
                  }
                : {
                    padding: theme.spacing(1),
                  }
            }
          >
            <ListItemIcon
              style={{ margin: theme.spacing(0), minWidth: theme.spacing(5) }}
            >
              <History //style={{ color: "white" }}
                style={
                  app.screen === "History"
                    ? {
                        color: theme.palette.common.white,
                        fontSize:18
                      }
                    : {
                      fontSize:18
                    }
                }
                //fontSize="small"
              />
            </ListItemIcon>
            <ListItemText
              style={{ margin: theme.spacing(0) }}
              primary={
                <Typography
                  variant="caption" //style={{ color: "white" }}
                  style={
                    app.screen === "History"
                      ? {
                          color: theme.palette.common.white,
                        }
                      : {}
                  }
                >
                  History
                </Typography>
              }
            />
          </ListItem>
          {/* Code will be disabled to disable reports in MVP version 
          <ListItem
            button
            key="Reports"
            onClick={() => handleScreenChange("Reports")}
            selected={app.screen === "Reports"}
            style={
              app.screen === "Reports"
                ? {
                    backgroundColor: theme.palette.primary.dark,
                    boxShadow: "1px 1px 2px black"
                  }
                : {}
            }
          >
            <ListItemIcon>
              <BarChart style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="subtitle2" style={{ color: "white" }}>
                  Reports
                </Typography>
              }
            />
          </ListItem> */}
        </List>
        <Divider />
      </React.Fragment>
    );
  }
}
MiddelList.propTypes = {
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiddelList);
