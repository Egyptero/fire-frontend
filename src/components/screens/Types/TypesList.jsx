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
  formControl: {},
  details: {}
});
class TypesList extends Component {
  state = {};
  renderAvatar = type => {
    return <Avatar>{type.name[0]}</Avatar>;
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
          {/** List of types header having the add function as well as reload. We may need to add more filters */}
          <CardHeader
            action={
              <div>
                <IconButton onClick={source.reloadTypes}>
                  <Refresh />
                </IconButton>
                <IconButton onClick={source.handleNewTypeClickOpen}>
                  <Add />
                </IconButton>
              </div>
            }
            title="Channels"
          />
          <Divider />
          <CardContent className={classes.cardContent}>
            {/** List of types , it will be loaded from the app state. */}
            <List component="nav">
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
                        onClick={event =>
                          source.handleListItemClick(event, index)
                        }
                      >
                        <ListItemAvatar>
                          {this.renderAvatar(type)}
                        </ListItemAvatar>
                        <ListItemText
                          primary={type.name}
                          secondary={
                            <React.Fragment>{type.description}</React.Fragment>
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

TypesList.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(TypesList);
