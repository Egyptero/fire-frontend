import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import NewInteractionDialog from "../dialogs/NewInteractionDialog";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import loadInteractions from "../../functions/tenant/interaction/loadInteractions";
import _ from "lodash";
import InteractionsList from "./Interactions/InteractionsList";
import InteractionDetails from "./Interactions/InteractionDetails";
import updateInteraction from "../../functions/tenant/interaction/updateInteraction";
import deleteInteraction from "../../functions/tenant/interaction/deleteInteraction";
import loadInteraction from "../../functions/tenant/interaction/loadInteraction";
import addInteraction from "../../functions/tenant/interaction/addInteraction";
const styles = theme => ({
  content: {
    flexGrow: 1,
    position: "relative",
    height: "90vh"
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
  formControl: {},
  details: {}
});

class Interactions extends Component {
  state = {
    openNewInteraction: false,
    width: 3,
    selectedInteraction: null,
    canSave: false,
    canEdit: true,
    canWatch: true
  };
  componentDidMount() {
    const { app } = this.props;
    if (app.tenant && !app.interactions)
      loadInteractions(this, result => {
        if (
          !result.error &&
          result.interactions &&
          result.interactions.length > 0
        )
          this.setState({ selectedInteraction: result.interactions[0] });
        else this.setState({ selectedInteraction: null });
      });

    // if (app.tenant && !app.types) loadTypes(this);
    // if (app.tenant && !app.customers) loadCustomers(this);
    if (
      !this.state.selectedInteraction &&
      app.interactions &&
      app.interactions.length > 0
    )
      this.setState({ selectedInteraction: app.interactions[0] });
  }
  componentDidUpdate(prevProps, prevState) {
    const { app } = this.props;
    const { app: prevApp } = prevProps;

    if (!app.tenant) return;

    if (
      (!prevApp.tenant && app.tenant) ||
      app.tenant._id !== prevApp.tenant._id
    )
      loadInteractions(this, result => {
        if (
          !result.error &&
          result.interactions &&
          result.interactions.length > 0
        )
          this.setState({ selectedInteraction: result.interactions[0] });
        else this.setState({ selectedInteraction: null });
      });

    // if (app.tenant && !app.types) loadTypes(this);
    // if (app.tenant && !app.customers) loadCustomers(this);
  }
  getListWidth = () => {
    return this.state.width;
  };
  getDetailsWidth = () => {
    return 12 - this.state.width;
  };
  switchDetailsView = () => {
    const { width } = this.state;
    if (width === 3) this.setState({ width: 0 });
    else this.setState({ width: 3 });
  };
  updateSelectedInteraction = interaction => {
    this.setState({ selectedInteraction: interaction });
  };
  reloadInteractions = () => {
    loadInteractions(this);
  };
  saveInteraction = () => {
    let { selectedInteraction } = this.state;
    let pickUp = ["attached", "data", "customerId", "typeId"];
    updateInteraction(
      selectedInteraction._id,
      _.pick(selectedInteraction, pickUp),
      this
    );
  };
  editInteraction = () => {
    this.setState({
      canSave: true,
      canEdit: false,
      canWatch: true
    });
  };
  watchInteraction = () => {
    this.setState({
      canSave: false,
      canEdit: true,
      canWatch: true
    });

    //We need to warn about saving
    if (this.state.canSave) this.saveInteraction();
  };
  deleteInteraction = () => {
    let { selectedInteraction } = this.state;
    deleteInteraction(selectedInteraction._id, this, result => {
      if (!result.error) this.setState({ selectedInteraction: null });
    });
  };
  handleListItemClick = (event, index) => {
    if (this.state.selectedInteraction && this.state.canSave)
      loadInteraction(this.state.selectedInteraction._id, this);

    const selectedInteraction = JSON.parse(
      JSON.stringify(this.props.app.interactions[index])
    );
    this.setState({
      selectedInteraction,
      canSave: false,
      canEdit: true,
      canWatch: true
    });
  };
  handleNewInteractionClickOpen = () => {
    this.setState({ openNewInteraction: true });
  };
  handleNewInteractionClose = () => {
    this.setState({ openNewInteraction: false });
  };
  handleAddInteraction = interaction => {
    addInteraction(interaction, this, result => {
      if (!result.error) {
        this.handleNewInteractionClose();
        this.setState({ selectedInteraction: result.interaction });
      }
    });
  };
  getSharedObject = () => {
    return {
      getListWidth: this.getListWidth,
      getDetailsWidth: this.getDetailsWidth,
      switchDetailsView: this.switchDetailsView,
      handleNewInteractionClickOpen: this.handleNewInteractionClickOpen,
      handleNewInteractionClose: this.handleNewInteractionClose,
      handleAddInteraction: this.handleAddInteraction,
      reloadInteractions: this.reloadInteractions,
      handleListItemClick: this.handleListItemClick,
      saveInteraction: this.saveInteraction,
      editInteraction: this.editInteraction,
      watchInteraction: this.watchInteraction,
      deleteInteraction: this.deleteInteraction,
      updateSelectedInteraction: this.updateSelectedInteraction,
      sourceState: this.state
    };
  };
  renderInteractionsList = () => {
    return <InteractionsList {...this.props} source={this.getSharedObject()} />;
  };
  renderInteractionDetails = () => {
    if (this.state.selectedInteraction && this.props.app.tenant)
      return (
        <InteractionDetails {...this.props} source={this.getSharedObject()} />
      );
    else return;
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid className={classes.content} container spacing={1}>
          {this.renderInteractionsList()}
          {this.renderInteractionDetails()}
        </Grid>
        <NewInteractionDialog {...this.props} source={this.getSharedObject()} />
      </React.Fragment>
    );
  }
}

Interactions.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};
export default withStyles(styles, { withTheme: true })(Interactions);
