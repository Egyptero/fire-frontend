export default (ref, response, cause) => {
  console.log("Phone: Unregistered");
  ref.setState({
    sipState: "Unregistered"
  });
};
