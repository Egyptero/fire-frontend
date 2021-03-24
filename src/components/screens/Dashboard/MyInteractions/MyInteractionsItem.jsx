import {
  Avatar,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  AccountTree,
  AddCircle,
  Cancel,
  Check,
  CheckCircle,
  Close,
  PauseCircleFilled,
  PlayCircleFilled,
  SwapHorizontalCircle,
  WhatsApp,
} from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { Component } from "react";
const styles = (theme) => ({
  content: {},
  grid: {},
  gridFull: {},
  card: {},
  cardContent: {},
  formControl: {},
});

class MyInteractionsItem extends Component {
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
  getAvatarIcon = (typeId) => {
    const { app } = this.props;
    let result = {
      error: true,
      typeName: "",
      iconComponent: "",
      color: this.props.theme.palette.secondary.light,
    };
    if (!app) return { error: true };
    if (!app.types) return { error: true };
    app.types.forEach((type) => {
      if (type._id === typeId) {
        switch (type.channel) {
          case "Facebook Page":
          case "Facebook DM":
          case "Twitter Account":
          case "Twitter DM":
          case "Instagram Account":
          case "Instagram DM":
            break;
          case "WhatsApp Business":
            result.error = false;
            result.typeName = type.name;
            result.iconComponent = <WhatsApp fontSize="small" />;
            result.color = "#25d366";
            break;
          case "LinkedIn":
          case "Youtube":
          case "Voice":
          case "Vedio":
          case "SMS":
          case "Chat":
          case "Email":
          case "Webrtc":
          case "Project":
            result.error = false;
            result.typeName = type.name;
            result.iconComponent = <AccountTree fontSize="small" />;
            result.color = this.props.theme.palette.warning.main;
            // result.iconComponent = <WhatsApp fontSize="small" />;
            // result.color = "#25d366";

            break;
          case "Custom":
            break;
          default:
            break;
        }
      }
    });
    return result;
  };
  render() {
    const { classes, myInteraction, source, app } = this.props;
    let avatarInfo = this.getAvatarIcon(myInteraction.interaction.typeId);
    console.log(avatarInfo);
    let avatarColor = avatarInfo.error
      ? this.props.theme.palette.secondary.main
      : avatarInfo.color;

    return (
      <ListItem
        selected={true}
        key={myInteraction.interaction._id}
        style={{
          padding: this.props.theme.spacing(1),
        }}
      >
        <ListItemAvatar>
          <Avatar
            style={{
              backgroundColor: avatarColor,
              width: this.props.theme.spacing(4),
              height: this.props.theme.spacing(4),
            }}
          >
            {avatarInfo.iconComponent}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primaryTypographyProps={{ variant: "body2" }}
          //secondaryTypographyProps={{variant:"caption"}}
          disableTypography
          primary={myInteraction.interaction.attached.title}
          secondary={
            <Grid container direction="column">
              <Typography
                component="span"
                className={classes.inline}
                color="textPrimary"
                variant="caption"
              >
                {(() => {
                  if (myInteraction.interaction.schedule.includes("T"))
                    return (
                      //                      myInteraction.interaction.schedule.split("T")[0] +
                      //                     " - " +
                      myInteraction.interaction.stage
                    );
                  else
                    return (
                      //                      myInteraction.interaction.schedule +
                      //                      " - " +
                      myInteraction.interaction.stage
                    );
                })()}
              </Typography>
              {this.props.view === "Detailed" ? avatarInfo.typeName : ""}
              {/* {(() => {
                if (this.props.view === "Detailed")
                  return myInteraction.interaction.attached.description;
              })()} */}
            </Grid>
          }
        />
        <ListItemSecondaryAction>
          {this.props.fullScreen && myInteraction.buttons.accept ? (
            <Tooltip title="Accept">
              <IconButton
                aria-haspopup="true"
                onClick={(event) => {
                  app.handleAcceptInteraction(myInteraction.interaction._id);
                }}
                size="small"
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
                onClick={(event) => {
                  app.handleRejectInteraction(myInteraction.interaction._id);
                }}
                size="small"
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
                onClick={(event) => {
                  app.handleHoldInteraction(myInteraction.interaction._id);
                }}
                size="small"
              >
                <PauseCircleFilled fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            ""
          )}
          {this.props.fullScreen && myInteraction.buttons.resume ? (
            <Tooltip title="Resume">
              <IconButton
                aria-haspopup="true"
                onClick={(event) => {
                  app.handleResumeInteraction(myInteraction.interaction._id);
                }}
                size="small"
              >
                <PlayCircleFilled fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            ""
          )}
          {this.props.fullScreen && myInteraction.buttons.close ? (
            <Tooltip title="Close">
              <IconButton
                aria-haspopup="true"
                onClick={(event) => {
                  app.handleCloseInteraction(myInteraction.interaction._id);
                }}
                size="small"
              >
                <Cancel fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            ""
          )}
          {this.props.fullScreen && myInteraction.buttons.transfer ? (
            <Tooltip title="Transfer">
              <IconButton
                aria-haspopup="true"
                onClick={(event) => {
                  app.handleTransferInteraction(myInteraction.interaction._id);
                }}
                size="small"
              >
                <SwapHorizontalCircle fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            ""
          )}
          {this.props.fullScreen && myInteraction.buttons.conference ? (
            <Tooltip title="Conference">
              <IconButton
                aria-haspopup="true"
                onClick={(event) => {
                  app.handleConferenceInteraction(
                    myInteraction.interaction._id
                  );
                }}
                size="small"
              >
                <AddCircle fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            ""
          )}
          {this.props.fullScreen && myInteraction.buttons.terminate ? (
            <Tooltip title="End">
              <IconButton
                aria-haspopup="true"
                onClick={(event) => {
                  app.handleTerminateInteraction(myInteraction.interaction._id);
                }}
                size="small"
              >
                <CheckCircle fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            ""
          )}
          {/* <IconButton
            aria-haspopup="true"
            onClick={(event) => {
              this.handleMenuOpen(event);
            }}
            size="small"
            //color="inherit"
          >
            <MoreVert fontSize="small" />
          </IconButton> */}
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
                <Typography variant="caption">Accept</Typography>
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
                <Typography variant="caption">Reject</Typography>
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
              <Typography variant="caption">Open</Typography>
            </MenuItem>
            {myInteraction.buttons.hold ? (
              <MenuItem
                onClick={() => {
                  app.handleHoldInteraction(myInteraction.interaction._id);
                  this.handleMenuClose();
                }}
              >
                <Typography variant="caption">Hold</Typography>
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
                <Typography variant="caption">Retreive</Typography>
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
                <Typography variant="caption">Terminate</Typography>
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
                <Typography variant="caption">Close</Typography>
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
                <Typography variant="caption">Transfer</Typography>
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
                <Typography variant="caption">Conference</Typography>
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
  view: PropTypes.string.isRequired,
};
export default withStyles(styles, { withTheme: true })(MyInteractionsItem);
