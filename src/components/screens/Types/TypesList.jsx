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
  ListItemAvatar,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { AccountTree, Add, Note, Refresh, WhatsApp } from "@material-ui/icons";
const styles = (theme) => ({
  content: {
    flexGrow: 1,
    //height: "86vh"
  },
  grid: {
    display: "flex",
    position: "relative",
    maxHeight: "100%",
    minHeight: "100%",
  },
  card: {
    overflow: "auto",
    maxHeight: "100%",
    minHeight: "100%",
    minWidth: "100%",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  cardContent: {
    position: "relative",
    overflow: "auto",
    height: "83vh",
    minWidth: "100%",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  formControl: {},
  details: {},
});
class TypesList extends Component {
  state = {};
  renderAvatar = (channel) => {
    const { theme } = this.props;
    let result = (
      <Avatar style={{ width: theme.spacing(4), height: theme.spacing(4) }}>
        <Typography variant="caption"> {channel[0]}</Typography>
      </Avatar>
    );
    switch (channel) {
      case "Facebook Page":
      case "Facebook DM":
      case "Twitter Account":
      case "Twitter DM":
      case "Instagram Account":
      case "Instagram DM":
        break;
      case "WhatsApp Business":
        result = (
          <Avatar
            style={{
              width: theme.spacing(4),
              height: theme.spacing(4),
              backgroundColor: "#25d366",
            }}
          >
            <WhatsApp fontSize="small" />
          </Avatar>
        );
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
        result = (
          <Avatar
            style={{
              width: theme.spacing(4),
              height: theme.spacing(4),
              backgroundColor: theme.palette.warning.main,
            }}
          >
            <AccountTree fontSize="small" />
          </Avatar>
        );
        break;
      case "Custom":
        result = (
          <Avatar style={{ width: theme.spacing(4), height: theme.spacing(4) }}>
            <Note fontSize="small" />
          </Avatar>
        );
        break;
      default:
        break;
    }
    return result;
  };
  render() {
    const { classes, source, app, theme } = this.props;
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
          {/** List of types header having the add function as well as reload. We may need to add more filters */}
          <CardHeader
            action={
              <div>
                <IconButton onClick={source.reloadTypes} size="small">
                  <Refresh fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={source.handleNewTypeClickOpen}
                  size="small"
                >
                  <Add fontSize="small" />
                </IconButton>
              </div>
            }
            title={<b>Channels</b>}
            titleTypographyProps={{ variant: "body1" }}
            style={{ padding: theme.spacing(1) }}
          />
          <Divider />
          <CardContent className={classes.cardContent}>
            {/** List of types , it will be loaded from the app state. */}
            <List component="nav" disablePadding>
              {app.types
                ? app.types.map((type, index) => {
                    return (
                      <ListItem
                        selected={
                          source.sourceState.selectedType &&
                          type._id === source.sourceState.selectedType._id
                        }
                        button
                        key={index}
                        onClick={(event) =>
                          source.handleListItemClick(event, index)
                        }
                        style={{padding:theme.spacing(0)}}
                      >
                        <ListItemAvatar style={{ padding: theme.spacing(1) }}>
                          {this.renderAvatar(type.channel)}
                        </ListItemAvatar>
                        <ListItemText
                        style={{ padding: theme.spacing(0) }}
                          primary={<b>{type.name}</b>}
                          secondary={type.description}
                          primaryTypographyProps={{ variant: "caption" }}
                          secondaryTypographyProps={{ variant: "caption" }}
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

TypesList.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TypesList);
