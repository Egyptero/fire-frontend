export default (ref, data) => {
  console.log("ODI: Error Message");
  ref.props.enqueueSnackbar(data.message, { variant: "error" });
};
