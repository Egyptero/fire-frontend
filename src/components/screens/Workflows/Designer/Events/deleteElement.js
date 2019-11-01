/*
 * deleteElement is a method designed to delete any element from the view
 * each element when deleted , it will be removed from the desginer items.
 * also all links should be removed too.
 */
export default (elementView, evt, ref) => {
  // Stop any further actions with the element view e.g. dragging
  evt.stopPropagation();
  elementView.model.remove();
};
