var can1;
var can2;
var ctx1;
var ctx2;
var lastTime; //上一次时间
var deltaTime; //每一帧的间隔时间
var bgImg = new Image();
var bgWidth;
var bgHeight;
var ane;
var fruit;
var fishMom;
var mx;
var my;
var baby;
var babyTail = [];
var babyEye = [];
var babyBody = [];
var momTail = [];
var momEye = [];
var score;
//大鱼身体颜色
var momOrg = [];
var momBlue = [];
var wave;  
var coish;
var dustPic = [];
var dust;
document.body.onload = game;
function game() {
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();

}

function init() {
    can1 = document.getElementById("canvas1");
    ctx1 = can1.getContext('2d');//绘制2d场景
    can2 = document.getElementById("canvas2");//background
    ctx2 = can2.getContext('2d');
    bgWidth = can2.width;
    bgHeight = can2.height;
    bgImg.src = "./src/background.jpg";
    ane = new aneObj();
    ane.init();
    fruit = new fruitObj();
    fruit.init();
    fishMom = new fishMomObj();
    fishMom.init();
    my = bgHeight * 0.5;
    mx = bgWidth * 0.5;
    //获取鼠标的坐标
    can1.addEventListener('mousemove',onMouseMove,false);
    baby = new babyObj();
    baby.init();
    for(var i = 0; i<8; i++) { //总共有8张图片
       babyTail[i] = new Image();
       babyTail[i].src = "./src/babyTail" + i + ".png";
	}

	//轮播小鱼的眼睛
	for(var i = 0; i<2; i++) {
       babyEye[i] = new Image();
       babyEye[i].src = "./src/babyEye" + i + ".png";
	}

   //小鱼的身体
   for(var i = 0; i<20; i++) {
       babyBody[i] = new Image();
       babyBody[i].src = "./src/babyFade" + i + ".png";
	}

	//大鱼摇动尾巴
	for(var i = 0; i < 8; i++) {
		momTail[i] = new Image();
		momTail[i].src = './src/bigTail' +	i + '.png';
	}
	
	//大鱼眨眼睛 this.eye.src='./src/bigEye0.png';
	for(var i = 0; i < 2; i++) {
       momEye[i] = new Image();
       momEye[i].src = './src/bigEye'+ i +'.png';
	}

	score = new scoreObj();

	//加载大鱼身体颜色的图片
	for(var i = 0; i<8; i++) { 
       momOrg[i] = new Image();
       momOrg[i].src = './src/bigSwim'+ i +'.png';
       momBlue[i] = new Image();
       momBlue[i].src = './src/bigSwimBlue'+ i +'.png';
	}

	wave = new waveObj();
	wave.init();
	coish = new colFish();
	coish.init();
	dust = new dustObj();
	dust.init();
	for(var i = 0; i<7; i++) {
         dustPic[i] = new Image();
         dustPic[i].src = './src/dust'+ i +'.png';
	}


}

function gameloop() {+
	// window.requestAnimationFrame(gameloop);
	window.requestAnimFrame(gameloop);
	var now = Date.now();
	deltaTime = now-lastTime;
	if(deltaTime > 40) deltaTime = 40
	lastTime = now;
	drawBg();
	ane.draw();
	listener();//注意,监听方法里面的变量不能用this,必须要用变量代替，否则不执行
	fruit.draw();
	ctx1.clearRect(0,0,bgWidth,bgHeight);
	fishMom.draw();
	checkCollision();
	checkFishCollision();//检测小鱼碰到大鱼满血复活
	baby.draw();
	score.draw();
	wave.draw();
	coish.draw();
	dust.draw();

}

function onMouseMove(e) {
	if(!score.gameOver) {
		 if(e.offSetX || e.layerX) {
			mx = e.offSetX == undefined ? e.layerX : e.offSetX;
			my = e.offSetY == undefined ? e.layerY : e.offSetY;
		}
	}	
}
