var tower = [];
tower["a"] = [];
tower["b"] = [];
tower["c"] = [];
var count = 0;

function start(size){
    for (var i = size; i > 0; i-- ){
        tower["a"].push(i);
    }
    
    console.log(tower);
    hanoi("a","b", size);
}

function hanoi(from, to, size){
    if(isSolved(size) || count >= 31){
        return;
    }
    
    moveDisk(from, to);
    var newTo = getNextLetter(to);
    moveDisk(from, newTo);
    var newFrom = getNextLetter(from);
    moveDisk(newFrom, newTo);

    
    newFrom = getNewFrom(newTo);
    newTo = getNewTo(newFrom, newTo);
    
    if(isSolved(size) || count >= 31){
        return;
    }
    
    moveDisk(newFrom, newTo);
    count ++;
    newFrom = getNextLetter(to);
    newTo = getNextLetter(newFrom);
    return hanoi(newFrom, newTo, size);
}

function isSolved(size){
    var solved = false;
    var letters = ["b","c"];
    for (var i = 0; i < letters.length; i++) {
        if(tower[letters[i]].length === parseInt(size)){
            solved = true;
        }
    }
    return solved;
}

function getNewTo(currentFrom, currentTo){
    var letters = ["a","b","c"];
    for (var i = 0; i < letters.length; i++) {
        if(letters[i] !== currentFrom && letters[i] !== currentTo){
            return letters[i];
        }
    }
}

function getNewFrom(currentTo){
    var letters = ["a","b","c"];
    var freePeg = [];
    for (var i = 0; i < letters.length; i++ ) {
        if(letters[i] !== currentTo){
            freePeg.push(letters[i]);
        }        
    }    
    
    if(tower[freePeg[0]].length === 0){
        return freePeg[1];
    }else if(tower[freePeg[1]].length === 0){
        return freePeg[0];
    }
    
    lastOne = tower[freePeg[0]];
    lastTwo = tower[freePeg[1]];
    if(lastOne > lastTwo){
        return freePeg[1];
    }else{
        return freePeg[0];
    }
}



function moveDisk(from, to){
    index = tower[from].length - 1;
    var disk = tower[from][index];
    tower[to].push(disk);
    tower[from].splice(index, 1);
    console.log(tower);
}


function getNextLetter(letter){
    var _letter = ["a","b","c","a"];
    for (var i = 0; i < _letter.length -1; i++){
        if(letter === _letter[i]){
            return _letter[i+1];
        }
    }
}
