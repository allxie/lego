var Slot = function () {

  return {
    restrict: "A",
    link: (scope, element, attributes, ctlr) => {

      element.bind("dragover", function(eventObject){
        eventObject.preventDefault();
      });

      element.bind("drop", function(eventObject) {

        let fromId = eventObject.dataTransfer.getData("fromGridId");

        let targetGridId = angular.element(element).attr("id");

        scope.moveBrick(fromId, targetGridId);
        // cancel actual UI element from dropping, since the angular will recreate a the UI element
        eventObject.preventDefault();
        scope.$apply();
      });
    }
  };
}
