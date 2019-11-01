import React, { Component } from "react";
import TopList from "./TopList";
import MiddleList from "./MiddleList";
import BottomList from "./BottomList";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import compareGrade from "../../../app/compareGrade";
import styles from "../../primaryapp/appStyles";
class LeftSideBar extends Component {
  state = {};
  render() {
    const { user } = this.props.app;
    return (
      <React.Fragment>
        <TopList {...this.props} />
        <MiddleList {...this.props} />
        {/**Should be business atleast to access */}
        {compareGrade(user.role, "Leader") === 1 ? (
          <BottomList {...this.props} />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}
LeftSideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(LeftSideBar);
