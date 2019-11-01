export default (ref, sessionId, request, newSession) => {
  console.log(
    "Phone: Call referred as request: " +
      request +
      " and new session:" +
      newSession
  );
};
