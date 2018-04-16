var fruitObj = function() {
	this.alive = [];
	this.x = [];
	this.y = [];
	this.l = [];//用来记录果实的大小
	this.upSpeed = [];//记录他们独特的速度
	this.orange = new Image();
    this.blue = new Image();
    this.fruitType = []; //区分果实类型
    this.aneNo = [];
}

fruitObj.prototype.num = 30;
fruitObj.prototype.init = function() {
	for(var i = 0; i<this.num; i++) {
		this.alive[i] = false; 
		this.x[i] = 0;
		this.y[i] = 0;
		this.upSpeed[i] = Math.random()*0.05+0.01;
		this.aneNo[i] = 0;
		if(Math.random()<0.6) {
			 this.fruitType[i] = 'orange';
		} else {
             this.fruitType[i] = 'blue';
		}
	   
	}
	//加载图片
	this.orange.src = './src/fruit.png';
	this.blue.src = './src/blue.png';
}

fruitObj.prototype.dead = function(i) {
	this.alive[i] = false;
}

fruitObj.prototype.draw = function() {
	for(var i = 0; i<this.num; i++) {
		var pic;
		if(this.fruitType[i] == 'orange') {
            pic = this.orange;
		} else {
			 pic = this.blue;
		}
		if(this.alive[i]) {
			 if(this.l[i] <= 10) {
			  var no = this.aneNo[i];
			  this.x[i] = ane.headx[no];
			  this.y[i] = ane.heady[no];
		  	  this.l[i] += this.upSpeed[i]*deltaTime;
		  	   // ctx2.drawImage(pic, this.x[i]-this.l[i]*0.5, this.y[i]-this.l[i]*0.5, this.l[i], this.l[i]);
		  } else {
		  	 this.y[i] -= this.upSpeed[i]*3*deltaTime;
		  }
		   ctx2.drawImage(pic, this.x[i]-this.l[i]*0.5, this.y[i]-this.l[i]*0.5, this.l[i], this.l[i]);

		  if(this.y[i]<15) {
		  	this.alive[i] = false;
		  }
		}
		
	}
}

fruitObj.prototype.bore = function(i) {
	//首先找到随机一个海藻的坐标
	this.aneNo[i] = Math.floor(Math.random()*ane.num);
	this.l[i] = 0;
	this.alive[i] = true;
}

function listener(){
    var n = 0;
    for(var i = 0; i<fruit.num; i++) {
        if(fruit.alive[i]) n++;
    }

    if(n < 15) {
    	boreFruit();
    	return;
    }
}

function boreFruit() {

	for(var i = 0; i<fruit.num; i++) {
		if(!fruit.alive[i]) {
			fruit.bore(i);
			return;
		}
	}
}
