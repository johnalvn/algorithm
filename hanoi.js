var isSolved = function(tower){
    
    return tower["B"].length ===  5 || tower["C"].length === 5 ? true : false;
};
var moveDisk = function(fromPeg, toPeg){
    var endDiskFrom = fromPeg[fromPeg.length -1]; 
    toPeg.push(endDiskFrom);
    fromPeg.splice(fromPeg.length -1, 1);
};
var getLess = function(spareOne, spareTwo){
    oneNum = getLasItemArray(tower[spareOne]);
    twoNum = getLasItemArray(tower[spareTwo])
    return oneNum > twoNum ? spareOne : spareTwo;
};

var getLasItemArray = function(array){
    if(array.length === 0){
        return null;
    }
    return array[array.length - 1];
}

var getSparesPeg = function(currentOne){
    var spare =  ["A","B","C"];
    var others = [];
    for (var i = 0; i < spare.length; i++){
        if(spare[i] === currentOne) continue;
        others.push(spare[i]);
    }
    return others;
};

var getNextPegTo = function (currentOne, fromPeg){
    var spare =  ["A","B","C"];
    for(var j = 0; j < spare.length; j ++){
        if(spare[j] === currentOne || spare[j] === fromPeg) continue;
        return spare[j];
    }
}

var getNextPegFrom = function(currentOne){
    
    var spareFree = getSparesPeg(currentOne);
    if( tower[spareFree[0]] === 0){
        return spareFree[1]
    }else if(tower[spareFree[1]] === 0){
        return spareFree[0];
    }else{
        return getLess(spareFree[0], spareFree[1]);
    }
};



var getNextPeg = function(before){
    var next = null;
    switch (before) {
        case "A":
            next = "B";
            break;
        case "B":
            next = "C";
            break;
        case "C":
            next = "A";
            break;
    }
    return next;
};

var hanoi = function(tower, fromPeg, toPeg){
    
    if(isSolved(tower)){
        return;
    }
    moveDisk(tower[fromPeg], tower[toPeg]);
    moveDisk(tower[fromPeg], tower[getNextPeg(toPeg)]);
    moveDisk(tower[getNextPeg(fromPeg)], tower[getNextPeg(toPeg)]);
    
    var nextFrom = getNextPegFrom(tower[getNextPeg(toPeg)]);
    var nextTo = getNextPegTo(tower[getNextPeg(toPeg)], nextFrom);
    //console.log(nextFrom, nextTo);
    
    moveDisk(tower[nextFrom], tower[nextTo] );
    
    return hanoi(tower, toPeg, getNextPeg(fromPeg));

};

var tower = [];

tower["A"] = [5,4,3,2,1];
tower["B"] = [];
tower["C"] = [];

hanoi(tower, "A", "B");
