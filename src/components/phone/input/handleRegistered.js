export default ref => {
  console.log("Phone: Registered");
  ref.setState({
    sipState: "Registered"
  });
};
