import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
const styles = (theme) => ({
  content: {},
  grid: {},
  gridFull: {},
  card: {},
  cardContent: {},
  formControl: {},
  timerStyle: {
    margin: theme.spacing(0),
    padding: theme.spacing(1),
  },
});

class MyInteractionButtons extends Component {
  state = {
    time: 0,
    step: 1, // seconds
    stop: false,
    interval: null,
  };
  componentDidMount() {
    const { classes, app } = this.props;
    let { myInteraction } = this.props; // Read my interaction from props , if not found , read it from app (selected)
    if (!myInteraction) myInteraction = app.myInteraction;
    if (!myInteraction) return;
    console.log(myInteraction.interaction);
    let startTime =
      Date.now() - Date.parse(myInteraction.interaction.creationDate);
    console.log("start time", startTime);
    this.startTimer(startTime);
  }
  componentWillUnmount() {
    this.stopTimer();
  }
  processInterval = () => {
    if (this.state.stop) return;
    //console.log("current time", this.state.time);
    this.setState({ time: this.state.time + this.state.step * 1000 });
  };
  stopTimer = async () => {
    if (this.state.interval) clearInterval(this.state.interval);
  };
  startTimer = async (time) => {
    if (time) this.setState({ time });
    let interval = setInterval(this.processInterval, this.state.step * 1000);
    this.setState({ interval });
  };

  formatTime = () => {
    let days = Math.floor(this.state.time / (1000 * 60 * 60 * 24));
    let reminder = this.state.time % (1000 * 60 * 60 * 24);
    let hours = Math.floor(reminder / (1000 * 60 * 60));
    reminder = reminder % (1000 * 60 * 60);
    let mins = Math.floor(reminder / (1000 * 60));
    reminder = reminder % (1000 * 60);
    let seconds = Math.floor(reminder / 1000);
    let milliSeconds = reminder % 1000;

    let formattedDays = days < 10 ? "0" + days : days;
    let formattedHours = hours < 10 ? "0" + hours : hours;
    let formattedMins = mins < 10 ? "0" + mins : mins;
    let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    return (
      // formattedDays +
      // "-" +
      formattedHours +
      ":" +
      formattedMins +
      ":" +
      formattedSeconds
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography variant={this.props.variant?this.props.variant:"caption"}><b>{this.formatTime()}</b></Typography>
      </React.Fragment>
    );
  }
}

MyInteractionButtons.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  myInteraction: PropTypes.object,
  variant: PropTypes.string,
};
export default withStyles(styles, { withTheme: true })(MyInteractionButtons);
