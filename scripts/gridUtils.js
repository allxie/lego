const makeNewBrick = (color, pegCount, height, brickSequence) => {
  brickSequence ++;
  const blockWidth = (pegCount * SINGLE_WIDTH) + "px";
  return {
    color,
    pegCount,
    height,
  	id: brickSequence,
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
  if (targetGridId === TRASH) return false;
  let checkSquare = targetGridId;
  for(let i = 0; i < brickWidth; i++){
    // TODO: add a check to see if it's the same brick
    if(grid[checkSquare].occupied) return true;
    checkSquare = incrementGridId(checkSquare);
  }
}

const markTargetsOccupied = ({targetGridId, brick, grid}) => {
  let occupiedId = targetGridId;
  for(let i = 0; i < brick.pegCount; i++){
    grid[occupiedId].occupied = true;
    grid[occupiedId].brick_id = brick.brick_id;
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