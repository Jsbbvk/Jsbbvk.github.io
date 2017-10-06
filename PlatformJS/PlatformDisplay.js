function displayWorldLvl() {
    //display maps
    //world1 button
    var world1B = new Img("https://dabuttonfactory.com/button.png?t=World+1&f=Calibri-Bold&ts=24&tc=fff&tshs=1&tshc=000&hp=20&vp=8&c=6&bgt=gradient&bgc=c00&ebgc=cfe2f3", 50, 100, 150, 50, function() {
        worldNum = 1;
        drawMenu.splice(0, drawMenu.length);
        startGame();
    });
    //world2 button
    var world2B = new Img("https://dabuttonfactory.com/button.png?t=World+2&f=Calibri-Bold&ts=24&tc=fff&tshs=1&tshc=000&hp=20&vp=8&c=5&bgt=gradient&bgc=f90&ebgc=3d85c6", 300, 100, 150, 50, function() {
        worldNum = 2;
        drawMenu.splice(0, drawMenu.length);
        startGame();
    });
    //world3 button
    var world3B = new Img("https://dabuttonfactory.com/button.png?t=World+3&f=Calibri-Bold&ts=24&tc=fff&tshs=1&tshc=000&hp=20&vp=8&c=5&bgt=gradient&bgc=52243b&ebgc=b6d7a8", 50, 200, 150, 50, function() {
        worldNum = 3;
        drawMenu.splice(0, drawMenu.length);
        startGame();
    });
    //world 4 button
    var world4B = new Img("https://dabuttonfactory.com/button.png?t=World+4&f=Calibri-Bold&ts=24&tc=fff&tshs=1&tshc=000&hp=20&vp=8&c=5&bgt=gradient&bgc=f0f&ebgc=e06666", 300, 200, 150, 50, function() {
        worldNum = 4;
        drawMenu.splice(0,drawMenu.length);
        startGame();
    });
    //world 5 button
    var world5B = new Img("https://dabuttonfactory.com/button.png?t=World+5&f=Calibri-Bold&ts=24&tc=fff&tshs=1&tshc=000&hp=20&vp=8&c=5&bgt=gradient&bgc=f1c232&ebgc=8e7cc3", 50, 300, 150, 50, function() {
        worldNum = 5;
        drawMenu.splice(0, drawMenu.length);
        startGame();
    });
    
    worldImgB.push(world1B); drawMenu.push(world1B);
    worldImgB.push(world2B); drawMenu.push(world2B);
    worldImgB.push(world3B); drawMenu.push(world3B);
    worldImgB.push(world4B); drawMenu.push(world4B);
    worldImgB.push(world5B); drawMenu.push(world5B);
}  

function println(words, color) {
    var console = document.getElementById("console");
    var linebr = document.createElement("br");
    var span = document.createElement('span');
    span.style.color = color;
    console.append(span);
    span.append(words);
    span.append(linebr);
    console.scrollTop += 50;
}

function printlnLeaderboard(words, color) {
    var cs = document.getElementById("leaderboard");
    var linebr = document.createElement("br");
    var span = document.createElement('span');
    span.style.color = color;
    cs.append(span);
    span.append(words);
    span.append(linebr);
    cs.scrollTop += 50;
}

//prints out the world level and creator onto a canvas
function printWorldLevel() {
    var canvasL = document.getElementById("worldC");
    var contextL = canvasL.getContext("2d");

    contextL.clearRect(0, 0, canvasL.width, canvasL.height);

    contextL.fillStyle = "#ffffff";
    contextL.fillRect(0, 0, canvasL.width, canvasL.height);

    contextL.strokeStyle = "#000000";
    contextL.strokeRect(1, 1, canvasL.width - 2, canvasL.height - 2);


    if (state == gameS) {
        //console.log("ASDFASDF");
        contextL.fillStyle = "black";
        contextL.font = "30pt Arial";
        contextL.fillText("World " + worldNum, 10, (canvasL.height+25) / 2);

        contextL.font = "20pt Arial";
        contextL.fillText("Map By : " + worldCreator[worldNum-1], canvasL.width / 3, (canvasL.height+25) / 2);
    } else if (state == menuS) {
        contextL.fillStyle = "black";
        contextL.font = "30pt Arial";
        //displays title
        contextL.fillText("Rip-off Mario", (canvasL.width-250) / 2, (canvasL.height+25) / 2);
    }
}
    
function displayText(word, font, color, x, y) {
    var t = new TextT(word, font, color, x, y);
    tArray.push(t);
    tDrawArr.push(t);
}  