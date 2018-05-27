const makeNewBrick = (color, pegCount, height, brickSequence) => {
  brickSequence ++;
  const blockWidth = (pegCount * SINGLE_WIDTH) + "px";
  return {
    color,
    pegCount,
    height,
  	brickId: brickSequence,
  	width: blockWidth,
  	occupied: true
  };

}

const incrementGridId = (id) => {
  let newId = id.substring(1); // remove the s identifier
  newId = Number(newId) + 1;
  return gridId(newId);
}

const gridId = (num) => `s${num}`;


/* ~~~~~~~~~  Move a brick  ~~~~~~~~~ */

// Checks to see if the squares the new box will take up are occupied
const isOccupied = ({fromGridId, targetGridId, brickWidth, grid}) => {
  //TODO: make bricks be able to move right.
  if (targetGridId === TRASH) return false;
  let checkSquare = targetGridId;
  for(let i = 0; i < brickWidth; i++){
    if(!grid[checkSquare] || !grid[fromGridId]) return false;
    const isSameBrick = grid[checkSquare].brickId === grid[fromGridId].brickId;
    if(grid[checkSquare].occupied && !isSameBrick) return true;
    checkSquare = incrementGridId(checkSquare);
  }
}

const markTargetsOccupied = ({targetGridId, brick, grid}) => {
  let occupiedId = targetGridId;
  for(let i = 0; i < brick.pegCount; i++){
    grid[occupiedId].occupied = true;
    grid[occupiedId].brickId = brick.brickId;
    occupiedId = incrementGridId(occupiedId);
  }
}

const clearSquares = (clearSquareId, grid) => {
  const brick = grid[clearSquareId];
  for(let i = 0; i < brick.pegCount; i++){
    grid[clearSquareId] = {};
    clearSquareId = incrementGridId(clearSquareId);
  }
}