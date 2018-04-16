var fishMomObj =  function() {
	this.x;
	this.y;
	this.angle;
	this.momTailTimer = 0;
	this.momTailCount = 0;
	this.momEyeTimer = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 1000;
	//判断大鱼身体的颜色
	this.countBigFish = 0;
}

fishMomObj.prototype.init = function() {
	this.x = bgWidth * 0.5;
	this.y = bgHeight * 0.5;
	this.angle = 0;
}
 
fishMomObj.prototype.draw = function() {
	  this.x = lerpDistance(mx, this.x, 0.99);
	  this.y = lerpDistance(my, this.y, 0.99);
      var deltaX =   this.x - mx;
      var deltaY =   this.y - my;
      var beta = Math.atan2(deltaY,deltaX);
      this.angle = lerpAngle(beta,this.angle,0.6);
      //摇尾巴
      this.momTailTimer += deltaTime;
      if(this.momTailTimer > 50) {
      	this.momTailCount = (this.momTailCount + 1) % 8;
      	this.momTailTimer %= 50;
      }

      //眨眼睛
      this.momEyeTimer += deltaTime;
      if(this.momEyeTimer > this.momEyeInterval) {
      	this.momEyeCount = (this.momEyeCount + 1) % 2;
      	this.momEyeTimer %= this.momEyeInterval;
      	if(this.momEyeCount == 0) {
      		this.momEyeInterval = Math.random()*1500+2000;
      	} else {
      		this.momEyeInterval = 300;
      	}
      }
	  ctx1.save();
	  ctx1.translate(this.x,this.y);
	  ctx1.rotate(this.angle);
	  var momEyeCount = this.momEyeCount;
      ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);
      var countBigFish = this.countBigFish;
      if(score.blueMuti == 1) {
         ctx1.drawImage(momOrg[countBigFish],-momOrg[countBigFish].width*0.5,-momOrg[countBigFish].height*0.5);
      } else {
         ctx1.drawImage(momBlue[countBigFish],-momBlue[countBigFish].width*0.5,-momBlue[countBigFish].height*0.5);
      }
      var momTailCount = this.momTailCount;
      ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+30,-momTail[momTailCount].height*0.5);
      ctx1.restore();
}

