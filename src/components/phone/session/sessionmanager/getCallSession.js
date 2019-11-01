export default (ref, id) => {
  console.log("Phone: Get session by ID request and ID:" + id);
  let { myCalls } = ref.state;
  let resultSessions = myCalls
    ? myCalls.find(myCall => myCall.session.id === id)
    : [];
  if (resultSessions && resultSessions.length > 0) return resultSessions[0];
  else return null;
};
