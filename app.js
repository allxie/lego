angular.module('leGo', [])
	.controller('MainCtrl', ['$scope', function($scope, $index){
		$scope.award = "a word";
		$scope.dropTarget = {'s1': [], 's2': []};

		$scope.items = [
	    {id: 1, color: "blue", width: 2},
	    {id: 2, color: "green", width: 2},
	    {id: 3, color: "orange", width: 2},
	    {id: 4, color: "red", width: 2}
    					];

    $scope.moveToBox = function(blockId, targetId) {
        for (var index = 0; index < $scope.items.length; index++) {
            var item = $scope.items[index];
            if (item.id == blockId) {
                // add to dropped array
                console.log("target to", targetId);
                $scope.dropTarget[targetId].push(item);
                console.log("Drop target", $scope.dropTarget);
                // remove from items array
                $scope.items.splice(index, 1);
            }
        }
        $scope.$apply();
        console.log("end drop target", $scope.dropTarget);
    };

	}]) // end MainCtrl

	.directive("brick", Brick)
	.directive("slot", Slot)

	;
//// other controllers