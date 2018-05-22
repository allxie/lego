const generateTrash = function(singleWidth){
return { // this is the data for the trash brick
      "id": "trash",
      "label" : "Delete",
      "color" : "white",
      "pegs" : 2,
      "width": (singleWidth * 2) + "px", "occupied": false
    }
};

const TRASH = "trash";