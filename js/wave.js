var waveObj = function () {
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];
}

waveObj.prototype.num = 10;
waveObj.prototype.init = function() {
	for(var i = 0; i<this.num; i++) {
		this.alive[i] = false;
	}
}

waveObj.prototype.draw = function() {
	ctx1.save();
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = 'white';
	ctx1.lineWidth = 2;
	for(var i = 0; i<this.num; i++) {
		if(this.alive[i]) {
			this.r[i] += deltaTime*0.1;
			if(this.r[i] > 100) {
                 this.alive[i] = false;
                 break;
			}
			var alpha = 1 - this.r[i]/100; //alpha 大于[0,1] 都默认是1 
			ctx1.beginPath();
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
			ctx1.closePath();
            ctx1.strokeStyle = 'rgba(225,225,225,'+alpha+')';
            ctx1.stroke();
         
		}
	}
	ctx1.restore();
}

waveObj.prototype.born = function(x, y) {
	for(var i = 0; i<this.num; i++) {
		if(!this.alive[i]) {
			this.r[i] = 20;
            this.alive[i] = true;
            this.x[i] = x;
            this.y[i] = y;
           return;
		}
	}
}