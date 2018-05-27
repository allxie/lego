const SINGLE_WIDTH = 46;

const generateTrash = function(singleWidth){
	return { // this is the data for the trash brick
      brick_id: "trash",
      label: "Delete",
      color: "white",
      pegCount: 2,
      width: (singleWidth * 2) + "px", "occupied": false
    }
};

const TRASH = "trash";
const ORIGIN = "origin";