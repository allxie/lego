// TASKS
//  * Style block creation unit
//  * Fix board layout init numbers
//  * Speed up pegs issue. Delete that function.
//  * Change color dropdowns to colored select tiles
//  * Make it so that if you drop a brick on a taken slot and there's a not-taken one nearby, it will snap to that one.
//  * Address window resizing
//  * Restrict grabbing if a brick is surrounded.
//  * Size grid with a dial
//  * Be able to hilight and drag structures of blocks



angular.module('leGo', [])
	.controller('MainCtrl', ['$scope', '$window', function($scope, $window, $index){
    $scope.singleWidth = 46; //Change this to change width of blocks
    $scope.pixleWidth = $scope.singleWidth + "px";
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

    $scope.trashDefault = {"id": "trash", "label" : "Delete", "color" : "white", "pegs" : 2, "width": ($scope.singleWidth * 2) + "px", "occupied": false};

    // Object holds each square and keeps track of where each brick is
		window.dropTarget = $scope.dropTarget = {};

    //Figures out the width of the screen
    //in order to fill it with the right number of slots
    $scope.$watch(function(){
      var height = $window.innerHeight - 10;
      var width = $window.innerWidth - 10;
      var blockCount = (Math.floor(width / ($scope.singleWidth))) * (Math.floor(height/46));
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
      $scope.dropTarget["trash"] = $scope.trashDefault;

    }

    $scope.getPegs = function(n){
      // console.log("pegs", n);
     return new Array(n);
    };

    $scope.incrementId = function(id){
      newId = id.substring(1);
      newId = Number(newId);
      newId ++;
      newId = "s" + newId;
      // console.log("new id ", newId);
      return newId;
    }

    // Checks to see if the squares the new box will take up are occupied
    $scope.isOccupied = function(blockId, from, target){
      var fillspace;
      $scope.dropTarget[from] == undefined ? fillspace = $scope.width : fillspace = $scope.dropTarget[from].pegs;
      var checkSquare = target;
      for(var i = 0; i < fillspace; i++){
        console.log("checking ", checkSquare);
        if($scope.dropTarget[checkSquare].occupied && ($scope.dropTarget[checkSquare].id != blockId)) {
          console.log("occupado");
          return true;
        }
        checkSquare = $scope.incrementId(checkSquare);
      }
    }

    $scope.clearSquares = function(from){
      var item = $scope.dropTarget[from];
      var clearSquare = from;
      for(var i = 0; i < item.pegs; i++){
        $scope.dropTarget[clearSquare] = {};
        clearSquare = $scope.incrementId(clearSquare);
      }
    }

    $scope.moveToBox = function(blockId, from, targetId) {
      // Checks to see if that space is already filled. If so, don't move brick.

      if (targetId != "trash"){
        if ($scope.isOccupied(blockId, from, targetId)){
          console.log("occupied");
          return;
        }
      }

      // Checks to see if we're pulling from the board or origin
      if( from != "origin" ){
        // Sets item to move
        var item = $scope.dropTarget[from];
        $scope.clearSquares(from);
      } else { // NEW BRICK!
        // We're making a new brick!
        // Sets item as the presets in the form
        var blockWidth = ($scope.width * $scope.singleWidth) + "px";
        console.log(blockWidth);
        var item = {id: $scope.brickCount, color: $scope.color.value, width: blockWidth, pegs: $scope.width, height: $scope.height, occupied: true};

        $scope.brickCount ++;
      }

      // Moves item
      $scope.dropTarget[targetId] = item;
      console.log("item", item);
      console.log("new spot", $scope.dropTarget[targetId]);
      var occupiedId = targetId;

      if(targetId != "trash"){
        for(var i = 0; i < item.pegs; i++){
          $scope.dropTarget[occupiedId].occupied = true;
          $scope.dropTarget[occupiedId].id = item.id;
          occupiedId = $scope.incrementId(occupiedId);
        }
      }

      // Empties the trash.
      $scope.dropTarget["trash"] = $scope.trashDefault;

      $scope.$apply(); //maybe learn to use this?
    };

	}]) // end MainCtrl

	.directive("brick", Brick)
	.directive("slot", Slot)


	;
//// other controllers

