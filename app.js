angular.module('leGo', [])
	.controller('MainCtrl', ['$scope', function($scope, $index){
		$scope.foobar = 2;
		$scope.dropTarget = {'items': [{id: 1, color: "blue", width: 2},
        {id: 2, color: "green", width: 2},
        {id: 3, color: "orange", width: 2},
        {id: 4, color: "red", width: 2}], 's1': [], 's2': [], 's3': [], 's4': [], 's5': [], 's6': []};

// {id: 1, color: "blue", width: 2},
	    // {id: 2, color: "green", width: 2},
	    // {id: 3, color: "orange", width: 2},
	    // {id: 4, color: "red", width: 2}

		// $scope.items = [
	 //    {id: 1, color: "blue", width: 2},
	 //    {id: 2, color: "green", width: 2},
	 //    {id: 3, color: "orange", width: 2},
	 //    {id: 4, color: "red", width: 2}
  //   					];

    $scope.moveToBox = function(blockId, from, targetId) {
    		console.log("block id: " , blockId, " targetID: ", targetId);
    		console.log("FROM RUSSIA WITH LOVE : ", from);
            // var fromBox = $scope.dropTarget;
        for(var i = 0; i < $scope.dropTarget[from].length; i++){
            console.log("helo!");
        // for (var index = 0; index < $scope.items.length; index++) {
            var item = $scope.dropTarget[from][i];
            if (item.id == blockId) {
                // add to dropped array
                $scope.dropTarget[targetId].push(item);
                console.log("Drop target", $scope.dropTarget);
                // remove from items array
                $scope.dropTarget[from].splice(i, 1);
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

