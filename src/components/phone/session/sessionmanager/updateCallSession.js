export default (ref, sessionId, status) => {
  let { myCalls } = ref.state;
  console.log(
    "Phone: Update Call Session Id:" + sessionId + " and status is:" + status
  );
  //Step 1 copy the myCalls into PayLoad
  let payload = [];
  if (myCalls) {
    myCalls.forEach(myCall => {
      if (myCall.session.id === sessionId) myCall.status = status;
      payload.push(myCall);
    });
    ref.setState({ myCalls: payload });
  }
};
