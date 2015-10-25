var Brick = function() {

  return {
    restrict: "A",
    link: function(scope, element, attributes, ctlr) {
      element.attr("draggable", true);

      element.bind("dragstart", function(eventObject) {
        eventObject.originalEvent.dataTransfer.setData("text", attributes.itemid);
      });
    }
  };
}