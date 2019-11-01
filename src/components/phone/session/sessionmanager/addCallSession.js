import getCallSession from "./getCallSession";
import addSessionEvents from "./addSessionEvents";

export default (ref, session, status) => {
  console.log("Phone: Add new call session with id:" + session.id);
  let { myCalls } = ref.state;
  if (!getCallSession(ref, session.id)) {
    addSessionEvents(ref, session);
    if (!myCalls) myCalls = [];
    myCalls.push({ session, status });
    ref.setState({ myCalls });
  }
};
