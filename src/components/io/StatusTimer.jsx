import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "../primaryapp/appStyles";

class StatusTimer extends Component {
  state = {
    time: 0,
    step: 1, // seconds
    stop: false,
    interval: null,
  };
  componentDidMount() {
    let { inStateTime } = this.props;
    if (!inStateTime) inStateTime = this.props.app.inStateTime;
    if (!inStateTime) return;
    let startTime = Date.now() - Date.parse(inStateTime);
    // console.log("start time", startTime);
    this.startTimer(startTime);
  }
  componentDidUpdate(prevProps, prevState) {
    let inStateTime;
    let oldInStateTime;

    if (this.props.inStateTime) {
      inStateTime = this.props.inStateTime;
      oldInStateTime = prevProps.inStateTime;
    } else {
      inStateTime = this.props.app.inStateTime;
      oldInStateTime = prevProps.app.inStateTime;
    }
    if (inStateTime !== oldInStateTime) {
      this.stopTimer();
      let startTime = Date.now() - Date.parse(inStateTime);
      // console.log("start time", startTime);
      this.startTimer(startTime);
    }
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
      formattedHours + ":" + formattedMins + ":" + formattedSeconds
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography
          variant={this.props.variant ? this.props.variant : "caption"}
        >
          <b>{this.formatTime()}</b>
        </Typography>
      </React.Fragment>
    );
  }
}

StatusTimer.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  variant: PropTypes.string,
  inStateTime: PropTypes.string,
};
export default withStyles(styles, { withTheme: true })(StatusTimer);
