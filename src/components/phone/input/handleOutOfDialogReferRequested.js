export default (ref, referServerContext) => {
  console.log("Phone: OutOfDialogReferRequest received");
  const { sipUA } = ref.state;
  if (sipUA.validateRequest(referServerContext)) {
    referServerContext.accept();
  } else {
    referServerContext.reject();
  }
};
