angular.module('leGo', [])
	.controller('MainCtrl', ['$scope', function($scope){
		$scope.award = "a word";
		$scope.dropped = [];

		$scope.items = [
	    {id: 1, name: "Microwave"}, 
	    {id: 2, name: "Dishwasher" },
	    {id: 3, name: "Phone" },
	    {id: 4, name: "Punching Bag" }
    					];

    $scope.moveToBox = function(id) {
        for (var index = 0; index < $scope.items.length; index++) {
            var item = $scope.items[index];
            if (item.id == id) {
                // add to dropped array
                $scope.dropped.push(item);
                // remove from items array
                $scope.items.splice(index, 1);
            }
        }
        $scope.$apply();
    };

	}]) // end MainCtrl

	.directive("brick", Brick)
	.directive("slot", Slot);
//// other controllers