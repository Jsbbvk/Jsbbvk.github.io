function colCheck(shapeA, shapeB, isIBlock) {
    isIBlock = isIBlock || false;
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2));
    var vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2));
        // add the half widths and half heights of the objects
    var hWidths = (shapeA.width / 2) + (shapeB.width / 2);
    var hHeights = (shapeA.height / 2) + (shapeB.height / 2);
    var colDir = null;
 
    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {         // figures out on which side we are colliding (top, bottom, left, or right)        
		var oX = hWidths - Math.abs(vX);         
		var oY = hHeights - Math.abs(vY);         
		if (oX >= oY) {
			if (vY > 0) {
				colDir = "t";
				shapeA.y += oY;
			} else {
				colDir = "b";
				if (!isIBlock) shapeA.y -= oY;
			}
		} else {
			if (vX > 0) {
				colDir = "l";
				if (!isIBlock) shapeA.x += oX;
			} else {
				colDir = "r";
				if (!isIBlock)shapeA.x -= oX;
			}
		}
	}
    return colDir;
}

function pointRectangle(x1, y1, x2, y2, width, height) {
    if (x1 >= x2 && x1 <= x2 + width && y1 >= y2 && y1 <= y2 + height) {
        return true;
    }
    return false;
}

function checkSpike(triangle, player) {
	//TODO
	/*
			A
			*
		   / \
		  /	  \
		B *----* C
		y = mx + b
	*/
	//Slope of AB (m)
	var a = {
		x: triangle.x + triangle.width/2,
		y: triangle.y
	};
	
	var b = {
		x: triangle.x,
		y: triangle.y + triangle.height
	};
	
	var c = {
		x: triangle.x + triangle.width,
		y: triangle.y + triangle.height
	};
	
	var ab = {
		x: triangle.width/4 + b.x,
		y: triangle.height/2 + a.y
	};
	
	var ac = {
		x: triangle.width/4 + a.x,
		y: triangle.height/2 + a.y
	};
	
	//console.log(a.x + " " + a.y);  
	//console.log(b.x + " " + b.y);
	//console.log(c.x + " " + c.y);
	
	var rad = player.width/2;
	
	var x = Math.floor(player.x) + player.width/2;
	var y = Math.floor(player.y) + player.height/2;
	
	var aD = Math.floor((a.x - x) * (a.x - x) + (a.y - y) * (a.y - y));
	var bD = Math.floor((b.x - x) * (b.x - x) + (b.y - y) * (b.y - y));
	var cD = Math.floor((c.x - x) * (c.x - x) + (c.y - y) * (c.y - y));
	var abD = Math.floor((ab.x - x) * (ab.x - x) + (ab.y-y)*(ab.y-y));
	var acD = Math.floor((ac.x - x) * (ac.x - x) + (ac.y-y)*(ac.y-y));
	
	var rad2 = rad * rad;
	
	if (aD <= rad2 || bD <= rad2 || cD <= rad2 || abD <= rad2 || acD <= rad2) {
		return true;
	
	}
    return false;
}

function circleCol(c1, c2) {
    var r1 = c1.width/2;
    var x1 = c1.x;
    var y1 = c1.y;
    
    var r2 = c2.width/2;
    var x2 = c2.x;
    var y2 = c2.y;
    
    var dis = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);
    //assuming r1 == r2
    var r3 = r1 + r2;
    if (dis < (r3 * r3)) {
        return true;
    }
    return false;
}