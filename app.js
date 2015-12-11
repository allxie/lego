angular.module('leGo', [])
	.controller('MainCtrl', ['$scope', '$window', function($scope, $window, $index){
		$scope.brickCount = 4;
		$scope.dropTarget = {'items': [{id: 1, color: "blue", width: 2}]};


    $scope.$watch(function(){
        var height = $window.innerHeight - 10;
        var width = $window.innerWidth; - 20
        console.log("width, ", width);
        console.log("height" , height);
        var blockCount = (Math.floor(width/102)) * (Math.floor(height/52));
        //tells us the number of blocks for that size screen
       return blockCount;
    }, function(value) {
        console.log("vaalue", value);
       $scope.initTable(value);
    });

    $scope.initTable = function(blockCount){
        for(i = 2; i <= blockCount; i++){
            var idTitle = "s" + i;
            $scope.dropTarget[idTitle] = [];
        }
        console.log($scope.dropTarget);

    }


// {id: 1, color: "blue", width: 2},
	    // {id: 2, color: "green", width: 2},
	    // {id: 3, color: "orange", width: 2},
	    // {id: 4, color: "red", width: 2}

    //user makes a custom brick
    $scope.makeBrick = function(){
        //Increments brick count to create a new id.
        $scope.brickCount ++;
        console.log($scope.brickWidth, $scope.brickHeight, $scope.color);
        $scope.dropTarget.items.push({id: $scope.brickCount, color: $scope.color, width: $scope.width, height: $scope.height});

        console.log($scope.dropTarget);

        //empty the fields
    }

    $scope.moveToBox = function(blockId, from, targetId) {
    	// console.log("block id: " , blockId, " targetID: ", targetId);
    	// console.log("FROM RUSSIA WITH LOVE : ", from);
        for(var i = 0; i < $scope.dropTarget[from].length; i++){

            var item = $scope.dropTarget[from][i];
            if (item.id == blockId) {
                // add to dropped array
                $scope.dropTarget[targetId].push(item);
                // console.log("Drop target", $scope.dropTarget);
                // remove from items array
                $scope.dropTarget[from].splice(i, 1);
            }
        }
        $scope.$apply(); //maybe learn to use this?
        // console.log("end drop target", $scope.dropTarget);
    };

	}]) // end MainCtrl

	.directive("brick", Brick)
	.directive("slot", Slot)


	;
//// other controllers

