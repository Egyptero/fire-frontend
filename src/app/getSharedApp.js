export default ref => {
  return {
    onLogin: ref.onLogin, //The function of Logout to the CDI
    onLogout: ref.onLogout, //The function of Login to the CDI
    token: ref.state.token, //The user token
    user: ref.state.user, //The logged in user object
    client: ref.state.client, //The Client used for IO connection
    buttons: ref.state.buttons, //Agent buttons to be enabled
    status: ref.state.status, //Agent status
    nextStatus: ref.state.nextStatus, //Agent Next Status
    screen: ref.state.screen,
    sipUA: ref.state.sipUA,
    sipState: ref.state.sipState,
    //Tenant Related Data
    tenants: ref.state.tenants, //Tenants
    tenant: ref.state.tenant, // Tenant Selected
    users: ref.state.users, //Tenant Users
    skillgroups: ref.state.skillgroups, //Tenant skillgroups
    workflows: ref.state.workflows, //Tenant workflows
    types: ref.state.types, // Tenant Types
    customers: ref.state.customers, // Tenant Types
    interactions: ref.state.interactions,
    myInteractions: ref.state.myInteractions, // Assigned interactions to user
    myCalls: ref.state.myCalls, // Calls assigned to user

    myQueues: ref.state.myQueues, // Assigned user queues summary (skill and queue size)
    myQueuesDetails: ref.state.myQueuesDetails, //Assigned user queues details (interactions)
    myFacebookQueues: ref.state.myFacebookQueues, //Assigned user facebook queues summary
    myFacebookQueuesDetails: ref.state.myFacebookQueuesDetails,
    myWhatsAppQueues: ref.state.myWhatsAppQueues,
    myWhatsAppQueuesDetails: ref.state.myWhatsAppQueuesDetails,
    myTwitterQueues: ref.state.myTwitterQueues,
    myTwitterQueuesDetails: ref.state.myTwitterQueuesDetails,
    myInstagramQueues: ref.state.myInstagramQueues,
    myInstagramQueuesDetails: ref.state.myInstagramQueuesDetails,
    myYoutubeQueues: ref.state.myYoutubeQueues,
    myYoutubeQueuesDetails: ref.state.myYoutubeQueuesDetails,
    myCallQueues: ref.state.myCallQueues,
    myCallQueuesDetails: ref.state.myCallQueuesDetails,
    myChatQueues: ref.state.myChatQueues,
    myChatQueuesDetails: ref.state.myChatQueuesDetails,
    myEmailQueues: ref.state.myEmailQueues,
    myEmailQueuesDetails: ref.state.myEmailQueuesDetails,
    myProjectQueues: ref.state.myProjectQueues,
    myProjectQueuesDetails: ref.state.myProjectQueuesDetails,

    mySkillgroups: ref.state.mySkillgroups, // Assigned user skill groups
    myTeams: ref.state.myTeams, // Teams Managed by User
    myTenants: ref.state.myTenants, // Assigned user tenants
    myFeedbacks: ref.state.myFeedbacks, //User created feedbacks
    handleScreenChange: ref.handleScreenChange,
    closeInteractionOffer: ref.closeInteractionOffer, //Close Interaction offer snackbar
    handleAcceptInteraction: ref.handleAcceptInteraction, //Handle Accept Interaction through IO
    handleRejectInteraction: ref.handleRejectInteraction, //Handle Reject Interaction through IO
    handleCloseInteraction: ref.handleCloseInteraction, //Handle Close Interaction through IO
    handleConferenceInteraction: ref.handleConferenceInteraction, //Handle Conference Interaction through IO
    handleHoldInteraction: ref.handleHoldInteraction, //Handle Hold Interaction through IO
    handleResumeInteraction: ref.handleResumeInteraction, //Handle Resume Interaction through IO
    handleTerminateInteraction: ref.handleTerminateInteraction, //Handle Terminate Interaction through IO
    handleTransferInteraction: ref.handleTransferInteraction, //Handle Transfer Interaction through IO
    handleMakeVoiceCall: ref.handleMakeVoiceCall,
    handleMakeVideoCall: ref.handleMakeVideoCall,
    handleTenantChange: ref.handleTenantChange, //Function to handle tenant selection change
    handleTenantsListLoad: ref.handleTenantsListLoad,
    handleWorkflowsListLoad: ref.handleWorkflowsListLoad,
    handleUsersListLoad: ref.handleUsersListLoad, //Function to update the users list at any time.
    handleSkillgroupsListLoad: ref.handleSkillgroupsListLoad,
    handleTypesListLoad: ref.handleTypesListLoad,
    handleCustomersListLoad: ref.handleCustomersListLoad,

    handleMyQueuesListLoad: ref.handleMyQueuesListLoad,
    handleMyQueuesDetailsListLoad: ref.handleMyQueuesDetailsListLoad,
    handleMyEmailQueuesListLoad: ref.handleMyEmailQueuesListLoad,
    handleMyEmailQueuesDetailsListLoad: ref.handleMyEmailQueuesDetailsListLoad,
    handleMyChatQueuesListLoad: ref.handleMyChatQueuesListLoad,
    handleMyChatQueuesDetailsListLoad: ref.handleMyChatQueuesDetailsListLoad,
    handleMyProjectQueuesListLoad: ref.handleMyProjectQueuesListLoad,
    handleMyProjectQueuesDetailsListLoad:
      ref.handleMyProjectQueuesDetailsListLoad,
    handleMyCallQueuesListLoad: ref.handleMyCallQueuesListLoad,
    handleMyCallQueuesDetailsListLoad: ref.handleMyCallQueuesDetailsListLoad,
    handleMyInstagramQueuesListLoad: ref.handleMyInstagramQueuesListLoad,
    handleMyInstagramQueuesDetailsListLoad:
      ref.handleMyInstagramQueuesDetailsListLoad,
    handleMyFacebookQueuesListLoad: ref.handleMyFacebookQueuesListLoad,
    handleMyFacebookQueuesDetailsListLoad:
      ref.handleMyFacebookQueuesDetailsListLoad,
    handleMyWhatsAppQueuesListLoad: ref.handleMyWhatsAppQueuesListLoad,
    handleMyWhatsAppQueuesDetailsListLoad:
      ref.handleMyWhatsAppQueuesDetailsListLoad,
    handleMyTwitterQueuesListLoad: ref.handleMyTwitterQueuesListLoad,
    handleMyTwitterQueuesDetailsListLoad:
      ref.handleMyTwitterQueuesDetailsListLoad,

    handleMySkillgroupsListLoad: ref.handleMySkillgroupsListLoad,
    handleMyTeamsListLoad: ref.handleMyTeamsListLoad,
    handleMyTenantsListLoad: ref.handleMyTenantsListLoad,
    handleMyFeedbackListLoad: ref.handleMyFeedbackListLoad,
    handleInteractionsListLoad: ref.handleInteractionsListLoad,
    handleUpdateMe: ref.handleUpdateMe,
    handleUpdateToken: ref.handleUpdateToken, //Update user token
    //User Related Data
    todos: ref.state.todos, // User Todos

    handleTodoListLoad: ref.handleTodoListLoad //Function to update the todo list at any time.
  };
};
