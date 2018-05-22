const mainController = function($scope, $window, $index){
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
      let height = $window.innerHeight - 10;
      let width = $window.innerWidth - 10;
      $scope.bricksAccross = Math.floor(width / ($scope.singleWidth));
      let blockCount = (Math.floor(width / ($scope.singleWidth))) * (Math.floor(height/46));
      //tells us the number of blocks for that size screen
       return blockCount;
    }, function(value) {
        $scope.initTable(value);
    });
    // Fills the screen with the right number of slots
    //maybe fix this. Fix redraw
    $scope.initTable = function(blockCount){
      for(let i = 2; i <= blockCount - 1; i++){
        let idTitle = "s" + i;
        $scope.dropTarget[idTitle] = {};

      }
      $scope.dropTarget["trash"] = $scope.trashDefault;

    }

    $scope.getPegs = function(n){
      return new Array(n);
    };

    $scope.incrementId = function(id){
      newId = id.substring(1);
      newId = Number(newId);
      newId ++;
      newId = "s" + newId;
      return newId;
    }

    // Checks to see if the squares the new box will take up are occupied
    $scope.isOccupied = function(blockId, from, target){
      let fillspace = $scope.dropTarget[from] == undefined ? $scope.width : $scope.dropTarget[from].pegs;
      let checkSquare = target;
      for(let i = 0; i < fillspace; i++){
        if($scope.dropTarget[checkSquare].occupied && ($scope.dropTarget[checkSquare].id != blockId)) {
          return true;
        }
        checkSquare = $scope.incrementId(checkSquare);
      }
    }

    $scope.clearSquares = function(clearSquareId){
      const brick = $scope.dropTarget[clearSquareId];
      for(let i = 0; i < brick.pegs; i++){
        $scope.dropTarget[clearSquareId] = {};
        clearSquareId = $scope.incrementId(clearSquareId);
      }
    }

    $scope.makeNewBrick = function(){
        $scope.brickCount ++;
        const blockWidth = ($scope.width * $scope.singleWidth) + "px";
        return {
        	id: $scope.brickCount,
        	color: $scope.color.value,
        	width: blockWidth,
        	pegs: $scope.width,
        	height: $scope.height,
        	occupied: true
        };

    }

    $scope.moveToBox = function(blockId, from, targetId) {
      let brick = null;
      // Validate width
        $scope.width > 0? $scope.width = $scope.width : $scope.width = 1;
        $scope.width > $scope.bricksAccross ? $scope.width = $scope.bricksAccross: $scope.width = $scope.width;
      // Checks to see if that space is already filled. If so, don't move brick.

      if (targetId !== "trash"){
        if ($scope.isOccupied(blockId, from, targetId)) return;
      }

      // Checks to see if we're pulling from the board or origin
      if( from === "origin" ){
        brick = $scope.makeNewBrick();
      } else {
        // Sets item to move
        brick = $scope.dropTarget[from];
        $scope.clearSquares(from);
      }

      // Moves item
      $scope.dropTarget[targetId] = brick;
      let occupiedId = targetId;

      //sets the appropriate squares to occupied
      if(targetId !== "trash"){
        for(let i = 0; i < brick.pegs; i++){
          $scope.dropTarget[occupiedId].occupied = true;
          $scope.dropTarget[occupiedId].id = brick.id;
          occupiedId = $scope.incrementId(occupiedId);
        }
      }

      // Empties the trash.
      $scope.dropTarget["trash"] = $scope.trashDefault;

      $scope.$apply(); //maybe learn to use this?
    };

}

