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
import { Add, Refresh, AssignmentReturnOutlined } from "@material-ui/icons";
import _ from "lodash";
import loadType from "../../../functions/tenant/type/loadType";

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
class InteractionsList extends Component {
  state = {};
  renderAvatar = interaction => {
    const { app } = this.props;
    //We need to get the type first
    //Then , we need to switch on type
    // In case of WhatsApp show WhatsApp Icon , and In case of project show project icon
    let type;
    if (app && app.types)
      type = _.filter(app.types, type => type._id === interaction.typeId)[0];
    else {
      loadType(interaction.typeId, this, result => {
        if (!result.error) {
          type = result.type;
        }
      });
    }

    if (!type) return <Avatar>I</Avatar>;
    switch (type.channel) {
      case "Project":
        return (
          <Avatar>
            <AssignmentReturnOutlined />
          </Avatar>
        );
      default:
        break;
    }
    return <Avatar>I</Avatar>;
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
          {/** List of interactions header having the add function as well as reload. We may need to add more filters */}
          <CardHeader
            action={
              <div>
                <IconButton onClick={source.reloadInteractions}>
                  <Refresh />
                </IconButton>
                <IconButton onClick={source.handleNewInteractionClickOpen}>
                  <Add />
                </IconButton>
              </div>
            }
            title="List of interactions"
          />
          <Divider />
          <CardContent className={classes.cardContent}>
            {/** List of interactions , it will be loaded from the app state. */}
            <List component="nav">
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
                        onClick={event =>
                          source.handleListItemClick(event, index)
                        }
                      >
                        <ListItemAvatar>
                          {this.renderAvatar(interaction)}
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${interaction.attached.title}`}
                          secondary={
                            <React.Fragment>
                              {interaction.attached.description}
                            </React.Fragment>
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

InteractionsList.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(InteractionsList);
