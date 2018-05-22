const mainController = function($scope, $window, $index){
    $scope.singleWidth = 46; //Change this to change width of blocks
    $scope.pixleWidth = $scope.singleWidth + "px";
	  $scope.brickCount = 1; // Increments later to make unique lego ID
    // Options for color dropdown
    $scope.bricksAccross;
    $scope.colorOptions = colors;

    $scope.trashDefault = generateTrash($scope.singleWidth);

    // Object holds each square and keeps track of where each brick is
	  window.grid = $scope.grid = {};

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
        $scope.grid[idTitle] = {};

      }
      $scope.grid[TRASH] = $scope.trashDefault;

    }

    $scope.getPegs = function(numPegs){
    	if(numPegs < 1) numPegs = 1;
      return new Array(numPegs);
    };

    $scope.incrementId = function(id){
      let newId = id.substring(1); // remove the s identifier
      newId = Number(newId) + 1;
      return "s" + newId;
    }

    // Checks to see if the squares the new box will take up are occupied
    $scope.isOccupied = function(blockId, from, target){
    	if (target === TRASH) return false;
      let fillspace = $scope.grid[from] == undefined ? $scope.width : $scope.grid[from].pegs;
      let checkSquare = target;
      for(let i = 0; i < fillspace; i++){
        if($scope.grid[checkSquare].occupied && ($scope.grid[checkSquare].id != blockId)) {
          return true;
        }
        checkSquare = $scope.incrementId(checkSquare);
      }
    }

    $scope.clearSquares = function(clearSquareId){
      const brick = $scope.grid[clearSquareId];
      for(let i = 0; i < brick.pegs; i++){
        $scope.grid[clearSquareId] = {};
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
      if ($scope.isOccupied(blockId, from, targetId)) return;

      let brick = null;
      // Validate width -- todo: what?
      $scope.width = $scope.width > 0 ? $scope.width : 1;
      $scope.width = $scope.width > $scope.bricksAccross ? $scope.bricksAccross: $scope.width;

      // Checks to see if we're pulling from the board or origin
      if( from === "origin" ){
        brick = $scope.makeNewBrick();
      } else {
        // Sets item to move
        brick = $scope.grid[from];
        $scope.clearSquares(from);
      }

      // Moves item
      $scope.grid[targetId] = brick;
      let occupiedId = targetId;

      //sets the appropriate squares to occupied
      if(targetId !== TRASH){
        for(let i = 0; i < brick.pegs; i++){
          $scope.grid[occupiedId].occupied = true;
          $scope.grid[occupiedId].id = brick.id;
          occupiedId = $scope.incrementId(occupiedId);
        }
      }

			if(targetId === TRASH){
    		// Empties the trash.
        $scope.grid[TRASH] = $scope.trashDefault;
    	}

      $scope.$apply(); //maybe learn to use this?
    };

}

