import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  content: {},
  grid: {},
  card: {},
  cardContent: {},
  formControl: {},
});

class MyInteractionDetails extends Component {
  state = {
    type: "",
    typeName: "",
  };
  componentDidMount() {
    //We should load type now
  }
  componentDidUpdate(prevProps, prevState) {}
  renderChatType = () => {};
  renderProjectType = () => {};
  renderFacebookPostType = () => {};
  renderWhatsAppType = () => {};
  renderCallType = () => {};
  render() {
    return <React.Fragment />;
  }
}

MyInteractionDetails.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(MyInteractionDetails);
