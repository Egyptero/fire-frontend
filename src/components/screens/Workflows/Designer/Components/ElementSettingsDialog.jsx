import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import QueueSettingsDialog from "./QueueSettingsDialog";
import ConditionSettingsDialog from "./ConditionSettingsDialog";
import BotSettingsDialog from "./BotSettingsDialog";
import IvrSettingsDialog from "./IvrSettingsDialog";
import RouteSettingsDialog from "./RouteSettingsDialog.";
import ExecuteSettingsDialog from "./ExecuteSettingsDialog";
import LinkSettingsDialog from "./LinkSettingsDialog";
const styles = theme => ({
  content: {},
  grid: {},
  gridWithBorder: {},
  gridWithoutBorder: {},
  topBar: {},
  list: {},
  card: {},
  graph: {}
});

class ElementSettingsDialog extends Component {
  state = {};
  render() {
    const { designer } = this.props;
    const { designerState } = designer;
    if (designerState.selectedElementView) {
      const { model } = designerState.selectedElementView;
      switch (model.attributes.root.title) {
        case "Queue":
          console.log("Queue Setting Dialog should popup");
          return <QueueSettingsDialog {...this.props} />;
        case "Bot":
          console.log("Bot Configuration Screen");
          return <BotSettingsDialog {...this.props} />;
        case "Ivr":
          console.log("Ivr Configuration Screen");
          return <IvrSettingsDialog {...this.props} />;
        case "Routing":
          console.log("Routing Configuration Screen");
          return <RouteSettingsDialog {...this.props} />;
        case "Execute":
          console.log("Execute Configuration Screen");
          return <ExecuteSettingsDialog {...this.props} />;
        case "Condition":
          console.log("Condition Configuration Screen");
          return <ConditionSettingsDialog {...this.props} />;
        case "Link":
          console.log("Link Configuration Screen");
          return <LinkSettingsDialog {...this.props} />;
        default:
          break;
      }
    }
    return <React.Fragment />;
  }
}

ElementSettingsDialog.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  designer: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ElementSettingsDialog);
