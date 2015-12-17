// TASKS
//  * Style block creation unit
//  * Change color dropdowns to colored select tiles
//  * Change brick origin on change instead of onsubmit
//  * Make it so that if you drop a brick on a taken slot and there's a not-taken one
// nearby, it will snap to that one.
//  * Make multi-sized blocks
//  * Address window resizing
//  * Restrict grabbing if a brick is surrounded.
//  * Size grid with a dial
//  * Be able to hilight and drag structures of blocks



angular.module('leGo', [])
	.controller('MainCtrl', ['$scope', '$window', function($scope, $window, $index){
		$scope.brickCount = 1; // Increments later to make unique lego ID
    // Options for color dropdown
    $scope.colorOptions = [{
       name: 'Red',
       value: 'red'
    }, {
       name: 'Orange',
       value: 'orange'
    },{
       name: 'Yellow',
       value: 'yellow'
    }, {
       name: 'Green',
       value: 'green'
    },{
       name: 'Blue',
       value: 'blue'
    }, {
       name: 'Purple',
       value: 'purple'
    }];

    // Object holds each square and keeps track of where each brick is
		window.dropTarget = $scope.dropTarget = {};

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
        $scope.dropTarget[idTitle] = {};

      }
      $scope.dropTarget["trash"] = {"id": "trash", "label": "Delete"};

    }


    $scope.moveToBox = function(blockId, from, targetId) {
      // Checks to see if that space is already filled. If so, don't move brick.
      if($scope.dropTarget[targetId].color && targetId != "trash") {
        return false;
      }
      // Checks to see if we're pulling from the board or origin
      if( from != "origin" ){
        // Sets item to move
        var item = $scope.dropTarget[from];
        // Clears the last square
        $scope.dropTarget[from] = {};
      } else { // NEW BRICK!
        // We're making a new brick!
        // Sets item as the presets in the form
        var item = {id: $scope.brickCount, color: $scope.color.value, width: $scope.width, height: $scope.height};

        $scope.brickCount ++;
      }
      // Moves item
      $scope.dropTarget[targetId] = item;

      // Empties the trash.
      $scope.dropTarget["trash"] = {"id": "trash", "label" : "Delete"};

      $scope.$apply(); //maybe learn to use this?
    };

	}]) // end MainCtrl

	.directive("brick", Brick)
	.directive("slot", Slot)


	;
//// other controllers

