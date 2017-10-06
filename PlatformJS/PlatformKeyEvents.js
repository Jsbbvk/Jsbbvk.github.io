function keyUp(e) {
	keys[e.keyCode] = false;
}

function keyDown(e) {
    //console.log(started);
    if (started == false) {
            pause = false;
            started = true;
            keys[87] = false;
            keys[68] = false;
            keys[65] = false;
    }
	keys[e.keyCode] = true;
	
	if (keys[80]) {
        //P
		pause = !pause;
		//console.log("pause: " + pause);
	}
    
    if (keys[32]) {
        //SPACE 
        if (pause) {
            if (playerONE.win || playerTWO.win || (playerTWO.win == false && playerONE.win == false)) {
                //console.log("REset");
                resetGame();
            }
        }
    }
}
	