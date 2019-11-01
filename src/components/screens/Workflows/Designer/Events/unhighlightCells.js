export default ref => {
  ref.paper.findViewsInArea(ref.paper.getArea()).forEach(cellView => {
    cellView.model.removeAttr("remove");
    cellView.model.removeAttr("connect");
    cellView.model.removeAttr("settings");
    cellView.model.removeAttr("select");
  });
  ref.paper.hideTools();
};
