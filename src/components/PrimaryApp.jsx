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

class PrimaryApp extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    open: false,
  };

  componentDidMount() {
    //We need to loadd application data now

    //Load Admin related information
    const { app } = this.props;
    if (!app) return;
    let loader = {
      progress: 0,
      message: "",
    };
    app.updateProgress(loader);
    // if (app.tenant) {
    //   console.log("Loading Tenant Admin Data at mount time");
    //   if (!app.users) loadUsers(this);
    //   if (!app.types) loadTypes(this);
    //   if (!app.workflows) loadWorkflows(this);
    //   if (!app.interactions) loadInteractions(this);
    //   if (!app.customers) loadCustomers(this);
    //   if (!app.skillgroups) loadSkillgroups(this);
    // } else
    if (!app.tenants) {
      loader = {
        progress: 50,
        message: "Loading organization info",
      };
      app.updateProgress(loader);
      loadMyTenants(this, (result) => {
        if (!result.error && result.tenants) {
          app.handleTenantsListLoad(result.tenants);
          app.handleTenantChange(result.tenants[0]);
          loader.progress = 100;
          loader.message = "Organization info loaded";
          app.updateProgress(loader);
          this.loadData();
        }
      });
    } else if (app.tenants.length > 0) {
      app.handleTenantChange(app.tenants[0]);
      this.loadData();
    }
  }
  componentDidUpdate(prevProps) {
    const { app } = this.props;
    const { app: prevApp } = prevProps;
    if (!app || !prevApp) return;
    if (!app.tenant || !prevApp.tenant) return;
    //    let reload = app.tenant && !prevApp ? true : false;
    //    if (!reload) reload = app.tenant && !prevApp.tenant ? true : false;
    let reload = app.tenant._id !== prevApp.tenant._id ? true : false;
    //let changed =
    if (reload) {
      console.log("Loading Tenant Admin Data in update");
      if (!app.users) loadUsers(this);
      if (!app.workflows) loadWorkflows(this);
      if (!app.types) loadTypes(this);
      if (!app.interactions) loadInteractions(this);
      if (!app.customers) loadCustomers(this);
      if (!app.skillgroups) loadSkillgroups(this);
    }
  }
  loadData = () => {
    const { app } = this.props;
    const loadAdminData = true;
    if (!app) return;
    let loader = {
      progress: loadAdminData ? 0 : 60,
      message: "",
    };
    app.updateProgress(loader);
    //Loading Admin Data
    console.log("Loading admin data at mount time");
    if (!app.users)
      loadUsers(this, (result) => {
        loader.progress += 10;
        if (!result.error) loader.message = "Users loaded";
        app.updateProgress(loader);
      });
    if (!app.types)
      loadTypes(this, (result) => {
        loader.progress += 5;
        if (!result.error) loader.message = "Types loaded";
        app.updateProgress(loader);
      });
    if (!app.workflows)
      loadWorkflows(this, (result) => {
        loader.progress += 5;
        if (!result.error) loader.message = "Workflows loaded";
        app.updateProgress(loader);
      });
    if (!app.interactions)
      loadInteractions(this, (result) => {
        loader.progress += 20;
        if (!result.error) loader.message = "Interactions loaded";
        app.updateProgress(loader);
      });
    if (!app.customers)
      loadCustomers(this, (result) => {
        loader.progress += 15;
        if (!result.error) loader.message = "Customers loaded";
        app.updateProgress(loader);
      });
    if (!app.skillgroups)
      loadSkillgroups(this, (result) => {
        loader.progress += 5;
        if (!result.error) loader.message = "Skillgroups loaded";
        app.updateProgress(loader);
      });

    //Load user data
    console.log("Loading user data at mount time");
    if (!app.mySkillgroups)
      loadMySkillgroups(this, (result) => {
        loader.progress += 10;
        if (!result.error) loader.message = "My skillgroups loaded";
        app.updateProgress(loader);
      });
    if (!app.myQueues)
      loadMyQueues(this, (result) => {
        loader.progress += 10;
        if (!result.error) loader.message = "My queues loaded";
        app.updateProgress(loader);
      });
    if (!app.myTeams)
      loadMyTeams(this, (result) => {
        loader.progress += 10;
        if (!result.error) loader.message = "My teams loaded";
        app.updateProgress(loader);
      });
    if (!app.todos)
      loadTodos(this, (result) => {
        loader.progress += 10;
        if (!result.error) loader.message = "Activities loaded";
        app.updateProgress(loader);
      });
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
        <MasterAdd
          app={this.props.app}
          primaryApp={this.getSharedObject()}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
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
              height={this.props.theme.spacing(16)}
              width={this.props.theme.spacing(16)}
            />

            {/* <CircularProgress
              color="inherit"
//              variant="determinate"
//              value={this.props.app.loader.progress}
            /> */}
            <Typography color="inherit" variant="h6">
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
