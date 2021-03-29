import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import NewTypeDialog from "../dialogs/NewTypeDialog";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import loadTypes from "../../functions/tenant/type/loadTypes";
import _ from "lodash";
import TypesList from "./Types/TypesList";
import TypeDetails from "./Types/TypeDetails";
import updateType from "../../functions/tenant/type/updateType";
import deleteType from "../../functions/tenant/type/deleteType";
import loadType from "../../functions/tenant/type/loadType";
import addType from "../../functions/tenant/type/addType";
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

class Types extends Component {
  state = {
    openNewType: false,
    width: 3,
    selectedType: null,
    canSave: false,
    canEdit: true,
    canWatch: true
  };
  componentDidMount() {
    const { app } = this.props;
    if (app.tenant && !app.types)
      loadTypes(this, result => {
        if (!result.error && result.types && result.types.length > 0)
          this.setState({ selectedType: result.types[0] });
        else this.setState({ selectedType: null });
      });
    if (!this.state.selectedType && app.types && app.types.length > 0)
      this.setState({ selectedType: app.types[0] });
  }
  componentDidUpdate(prevProps, prevState) {
    const { app } = this.props;
    const { app: prevApp } = prevProps;
    if (app.tenant._id !== prevApp.tenant._id)
      loadTypes(this, result => {
        if (!result.error && result.types && result.types.length > 0)
          this.setState({ selectedType: result.types[0] });
        else this.setState({ selectedType: null });
      });
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
  updateSelectedType = type => {
    this.setState({ selectedType: type });
  };
  reloadTypes = () => {
    loadTypes(this);
  };
  saveType = () => {
    let { selectedType } = this.state;
    let pickUp = ["name", "description", "channel", "workflowId"];
    updateType(selectedType._id, _.pick(selectedType, pickUp), this);
  };
  editType = () => {
    this.setState({
      canSave: true,
      canEdit: false,
      canWatch: true
    });
  };
  watchType = () => {
    this.setState({
      canSave: false,
      canEdit: true,
      canWatch: true
    });

    //We need to warn about saving
    if (this.state.canSave) this.saveType();
  };
  deleteType = () => {
    let { selectedType } = this.state;
    deleteType(selectedType._id, this, result => {
      if (!result.error) this.setState({ selectedType: null });
    });
  };
  handleListItemClick = (event, index) => {
    if (this.state.selectedType && this.state.canSave)
      loadType(this.state.selectedType._id, this);

    const selectedType = JSON.parse(
      JSON.stringify(this.props.app.types[index])
    );
    this.setState({
      selectedType,
      canSave: false,
      canEdit: true,
      canWatch: true
    });
  };
  handleNewTypeClickOpen = () => {
    this.setState({ openNewType: true });
  };
  handleNewTypeClose = () => {
    this.setState({ openNewType: false });
  };
  handleAddType = type => {
    addType(type, this, result => {
      if (!result.error) {
        this.handleNewTypeClose();
        this.setState({ selectedType: result.type });
      }
    });
  };
  getSharedObject = () => {
    return {
      getListWidth: this.getListWidth,
      getDetailsWidth: this.getDetailsWidth,
      switchDetailsView: this.switchDetailsView,
      handleNewTypeClickOpen: this.handleNewTypeClickOpen,
      handleNewTypeClose: this.handleNewTypeClose,
      handleAddType: this.handleAddType,
      reloadTypes: this.reloadTypes,
      handleListItemClick: this.handleListItemClick,
      saveType: this.saveType,
      editType: this.editType,
      watchType: this.watchType,
      deleteType: this.deleteType,
      updateSelectedType: this.updateSelectedType,
      sourceState: this.state
    };
  };
  renderTypesList = () => {
    return <TypesList {...this.props} source={this.getSharedObject()} />;
  };
  renderTypeDetails = () => {
    if (this.state.selectedType && this.props.app.tenant)
      return <TypeDetails {...this.props} source={this.getSharedObject()} />;
    else return;
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid className={classes.content} container spacing={1}>
          {this.renderTypesList()}
          {this.renderTypeDetails()}
        </Grid>
        <NewTypeDialog {...this.props} source={this.getSharedObject()} />
      </React.Fragment>
    );
  }
}

Types.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};
export default withStyles(styles, { withTheme: true })(Types);
