function drawPlayer(context) {

		context.beginPath();
		//context.rect(player.x*game.tileSize, 600-10*player.height-player.y*game.tileSize, player.width*game.tileSize, player.height*game.tileSize);
		context.rect(40*game.tileSize, 600-game.tileSize*player.height-30*game.tileSize, player.width*game.tileSize, player.height*game.tileSize);
		context.fillStyle = 'blue';
		context.fill();

		/*
		if (player.direction) {
			if (player.walkPattern > 2) {
				context.drawImage(imageObj, 40*game.tileSize, 600-10*player.height-30*game.tileSize);
			} else {
				context.drawImage(imageObj3, 40*game.tileSize, 600-10*player.height-30*game.tileSize);
			}
		} else {
			if (player.walkPattern > 2) {
				context.drawImage(imageObj2, 40*game.tileSize, 600-10*player.height-30*game.tileSize);
			} else {
				context.drawImage(imageObj4, 40*game.tileSize, 600-10*player.height-30*game.tileSize);
			}
		}
		*/
}

function drawBackground(context) {

	context.globalAlpha = 0.5;
	context.drawImage(imageObj5, -player.x/4, player.y/4);
	context.drawImage(imageObj5, -player.x/4-800, player.y/4);
	context.drawImage(imageObj5, -player.x/4+800, player.y/4);
	
	context.globalAlpha = 0.75;
	context.drawImage(imageObj6, -player.x/2, 110+player.y*3);
	context.drawImage(imageObj6, -player.x/2-800, 110+player.y*3);
	context.drawImage(imageObj6, -player.x/2+800, 110+player.y*3);
	
	context.globalAlpha = 1;

}

function drawGround(context) {

	
	
	context.beginPath();
	
	context.moveTo(0,600);
	var n = 0;
	for (i=(player.x%80)-40;i<(player.x%80)+41;i++) {
		
		if (i < 0) {
		
			var blockY =  590 - (game.ground[game.groundIndex-1][i+80]-player.y+30)*game.tileSize; //590-game.ground[0][i]*game.tileSize;
			var blockX = n*game.tileSize; //i*game.tileSize;
			
			context.lineTo(blockX + 0.3*game.tileSize, blockY)//, game.tileSize, (game.ground[game.groundIndex-1][i+80]+1)*game.tileSize);
			context.lineTo(blockX + 0.7*game.tileSize, blockY)
			
		} else if (i < 80) {
		
			var blockY =  590 - (game.ground[game.groundIndex][i]-player.y+30)*game.tileSize; //590-game.ground[0][i]*game.tileSize;
			var blockX = n*game.tileSize; //i*game.tileSize;
			context.lineTo(blockX + 0.3*game.tileSize, blockY)//, game.tileSize, (game.ground[game.groundIndex][i]+1)*game.tileSize);
			context.lineTo(blockX + 0.7*game.tileSize, blockY)
			
		} else {
		
			var blockY =  590 - (game.ground[game.groundIndex+1][i-80]-player.y+30)*game.tileSize; //590-game.ground[0][i]*game.tileSize;
			var blockX = n*game.tileSize; //i*game.tileSize;
			context.lineTo(blockX + 0.3*game.tileSize, blockY)//, game.tileSize, (game.ground[game.groundIndex+1][i-80]+1)*game.tileSize);
			context.lineTo(blockX + 0.7*game.tileSize, blockY)
		}

		
		n++;
		
	}
	context.lineTo(800,600);
	context.closePath();
	context.stroke();
	context.fillStyle = 'brown';
	context.fill();
}

function drawPlaced(context) {
	for(i=player.x-40; i<player.x+40; i++) {
		if (placed.array[i]) { //Temp fix
			
			for (j=0; j<placed.array[i].length; j++) {
			
				var coordX = (placed.array[i][j].x-player.x+40)*game.tileSize;
				var coordY =  590 - (placed.array[i][j].y-player.y+30)*game.tileSize;
			
				switch (placed.array[i][j].boxType) {
					case 1:
						context.drawImage(imageObj7, coordX, coordY);
						break;
						
					default:
						break;
				}
			}
		}
	}
}

function drawBullets(context) {

		for(i=0; i<bullets.index; i++) {
		
		var coordY =  590 - (bullets.array[i].y-player.y+30)*game.tileSize;
		var coordX = (bullets.array[i].x-player.x+40)*game.tileSize;
		
		context.beginPath();
		context.rect(coordX, coordY, game.tileSize/5, game.tileSize/5);
		context.fill();
		
		

		
	}
}

function drawAlertMessage(context) {
	context.beginPath();
	context.rect(0, 0, 800, 100);
	context.fillStyle = 'black';
	context.fill();
}