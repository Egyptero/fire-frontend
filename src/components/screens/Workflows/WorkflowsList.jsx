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
    minWidth: "100%"
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
  }
});
class WorkflowsList extends Component {
  state = {};
  renderAvatar = workflow => {
    const { theme } = this.props;
    if (workflow.type === "ROUTE")
      return (
        <Avatar style={{ background: theme.palette.secondary.dark }}>
          {"R"}
        </Avatar>
      );
    else if (workflow.type === "BOT")
      return (
        <Avatar style={{ background: theme.palette.primary.dark }}>
          {"B"}
        </Avatar>
      );
    else if (workflow.type === "IVR")
      return (
        <Avatar style={{ background: theme.palette.primary.light }}>
          {"I"}
        </Avatar>
      );
    else return <Avatar>{"U"}</Avatar>;
  };
  render() {
    const { classes, source, app } = this.props;
    const { sourceState } = source;
    const { workflows } = app;
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
          <CardHeader
            action={
              <div>
                <IconButton onClick={source.reloadWorkflows}>
                  <Refresh />
                </IconButton>
                <IconButton onClick={source.handleNewWorkflowClickOpen}>
                  <Add />
                </IconButton>
              </div>
            }
            title="List of flows"
          />
          <Divider />
          <CardContent className={classes.cardContent}>
            <List component="nav">
              {workflows
                ? workflows.map((workflow, index) => {
                    return (
                      <ListItem
                        button
                        selected={
                          source.sourceState.selectedWorkflow &&
                          workflow._id ===
                            source.sourceState.selectedWorkflow._id
                        }
                        key={index}
                        onClick={event =>
                          source.handleListItemClick(event, index)
                        }
                      >
                        <ListItemAvatar>
                          {this.renderAvatar(workflow)}
                        </ListItemAvatar>
                        <ListItemText primary={workflow.name} />
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

WorkflowsList.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(WorkflowsList);
