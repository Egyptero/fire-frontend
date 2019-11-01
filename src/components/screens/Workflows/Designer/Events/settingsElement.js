export default (elementView, evt, ref) => {
  evt.preventDefault();
  evt.stopPropagation();
  ref.handleElementSettingsOpen(elementView);
  console.log("settingsElement invoked");
};
