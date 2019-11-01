export default ref => {
  console.log("Phone: Request to remove all sessions");
  ref.setState({ myCalls: [] });
};
