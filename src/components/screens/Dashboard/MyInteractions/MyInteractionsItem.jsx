import {
  Avatar,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { AccountTree, WhatsApp } from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { Component } from "react";
import MyInteractionButtons from "./MyInteractionButtons";
import MyInteractionTimer from "./MyInteractionTimer";
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
    //console.log(avatarInfo);
    let avatarColor = avatarInfo.error
      ? this.props.theme.palette.secondary.main
      : avatarInfo.color;

    return (
      <ListItem
        selected={
          myInteraction.interaction._id ===
          this.props.app.myInteraction.interaction._id
        }
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
          {myInteraction.interaction._id ===
          this.props.app.myInteraction.interaction._id ? (
            ""
          ) : (
            // <MyInteractionTimer
            //   {...this.props}
            //   myInteraction={myInteraction}
            //   variant="h6"
            // />
            <MyInteractionButtons {...this.props} />
          )}
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
