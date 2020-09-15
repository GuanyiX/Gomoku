var griddiv;

// create a chess board
for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
        griddiv = document.createElement("div");
        griddiv.setAttribute("class", "grid");
        document.querySelector(".board").appendChild(griddiv);
    }
}

// create a virtual chess board
for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        var vgriddiv = document.createElement("div");
        vgriddiv.setAttribute("class", "virtual-grid");
        // Set a unique id to every single key, for example: 37
        var position = i.toString() + j.toString();
        vgriddiv.setAttribute("id", position);
        document.querySelector(".virtual-board").appendChild(vgriddiv);
    }
}

var gridList = document.getElementsByClassName("virtual-grid");
for (var i = 0; i < gridList.length - 1; i++) {
    gridList[i].addEventListener("click", changeColor);
}

var index = 0;
function changeColor(e) {
    if (index % 2 === 0) {
        e.target.style.background = "grey";
        e.target.style.border = "1px black solid";
    } else {
        e.target.style.background = "Ivory";
        e.target.style.border = "1px black solid";
    }
    index++;
    winnerAlgo();
}

// Generate two arrays which contain all the black keys and white keys
function winnerAlgo() {
    var arr = document.getElementsByClassName("virtual-grid");
    var greyarr = [];
    var ivoryarr = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].style.background == "grey") {
            greyarr.push(Number(arr[i].id));
        } else if (arr[i].style.background == "ivory") {
            ivoryarr.push(Number(arr[i].id));
        }
    }
    // // Print all the black keys and white keys
    // console.log("black keys: " + greyarr);
    // console.log("white keys: " + ivoryarr);


    isWin(greyarr, "Black");
    isWin(ivoryarr, "White");
}



