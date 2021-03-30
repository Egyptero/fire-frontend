import React from "react";
import PropTypes from "prop-types";
import {
  Backdrop,
  CircularProgress,
  CssBaseline,
  Grid,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";
import styles from "./primaryapp/appStyles";
import LeftSideDrawer from "./leftside/LeftSideDrawer";
import TopSideDrawer from "./topside/TopSideDrawer";
import Main from "./main/Main";
import PhoneScreen from "./phone/PhoneScreen";
import MasterAdd from "./buttons/add/MasterAdd";
import loadUsers from "../functions/tenant/user/loadUsers";
import loadTypes from "../functions/tenant/type/loadTypes";
import loadWorkflows from "../functions/tenant/workflow/loadWorkflows";
import loadInteractions from "../functions/tenant/interaction/loadInteractions";
import loadCustomers from "../functions/tenant/customer/loadCustomers";
import loadSkillgroups from "../functions/tenant/skillgroup/loadSkillgroups";
import loadMyTenants from "../functions/user/tenant/loadMyTenants";
import loadMySkillgroups from "../functions/user/tenant/loadMySkillgroups";
import loadMyQueues from "../functions/user/tenant/loadMyQueues";
import loadMyTeams from "../functions/user/team/loadMyTeams";
import loadTodos from "../functions/user/loadTodos";
import loadMe from "../functions/user/me/loadMe";
import compareGrade from "../app/compareGrade";

class PrimaryApp extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    open: false,
  };

  componentDidMount() {
    // console.log(
    //   "Primary App will mount and will update row data if needed ..."
    // );
    // let time = Date.now();

    this.load();
    // console.log(
    //   "Primary App mounted and time consumed ...",
    //   Date.now() - time,
    //   " in Miliseconds"
    // );
  }
  componentDidUpdate(prevProps) {
    // console.log(
    //   "Primary App will update and will update row data if needed ..."
    // );
    // let time = Date.now();

    const { app } = this.props;
    const { app: prevApp } = prevProps;
    if (!app || !prevApp) return;
    if (!app.tenant || !prevApp.tenant) return;
    let reload = app.tenant._id !== prevApp.tenant._id;
    if (reload) {
      console.log("Loading Tenant Data in update");
      this.load();
    }
    // console.log(
    //   "Primary App updated and time consumed ...",
    //   Date.now() - time,
    //   " in Miliseconds"
    // );
  }
  load = async () => {
    const { app } = this.props;
    if (!app) return;
    let loader = {
      progress: 0,
      message: "Loading your data .....",
    };
    console.log("Data Loading started");
    loadMe(this, (result) => {
      loader.progress += 5;
      //console.log("user", loader.progress);
      if (!result.error) loader.message = "User data loaded";
      app.updateProgress(loader);
      loadMyTenants(this, (resultA) => {
        if (!resultA.error && resultA.tenants) {
          app.handleTenantsListLoad(resultA.tenants);
          app.handleTenantChange(resultA.tenants[0]);
          loader.progress += 5;
          //console.log("tenants", loader.progress);
          loader.message = "Organization information loaded";
          app.updateProgress(loader);
          this.loadData();
        } else {
          this.loadData();
          loader.progress = 100;
          app.updateProgress(loader);
        }
      });
    });
  };

  loadData = () => {
    const { app } = this.props;
    const loadAdminData = true;
    if (!app) return;
    let loader = app.loader;
    app.updateProgress(loader);
    //Loading Admin Data
    //console.log("Loading admin data at mount time");
    if (!app.users && compareGrade(app.user.role, "Business") === 1)
      loadUsers(this, (result) => {
        loader.progress += 5;
        //console.log("Users", loader.progress);
        if (!result.error) loader.message = "Users loaded";
        app.updateProgress(loader);
      });
    else loader.progress += 5;
    if (!app.types)
      loadTypes(this, (result) => {
        loader.progress += 5;
        //console.log("Types", loader.progress);
        if (!result.error) loader.message = "Types loaded";
        app.updateProgress(loader);
      });
    else loader.progress += 5;
    if (!app.workflows)
      loadWorkflows(this, (result) => {
        loader.progress += 5;
        //console.log("Workflows", loader.progress);
        if (!result.error) loader.message = "Workflows loaded";
        app.updateProgress(loader);
      });
    else loader.progress += 5;
    if (!app.interactions)
      loadInteractions(this, (result) => {
        loader.progress += 20;
        //console.log("Interactions", loader.progress);
        if (!result.error) loader.message = "Interactions loaded";
        app.updateProgress(loader);
      });
    else loader.progress += 20;
    if (!app.customers)
      loadCustomers(this, (result) => {
        loader.progress += 15;
        //console.log("customers", loader.progress);
        if (!result.error) loader.message = "Customers loaded";
        app.updateProgress(loader);
      });
    else loader.progress += 15;
    if (!app.skillgroups)
      loadSkillgroups(this, (result) => {
        loader.progress += 5;
        //console.log("Skill grous", loader.progress);
        if (!result.error) loader.message = "Skillgroups loaded";
        app.updateProgress(loader);
      });
    else loader.progress += 5;

    //Load user data
    //console.log("Loading user data at mount time");

    if (!app.mySkillgroups)
      loadMySkillgroups(this, (result) => {
        loader.progress += 5;
        //console.log("My skills", loader.progress);
        if (!result.error) loader.message = "My skillgroups loaded";
        app.updateProgress(loader);
      });
    else loader.progress += 5;

    if (!app.myQueues)
      loadMyQueues(this, (result) => {
        loader.progress += 10;
        //console.log("My queues", loader.progress);
        if (!result.error) loader.message = "My queues loaded";
        app.updateProgress(loader);
      });
    else loader.progress += 10;
    if (!app.myTeams)
      loadMyTeams(this, (result) => {
        loader.progress += 10;
        //console.log("My teams", loader.progress);
        if (!result.error) loader.message = "My teams loaded";
        app.updateProgress(loader);
      });
    else loader.progress += 10;
    if (!app.todos)
      loadTodos(this, (result) => {
        loader.progress += 10;
        //console.log("Todos", loader.progress);
        if (!result.error) loader.message = "Activities loaded";
        app.updateProgress(loader);
      });
    else loader.progress += 10;
  };
  handleProfileMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = (event) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleScreenChange = (screen) => {
    const { app } = this.props;
    app.handleScreenChange(screen);
  };

  getSharedObject = () => {
    return {
      primaryAppState: this.state,
      handleProfileMenuOpen: this.handleProfileMenuOpen,
      handleMobileMenuOpen: this.handleMobileMenuOpen,
      handleMenuClose: this.handleMenuClose,
      handleMainMenuClose: this.handleMainMenuClose,
      handleDrawerOpen: this.handleDrawerOpen,
      handleDrawerClose: this.handleDrawerClose,
      handleScreenChange: this.handleScreenChange,
      anchorEl: this.state.anchorEl,
      mobileMoreAnchorEl: this.state.mobileMoreAnchorEl,
    };
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div
          className={classes.root}
          //style={{ background: theme.palette.secondary.light }}
        >
          <CssBaseline />
          <TopSideDrawer
            app={this.props.app}
            primaryApp={this.getSharedObject()}
            enqueueSnackbar={this.props.enqueueSnackbar}
          />
          <LeftSideDrawer
            app={this.props.app}
            primaryApp={this.getSharedObject()}
            enqueueSnackbar={this.props.enqueueSnackbar}
          />
          <Main
            app={this.props.app}
            primaryApp={this.getSharedObject()}
            enqueueSnackbar={this.props.enqueueSnackbar}
          />
        </div>
        <PhoneScreen
          app={this.props.app}
          primaryApp={this.getSharedObject()}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
        {/* <MasterAdd
          app={this.props.app}
          primaryApp={this.getSharedObject()}
          enqueueSnackbar={this.props.enqueueSnackbar}
        /> */}
        <Backdrop
          className={classes.backdrop}
          open={this.props.app.loader.progress != 100}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            alignContent="center"
          >
            <img
              src="./imgs/loader.gif"
              alt="Loading organization"
              //height={this.props.theme.spacing(16)}
              width={"6%"}
            />

            {/* <CircularProgress
              color="inherit"
//              variant="determinate"
//              value={this.props.app.loader.progress}
            /> */}
            <Typography color="inherit" variant="subtitle1">
              Loading .....
            </Typography>
            <Typography color="inherit" variant="caption">
              {this.props.app.loader.message}
            </Typography>
          </Grid>
        </Backdrop>
      </React.Fragment>
    );
  }
}

PrimaryApp.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PrimaryApp);
