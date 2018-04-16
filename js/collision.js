//检查大鱼吃果实
function checkCollision() {
	if(!score.gameOver) {
			for(var i = 0; i<fruit.num; i++) {
		if(fruit.alive[i]) {
			var l = calLength2(fruit.x[i],fruit.y[i],fishMom.x,fishMom.y);
		    if(l < 900) {
			  fruit.dead(i);
			  score.fruitNum++;
			  fishMom.countBigFish++;
			  if( fishMom.countBigFish > 7) {
			  	 fishMom.countBigFish = 7;
			  }
			  if(fruit.fruitType[i] == 'blue') {
			  	  score.blueMuti = 2;
			  }
			  wave.born(fruit.x[i],fruit.y[i]);
		  }
		}
	}
  }

}

//检测小鱼碰大鱼

function checkFishCollision() {
	if(score.fruitNum > 0 && !score.gameOver) {
		var a = calLength2(fishMom.x,fishMom.y,baby.x,baby.y);
	    if(a < 900) {
			baby.countBody = 0;
			fishMom.countBigFish = 0;
			score.addScore();
			coish.born(baby.x, baby.y);
	}
  }	
}