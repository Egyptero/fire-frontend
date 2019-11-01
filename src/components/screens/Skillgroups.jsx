import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import NewSkillgroupDialog from "../dialogs/NewSkillgroupDialog";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import loadSkillgroups from "../../functions/tenant/skillgroup/loadSkillgroups";
import _ from "lodash";
import SkillgroupsList from "./Skillgroups/SkillgroupsList";
import SkillgroupDetails from "./Skillgroups/SkillgroupDetails";
import updateSkillgroup from "../../functions/tenant/skillgroup/updateSkillgroup";
import deleteSkillgroup from "../../functions/tenant/skillgroup/deleteSkillgroup";
import loadSkillgroup from "../../functions/tenant/skillgroup/loadSkillgroup";
import addSkillgroup from "../../functions/tenant/skillgroup/addSkillgroup";
const styles = theme => ({
  content: {
    flexGrow: 1,
    position: "relative",
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
  details: {},
  formControl: {},
  listOrganizations: {},
  listUsers: {}
});

class Skillgroups extends Component {
  state = {
    openNewSkillgroup: false,
    width: 3,
    selectedSkillgroup: null,
    canSave: false,
    canEdit: true,
    canWatch: true
  };
  componentDidMount() {
    const { app } = this.props;
    if (app.tenant && !app.skillgroups)
      loadSkillgroups(this, result => {
        if (
          !result.error &&
          result.skillgroups &&
          result.skillgroups.length > 0
        )
          this.setState({ selectedSkillgroup: result.skillgroups[0] });
        else this.setState({ selectedSkillgroup: null });
      });
    if (
      !this.state.selectedSkillgroup &&
      app.skillgroups &&
      app.skillgroups.length > 0
    )
      this.setState({ selectedSkillgroup: app.skillgroups[0] });
  }
  componentDidUpdate(prevProps, prevState) {
    const { app } = this.props;
    const { app: prevApp } = prevProps;
    if (app.tenant._id !== prevApp.tenant._id)
      loadSkillgroups(this, result => {
        if (
          !result.error &&
          result.skillgroups &&
          result.skillgroups.length > 0
        )
          this.setState({ selectedSkillgroup: result.skillgroups[0] });
        else this.setState({ selectedSkillgroup: null });
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
  updateSelectedSkillgroup = skillgroup => {
    this.setState({ selectedSkillgroup: skillgroup });
  };
  reloadSkillgroups = () => {
    loadSkillgroups(this);
  };
  saveSkillgroup = () => {
    let { selectedSkillgroup } = this.state;
    let pickUp = ["name", "description"];
    updateSkillgroup(
      selectedSkillgroup._id,
      _.pick(selectedSkillgroup, pickUp),
      this
    );
  };
  editSkillgroup = () => {
    this.setState({
      canSave: true,
      canEdit: false,
      canWatch: true
    });
  };
  watchSkillgroup = () => {
    this.setState({
      canSave: false,
      canEdit: true,
      canWatch: true
    });

    //We need to warn about saving
    if (this.state.canSave) this.saveSkillgroup();
  };
  deleteSkillgroup = () => {
    let { selectedSkillgroup } = this.state;
    deleteSkillgroup(selectedSkillgroup._id, this, result => {
      if (!result.error) this.setState({ selectedSkillgroup: null });
    });
  };
  handleListItemClick = (event, index) => {
    if (this.state.selectedSkillgroup && this.state.canSave)
      loadSkillgroup(this.state.selectedSkillgroup._id, this);

    const selectedSkillgroup = JSON.parse(
      JSON.stringify(this.props.app.skillgroups[index])
    );
    this.setState({
      selectedSkillgroup,
      canSave: false,
      canEdit: true,
      canWatch: true
    });
  };
  handleNewSkillgroupClickOpen = () => {
    this.setState({ openNewSkillgroup: true });
  };
  handleNewSkillgroupClose = () => {
    this.setState({ openNewSkillgroup: false });
  };
  handleAddSkillgroup = skillgroup => {
    addSkillgroup(skillgroup, this, result => {
      if (!result.error) {
        this.handleNewSkillgroupClose();
        this.setState({ selectedSkillgroup: result.skillgroup });
      }
    });
  };
  getSharedObject = () => {
    return {
      getListWidth: this.getListWidth,
      getDetailsWidth: this.getDetailsWidth,
      switchDetailsView: this.switchDetailsView,
      handleNewSkillgroupClickOpen: this.handleNewSkillgroupClickOpen,
      handleNewSkillgroupClose: this.handleNewSkillgroupClose,
      handleAddSkillgroup: this.handleAddSkillgroup,
      reloadSkillgroups: this.reloadSkillgroups,
      handleListItemClick: this.handleListItemClick,
      saveSkillgroup: this.saveSkillgroup,
      editSkillgroup: this.editSkillgroup,
      watchSkillgroup: this.watchSkillgroup,
      deleteSkillgroup: this.deleteSkillgroup,
      updateSelectedSkillgroup: this.updateSelectedSkillgroup,
      sourceState: this.state
    };
  };
  renderSkillgroupsList = () => {
    return <SkillgroupsList {...this.props} source={this.getSharedObject()} />;
  };
  renderSkillgroupDetails = () => {
    if (this.state.selectedSkillgroup && this.props.app.tenant)
      return (
        <SkillgroupDetails {...this.props} source={this.getSharedObject()} />
      );
    else return;
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid className={classes.content} container spacing={1}>
          {this.renderSkillgroupsList()}
          {this.renderSkillgroupDetails()}
        </Grid>
        <NewSkillgroupDialog {...this.props} source={this.getSharedObject()} />
      </React.Fragment>
    );
  }
}

Skillgroups.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};
export default withStyles(styles, { withTheme: true })(Skillgroups);
