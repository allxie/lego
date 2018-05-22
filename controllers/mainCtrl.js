var mainController = function($scope, $window, $index){
    $scope.singleWidth = 46; //Change this to change width of blocks
    $scope.pixleWidth = $scope.singleWidth + "px";
	$scope.brickCount = 1; // Increments later to make unique lego ID
    // Options for color dropdown
    $scope.bricksAccross;
    $scope.colorOptions = colors;

    $scope.trashDefault = trash($scope.singleWidth);

    // Object holds each square and keeps track of where each brick is
	window.dropTarget = $scope.dropTarget = {};

    //Figures out the width of the screen
    //in order to fill it with the right number of slots
    $scope.$watch(function(){
      var height = $window.innerHeight - 10;
      var width = $window.innerWidth - 10;
      $scope.bricksAccross = Math.floor(width / ($scope.singleWidth));
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
      var fillspace = $scope.dropTarget[from] == undefined ? $scope.width : $scope.dropTarget[from].pegs;
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

      // Validate width
        $scope.width > 0? $scope.width = $scope.width : $scope.width = 1;
        $scope.width > $scope.bricksAccross ? $scope.width = $scope.bricksAccross: $scope.width = $scope.width;
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
        console.log("item", item);

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

}

