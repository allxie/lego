// TASKS
//  * Style block creation unit
//  * Make multi-sized blocks
//  * Address window resizing
//  * Size grid with a dial
//  * Be able to hilight and drag structures of blocks



angular.module('leGo', [])
	.controller('MainCtrl', ['$scope', '$window', function($scope, $window, $index){
		$scope.brickCount = 1;
    $scope.origin = {id: 1, color: "blue", width: 2};
		window.dropTarget = $scope.dropTarget = {};
    // {'items': [{id: 1, color: "blue", width: 2}]};


    //Figures out the width of the screen
    //in order to fill it with the right number of slots
    $scope.$watch(function(){
      var height = $window.innerHeight - 10;
      var width = $window.innerWidth; - 20
      var blockCount = (Math.floor(width/102)) * (Math.floor(height/52));
      //tells us the number of blocks for that size screen
       return blockCount;
    }, function(value) {
        $scope.initTable(value);
    });
    // Fills the screen with the right number of slots
    //maybe fix this. Fix redraw
    $scope.initTable = function(blockCount){
      for(i = 2; i <= blockCount - 1; i++){
        var idTitle = "s" + i;
        // $scope.dropTarget[idTitle] = [];
        $scope.dropTarget[idTitle] = {};

      }
      // $scope.dropTarget["trash"] = [{"label": "Delete"}];
      $scope.dropTarget["trash"] = {"id": "trash", "label": "Delete"};

      console.log("Innitting board ", $scope.dropTarget);
    }

    //user makes a custom brick
    $scope.makeBrick = function(){
      //Increments brick count to create a new id.
      $scope.brickCount ++;
      // console.log($scope.brickWidth, $scope.brickHeight, $scope.color);
      // $scope.dropTarget.items = {id: $scope.brickCount, color: $scope.color, width: $scope.width, height: $scope.height};
      $scope.origin = {id: $scope.brickCount, color: $scope.color, width: $scope.width, height: $scope.height};


      console.log($scope.dropTarget);

      //empty the fields

    }

    $scope.moveToBox = function(blockId, from, targetId) {
      var item;
    	console.log("block id: " , blockId, " targetID: ", targetId);
    	console.log("FROM RUSSIA WITH LOVE : ", from);

      from === "origin" ? item = $scope.origin : item = $scope.dropTarget[from];
      // Put item in new slot
      $scope.dropTarget[targetId] = item;
      // Clear old slot
      $scope.dropTarget[from] = {};
      console.log("Moved, " , $scope.dropTarget);
      $scope.dropTarget["trash"] = {"id": "trash", "label" : "Delete"};
      console.log("Deleted?, " , $scope.dropTarget);

      $scope.$apply(); //maybe learn to use this?
      // console.log("end drop target", $scope.dropTarget);
    };

	}]) // end MainCtrl

	.directive("brick", Brick)
	.directive("slot", Slot)


	;
//// other controllers

