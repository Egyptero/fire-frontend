import React, { Component } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  ListItemAvatar
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Add, Refresh } from "@material-ui/icons";
const styles = theme => ({
  content: {
    flexGrow: 1,
    height: "86vh"
  },
  grid: {
    display: "flex",
    position: "relative",
    maxHeight: "100%",
    minHeight: "100%"
  },
  card: {
    overflow: "auto",
    maxHeight: "100%",
    minHeight: "100%",
    minWidth: "100%",
    "&::-webkit-scrollbar": {
      width: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  },
  cardContent: {
    position: "relative",
    overflow: "auto",
    height: "73vh",
    minWidth: "100%",
    "&::-webkit-scrollbar": {
      width: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  },
  details: {},
  formControl: {},
  listOrganizations: {},
  listUsers: {}
});
class UsersList extends Component {
  state = {};
  renderAvatar = user => {
    if (user.pic) return <Avatar src={user.pic} />;
    else return <Avatar>{user.firstname[0]}</Avatar>;
  };
  render() {
    const { classes, source, app } = this.props;
    if (source.getListWidth() === 0) return <React.Fragment />;
    return (
      <Grid
        item
        xs={12}
        sm={source.getListWidth()}
        md={source.getListWidth()}
        lg={source.getListWidth()}
        className={classes.grid}
      >
        <Card className={classes.card}>
          {/** List of users header having the add function as well as reload. We may need to add more filters */}
          <CardHeader
            action={
              <div>
                <IconButton onClick={source.reloadUsers}>
                  <Refresh />
                </IconButton>
                <IconButton onClick={source.handleNewUserClickOpen}>
                  <Add />
                </IconButton>
              </div>
            }
            title="Users"
          />
          <Divider />
          <CardContent className={classes.cardContent}>
            {/** List of users , it will be loaded from the app state. */}
            <List component="nav">
              {app.users
                ? app.users.map((user, index) => {
                    return (
                      <ListItem
                        selected={
                          source.sourceState.selectedUser &&
                          user._id === source.sourceState.selectedUser._id
                        }
                        button
                        key={index}
                        onClick={event =>
                          source.handleListItemClick(event, index)
                        }
                      >
                        <ListItemAvatar>
                          {this.renderAvatar(user)}
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${user.firstname} ${user.lastname}`}
                          secondary={
                            <React.Fragment>{user.role}</React.Fragment>
                          }
                        />
                      </ListItem>
                    );
                  })
                : ""}
            </List>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

UsersList.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(UsersList);
