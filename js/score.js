var scoreObj = function() {
	this.fruitNum = 0;
	this.blueMuti = 1;//代表吃到了
	this.score = 0;
	this.gameOver = false;
	this.alpha = 0;
}


scoreObj.prototype.draw = function() {
	var w = can1.width;
	var h = can1.height;
	ctx1.save();
    ctx1.fillStyle = 'white';
    ctx1.shadowBlur = 20;
    ctx1.shadowColor = 'white'
    ctx1.font = '30px Verdana';
    ctx1.textAlign = 'center';
    // ctx1.fillText("fruitNum "+this.fruitNum,w*0.5,h-50);
    // ctx1.fillText("blueMuti "+this.blueMuti,w*0.5,h-80);
    ctx1.fillText("score "+ this.score,w*0.5,h-30);
    if(this.gameOver) {
    	this.alpha += deltaTime * 0.0005;
    	if(this.alpha > 1) {
    		this.alpha = 1;
    	}
    	ctx1.fillStyle = 'rgba(255,255,255,'+ this.alpha +')';
    	ctx1.fillText('GAME OVER',w*0.5, h*0.5);
    }
    ctx1.restore();
}

scoreObj.prototype.addScore = function() {
	this.score += this.fruitNum * 100 * this.blueMuti;
	this.fruitNum = 0;
	this.blueMuti = 1;
}

