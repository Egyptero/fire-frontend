export default (ref, id) => {
  console.log("Phone: Remove session by ID request and ID:" + id);
  let { myCalls } = ref.state;
  myCalls.forEach((myCall, index) => {
    if (myCall.session.id === id) myCalls.splice(index, 1);
  });
  ref.setState({ myCalls });
};
