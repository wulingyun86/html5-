var babyObj = function() {
	this.x;
	this.y;
	this.angle;
	this.countTail = 0;
	this.tailTimer = 0;
	this.countEye = 0;
	this.countEyeTimer = 0;
	this.countInterval = 1000;
    this.countBody = 0;
	this.bodyTimer = 0;

}

babyObj.prototype.init = function() {
	this.x = bgWidth * 0.5 - 50;
	this.y = bgHeight * 0.5 + 50;
    this.angle = 0;
}

babyObj.prototype.draw = function() {
	this.x = lerpDistance(fishMom.x,this.x,0.99); 
	this.y= lerpDistance(fishMom.y,this.y,0.99);
	var deltaX =   this.x - fishMom.x;
    var deltaY =   this.y - fishMom.y;
    var beta = Math.atan2(deltaY,deltaX);
    this.angle = lerpAngle(beta,this.angle,0.6);
    //小鱼尾巴动画
    this.tailTimer += deltaTime;
    if(this.tailTimer > 20) {
    	this.countTail = (this.countTail+1) % 8 //因为只有8张图片，计数器不能超过8
    	this.tailTimer = this.tailTimer % 20 //对计数器复原，不能让它超过50
    }

    //轮播小鱼眼睛
    this.countEyeTimer += deltaTime;
     if(this.countEyeTimer > this.countInterval) {
    	this.countEye = (this.countEye + 1) % 2 //因为只有8张图片，计数器不能超过8
    	this.countEyeTimer = this.countEyeTimer % this.countInterval //对计数器复原，不能让它超过50

    	 if(this.countEye == 0) {
           this.countInterval = Math.random()*1500+2000;
        } else {
           this.countInterval = 200;
     }
    }

     //小鱼身体动画
    this.bodyTimer += deltaTime;
    if(this.bodyTimer > 300) {
    	this.countBody = this.countBody+1; 
    	this.bodyTimer %= 300;//小鱼的身体慢慢变白
    	if(this.countBody>19) {
    		this.countBody = 19;
    		score.gameOver = true;
    	}
    }

   
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	var countTail = this.countTail;
	ctx1.drawImage(babyTail[countTail],-babyTail[countTail].width*0.5+23,-babyTail[countTail].height*0.5);
	var countBody = this.countBody;
	ctx1.drawImage(babyBody[countBody],-babyBody[countBody].width*0.5,-babyBody[countBody].height*0.5);
	var countEye = this.countEye;
	ctx1.drawImage(babyEye[countEye],-babyEye[countEye].width*0.5,-babyEye[countEye].height*0.5);
	ctx1.restore();
}