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
        target = angular.element(element).attr("id");
        scope.moveToBox(parseInt(eventObject.dataTransfer.getData("text")), eventObject.dataTransfer.getData("from"),target);
        // cancel actual UI element from dropping, since the angular will recreate a the UI element
        eventObject.preventDefault();
        scope.$apply();
      });
    }
  };
}
