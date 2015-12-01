var Slot = function () {

  return {
    restrict: "A",
    link: function (scope, element, attributes, ctlr) {

      var target = angular.element(element).attr("id");
      console.log("ID", target);
      console.log("elementary, dear watson", element);

      element.bind("dragover", function(eventObject){
        eventObject.preventDefault();
      });

      element.bind("drop", function(eventObject) {
        // invoke controller/scope move method

        //Figures out which slot we're dropping it to
        target = angular.element(element).attr("id");
        //calls the function moveToBox (which lives in app.js)
        //passes through the blockId and the id of the slot where we picked up the block
        scope.moveToBox(parseInt(eventObject.dataTransfer.getData("blockId")), eventObject.dataTransfer.getData("from"),target);
        // cancel actual UI element from dropping, since the angular will recreate a the UI element
        eventObject.preventDefault();
        scope.$apply();
      });
    }
  };
}
