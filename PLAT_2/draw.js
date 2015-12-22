function drawPlayer(context) {

		// context.beginPath();
		
		//put the player at the center of the game container
		// context.rect(game.frameWidth/2, game.frameHeight-game.tileSize*player.height-game.frameHeight/2, player.width*game.tileSize, player.height*game.tileSize);
		// context.fillStyle = 'blue';
		// context.fill();
		imageDrawn = undefined;
		if (!player.direction) {
			// if (player.walkPattern > 2) {
				imageDrawn = jesusR;
			// } else {
			// 	imageDrawn = jesusRS;
			// }
		} else {
			// if (player.walkPattern > 2) {
				imageDrawn = jesusL;
			// } else {
			// 	imageDrawn = jesusLS;
			// }
		}
		context.drawImage(imageDrawn, game.frameWidth/2, game.frameHeight-game.tileSize*player.height-game.frameHeight/2);
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

	colors = ["brown","gray","blue","red"];
	for(j=game.ground.length-1; j >= 0 ; j--)
	{
		context.beginPath();
		context.moveTo(0,game.frameHeight);
		var n = 0;
		for (i=(player.x%game.width)-game.width/2;i<(player.x%game.width)+game.width+1;i++) {
		//negative indices provide points in previous ground arrays, indices above game.width provide points in the future ground array
		
			//calculate y coordinate of ground tile
			if (i < 0) {
				//the ground blocks are measured from the top of the block - lowest possible ground on screen is bottom of container minus tile size
				if(game.ground[j][game.groundIndex-1][i+game.width] != undefined)
					var blockY =  (game.frameHeight-game.tileSize) - (game.ground[j][game.groundIndex-1][i+game.width]-player.y+game.height/2)*game.tileSize;
				else
					var blockY = game.frameHeight;
							
			} else if (i < game.width) {
				
				if(game.ground[j][game.groundIndex][i] != undefined)
					var blockY =  (game.frameHeight-game.tileSize) - (game.ground[j][game.groundIndex][i]-player.y+game.height/2)*game.tileSize;
				else
					var blockY = game.frameHeight;
				
			} else {
				
				if(game.ground[j][game.groundIndex+1][i-game.width] != undefined)
					var blockY =  (game.frameHeight-game.tileSize) - (game.ground[j][game.groundIndex+1][i-game.width]-player.y+game.height/2)*game.tileSize;
				else
					var blockY = game.frameHeight;

			}
			
			//first x coordinate of ground tiles always at 0 pixels
			var blockX = n*game.tileSize;
			
			ground_mode = 1;
			switch(ground_mode) {
				case 1:
					// if(blockY)
					// {
						//sloped ground lines add terrain texture
						context.lineTo(blockX + 0.3*game.tileSize, blockY);
						context.lineTo(blockX + 0.7*game.tileSize, blockY);
						break;
					// }
				case 2:
					//slopes connecting any terrain changes
					
			
			}
			n++;
			
		}
		context.lineTo(game.frameWidth,game.frameHeight);
		context.closePath();
		context.stroke();
		context.fillStyle = colors[j];
		context.fill();
	}
}

function drawPlaced(context) {
	for(i=player.x-game.width/2; i<player.x+game.width/2; i++) {
		if (placed.array[i]) { //Temp fix
			
			for (j=0; j<placed.array[i].length; j++) {
			
				var coordX = (placed.array[i][j].x-player.x+game.width/2)*game.tileSize;
				//the ground blocks are measured from the top of the block - lowest possible ground on screen is bottom of container minus tile size
				var coordY =  (game.frameHeight-game.tileSize) - (placed.array[i][j].y-player.y+game.height/2)*game.tileSize;
			
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
		//the ground blocks are measured from the top of the block - lowest possible ground on screen is bottom of container plus tile size
		var coordY =  (game.frameHeight-game.tileSize) - (bullets.array[i].y-player.y+game.height/2)*game.tileSize;
		var coordX = (bullets.array[i].x-player.x+game.width/2)*game.tileSize;
		
		context.beginPath();
		context.rect(coordX, coordY, game.tileSize/5, game.tileSize/5);
		context.fill();
		
		

		
	}
}

function drawAlertMessage(context) {
	context.beginPath();
	context.rect(0, 0, game.frameWidth, game.frameHeight/6);
	context.fillStyle = 'black';
	context.fill();
}