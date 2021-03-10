import React, { Component } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Typography
} from "@material-ui/core";
import {
  Group,
  Notes,
  School,
  LocationCity,
  DeviceHub,
  Category,
  CheckCircle,
  Contacts,
//  Settings
} from "@material-ui/icons";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styles from "../../primaryapp/appStyles";

class BottomList extends Component {
  render() {
    const { handleScreenChange } = this.props.primaryApp;
    const { app } = this.props;
    const { theme } = this.props;
    return (
      <React.Fragment>
        <List
        //  style={{ backgroundColor: this.props.theme.palette.secondary.main }}
        >
          <ListItem
            button
            key="Organizations"
            onClick={() => handleScreenChange("Organizations")}
            selected={app.screen === "Organizations"}
            style={
              app.screen === "Organizations"
                ? {
                    backgroundColor: theme.palette.primary.dark,
                    boxShadow: "1px 1px 2px black"
                  }
                : {}
            }
          >
            <ListItemIcon>
              <LocationCity style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="subtitle2" style={{ color: "white" }}>
                  Organizations
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            button
            key="Types"
            onClick={() => handleScreenChange("Types")}
            selected={app.screen === "Types"}
            style={
              app.screen === "Types"
                ? {
                    backgroundColor: theme.palette.primary.dark,
                    boxShadow: "1px 1px 2px black"
                  }
                : {}
            }
          >
            <ListItemIcon>
              <Category style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="subtitle2" style={{ color: "white" }}>
                  Types
                </Typography>
              }
            />
          </ListItem>

          <ListItem
            button
            key="Workflows"
            onClick={() => handleScreenChange("Workflows")}
            selected={app.screen === "Workflows"}
            style={
              app.screen === "Workflows"
                ? {
                    backgroundColor: theme.palette.primary.dark,
                    boxShadow: "1px 1px 2px black"
                  }
                : {}
            }
          >
            <ListItemIcon>
              <DeviceHub style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="subtitle2" style={{ color: "white" }}>
                  Workflows
                </Typography>
              }
            />
          </ListItem>

          <ListItem
            button
            key="Skillgroups"
            onClick={() => handleScreenChange("Skillgroups")}
            selected={app.screen === "Skillgroups"}
            style={
              app.screen === "Skillgroups"
                ? {
                    backgroundColor: theme.palette.primary.dark,
                    boxShadow: "1px 1px 2px black"
                  }
                : {}
            }
          >
            <ListItemIcon>
              <School style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="subtitle2" style={{ color: "white" }}>
                  Skillgroups
                </Typography>
              }
            />
          </ListItem>

          <ListItem
            button
            key="Users"
            onClick={() => handleScreenChange("Users")}
            selected={app.screen === "Users"}
            style={
              app.screen === "Users"
                ? {
                    backgroundColor: theme.palette.primary.dark,
                    boxShadow: "1px 1px 2px black"
                  }
                : {}
            }
          >
            <ListItemIcon>
              <Group style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="subtitle2" style={{ color: "white" }}>
                  Users
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            button
            key="Interactions"
            onClick={() => handleScreenChange("Interactions")}
            selected={app.screen === "Interactions"}
            style={
              app.screen === "Interactions"
                ? {
                    backgroundColor: theme.palette.primary.dark,
                    boxShadow: "1px 1px 2px black"
                  }
                : {}
            }
          >
            <ListItemIcon>
              <CheckCircle style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="subtitle2" style={{ color: "white" }}>
                  Interactions
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            button
            key="Contacts"
            onClick={() => handleScreenChange("Contacts")}
            selected={app.screen === "Contacts"}
            style={
              app.screen === "Contacts"
                ? {
                    backgroundColor: theme.palette.primary.dark,
                    boxShadow: "1px 1px 2px black"
                  }
                : {}
            }
          >
            <ListItemIcon>
              <Contacts style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="subtitle2" style={{ color: "white" }}>
                  Contacts
                </Typography>
              }
            />
          </ListItem>

          {/* 
          Disable logs in MVP
          <ListItem
            button
            key="Logs"
            onClick={() => handleScreenChange("Logs")}
            selected={app.screen === "Logs"}
            style={
              app.screen === "Logs"
                ? {
                    backgroundColor: theme.palette.primary.dark,
                    boxShadow: "1px 1px 2px black"
                  }
                : {}
            }
          >
            <ListItemIcon>
              <Notes style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="subtitle2" style={{ color: "white" }}>
                  Logs
                </Typography>
              }
            />
          </ListItem> */}
          {/* Setting is disabled in MVP 
          <ListItem
            button
            key="Setting"
            onClick={() => handleScreenChange("Setting")}
            selected={app.screen === "Setting"}
            style={
              app.screen === "Setting"
                ? {
                    backgroundColor: theme.palette.primary.dark,
                    boxShadow: "1px 1px 2px black"
                  }
                : {}
            }
          >
            <ListItemIcon>
              <Settings style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="subtitle2" style={{ color: "white" }}>
                  Setting
                </Typography>
              }
            />
          </ListItem> */}
        </List>
      </React.Fragment>
    );
  }
}
BottomList.propTypes = {
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(BottomList);
