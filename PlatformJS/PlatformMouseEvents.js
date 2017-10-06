function mouseMove(e) {

}

function mouseDown(e) {
    //console.log("MOUSE DOWN");
    for (var i = 0; i < drawMenu.length; i++) {
        var t = drawMenu[i];
        if (pointRectangle(e.x, e.y, t.x, t.y, t.width, t.height)) {
            if (mobile) t.touchstart();
            else t.onclick();
        }
    }
}
