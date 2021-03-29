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
import {
  Add,
  Refresh,
  AssignmentReturnOutlined,
  WhatsApp,
  AccountTree,
  Note,
} from "@material-ui/icons";
import _ from "lodash";
import loadType from "../../../functions/tenant/type/loadType";

const styles = (theme) => ({
  content: {},
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
  details: {},
  formControl: {},
  listOrganizations: {},
  listUsers: {},
});
class InteractionsList extends Component {
  state = {};
  renderAvatar = (interaction) => {
    const { app, theme } = this.props;
    //We need to get the type first
    //Then , we need to switch on type
    // In case of WhatsApp show WhatsApp Icon , and In case of project show project icon
    let type;
    if (app && app.types)
      type = _.filter(app.types, (type) => type._id === interaction.typeId)[0];
    else {
      loadType(interaction.typeId, this, (result) => {
        if (!result.error) {
          type = result.type;
        }
      });
    }

    let result = (
      <Avatar style={{ width: theme.spacing(4), height: theme.spacing(4) }}>
        <Typography variant="caption"> UN</Typography>
      </Avatar>
    );
    if (!type) return result;

    switch (type.channel) {
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
    const { theme, classes, source, app } = this.props;
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
          {/** List of interactions header having the add function as well as reload. We may need to add more filters */}
          <CardHeader
            action={
              <div>
                <IconButton onClick={source.reloadInteractions} size="small">
                  <Refresh fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={source.handleNewInteractionClickOpen}
                  size="small"
                >
                  <Add fontSize="small" />
                </IconButton>
              </div>
            }
            title={<b>Interactions</b>}
            titleTypographyProps={{ variant: "body1" }}
            style={{ padding: theme.spacing(1) }}
          />
          <Divider />
          <CardContent className={classes.cardContent}>
            {/** List of interactions , it will be loaded from the app state. */}
            <List component="nav" disablePadding>
              {app.interactions
                ? app.interactions.map((interaction, index) => {
                    return (
                      <ListItem
                        selected={
                          source.sourceState.selectedInteraction &&
                          interaction._id ===
                            source.sourceState.selectedInteraction._id
                        }
                        button
                        key={index}
                        onClick={(event) =>
                          source.handleListItemClick(event, index)
                        }
                        style={{ padding: theme.spacing(0) }}
                      >
                        <ListItemAvatar style={{ padding: theme.spacing(1) }}>
                          {this.renderAvatar(interaction)}
                        </ListItemAvatar>
                        <ListItemText
                          style={{ padding: theme.spacing(0) }}
                          primary={<b>{`${interaction.attached.title}`}</b>}
                          secondary={interaction.attached.description}
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

InteractionsList.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(InteractionsList);
