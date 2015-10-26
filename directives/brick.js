var Brick = function() {

  return {
    restrict: "A",
    link: function(scope, element, attributes, ctrl) {
      element.attr("draggable", true);

      element.bind("dragstart", function(eventObject) {
        eventObject.dataTransfer.setData("text", attributes.itemid);
      });
    }
  };
}