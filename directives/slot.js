var Slot = function () {

  return {
    restrict: "A",
    link: function (scope, element, attributes, ctlr) {

      element.bind("dragover", function(eventObject){
        eventObject.preventDefault();
      });

      element.bind("drop", function(eventObject) {
        const fromId = eventObject.dataTransfer.getData("fromGridId");
        const target = angular.element(element).attr("id");

        scope.moveBrick(fromId, target);
        // cancel actual UI element from dropping, since the angular will recreate a the UI element
        eventObject.preventDefault();
        scope.$apply();
      });
    }
  };
}
