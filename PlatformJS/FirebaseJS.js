 
 var config = {
    apiKey: "AIzaSyCZjt0SMXe12qPYjxIPRXMqw4LGXCcy37w",
    authDomain: "platform-c316b.firebaseio.com/.firebaseapp.com",
    databaseURL: "https://platform-c316b.firebaseio.com/",
    storageBucket: "platform-c316b.appspot.com"
  };
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();
    
    
var leaderboard = database.ref().child("Leaderboard");    
//var childMap = {};
//var childArr = [];
//var peopleL = 0;

class WorldRefer {
    constructor(num) {
        this.ref = leaderboard.child("World" + num);
        this.childMap = {};
        this.childArr = [];
        this.people = 0;
    }
}
    
var worldObjArr = [];    
    
function data(num) {
    var worldObj;
    //console.log(num);
    if (worldObjArr.length != num) {
        //there isnt a worldObj in the worldObjArr
        worldObj = new WorldRefer(num);
        worldObjArr[num-1] = worldObj;
    } else {
        //get it from the array
        worldObj = worldObjArr[num-1];
    }
    
    printlnLeaderboard("Leaderboard of World " + num + ": ", "green");
    var refer = worldObj.ref;
    var cArr = worldObj.childArr;
    var cMap = worldObj.childMap;
    refer.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapShot) {
                var key = childSnapShot.key;
                var childData = childSnapShot.val();
                
                //console.log(key + " " + childData);
                if (cArr.indexOf(childData) != -1) {
                    //already exists
                    cMap[childData].push(key);
                } else {
                    cArr.push(childData);
                    //console.log(childArr.length);
                    cMap[childData] = new Array();
                    cMap[childData].push(key);
                }
                worldObj.people++;
                //console.log(peopleL);
            });
            
            printLeaderboard(worldObj);
        });
        
}    

function printLeaderboard(worldObj) {
    var counter = 0;
    //console.log(childArr.length);
    worldObj.childArr.sort(function(a, b){return b - a});
    for (var i = 0; i < worldObj.childArr.length; i++) {
        var arr = worldObj.childMap[worldObj.childArr[i]];
       // console.log(arr.length);
        for (var j = 0; j < arr.length; j++) {
            printlnLeaderboard("  " + (counter + 1 ) + ". " + arr[j] + " " + worldObj.childArr[i]);
            //console.log(i + " " + j);
            counter++;
        }
    }
}
    
function addToLeaderboard(n, p, num) {
    var worldObj = worldObjArr[num-1];
    if (worldObj.people > 4) {
        //delete last person
        worldObj.childArr.sort(function(a, b){return b-a});
        //greatest to least
        var lastScore = worldObj.childArr[worldObj.childArr.length-1];
        var lastPerson = worldObj.childMap[lastScore][0];
        //var worldRef = leaderboard.ref().child("World" + worldNum);
        worldObj.ref.once("value")
            .then(function(snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var key = childSnapshot.key;
                    var val = childSnapshot.val();
                    if (key == lastPerson && lastScore == val) {
                        worldObj.ref.child(lastPerson).remove();
                        
                    }
                });
            });
        //remove from array
        if (worldObj.childMap[lastScore].length == 1) {
            //only one instance of the score
            worldObj.childArr.splice(worldObj.childArr.length-1, 1);
        } else {
            //remove first (oldest) score
            worldObj.childMap[lastScore].splice(0, 1);
        }
    }
    
    var updates = {};
    updates['/Leaderboard/World' + worldNum + '/' + n] = p;
    database.ref().update(updates);

    if (worldObj.childArr.indexOf(p) != -1) {
        //already exists
        worldObj.childMap[p].push(n);
    } else {
        worldObj.childArr.push(p);
        //console.log(childArr.length);
        worldObj.childMap[p] = new Array();
        worldObj.childMap[p].push(n);
    }

    printlnLeaderboard("");
    printlnLeaderboard("");
    printlnLeaderboard("NEW Leaderboard of World " + num + ": ", "red");

    worldObj.people++;
    printLeaderboard(worldObj);
}
    