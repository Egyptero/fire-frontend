import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  ListItem,
  Avatar,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  ListItemAvatar,
  Grid
} from "@material-ui/core";
import {
  MoreVert,
  Check,
  Close,
  Pause,
  PlayArrow,
  CallMade,
  CallMerge,
  Remove
} from "@material-ui/icons";
const styles = theme => ({
  content: {},
  grid: {},
  card: {},
  cardContent: {},
  formControl: {}
});

class MyInteractionsItem extends Component {
  state = {
    source: null,
    openMenu: false
  };
  handleMenuOpen = event => {
    this.setState({ openMenu: true, source: event.currentTarget });
  };
  handleMenuClose = () => {
    this.setState({ openMenu: false, source: null });
  };
  render() {
    const { classes, myInteraction, source, app } = this.props;
    let avatarColor = "grey";
    //We should define here AVATAR type based on interaction type
    //We will need to load type if it is not their.

    // if (myInteraction.priority === "Critical") avatarColor = "darkred";
    // else if (myInteraction.priority === "High") avatarColor = "red";
    // else if (myInteraction.priority === "Low") avatarColor = "gray";

    return (
      <ListItem key={myInteraction.interaction._id}>
        <ListItemAvatar>
          <Avatar style={{ background: avatarColor }}>
            {/* {myInteraction.priority[0]} */}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={myInteraction.interaction.attached.title}
          secondary={
            <Grid container direction="column">
              <Typography
                component="span"
                className={classes.inline}
                color="textPrimary"
              >
                {(() => {
                  if (myInteraction.interaction.schedule.includes("T"))
                    return (
                      myInteraction.interaction.schedule.split("T")[0] +
                      " - " +
                      myInteraction.interaction.stage
                    );
                  else
                    return (
                      myInteraction.interaction.schedule +
                      " - " +
                      myInteraction.interaction.stage
                    );
                })()}
              </Typography>

              {(() => {
                if (this.props.view === "Detailed")
                  return myInteraction.interaction.attached.description;
              })()}
            </Grid>
          }
        />
        <ListItemSecondaryAction>
          {this.props.fullScreen && myInteraction.buttons.accept ? (
            <Tooltip title="Accept">
              <IconButton
                aria-haspopup="true"
                onClick={event => {
                  app.handleAcceptInteraction(myInteraction.interaction._id);
                }}
              >
                <Check fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            ""
          )}
          {this.props.fullScreen && myInteraction.buttons.reject ? (
            <Tooltip title="Reject">
              <IconButton
                aria-haspopup="true"
                onClick={event => {
                  app.handleRejectInteraction(myInteraction.interaction._id);
                }}
              >
                <Close fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            ""
          )}
          {this.props.fullScreen && myInteraction.buttons.hold ? (
            <Tooltip title="Hold">
              <IconButton
                aria-haspopup="true"
                onClick={event => {
                  app.handleHoldInteraction(myInteraction.interaction._id);
                }}
              >
                <Pause fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            ""
          )}
          {this.props.fullScreen && myInteraction.buttons.resume ? (
            <Tooltip title="Resume">
              <IconButton
                aria-haspopup="true"
                onClick={event => {
                  app.handleResumeInteraction(myInteraction.interaction._id);
                }}
              >
                <PlayArrow fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            ""
          )}
          {this.props.fullScreen && myInteraction.buttons.close ? (
            <Tooltip title="Close">
              <IconButton
                aria-haspopup="true"
                onClick={event => {
                  app.handleCloseInteraction(myInteraction.interaction._id);
                }}
              >
                <Close fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            ""
          )}
          {this.props.fullScreen && myInteraction.buttons.transfer ? (
            <Tooltip title="Transfer">
              <IconButton
                aria-haspopup="true"
                onClick={event => {
                  app.handleTransferInteraction(myInteraction.interaction._id);
                }}
              >
                <CallMade fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            ""
          )}
          {this.props.fullScreen && myInteraction.buttons.conference ? (
            <Tooltip title="Conference">
              <IconButton
                aria-haspopup="true"
                onClick={event => {
                  app.handleConferenceInteraction(
                    myInteraction.interaction._id
                  );
                }}
              >
                <CallMerge fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            ""
          )}
          {this.props.fullScreen && myInteraction.buttons.terminate ? (
            <Tooltip title="End">
              <IconButton
                aria-haspopup="true"
                onClick={event => {
                  app.handleTerminateInteraction(myInteraction.interaction._id);
                }}
              >
                <Remove fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            ""
          )}
          <IconButton
            aria-haspopup="true"
            onClick={event => {
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
            {myInteraction.buttons.accept ? (
              <MenuItem
                onClick={() => {
                  app.handleAcceptInteraction(myInteraction.interaction._id);
                  this.handleMenuClose();
                }}
              >
                Accept
              </MenuItem>
            ) : (
              ""
            )}
            {myInteraction.buttons.reject ? (
              <MenuItem
                onClick={() => {
                  app.handleRejectInteraction(myInteraction.interaction._id);
                  this.handleMenuClose();
                }}
              >
                Reject
              </MenuItem>
            ) : (
              ""
            )}
            <MenuItem
              onClick={() => {
                source.handleMyInteractionOpen(myInteraction._id);
                this.handleMenuClose();
              }}
            >
              Open
            </MenuItem>
            {myInteraction.buttons.hold ? (
              <MenuItem
                onClick={() => {
                  app.handleHoldInteraction(myInteraction.interaction._id);
                  this.handleMenuClose();
                }}
              >
                Hold
              </MenuItem>
            ) : (
              ""
            )}
            {myInteraction.buttons.resume ? (
              <MenuItem
                onClick={() => {
                  app.handleResumeInteraction(myInteraction.interaction._id);
                  this.handleMenuClose();
                }}
              >
                Retreive
              </MenuItem>
            ) : (
              ""
            )}
            {myInteraction.buttons.terminate ? (
              <MenuItem
                onClick={() => {
                  app.handleTerminateInteraction(myInteraction.interaction._id);
                  this.handleMenuClose();
                }}
              >
                Terminate
              </MenuItem>
            ) : (
              ""
            )}
            {myInteraction.buttons.close ? (
              <MenuItem
                onClick={() => {
                  app.handleCloseInteraction(myInteraction.interaction._id);
                  this.handleMenuClose();
                }}
              >
                Close
              </MenuItem>
            ) : (
              ""
            )}
            {myInteraction.buttons.transfer ? (
              <MenuItem
                onClick={() => {
                  app.handleTransferInteraction(myInteraction.interaction._id);
                  this.handleMenuClose();
                }}
              >
                Transfer
              </MenuItem>
            ) : (
              ""
            )}
            {myInteraction.buttons.conference ? (
              <MenuItem
                onClick={() => {
                  app.handleConferenceInteraction(
                    myInteraction.interaction._id
                  );
                  this.handleMenuClose();
                }}
              >
                Conference
              </MenuItem>
            ) : (
              ""
            )}
          </Menu>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

MyInteractionsItem.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  myInteraction: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired
};
export default withStyles(styles, { withTheme: true })(MyInteractionsItem);
