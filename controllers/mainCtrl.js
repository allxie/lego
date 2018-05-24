//TODO: remove unnecessary scope variables. Anything not accessed by the dom should be const function.
// also, remove those from this file. Make a util.

const mainController = function($scope, $window, $index){
    $scope.singleWidth = 46; //Change this to change width of blocks
    const brickHeight = 46;
    $scope.bricksAcross;
	  let brickSeqence = 1; // Increments later to make unique lego ID
    $scope.colorOptions = colors;

    $scope.trashDefault = generateTrash($scope.singleWidth);

    // Object holds each square and keeps track of where each brick is
	  window.grid = $scope.grid = {};

    //Figures out the width of the screen
    //in order to fill it with the right number of slots
    $scope.$watch(function(){
      let windowHeight = $window.innerHeight - 10;
      let windowWidth = $window.innerWidth - 10;
      $scope.bricksAcross = Math.floor(windowWidth / ($scope.singleWidth));
      let blockCount = (Math.floor(windowWidth / ($scope.singleWidth))) * (Math.floor(windowHeight/brickHeight));
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
      return new Array(numPegs);
    };

    $scope.incrementId = function(id){
      let newId = id.substring(1); // remove the s identifier
      newId = Number(newId) + 1;
      return "s" + newId;
    }

    // Checks to see if the squares the new box will take up are occupied
    const isOccupied = function(blockId, from, target){
    	if (target === TRASH) return false;
      let fillspace = !$scope.grid[from]? $scope.width : $scope.grid[from].pegs;
      let checkSquare = target;
      for(let i = 0; i < fillspace; i++){
        if($scope.grid[checkSquare].occupied && ($scope.grid[checkSquare].id != blockId)) {
          return true;
        }
        checkSquare = $scope.incrementId(checkSquare);
      }
    }

    const markTargetsOccupied = function(targetId, brick){
    	let occupiedId = targetId;
      for(let i = 0; i < brick.pegs; i++){
        $scope.grid[occupiedId].occupied = true;
        $scope.grid[occupiedId].id = brick.id;
        occupiedId = $scope.incrementId(occupiedId);
      }
    }

    const clearSquares = function(clearSquareId){
      const brick = $scope.grid[clearSquareId];
      for(let i = 0; i < brick.pegs; i++){
        $scope.grid[clearSquareId] = {};
        clearSquareId = $scope.incrementId(clearSquareId);
      }
    }

    const makeNewBrick = function(){
        brickSeqence ++;
        const blockWidth = ($scope.width * $scope.singleWidth) + "px";
        return {
        	id: brickSeqence,
        	color: $scope.color.value,
        	width: blockWidth,
        	pegs: $scope.width,
        	height: $scope.height,
        	occupied: true
        };

    }

    $scope.moveToBox = function(blockId, from, targetId) {
      if (isOccupied(blockId, from, targetId)) return;
      let brick = null;

      // Checks to see if we're pulling from the board or origin
      if( from === "origin" ){
        brick = makeNewBrick();
      } else {
        // Sets item to move
        brick = $scope.grid[from];
        clearSquares(from);
      }

      if(targetId !== TRASH){
      	$scope.grid[targetId] = brick;
      	markTargetsOccupied(targetId, brick)
      }

      $scope.$apply(); //maybe learn to use this?
    };
}

