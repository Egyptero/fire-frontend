export default (ref, response, cause) => {
  console.log("Phone: Registeration Failed");
  ref.setState({
    sipState: "Failed"
  });
};
