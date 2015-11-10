var Brick = function() {

  return {
    restrict: "A",
    link: function(scope, element, attributes, ctrl) {
      element.attr("draggable", true);

      element.bind("dragstart", function(eventObject) {
        eventObject.dataTransfer.setData("text", attributes.itemid);
        eventObject.dataTransfer.setData("from", eventObject.path[2].id);

      	console.log("dragstart event object", eventObject);

      });
    }
  };
}