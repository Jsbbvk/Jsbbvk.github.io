
function resetPlayer(player) {
    player.x = 50;
    player.y = 350;
    player.velX = 0;
    player.velY = 0;
    player.jumping = false;
    player.grounded = false;
    player.move = true;
    player.win = false;
    player.coins = 0;
}
    

function startGame() {
    //console.log("ASDFAD");
    println("", "black");
    printlnLeaderboard("", "black");
    state = gameS;
    println("IMPORTANT!!! Make sure everytime you lose or win,", "black");
    println("press space after the text", "black");
	println("Player One, use WASD to move", "black");
    
    if (playerGame == twoPlayer) {
        println("Player Two, use ARROW keys to move", "black");
    }
    
    data(worldNum);
	
	
	window.addEventListener("keydown", keyDown);
	window.addEventListener("keyup", keyUp); 
	
    //playerGame = twoPlayer; 
    
	var world = mapWorlds[worldNum-1];
    //console.log(worldNum);
	for (var i = 0; i < world.length; i++) {
		for (var j = 0; j < world[i].length; j++) {
            var xpos = j*50;
            var ypos = i*50;
            var w = 50;
            var h = 50;
                
			if (world[i][j] == 1) {

				bound[i].push({
					x: xpos,
					y: ypos,
					width: w,
					height: h,
					type: box
				});
			} else if (world[i][j] == 4) {
				bound[i].push({
					x: xpos,
					y: ypos,
					width: w,
					height: h,
					type: spike
				});
			} else if (world[i][j] == 7) {
               bound[i].push({
                   x: xpos,
                   y: ypos,
                   width: w,
                   height: h,
                   type: finish
               });
            } else if (world[i][j] == 6) {
                bound[i].push({
                    x: xpos,
                    y: ypos,
                    width: w,
                    height: h,
                    type: coin
                });
                //console.log(xpos);
            } else if (world[i][j] == 9) {
                //enemy
                var e = new Enemy(xpos, ypos, xpos, 4*50);
                bound[i].push(e);
               // console.log(xpos + " " + (xpos + 4*50) + " " + player.x);
                enemyArr.push(e);
            } else if (world[i][j] == 3) {
                var t = new TrollBlock(xpos, ypos);
                bound[i].push(t);
            } else if (world[i][j] == 2) {
                var b = new InvisibleBlock(xpos, ypos);
                bound[i].push(b);                
            } else if (world[i][j] == 5) {
                var f = new FallingEnemy(xpos, ypos, 50*2);
                bound[i].push(b);
            }
            else {
				bound[i].push({
					type: air
				});
			}
		}
	}
	
    
    //displayText("World " + worldNum, "bold 20pt Arial", "black", 100, 100);
    //displayText("Map By: " + worldCreator[worldNum-1], "bold 15pt Arial", "black", 50, 150);
}

function gameWin() {
    pause = true;
    println("Nice You Finished! Want to make a map of your own?", "purple");
    println("Talk to the creator for details. (Credit will go to you)", "purple"); 
    println("(SPACE to continue)", "purple");
    win = true;
}
    
function gameOver() {
    pause = true;
    lose = true;
    println("LOSE! Press SPACE to continue", "red");
}
    
function resetGame() {
    console.log("reseting");
    println("");
    println("");
    
    var tPoints = playerONE.coins;
    
    var p1coins = playerONE.coins;
    var p2coins = playerTWO.coins;
    
    var win1 = playerONE.win;
    var win2 = playerTWO.win;
    
    if (playerGame == twoPlayer) {
        tPoints = Math.max(p1coins, p2coins);
    }
    
    
    
    resetPlayer(playerONE);
    
    
    if (playerGame == twoPlayer) {
        resetPlayer(playerTWO);
    }
    
    pause = true;
    started = false;
    
   
    countSpeed = 0;
    
    
    for (var i = 0; i < bound.length; i++) {
        for (var j = 0; j < bound[i].length; j++) {
            if (bound[i][j].type == iBlock) bound[i][j].isTouched = false;
                
            bound[i][j].x = bound[i][j].noChangeX;
            bound[i][j].orgX = bound[i][j].noChangeX;
            //console.log(bound.orgX);
        }
    }
    
    for (var i = 0; i < tCoins.length; i++) {
        var t1 = tCoins[i][0];
        var t2 = tCoins[i][1];
        //console.log(t1 + " " + t2);
        bound[t2][t1] = {
            x: t1*50,
            y: t2*50,
            width: 50,
            height: 50,
            type: coin
        };
        mapWorlds[worldNum-1][t2][t1] = 6;
    }
    
   //console.log(win1 + " " + win2);
     if (win1 == false && win2 == false) {
        println("You got " + (p1coins + p2coins) + " point(s)!", "blue");
        println("ooo... you have to reach the end to be on the leaderboard...", "brown");
        println("Press SPACE to retry", "red");
    } else {
        //console.log(name)
        println("Congrats! You reached the end!", "red");
        if (playerGame == twoPlayer) {
            println("The most points a player got was " + tPoints + " point(s)!", "blue");
        } else {
            println("You got " + tPoints + " point(s)!", "blue");
        }
        
        
        setTimeout(function() {
            var name = prompt("Type your name in here to be on the leaderboard! (Make sure your name isn't the same as someone on the leaderboard!) ")
            
            if (name.replace(/\s/g, '') == "" || name == null) {
                alert("... okay anonymous...not putting you on the leaderboard...");
            } else {
                //add into firebase
                 name = name.trim();
                addToLeaderboard(name, tPoints, worldNum);
            }
            println("Press SPACE to retry", "red");
        }, 1000);
    }
    
    println("");
    println("");
}
