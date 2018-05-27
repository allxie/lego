//TODO: remove unnecessary scope variables. Anything not accessed by the dom should be const function.
// also, remove those from this file. Make a util.

const mainController = ($scope, $window, $index) => {
	  $scope.colorOptions = colors;
    $scope.singleWidth = SINGLE_WIDTH; //Change this to change width of blocks
    $scope.bricksAcross;
    const brickHeight = 46;
	  let brickSequence = 1; // Increments later to make unique lego ID

    // Object holds each square and keeps track of where each brick is
	  window.grid = $scope.grid = {};

    //Figures out the width of the screen
    //in order to fill it with the right number of slots
    $scope.$watch(() => {
      let windowHeight = $window.innerHeight - 10;
      let windowWidth = $window.innerWidth - 10;
      $scope.bricksAcross = Math.floor(windowWidth / (SINGLE_WIDTH));
      let slotCount = (Math.floor(windowWidth / (SINGLE_WIDTH))) * (Math.floor(windowHeight/brickHeight));
      //tells us the number of blocks for that size screen
       return slotCount;
    }, (slotCount) => initTable(slotCount));
    // Fills the screen with the right number of slots
    //maybe fix this. Fix redraw
    const initTable = (slotCount) => {
      for(let i = 2; i <= slotCount - 1; i++){
        let idTitle = gridId(i);
        $scope.grid[idTitle] = {};
      }
      $scope.grid[TRASH] = generateTrash(SINGLE_WIDTH);
    }

    //makes an array to ngRepeat over when displaying each brick
    $scope.getPegs = (pegCount) => {
      return new Array(pegCount);
    };

    const getBrickWidth = (gridId) => {
    	return $scope.grid[gridId] && $scope.grid[gridId].pegCount || $scope.originWidth;
    }

    $scope.moveBrick = (fromGridId, targetGridId) => {
    	const brickWidth = getBrickWidth(fromGridId);
      if (isOccupied({fromGridId, targetGridId, brickWidth, grid: $scope.grid})) return;
      let brick = null;

      // Checks to see if we're pulling from the board or origin
      if( fromGridId === ORIGIN ){
        brick = makeNewBrick($scope.color.value, brickWidth, $scope.height, brickSequence);
      } else {
        // Sets item to move
        brick = $scope.grid[fromGridId];
        clearSquares(fromGridId, $scope.grid);
      }

      if(targetGridId !== TRASH){
      	$scope.grid[targetGridId] = brick;
      	markTargetsOccupied({targetGridId, brick, grid: $scope.grid})
      }

      $scope.$apply(); //maybe learn to use this?
    };
}