
// maxSequence(array, step)
// array: the target array
// step: default is 1

function maxSequence(array, step) {
    var _array = array.slice(), //clone array
        _step = 1,
        _arrayTemp = [],
        i = 0;
    var parseLogic = {
        //result container
        parseResults: [],
        //set value to array,what's the last array of parseResults
        set: function (n) {
            this.parseResults[this.parseResults.length - 1].push(n);
        },
        //get the last array from parseResults
        get: function () {
            return this.parseResults[this.parseResults.length - 1];
        },
        //put a new array in parseResults
        addItem: function () {
            this.parseResults.push([]);
        },
        //sort parseResults
        sortByAsc: function () {
            this.parseResults.sort(function (a, b) {
                return a.length - b.length;
            });
        }
    };
    //check params
    _step = step || _step;
    //sort array by asc
    _array.sort(function (a, b) {
        return a - b;
    });
    //remove repeat of data
    for (i = 0; i < _array.length; i++) {
        if (_array[i] != _array[i + 1]) {
            _arrayTemp.push(_array[i]);
        }
    }
    _array = _arrayTemp.slice();
    _arrayTemp = [];
    parseLogic.addItem();//parse array
    for (i = 0; i < _array.length; i++) {
        if (_array[i] + _step == _array[i + 1]) {
            parseLogic.set(_array[i]);
            continue;
        }
        if (_array[i] - _step == _array[i - 1]) {
            parseLogic.set(_array[i]);
            parseLogic.addItem();
        }
    }
    parseLogic.sortByAsc();//sort result
    return parseLogic.get();//get the max sequence
}

// Find the most repeated number, return times
function findMost (arr) {
    if (!arr.length) return;
    if (arr.length === 1) return 1;
    let res = {};
    let maxName, maxNum = 0
    arr.forEach((item) => {
      res[item] ? res[item] += 1 : res[item] = 1
      if (res[item] > maxNum) {
        maxName = item
        maxNum = res[item]
      }
    })
    return maxNum;
  }
 
// swap ones place with tens place
function swopNum(arr){
    var newArr = [];
    for(var i = 0; i < arr.length; i++){
        var unit = parseInt(arr[i] % 10);
        var decade = parseInt((arr[i] % 100) / 10);
        var newNum = Number(unit.toString() + decade.toString());
        newArr.push(newNum);
    }
    return newArr;
}

// Tell if the numbers on ones place are consecutive
function unitLinked(arr){
    var newArr = [];
    for(var i = 0; i < arr.length; i++){
        var unit = parseInt(arr[i] % 10);
        newArr.push(unit);
    }
    if(maxSequence(newArr).length >= 5){
        return true;
    }else{
        return false;
    }
}

// Tell if the numbers on tens place are consecutive
function decadeLinked(arr){
    var newArr = [];
    for(var i = 0; i < arr.length; i++){
        var decade = parseInt((arr[i] % 100) / 10);
        newArr.push(decade);
    }
    if(maxSequence(newArr).length >= 5){
        return true;
    }else{
        return false;
    }
}

// if (tens - ones) always the same
function sameGap(arr){
    var newArr = [];
    for(var i = 0; i < arr.length; i++){
        var unit = parseInt(arr[i] % 10);
        var decade = parseInt((arr[i] % 100) / 10);
        newArr.push(decade - unit);
    }

    if(findMost(newArr) >= 5){
        return true;
    }else{
        return false;
    }
}


// Tell if any player wins in the horizontal direction
function winHor(keys) {
    if (maxSequence(keys).length >= 5) {
        return true;
    } else {
        return false;
    }
}

// Tell if any player wins in the vertical direction
function winVer(keys) {
    if (maxSequence(swopNum(keys)).length >= 5) {
        return true;
    } else {
        return false;
    }
}

// Tell if any player wins in the diagonal direction
function winBias(keys) {
    if (unitLinked(keys) && decadeLinked(keys)) {
        if(sameGap(keys)){
            return true;
        }else{
            return false;
        }
    } else {
        return false;
    }
}


// Tell if any player wins the game
function isWin(player, name) {
    // Tell if the player wins in one of four directions
    if (winHor(player)) {
        alert(name + " wins! Game Over!");
    } else if (winVer(player)) {
        alert(name + " wins! Game Over!");
    } else if (winBias(player)) {
        alert(name + " wins! Game Over!");
    }
}