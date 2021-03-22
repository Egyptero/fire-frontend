import React, { Component } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Typography,
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
  Input,
  AssignmentLate,
  PermContactCalendar,
  Business,
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
            key="Types"
            onClick={() => handleScreenChange("Types")}
            selected={app.screen === "Types"}
            style={
              app.screen === "Types"
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
            <ListItemIcon style={{ margin: theme.spacing(0) ,minWidth:theme.spacing(5)}}>
              <Input //style={{ color: "white" }}
                style={
                  app.screen === "Types"
                    ? {
                        color: theme.palette.common.white,
                      }
                    : {}
                }
                fontSize="small"
              />
            </ListItemIcon>
            <ListItemText style={{ margin: theme.spacing(0) }}
              primary={
                <Typography
                  variant="caption" //style={{ color: "white" }}
                  style={
                    app.screen === "Types"
                      ? {
                          color: theme.palette.common.white,
                        }
                      : {}
                  }
                >
                  Channels
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
                    boxShadow: "1px 1px 2px black",
                    padding: theme.spacing(1),
                  }
                : {
                    padding: theme.spacing(1),
                  }
            }
          >
            <ListItemIcon style={{ margin: theme.spacing(0) ,minWidth:theme.spacing(5)}}>
              <DeviceHub //style={{ color: "white" }}
                style={
                  app.screen === "Workflows"
                    ? {
                        color: theme.palette.common.white,
                      }
                    : {}
                }
                fontSize="small"
              />
            </ListItemIcon>
            <ListItemText style={{ margin: theme.spacing(0) }}
              primary={
                <Typography
                  variant="caption" //style={{ color: "white" }}
                  style={
                    app.screen === "Workflows"
                      ? {
                          color: theme.palette.common.white,
                        }
                      : {}
                  }
                >
                  Intellgence
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
                    boxShadow: "1px 1px 2px black",
                    padding: theme.spacing(1),
                  }
                : {
                    padding: theme.spacing(1),
                  }
            }
          >
            <ListItemIcon style={{ margin: theme.spacing(0) ,minWidth:theme.spacing(5)}}>
              <School //style={{ color: "white" }}
                style={
                  app.screen === "Skillgroups"
                    ? {
                        color: theme.palette.common.white,
                      }
                    : {}
                }
                fontSize="small"
              />
            </ListItemIcon>
            <ListItemText style={{ margin: theme.spacing(0) }}
              primary={
                <Typography
                  variant="caption" //style={{ color: "white" }}
                  style={
                    app.screen === "Skillgroups"
                      ? {
                          color: theme.palette.common.white,
                        }
                      : {}
                  }
                >
                  Skill-groups
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
                    boxShadow: "1px 1px 2px black",
                    padding: theme.spacing(1),
                  }
                : {
                    padding: theme.spacing(1),
                  }
            }
          >
            <ListItemIcon style={{ margin: theme.spacing(0) ,minWidth:theme.spacing(5)}}>
              <Group //style={{ color: "white" }}
                style={
                  app.screen === "Users"
                    ? {
                        color: theme.palette.common.white,
                      }
                    : {}
                }
                fontSize="small"
              />
            </ListItemIcon>
            <ListItemText style={{ margin: theme.spacing(0) }}
              primary={
                <Typography
                  variant="caption" //style={{ color: "white" }}
                  style={
                    app.screen === "Users"
                      ? {
                          color: theme.palette.common.white,
                        }
                      : {}
                  }
                >
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
                    boxShadow: "1px 1px 2px black",
                    padding: theme.spacing(1),
                  }
                : {
                    padding: theme.spacing(1),
                  }
            }
          >
            <ListItemIcon style={{ margin: theme.spacing(0) ,minWidth:theme.spacing(5)}}>
              <AssignmentLate //style={{ color: "white" }}
                style={
                  app.screen === "Interactions"
                    ? {
                        color: theme.palette.common.white,
                      }
                    : {}
                }
                fontSize="small"
              />
            </ListItemIcon>
            <ListItemText style={{ margin: theme.spacing(0) }}
              primary={
                <Typography
                  variant="caption" //style={{ color: "white" }}
                  style={
                    app.screen === "Interactions"
                      ? {
                          color: theme.palette.common.white,
                        }
                      : {}
                  }
                >
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
                    boxShadow: "1px 1px 2px black",
                    padding: theme.spacing(1),
                  }
                : {
                    padding: theme.spacing(1),
                  }
            }
          >
            <ListItemIcon style={{ margin: theme.spacing(0) ,minWidth:theme.spacing(5)}}>
              <PermContactCalendar //style={{ color: "white" }}
                style={
                  app.screen === "Contacts"
                    ? {
                        color: theme.palette.common.white,
                      }
                    : {}
                }
                fontSize="small"
              />
            </ListItemIcon>
            <ListItemText style={{ margin: theme.spacing(0) }}
              primary={
                <Typography
                  variant="caption" //style={{ color: "white" }}
                  style={
                    app.screen === "Contacts"
                      ? {
                          color: theme.palette.common.white,
                        }
                      : {}
                  }
                >
                  Contacts
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            button
            key="Organizations"
            onClick={() => handleScreenChange("Organizations")}
            selected={app.screen === "Organizations"}
            style={
              app.screen === "Organizations"
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
            <ListItemIcon style={{ margin: theme.spacing(0) ,minWidth:theme.spacing(5)}}>
              {/* style={{ color: "white" }} */}
              <Business
                style={
                  app.screen === "Organizations"
                    ? {
                        color: theme.palette.common.white,
                      }
                    : {}
                }
                fontSize="small"
              />
            </ListItemIcon>
            <ListItemText style={{ margin: theme.spacing(0) }}
              primary={
                <Typography
                  variant="caption" //style={{ color: "white" }}
                  style={
                    app.screen === "Organizations"
                      ? {
                          color: theme.palette.common.white,
                        }
                      : {}
                  }
                >
                  Organization
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
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(BottomList);
