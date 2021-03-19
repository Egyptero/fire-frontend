import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  List,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import MyInteractionsItem from "./MyInteractions/MyInteractionsItem";
const styles = (theme) => ({
  content: {},
  grid: {},
  gridFull: {},
  card: {},
  cardContent: {
    position: "relative",
    overflow: "auto",
    height: "32vh",
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
  formControl: {
    marginLeft: theme.spacing(),
  },
});

class MyInteractionsSummary extends Component {
  state = {
    openInteraction: false,
    action: "new",
    interactionId: null,
    view: "Detailed",
  };

  handleMyInteractionOpen = (interactionId) => {
    this.setState({ openInteraction: true, action: "open", interactionId });
  };
  handleMyInteractionClose = () => {
    this.setState({ openInteraction: false });
  };
  changeView = (event) => {
    this.setState({ view: event.target.value });
  };
  getSharedObject = () => {
    return {
      handleMyInteractionClose: this.handleMyInteractionClose,
      handleMyInteractionOpen: this.handleMyInteractionOpen,
      sourceState: this.state,
    };
  };

  renderMyInteractionList = (myInteraction) => {
    return (
      <MyInteractionsItem
        key={myInteraction.interaction._id}
        {...this.props}
        myInteraction={myInteraction}
        source={this.getSharedObject()}
        view={this.state.view}
        fullScreen={this.props.fullScreen}
      />
    );
  };
  render() {
    const { classes } = this.props;
    const { app } = this.props;
    const myInteractions = app.myInteractions ? app.myInteractions : [];

    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardHeader
            action={
              <div>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink htmlFor="bot-label-placeholder">
                    View
                  </InputLabel>
                  <Select value={this.state.view} onChange={this.changeView}>
                    <MenuItem value={"Summary"}>Summary</MenuItem>
                    <MenuItem value={"Detailed"}>Detailed</MenuItem>
                  </Select>
                </FormControl>
              </div>
            }
            title="My work"
          />
          <Divider />
          {this.props.fullScreen ? (
            <CardContent
              className={classes.cardContent}
              style={{ height: "75vh" }}
            >
              <List>
                {myInteractions.map((myInteraction) => {
                  return this.renderMyInteractionList(myInteraction);
                })}
              </List>
            </CardContent>
          ) : (
            <CardContent className={classes.cardContent}>
              <List>
                {myInteractions.map((myInteraction) => {
                  return this.renderMyInteractionList(myInteraction);
                })}
              </List>
            </CardContent>
          )}
        </Card>
        {/* <TodoDialog {...this.props} source={this.getSharedObject()} /> */}
      </React.Fragment>
    );
  }
}

MyInteractionsSummary.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  // fullScreen: PropTypes.bool.optional it give exception in runtime
};
export default withStyles(styles, { withTheme: true })(MyInteractionsSummary);
