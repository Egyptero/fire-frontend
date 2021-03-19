import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { MoreVert } from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { Component } from "react";
const styles = (theme) => ({
  content: {},
  grid: {},
  gridFull:{},
  card: {},
  cardContent: {},
  formControl: {},
  floatButton: {},
});

class TodoItem extends Component {
  state = {
    source: null,
    openMenu: false,
  };
  handleMenuOpen = (event) => {
    this.setState({ openMenu: true, source: event.currentTarget });
  };
  handleMenuClose = () => {
    this.setState({ openMenu: false, source: null });
  };
  renderDetails = (todo) => {
    return (
      <React.Fragment>
        <Typography component="span" variant="body2" color="textPrimary">
          {" "}
          {/**  */}
          {(() => {
            if (todo.due.includes("T"))
              return todo.due.split("T")[0] + " - " + todo.status;
            else return todo.due + " - " + todo.status;
          })()}
        </Typography>
        <br />

        {(() => {
          if (this.props.view === "Detailed") return todo.description;
        })()}
      </React.Fragment>
    );
  };
  render() {
    const { todo, source,theme } = this.props;
    let avatarColor = theme.palette.secondary.light;
    if (todo.priority === "Critical") avatarColor =  theme.palette.error.dark;
    else if (todo.priority === "High") avatarColor =  theme.palette.error.light;
    else if (todo.priority === "Low") avatarColor =  theme.palette.info.light;
    else if (todo.priority === "Medium") avatarColor =  theme.palette.warning.dark;

    if(todo.status === "Completed") avatarColor = theme.palette.success.light;

    return (
      <ListItem key={todo._id}>
        <ListItemAvatar>
          <Avatar style={{ background: avatarColor }}>
            {todo.priority[0]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={todo.title}
          secondary={this.renderDetails(todo)}
        />
        <ListItemSecondaryAction>
          <IconButton
            aria-haspopup="true"
            onClick={(event) => {
              this.handleMenuOpen(event);
            }}
            //color="inherit"
          >
            <MoreVert fontSize="small" />
          </IconButton>
          <Menu
            anchorEl={this.state.source}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={this.state.openMenu}
            onClose={this.handleMenuClose}
          >
            {(() => {
              if (todo.status !== "Completed") {
                return (
                  <MenuItem
                    onClick={() => {
                      source.handleMarkCompleted(todo._id);
                      this.handleMenuClose();
                    }}
                  >
                    Done
                  </MenuItem>
                );
              }
            })()}
            {(() => {
              if (todo.status !== "Progress" && todo.status !== "Completed") {
                return (
                  <MenuItem
                    onClick={() => {
                      source.handleMarkProgress(todo._id);
                      this.handleMenuClose();
                    }}
                  >
                    Progress
                  </MenuItem>
                );
              }
            })()}
            <MenuItem
              onClick={() => {
                source.handleEditTodoOpen(todo._id);
                this.handleMenuClose();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                source.handleDeleteTodo(todo._id);
                this.handleMenuClose();
              }}
            >
              Remove
            </MenuItem>
          </Menu>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

TodoItem.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  todo: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
};
export default withStyles(styles, { withTheme: true })(TodoItem);
