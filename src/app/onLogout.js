export default ref => {
  const { client, sipUA } = ref.state;
  if (client) client.disconnect();
  if (sipUA && sipUA.status) {
    sipUA.unregister({ all: true }, () => {
      sipUA.stop();
    });
  }
  ref.setState({
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
    user: null,
    skillgroups: null,
    workflows: null,
    customers: null,
    interactions: null,
    types: null,
    myInteractions: [],
    myCalls: [],
    myQueues: null,
    mySkillgroups: null,
    snackbars: [],
    myTeams: null,
    screen: "Dashboard",
    sipUA: null,
    sipState: null
  });
};
