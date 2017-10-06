class Player {
    constructor(x, y, width, height, speed, src) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.velX = 0;
        this.velY = 0;
        this.jumping = false;
        this.grounded = false;
        this.move = true;
        this.win = false;
        this.coins = 0;
        this.src = src;
        this.img = new Image();
        this.img.src = src;
    }
};
    
class Enemy {
    constructor(x, y, xLBound, offSet) {
        this.x = x;
        this.y = y;
        //not changing
        this.noChangeX = x;
        this.orgX = x;
        //how far the enemy gets to move
        this.offSet = offSet;
        this.xLBound = xLBound;
        this.xRBound = xLBound + offSet;
        
        this.width = 50;
        this.height = 50;
        this.speed = 2;
        this.velX = 0;
        this.type = enemyT;
        
    }
}

class TrollBlock {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50; 
        this.height = 50;
        this.type = troll;
    }
}
    
    
class InvisibleBlock {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.type = iBlock;
        this.isTouched = false;
    }
}

class FallingEnemy {
    constructor(x, y, range) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.type = fEnemy;
        this.range = range;
    }
}

class TextT {
    constructor(word, font, color, x, y) {
        this.word = word;
        //EX bold 12pt Arial
        this.font = font;
        this.color = color;
        this.x = x;
        this.y = y;
    }
}  

class Img {
    constructor(src, x, y, width, height, callback) {
        this.img = new Image();
        this.src = src;
        this.img.src = this.src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.onclick = function() {
            callback && callback();
        }
    }
}

