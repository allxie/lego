var Brick = function() {

  return {
    restrict: "A",
    link: function(scope, element, attributes, ctrl) {
      element.attr("draggable", true);

      element.bind("dragstart", function(eventObject) {
      	//passing three things to moveToBox:
        //1.) the lego block's ID
      console.log("attr", element);
        eventObject.dataTransfer.setData("blockId", attributes.itemid);
        //2.) The id of the slot we're dragging it from
        eventObject.dataTransfer.setData("from", eventObject.path[1].id);

      	// console.log("dragstart event object", eventObject);

      });
    }
  };
}