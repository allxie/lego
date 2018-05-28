var Brick = function() {

  return {
    restrict: "A",
    link: function(scope, element, attributes, ctrl) {
      element.attr("draggable", true);

      element.bind("dragstart", function(eventObject) {
        let fromGridId = eventObject.path[1].id;

        // The id of the slot we're dragging it from
        eventObject.dataTransfer.setData("fromGridId", fromGridId);

      });
    }
  };
}