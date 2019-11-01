import React, { Component } from "react";
import PrimaryApp from "./components/PrimaryApp";
import Home from "./components/Home";
import { withSnackbar, SnackbarProvider } from "notistack";
import PropTypes from "prop-types";
import onLogin from "./app/onLogin";
import onLogout from "./app/onLogout";
import isAuthenticated from "./app/isAuthenticated";
import getSharedApp from "./app/getSharedApp";
import theme from "./app/defaultTheme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import OfferInteractionSnackbar from "./components/notifications/OfferInteractionSnackbar";
import handleAccept from "./components/io/output/handleAccept";
import handleReject from "./components/io/output/handleReject";
import handleClose from "./components/io/output/handleClose";
import handleConference from "./components/io/output/handleConference";
import handleHold from "./components/io/output/handleHold";
import handleResume from "./components/io/output/handleResume";
import handleTerminate from "./components/io/output/handleTerminate";
import handleTransfer from "./components/io/output/handleTransfer";
import handleMakeVoiceCall from "./components/phone/output/handleMakeVoiceCall";
import handleMakeVideoCall from "./components/phone/output/handleMakeVideoCall";
// import loadSkillgroups from "./functions/tenant/skillgroup/loadSkillgroups";
// import loadCustomers from "./functions/tenant/customer/loadCustomers";
// import loadTypes from "./functions/tenant/type/loadTypes";

class App extends Component {
  state = {
    authenticated: false,
    token: null,
    client: null,
    buttons: null,
    status: "Unknown",
    nextStatus: "",
    tenants: null,
    tenant: null,
    users: null,
    todos: null,
    feedbacks: null,
    user: null,
    skillgroups: null,
    workflows: null,
    customers: null,
    interactions: null,
    types: null,
    myInteractions: [],
    myCalls: [],

    myQueues: null,
    myQueuesDetails: null,
    myFacebookQueues: null,
    myFacebookQueuesDetails: null,
    myWhatsAppQueues: null,
    myWhatsAppQueuesDetails: null,
    myTwitterQueues: null,
    myTwitterQueuesDetails: null,
    myInstagramQueues: null,
    myInstagramQueuesDetails: null,
    myYoutubeQueues: null,
    myYoutubeQueuesDetails: null,
    myCallQueues: null,
    myCallQueuesDetails: null,
    myChatQueues: null,
    myChatQueuesDetails: null,
    myEmailQueues: null,
    myEmailQueuesDetails: null,
    myProjectQueues: null,
    myProjectQueuesDetails: null,

    mySkillgroups: null,
    myTeams: null,
    myTypes: null,
    myTenants: null,
    myFeedbacks: null,
    snackbars: [],
    screen: null,
    sipUA: null,
    sipState: null
  };

  onLogin = data => onLogin(this, data);
  onLogout = () => onLogout(this);
  isAuthenticated = () => {
    return isAuthenticated(this);
  };
  getSharedObject = () => {
    return getSharedApp(this);
  };
  handleScreenChange = screen => {
    if (this.state.screen !== screen) this.setState({ screen });
  };
  closeInteractionOffer = interactionId => {
    let { snackbars } = this.state;
    snackbars.forEach((snackbar, index) => {
      if (snackbar.id === interactionId) {
        this.props.closeSnackbar(snackbar.key);
      }
      snackbars.splice(index, 1);
    });
    this.setState({ snackbars });
  };
  offerInteraction = interactionDetails => {
    let { snackbars } = this.state;
    const key = this.props.enqueueSnackbar("", {
      persist: true,
      anchorOrigin: {
        vertical: "top",
        horizontal: "center"
      },
      children: () => {
        return (
          <OfferInteractionSnackbar
            app={this.getSharedObject()}
            enqueueSnackbar={this.props.enqueueSnackbar}
            interactionDetails={interactionDetails}
          />
        );
      }
    });
    snackbars.push({ id: interactionDetails.interaction._id, key });
    this.setState({ snackbars });
  };
  handleAcceptInteraction = interactionId => {
    handleAccept(this, interactionId);
  };
  handleRejectInteraction = interactionId => {
    handleReject(this, interactionId);
  };
  handleCloseInteraction = interactionId => {
    handleClose(this, interactionId);
  };
  handleConferenceInteraction = interactionId => {
    handleConference(this, interactionId);
  };
  handleHoldInteraction = interactionId => {
    handleHold(this, interactionId);
  };
  handleResumeInteraction = interactionId => {
    handleResume(this, interactionId);
  };
  handleTerminateInteraction = interactionId => {
    handleTerminate(this, interactionId);
  };
  handleTransferInteraction = interactionId => {
    handleTransfer(this, interactionId);
  };
  handleMakeVoiceCall = extension => {
    handleMakeVoiceCall(this, extension);
  };
  handleMakeVideoCall = extension => {
    handleMakeVideoCall(this, extension);
  };
  handleUpdateToken = token => {
    this.setState({ token });
  };
  handleUpdateMe = user => {
    this.setState({ user });
  };
  handleTenantChange = tenant => {
    if (this.state.tenant !== tenant) {
      this.setState({
        tenant: tenant,
        users: null,
        skillgroups: null,
        workflows: null,
        types: null,
        customers: null,
        interactions: null,
        myQueues: null,
        myQueuesDetails: null,
        myFacebookQueues: null,
        myFacebookQueuesDetails: null,
        myWhatsAppQueues: null,
        myWhatsAppQueuesDetails: null,
        myTwitterQueues: null,
        myTwitterQueuesDetails: null,
        myInstagramQueues: null,
        myInstagramQueuesDetails: null,
        myYoutubeQueues: null,
        myYoutubeQueuesDetails: null,
        myCallQueues: null,
        myCallQueuesDetails: null,
        myChatQueues: null,
        myChatQueuesDetails: null,
        myEmailQueues: null,
        myEmailQueuesDetails: null,
        myProjectQueues: null,
        myProjectQueuesDetails: null
      });
      //We should load here but this require modififcations
      // loadTypes(this);
      // loadSkillgroups(this);
      // loadCustomers(this);
    }
  };
  handleTodoListLoad = todos => {
    this.setState({ todos });
  };
  handleMyFeedbackListLoad = myFeedbacks => {
    this.setState({ myFeedbacks });
  };
  handleUsersListLoad = users => {
    this.setState({ users });
  };
  handleWorkflowsListLoad = workflows => {
    this.setState({ workflows });
  };
  handleSkillgroupsListLoad = skillgroups => {
    this.setState({ skillgroups });
  };
  handleMyQueuesListLoad = myQueues => {
    this.setState({ myQueues });
  };
  handleMyQueuesDetailsListLoad = myQueuesDetails => {
    this.setState({ myQueuesDetails });
  };
  handleMyEmailQueuesListLoad = myEmailQueues => {
    this.setState({ myEmailQueues });
  };
  handleMyEmailQueuesDetailsListLoad = myEmailQueuesDetails => {
    this.setState({ myEmailQueuesDetails });
  };
  handleMyChatQueuesListLoad = myChatQueues => {
    this.setState({ myChatQueues });
  };
  handleMyChatQueuesDetailsListLoad = myChatQueuesDetails => {
    this.setState({ myChatQueuesDetails });
  };
  handleMyProjectQueuesListLoad = myProjectQueues => {
    this.setState({ myProjectQueues });
  };
  handleMyProjectQueuesDetailsListLoad = myProjectQueuesDetails => {
    this.setState({ myProjectQueuesDetails });
  };
  handleMyCallQueuesListLoad = myCallQueues => {
    this.setState({ myCallQueues });
  };
  handleMyCallQueuesDetailsListLoad = myCallQueuesDetails => {
    this.setState({ myCallQueuesDetails });
  };
  handleMyInstagramQueuesListLoad = myInstagramQueues => {
    this.setState({ myInstagramQueues });
  };
  handleMyInstagramQueuesDetailsListLoad = myInstagramQueuesDetails => {
    this.setState({ myInstagramQueuesDetails });
  };
  handleMyFacebookQueuesListLoad = myFacebookQueues => {
    this.setState({ myFacebookQueues });
  };
  handleMyFacebookQueuesDetailsListLoad = myFacebookQueuesDetails => {
    this.setState({ myFacebookQueuesDetails });
  };
  handleMyWhatsAppQueuesListLoad = myWhatsAppQueues => {
    this.setState({ myWhatsAppQueues });
  };
  handleMyWhatsAppQueuesDetailsListLoad = myWhatsAppQueuesDetails => {
    this.setState({ myWhatsAppQueuesDetails });
  };
  handleMyTwitterQueuesListLoad = myTwitterQueues => {
    this.setState({ myTwitterQueues });
  };
  handleMyTwitterQueuesDetailsListLoad = myTwitterQueuesDetails => {
    this.setState({ myTwitterQueuesDetails });
  };
  handleMySkillgroupsListLoad = mySkillgroups => {
    this.setState({ mySkillgroups });
  };
  handleMyTeamsListLoad = myTeams => {
    this.setState({ myTeams });
  };
  handleMyTenantsListLoad = myTenants => {
    this.setState({ myTenants });
  };
  handleCustomersListLoad = customers => {
    this.setState({ customers });
  };
  handleTypesListLoad = types => {
    this.setState({ types });
  };
  handleInteractionsListLoad = interactions => {
    this.setState({ interactions });
  };
  handleTenantsListLoad = tenants => {
    this.setState({ tenants });
  };
  render() {
    return this.isAuthenticated() ? (
      <PrimaryApp
        app={this.getSharedObject()}
        enqueueSnackbar={this.props.enqueueSnackbar}
      />
    ) : (
      <Home
        app={this.getSharedObject()}
        enqueueSnackbar={this.props.enqueueSnackbar}
      />
    );
  }
}

App.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired
  //closeSnackbar: PropTypes.func.isRequired
  // theme: PropTypes.object.isRequired,
  // classes: PropTypes.object.isRequired
};

const AppWithSnackbar = withSnackbar(App);

class FIRE extends Component {
  render() {
    return (
      <SnackbarProvider maxSnack={3} preventDuplicate>
        <AppWithSnackbar
          app={this.props.app}
          primaryApp={this.props.primaryApp}
        />
      </SnackbarProvider>
    );
  }
}

const FIRETHEME = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <FIRE />
    </MuiThemeProvider>
  );
};

export default FIRETHEME;
