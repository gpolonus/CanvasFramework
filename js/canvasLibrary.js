function randomColorsBox(x,y,l,w)
{
	id = ctx.createImageData(1,1); // only do this once per page
	d  = id.data;                        // only do this once per page
	for(startL = 0; startL <= l; startL++)
	{
		for(startW = 0; startW <= w; startW++)
		{
			d[0]   = Math.round(Math.random()*255);
			d[1]   = Math.round(Math.random()*255);
			d[2]   = Math.round(Math.random()*255);
			ctx.putImageData( id, x+startL, y+startW );
		}
	}
	return true;
}

function Triangle(points)
{
	this.verticies = points == undefined ? new Array : points;
	this.name = "Triangle";

	this.setVerticiesArray = function(points)
	{
		this.verticies = points;
	}

	this.setVerticiesPoints = function(one,two,three,four,five,six)
	{
		this.verticies[0][0] = one;
		this.verticies[0][1] = two;
		this.verticies[1][0] = three;
		this.verticies[1][1] = four;
		this.verticies[2][0] = five;
		this.verticies[2][1] = six;
	}

	this.draw = function(backgroundColor,lineColor)
	{
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(this.verticies[0][0],this.verticies[0][1]);
		ctx.lineTo(this.verticies[1][0],this.verticies[1][1]);
		ctx.lineTo(this.verticies[2][0],this.verticies[2][1]);
		ctx.lineTo(this.verticies[0][0],this.verticies[0][1]);
		if(backgroundColor != '')
		{
			ctx.fillStyle = backgroundColor;
			ctx.fill();
		}
		if(lineColor != '')
		{
			ctx.strokeStyle = lineColor;
			ctx.stroke();
		}
		ctx.closePath();
	}

	// this.isInternal = function(x,y)
	// {
	// 	return sideOfLine(x,y,this.verticies[0][0],this.verticies[0][1],this.verticies[1][0],this.verticies[1][1]) == sideOfLine(this.verticies[2][0],this.verticies[2][1],this.verticies[0][0],this.verticies[0][1],this.verticies[1][0],this.verticies[1][1]) && sideOfLine(x,y,this.verticies[][],this.verticies[][],this.verticies[][],this.verticies[][]) == sideOfLine(this.verticies[][],this.verticies[][],this.verticies[][],this.verticies[][],this.verticies[][],this.verticies[][]) && sideOfLine(x,y,this.verticies[][],this.verticies[][],this.verticies[][],this.verticies[][]) == sideOfLine(this.verticies[][],this.verticies[][],this.verticies[][],this.verticies[][],this.verticies[][],this.verticies[][]);

	// 	function sideOfLine(one,two,three,four,five,six)
	// 	{
	// 		return one > (three - five) / (four - six)*(two - four) + three;
	// 	}
	// }
}

function dotInBox(x,y,l,bgcolor,dotcolor)
{
	drawFillSquare(x,y,l,bgcolor);
	ctx.fillStyle = dotcolor;
	radius = Math.round(Math.random()*3)+1;
	x += radius + Math.round(Math.random()*(l-2*radius));
	y += radius + Math.round(Math.random()*(l-2*radius));
	ctx.beginPath();
	ctx.arc(x,y,radius,0,2*Math.PI);
	ctx.closePath();
	ctx.fill();
}

function drawDiscatCorner(x, y, diameter, color)
{
	radius = diameter/2;
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.arc(x-radius,y-radius,radius,0,2*Math.PI);
	ctx.fill();
	ctx.closePath();
}

function drawDiscatCenter(x, y, diameter, color)
{
	radius = diameter/2;
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.arc(x,y,radius,0,2*Math.PI);
	ctx.fill();
	ctx.closePath();
}

function drawRectangle(x,y,w,h,color)
{
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.rect(x,y,w,h);
	ctx.fill();
	ctx.closePath();	
}

function drawX(x,y,l,color)
{
	ctx.strokeStyle = "black";
	ctx.beginPath();
	ctx.moveTo(x+l*0.4,y+l*0.4);
	ctx.lineTo(x+l*0.6,y+l*0.6);
	// ctx.moveTo(x+l*0.2,y+l*0.8);
	// ctx.lineTo(x+l*0.8,y+l*0.2);
	ctx.closePath();
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(x+l*0.6,y+l*0.4);
	ctx.lineTo(x+l*0.4,y+l*0.6);
	// ctx.moveTo(x+l*0.8,y+l*0.8);
	// ctx.lineTo(x+l*0.2,y+l*0.2);
	ctx.closePath();
	ctx.stroke();
}

function drawO(x,y,l,color)
{
	ctx.strokeStyle = color;
	radius = l/11;
	// radius = l/5;
	ctx.beginPath();
	ctx.arc(x+l/2,y+l/2,radius,0,2*Math.PI);
	ctx.closePath();
	ctx.stroke();
}

function drawSquare(x,y,l,color)
{
	ctx.strokeStyle = color;
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x+l,y);
	ctx.lineTo(x+l,y+l);
	ctx.lineTo(x,y+l);
	ctx.closePath();
	ctx.stroke();
}

function drawFillSquare(x,y,l,color)
{
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x+l,y);
	ctx.lineTo(x+l,y+l);
	ctx.lineTo(x,y+l);
	ctx.closePath();
	ctx.fill();
}

function whiteCanvas()
{
	ctx.fillStyle = "white";
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.beginPath();
	ctx.rect(0,0,canvas.width,canvas.height);
	ctx.closePath();
	ctx.fill();
}

function blackCanvas()
{
	ctx.fillStyle = "black";
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.beginPath();
	ctx.rect(0,0,canvas.width,canvas.height);
	ctx.closePath();
	ctx.fill();
}

function drawGrid(x,y,l,n)
{
	ctx.strokeStyle = "black";
	ctx.beginPath();
	for(kl = 0 ; kl <= n ; kl++)
	{
		ctx.moveTo(x+l*kl,y);
		ctx.lineTo(x+l*kl,y+l*n);	
	}
	for(kl=0; kl <= n ; kl++)
	{
		ctx.moveTo(x,y+l*kl);
		ctx.lineTo(x+l*n,y+l*kl);
	}
	ctx.closePath();
	ctx.stroke();
}
//Start of Letters
	function aLetter(x,y,length,color,SorF,ctx)
	{
		max = 288;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+152*length/max, y+0*length/max);
		ctx.lineTo(x+0*length/max, y+309*length/max);
		ctx.lineTo(x+115*length/max, y+309*length/max);
		ctx.lineTo(x+152*length/max, y+190*length/max);
		ctx.lineTo(x+201*length/max, y+186*length/max);
		ctx.lineTo(x+231*length/max, y+300*length/max);
		ctx.lineTo(x+288*length/max, y+293*length/max);
		ctx.lineTo(x+288*length/max, y+293*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
		ctx.closePath();
	}

	function bLetter(x,y,length,color,SorF,ctx)
	{
		max = 170;
		ctx.beginPath();
		xs = [18, 18, 18, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 19, 19, 20, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 35, 36, 37, 37, 38, 39, 40, 41, 42, 43, 43, 44, 46, 47, 48, 49, 51, 52, 53, 54, 55, 56, 58, 59, 60, 62, 63, 65, 66, 67, 68, 69, 70, 71, 72, 74, 75, 77, 78, 79, 81, 82, 84, 85, 87, 88, 88, 89, 91, 92, 94, 96, 98, 101, 102, 103, 106, 107, 108, 109, 110, 111, 113, 114, 114, 115, 115, 116, 117, 118, 119, 120, 121, 121, 121, 121, 121, 121, 121, 121, 121, 121, 121, 121, 121, 121, 121, 120, 120, 119, 118, 117, 116, 115, 114, 113, 112, 111, 110, 109, 108, 107, 106, 105, 105, 104, 103, 103, 102, 101, 101, 100, 99, 99, 98, 98, 97, 97, 96, 95, 94, 93, 92, 91, 90, 89, 87, 86, 84, 83, 82, 81, 80, 79, 77, 75, 74, 73, 72, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 28, 28, 28, 28, 28, 28, 28, 28, 29, 30, 31, 32, 34, 37, 39, 43, 45, 47, 49, 51, 58, 61, 68, 72, 74, 80, 83, 86, 90, 93, 96, 98, 100, 102, 103, 105, 107, 109, 111, 113, 115, 118, 119, 121, 124, 125, 127, 129, 130, 133, 136, 139, 141, 144, 147, 149, 151, 154, 157, 158, 160, 161, 161, 163, 163, 164, 164, 164, 164, 165, 166, 167, 167, 168, 169, 169, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 170, 169, 168, 167, 167, 166, 164, 163, 160, 160, 159, 158, 157, 157, 155, 155, 154, 153, 153, 152, 151, 150, 149, 147, 146, 144, 142, 140, 138, 136, 134, 130, 126, 123, 118, 114, 111, 109, 108, 106, 105, 104, 103, 102, 100, 99, 98, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 84, 83, 82, 81, 80, 79, 77, 76, 75, 74, 73, 71, 70, 69, 71, 73, 75, 77, 79, 81, 84, 85, 88, 90, 91, 93, 95, 102, 104, 107, 108, 111, 113, 115, 117, 119, 121, 122, 123, 125, 126, 128, 129, 130, 131, 132, 133, 134, 135, 136, 136, 137, 138, 138, 139, 140, 141, 141, 142, 142, 143, 143, 144, 145, 145, 146, 146, 146, 147, 148, 148, 149, 150, 151, 152, 153, 153, 154, 155, 155, 155, 156, 156, 156, 156, 156, 156, 156, 156, 156, 156, 156, 156, 156, 156, 156, 156, 155, 154, 154, 154, 153, 153, 153, 152, 151, 150, 150, 149, 149, 148, 147, 147, 146, 146, 145, 143, 142, 142, 141, 141, 140, 140, 139, 138, 138, 137, 136, 135, 135, 134, 134, 133, 132, 131, 131, 130, 129, 129, 128, 128, 127, 127, 126, 125, 124, 123, 122, 121, 119, 119, 118, 117, 116, 115, 114, 113, 112, 110, 109, 108, 107, 106, 105, 104, 102, 101, 100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 65, 65, 65, 65, 65, 65, 64, 64, 64, 64, 64, 64, 64, 64, 63, 63, 62, 61, 61, 61, 60, 60, 60, 60, 60, 59, 60, 62, 64, 66, 67, 69, 70, 72, 73, 74, 76, 77, 79, 80, 82, 83, 85, 86, 87, 88, 89, 90, 92, 93, 94, 95, 97, 99, 101, 102, 104, 105, 106, 108, 109, 110, 111, 113, 114, 115, 116, 118, 119, 120, 121, 122, 123, 123, 124, 125, 125, 126, 126, 126, 126, 126, 126, 127, 127, 127, 127, 127, 127, 127, 128, 128, 128, 128, 129, 129, 129, 129, 129, 130, 130, 130, 130, 130, 130, 130, 130, 129, 129, 126, 125, 123, 121, 120, 119, 118, 118, 117, 117, 116, 114, 112, 111, 109, 108, 106, 105, 104, 103, 101, 100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 70, 69, 67, 66, 65, 64, 63, 61, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 35, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 34, 34, 34, 35, 36, 36, 37, 37, 38, 39, 39, 39, 39, 40, 40, 41, 42, 42, 43, 43, 44, 44, 45, 45, 46, 46, 47, 48, 48, 48, 49, 50, 50, 51, 51, 51, 51, 51, 51, 52, 52, 53, 53, 54, 54, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 56, 56, 56, 55, 53, 52, 50, 48, 46, 44, 41, 40, 36, 34, 32, 30, 28, 26, 24, 23, 21, 19, 17, 15, 13, 12, 11, 10, 9, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 6, 5, 5, 5, 4, 4, 3, 3, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6];
		ys = [6, 8, 11, 14, 20, 23, 28, 31, 34, 36, 38, 41, 43, 44, 46, 49, 50, 52, 53, 55, 56, 57, 58, 59, 60, 62, 63, 64, 66, 67, 68, 70, 72, 73, 75, 77, 79, 80, 81, 82, 84, 85, 86, 88, 90, 91, 92, 94, 95, 97, 98, 100, 101, 102, 103, 105, 109, 110, 111, 116, 117, 118, 119, 120, 123, 125, 126, 129, 130, 131, 132, 136, 137, 139, 140, 141, 142, 142, 143, 145, 146, 147, 147, 148, 149, 149, 150, 150, 151, 151, 152, 153, 153, 154, 154, 155, 155, 155, 156, 156, 157, 157, 157, 157, 157, 157, 157, 157, 157, 157, 157, 157, 157, 157, 157, 157, 157, 157, 157, 157, 157, 157, 157, 157, 156, 156, 155, 154, 154, 153, 152, 151, 150, 149, 148, 147, 146, 145, 144, 142, 141, 138, 136, 133, 131, 130, 126, 124, 122, 120, 118, 116, 112, 109, 107, 106, 103, 101, 99, 96, 92, 90, 87, 85, 83, 81, 80, 78, 77, 75, 74, 73, 72, 71, 70, 68, 66, 66, 65, 64, 63, 62, 61, 60, 58, 57, 56, 56, 55, 54, 54, 53, 53, 53, 52, 52, 52, 51, 51, 51, 50, 50, 50, 49, 49, 48, 48, 47, 47, 47, 46, 46, 46, 46, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 44, 44, 44, 44, 44, 43, 43, 43, 43, 43, 43, 43, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 41, 40, 39, 38, 37, 36, 34, 33, 32, 31, 29, 28, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 9, 9, 9, 8, 8, 7, 6, 6, 5, 4, 4, 4, 4, 4, 3, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 7, 10, 11, 13, 15, 18, 20, 22, 25, 27, 30, 32, 35, 38, 40, 44, 45, 48, 50, 52, 54, 55, 58, 59, 61, 63, 66, 70, 74, 78, 81, 85, 87, 89, 91, 92, 94, 95, 97, 101, 103, 107, 110, 113, 114, 116, 118, 123, 124, 128, 130, 132, 133, 137, 138, 141, 143, 146, 150, 151, 152, 154, 155, 157, 157, 158, 159, 160, 161, 162, 163, 165, 166, 167, 169, 170, 172, 173, 174, 176, 177, 178, 180, 181, 184, 186, 187, 189, 189, 190, 190, 190, 190, 191, 191, 192, 192, 193, 193, 193, 194, 194, 194, 194, 194, 194, 194, 194, 194, 194, 194, 194, 194, 194, 194, 194, 194, 194, 195, 195, 195, 195, 195, 195, 195, 195, 195, 195, 195, 195, 196, 196, 196, 196, 197, 199, 200, 201, 202, 203, 204, 206, 207, 208, 208, 210, 210, 211, 212, 214, 214, 215, 216, 216, 217, 218, 219, 219, 220, 221, 221, 222, 223, 224, 225, 227, 228, 229, 230, 232, 233, 234, 235, 237, 238, 240, 242, 244, 245, 246, 247, 248, 249, 251, 253, 256, 258, 261, 262, 265, 267, 270, 272, 273, 275, 277, 279, 280, 281, 283, 286, 287, 290, 292, 293, 296, 297, 299, 300, 301, 303, 304, 305, 306, 307, 309, 310, 312, 313, 315, 316, 318, 319, 321, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 334, 335, 336, 338, 338, 339, 341, 342, 343, 344, 345, 346, 347, 347, 348, 348, 349, 349, 350, 350, 351, 352, 352, 354, 355, 355, 356, 356, 357, 359, 360, 362, 363, 364, 364, 366, 367, 368, 368, 369, 370, 371, 371, 372, 372, 372, 373, 373, 373, 373, 374, 374, 374, 375, 375, 375, 375, 375, 375, 375, 375, 376, 376, 376, 376, 376, 376, 376, 376, 376, 376, 376, 376, 376, 376, 376, 376, 375, 374, 373, 372, 371, 370, 368, 367, 366, 365, 364, 363, 362, 361, 361, 360, 359, 358, 357, 356, 355, 354, 353, 352, 350, 349, 349, 349, 350, 351, 351, 352, 352, 353, 354, 354, 354, 354, 354, 354, 355, 355, 355, 355, 355, 355, 354, 354, 353, 352, 351, 349, 347, 345, 343, 342, 339, 338, 336, 333, 331, 330, 328, 327, 325, 323, 322, 320, 319, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301, 299, 298, 296, 295, 293, 291, 289, 287, 286, 285, 284, 282, 281, 278, 276, 274, 272, 270, 268, 266, 265, 262, 260, 254, 251, 249, 247, 245, 242, 239, 238, 236, 234, 230, 226, 222, 219, 218, 217, 216, 215, 213, 212, 211, 211, 210, 210, 209, 208, 208, 208, 208, 207, 207, 207, 207, 206, 206, 206, 206, 206, 206, 205, 205, 205, 205, 204, 204, 203, 203, 203, 203, 202, 202, 202, 201, 201, 201, 201, 201, 201, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 201, 201, 201, 202, 202, 203, 203, 204, 204, 205, 206, 206, 207, 208, 209, 210, 211, 212, 213, 214, 216, 219, 221, 223, 225, 227, 230, 232, 235, 240, 246, 249, 251, 255, 257, 259, 263, 268, 270, 273, 277, 279, 284, 285, 287, 288, 290, 291, 295, 297, 301, 303, 307, 309, 313, 316, 320, 322, 326, 328, 331, 334, 336, 338, 341, 343, 345, 351, 354, 356, 358, 360, 362, 365, 366, 369, 371, 374, 376, 379, 381, 383, 384, 386, 388, 389, 390, 391, 393, 395, 396, 397, 397, 397, 397, 397, 397, 397, 397, 397, 396, 396, 396, 396, 396, 396, 396, 395, 395, 395, 395, 395, 395, 394, 394, 394, 394, 394, 394, 394, 393, 389, 385, 379, 373, 367, 362, 356, 351, 347, 343, 339, 336, 333, 330, 328, 324, 322, 319, 317, 315, 312, 310, 307, 304, 298, 294, 292, 289, 285, 282, 277, 272, 269, 265, 262, 259, 257, 254, 249, 244, 240, 235, 229, 224, 217, 212, 206, 202, 199, 195, 191, 186, 183, 178, 174, 171, 169, 166, 165, 163, 161, 160, 159, 157, 153, 149, 143, 139, 135, 131, 126, 121, 116, 111, 100, 96, 94, 90, 88, 84, 80, 75, 71, 68, 65, 62, 58, 55, 51, 48, 43, 42, 41, 40, 38, 35, 34, 31, 29, 27, 25, 22, 20, 19, 17, 16, 15, 14, 13, 12, 11, 11, 11];
		ctx.moveTo(x+(xs[0])*length/max, y+(ys[0])*length/max);
		for(i=0;i<xs.length;i++)
			ctx.lineTo(x+(xs[i])*length/max, y+(ys[i])*length/max);
		ctx.closePath();
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
	}

	function cLetter(x,y,length,color,SorF,ctx)
	{
		max = 299;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+167*length/max, y+48*length/max);
		ctx.lineTo(x+163*length/max, y+47*length/max);
		ctx.lineTo(x+72*length/max, y+131*length/max);
		ctx.lineTo(x+151*length/max, y+219*length/max);
		ctx.lineTo(x+238*length/max, y+148*length/max);
		ctx.lineTo(x+299*length/max, y+146*length/max);
		ctx.lineTo(x+150*length/max, y+264*length/max);
		ctx.lineTo(x+0*length/max, y+135*length/max);
		ctx.lineTo(x+151*length/max, y+0*length/max);
		ctx.lineTo(x+282*length/max, y+54*length/max);
		ctx.lineTo(x+234*length/max, y+58*length/max);
		ctx.lineTo(x+234*length/max, y+58*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
		ctx.closePath();
	}

	function dLetter(x,y,length,color,SorF,ctx)
	{
		max = 157;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+0*length/max, y+1*length/max);
		ctx.lineTo(x+3*length/max, y+247*length/max);
		ctx.lineTo(x+156*length/max, y+148*length/max);
		ctx.lineTo(x+157*length/max, y+80*length/max);
		ctx.lineTo(x+1*length/max, y+0*length/max);
		ctx.lineTo(x+1*length/max, y+0*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
		ctx.closePath();
	}

	function eLetter(x,y,length,color,SorF,ctx)
	{
		max = 190;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+0*length/max, y+36*length/max);
		ctx.lineTo(x+0*length/max, y+409*length/max);
		ctx.lineTo(x+187*length/max, y+421*length/max);
		ctx.lineTo(x+190*length/max, y+304*length/max);
		ctx.lineTo(x+81*length/max, y+298*length/max);
		ctx.lineTo(x+81*length/max, y+184*length/max);
		ctx.lineTo(x+175*length/max, y+180*length/max);
		ctx.lineTo(x+171*length/max, y+126*length/max);
		ctx.lineTo(x+84*length/max, y+125*length/max);
		ctx.lineTo(x+87*length/max, y+34*length/max);
		ctx.lineTo(x+153*length/max, y+31*length/max);
		ctx.lineTo(x+153*length/max, y+0*length/max);
		ctx.lineTo(x+153*length/max, y+0*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
			ctx.closePath();
	}

	function fLetter(x,y,length,color,SorF,ctx)
	{
		max = 157;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+0*length/max, y+40*length/max);
		ctx.lineTo(x+19*length/max, y+325*length/max);
		ctx.lineTo(x+122*length/max, y+319*length/max);
		ctx.lineTo(x+97*length/max, y+131*length/max);
		ctx.lineTo(x+157*length/max, y+114*length/max);
		ctx.lineTo(x+154*length/max, y+88*length/max);
		ctx.lineTo(x+101*length/max, y+89*length/max);
		ctx.lineTo(x+90*length/max, y+42*length/max);
		ctx.lineTo(x+149*length/max, y+31*length/max);
		ctx.lineTo(x+145*length/max, y+0*length/max);
		ctx.lineTo(x+145*length/max, y+0*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
		ctx.closePath();
	}

	function gLetter(x,y,length,color,SorF,ctx)
	{
		max = 317;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+174*length/max, y+201*length/max);
		ctx.lineTo(x+171*length/max, y+156*length/max);
		ctx.lineTo(x+306*length/max, y+158*length/max);
		ctx.lineTo(x+198*length/max, y+322*length/max);
		ctx.lineTo(x+0*length/max, y+150*length/max);
		ctx.lineTo(x+154*length/max, y+0*length/max);
		ctx.lineTo(x+317*length/max, y+62*length/max);
		ctx.lineTo(x+245*length/max, y+72*length/max);
		ctx.lineTo(x+165*length/max, y+45*length/max);
		ctx.lineTo(x+79*length/max, y+143*length/max);
		ctx.lineTo(x+180*length/max, y+250*length/max);
		ctx.lineTo(x+247*length/max, y+195*length/max);
		ctx.lineTo(x+247*length/max, y+195*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
		ctx.closePath();
	}

	function hLetter(x,y,length,color,SorF,ctx)
	{
		max = 220;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+0*length/max, y+319*length/max);
		ctx.lineTo(x+81*length/max, y+320*length/max);
		ctx.lineTo(x+82*length/max, y+171*length/max);
		ctx.lineTo(x+148*length/max, y+172*length/max);
		ctx.lineTo(x+158*length/max, y+316*length/max);
		ctx.lineTo(x+220*length/max, y+309*length/max);
		ctx.lineTo(x+191*length/max, y+0*length/max);
		ctx.lineTo(x+124*length/max, y+8*length/max);
		ctx.lineTo(x+142*length/max, y+123*length/max);
		ctx.lineTo(x+83*length/max, y+123*length/max);
		ctx.lineTo(x+73*length/max, y+13*length/max);
		ctx.lineTo(x+5*length/max, y+17*length/max);
		ctx.lineTo(x+5*length/max, y+17*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
		ctx.closePath();
	}

	function iLetter(x,y,length,color,SorF,ctx)
	{
		max = 190;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+68*length/max, y+195*length/max);
		ctx.lineTo(x+0*length/max, y+185*length/max);
		ctx.lineTo(x+3*length/max, y+251*length/max);
		ctx.lineTo(x+190*length/max, y+241*length/max);
		ctx.lineTo(x+180*length/max, y+194*length/max);
		ctx.lineTo(x+123*length/max, y+192*length/max);
		ctx.lineTo(x+116*length/max, y+39*length/max);
		ctx.lineTo(x+155*length/max, y+34*length/max);
		ctx.lineTo(x+151*length/max, y+0*length/max);
		ctx.lineTo(x+3*length/max, y+11*length/max);
		ctx.lineTo(x+3*length/max, y+52*length/max);
		ctx.lineTo(x+65*length/max, y+46*length/max);
		ctx.lineTo(x+65*length/max, y+46*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
		ctx.closePath();
	}

	function jLetter(x,y,length,color,SorF,ctx)
	{
		max = 257;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+0*length/max, y+4*length/max);
		ctx.lineTo(x+256*length/max, y+0*length/max);
		ctx.lineTo(x+257*length/max, y+44*length/max);
		ctx.lineTo(x+168*length/max, y+46*length/max);
		ctx.lineTo(x+167*length/max, y+187*length/max);
		ctx.lineTo(x+131*length/max, y+236*length/max);
		ctx.lineTo(x+27*length/max, y+193*length/max);
		ctx.lineTo(x+75*length/max, y+177*length/max);
		ctx.lineTo(x+113*length/max, y+199*length/max);
		ctx.lineTo(x+114*length/max, y+51*length/max);
		ctx.lineTo(x+8*length/max, y+42*length/max);
		ctx.lineTo(x+8*length/max, y+42*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
		ctx.closePath();
	}

	function kLetter(x,y,length,color,SorF,ctx)
	{
		max = 216;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+8*length/max, y+332*length/max);
		ctx.lineTo(x+0*length/max, y+0*length/max);
		ctx.lineTo(x+41*length/max, y+0*length/max);
		ctx.lineTo(x+43*length/max, y+113*length/max);
		ctx.lineTo(x+141*length/max, y+3*length/max);
		ctx.lineTo(x+194*length/max, y+0*length/max);
		ctx.lineTo(x+52*length/max, y+152*length/max);
		ctx.lineTo(x+216*length/max, y+315*length/max);
		ctx.lineTo(x+155*length/max, y+324*length/max);
		ctx.lineTo(x+50*length/max, y+215*length/max);
		ctx.lineTo(x+60*length/max, y+325*length/max);
		ctx.lineTo(x+60*length/max, y+325*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
		ctx.closePath();
	}

	function lLetter(x,y,length,color,SorF,ctx)
	{
		max = 178;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+0*length/max, y+0*length/max);
		ctx.lineTo(x+5*length/max, y+285*length/max);
		ctx.lineTo(x+178*length/max, y+286*length/max);
		ctx.lineTo(x+173*length/max, y+187*length/max);
		ctx.lineTo(x+67*length/max, y+183*length/max);
		ctx.lineTo(x+49*length/max, y+3*length/max);
		ctx.lineTo(x+49*length/max, y+3*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
		ctx.closePath();
	}

	function mLetter(x,y,length,color,SorF,ctx)
	{
		max = 308;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+73*length/max, y+291*length/max);
		ctx.lineTo(x+111*length/max, y+97*length/max);
		ctx.lineTo(x+146*length/max, y+278*length/max);
		ctx.lineTo(x+195*length/max, y+276*length/max);
		ctx.lineTo(x+214*length/max, y+102*length/max);
		ctx.lineTo(x+256*length/max, y+269*length/max);
		ctx.lineTo(x+308*length/max, y+265*length/max);
		ctx.lineTo(x+202*length/max, y+2*length/max);
		ctx.lineTo(x+162*length/max, y+209*length/max);
		ctx.lineTo(x+99*length/max, y+0*length/max);
		ctx.lineTo(x+0*length/max, y+281*length/max);
		ctx.lineTo(x+0*length/max, y+281*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
		ctx.closePath();
	}

	function nLetter(x,y,length,color,SorF,ctx)
	{
		max = 199;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+0*length/max, y+296*length/max);
		ctx.lineTo(x+14*length/max, y+17*length/max);
		ctx.lineTo(x+111*length/max, y+119*length/max);
		ctx.lineTo(x+163*length/max, y+0*length/max);
		ctx.lineTo(x+199*length/max, y+0*length/max);
		ctx.lineTo(x+137*length/max, y+240*length/max);
		ctx.lineTo(x+40*length/max, y+88*length/max);
		ctx.lineTo(x+52*length/max, y+283*length/max);
		ctx.lineTo(x+52*length/max, y+283*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
		ctx.closePath();
	}

	function oLetter(x,y,length,color,SorF,ctx)
	{
		max = 290;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+142*length/max, y+0*length/max);
		ctx.lineTo(x+0*length/max, y+193*length/max);
		ctx.lineTo(x+156*length/max, y+317*length/max);
		ctx.lineTo(x+290*length/max, y+217*length/max);
		ctx.lineTo(x+129*length/max, y+1*length/max);
		ctx.lineTo(x+235*length/max, y+195*length/max);
		ctx.lineTo(x+161*length/max, y+250*length/max);
		ctx.lineTo(x+57*length/max, y+179*length/max);
		ctx.lineTo(x+144*length/max, y+6*length/max);
		ctx.lineTo(x+144*length/max, y+6*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
		ctx.closePath();
	}

	function pLetter(x,y,length,color,SorF,ctx)
	{
		max = 175;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+0*length/max, y+311*length/max);
		ctx.lineTo(x+0*length/max, y+0*length/max);
		ctx.lineTo(x+72*length/max, y+2*length/max);
		ctx.lineTo(x+175*length/max, y+61*length/max);
		ctx.lineTo(x+74*length/max, y+96*length/max);
		ctx.lineTo(x+75*length/max, y+300*length/max);
		ctx.lineTo(x+75*length/max, y+300*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
		ctx.closePath();
	}

	function qLetter(x,y,length,color,SorF,ctx)
	{
		max = 425;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+217*length/max, y+0*length/max);
		ctx.lineTo(x+52*length/max, y+149*length/max);
		ctx.lineTo(x+193*length/max, y+238*length/max);
		ctx.lineTo(x+273*length/max, y+197*length/max);
		ctx.lineTo(x+238*length/max, y+162*length/max);
		ctx.lineTo(x+258*length/max, y+141*length/max);
		ctx.lineTo(x+292*length/max, y+174*length/max);
		ctx.lineTo(x+360*length/max, y+112*length/max);
		ctx.lineTo(x+208*length/max, y+0*length/max);
		ctx.lineTo(x+425*length/max, y+113*length/max);
		ctx.lineTo(x+314*length/max, y+191*length/max);
		ctx.lineTo(x+343*length/max, y+217*length/max);
		ctx.lineTo(x+319*length/max, y+229*length/max);
		ctx.lineTo(x+293*length/max, y+208*length/max);
		ctx.lineTo(x+196*length/max, y+270*length/max);
		ctx.lineTo(x+0*length/max, y+151*length/max);
		ctx.lineTo(x+0*length/max, y+151*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
		ctx.closePath();
	}

	function rLetter(x,y,length,color,SorF,ctx)
	{
		max = 147;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+41*length/max, y+0*length/max);
		ctx.lineTo(x+117*length/max, y+26*length/max);
		ctx.lineTo(x+125*length/max, y+63*length/max);
		ctx.lineTo(x+66*length/max, y+82*length/max);
		ctx.lineTo(x+147*length/max, y+187*length/max);
		ctx.lineTo(x+94*length/max, y+199*length/max);
		ctx.lineTo(x+57*length/max, y+124*length/max);
		ctx.lineTo(x+58*length/max, y+206*length/max);
		ctx.lineTo(x+16*length/max, y+206*length/max);
		ctx.lineTo(x+0*length/max, y+4*length/max);
		ctx.lineTo(x+0*length/max, y+4*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
		ctx.closePath();
	}

	function sLetter(x,y,length,color,SorF,ctx)
	{
		max = 181;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+181*length/max, y+83*length/max);
		ctx.lineTo(x+126*length/max, y+82*length/max);
		ctx.lineTo(x+83*length/max, y+30*length/max);
		ctx.lineTo(x+24*length/max, y+81*length/max);
		ctx.lineTo(x+165*length/max, y+182*length/max);
		ctx.lineTo(x+110*length/max, y+228*length/max);
		ctx.lineTo(x+35*length/max, y+189*length/max);
		ctx.lineTo(x+71*length/max, y+180*length/max);
		ctx.lineTo(x+95*length/max, y+190*length/max);
		ctx.lineTo(x+124*length/max, y+180*length/max);
		ctx.lineTo(x+0*length/max, y+75*length/max);
		ctx.lineTo(x+85*length/max, y+0*length/max);
		ctx.lineTo(x+179*length/max, y+80*length/max);
		ctx.lineTo(x+179*length/max, y+80*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
		ctx.closePath();
	}

	function tLetter(x,y,length,color,SorF,ctx)
	{
		max = 173;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+8*length/max, y+47*length/max);
		ctx.lineTo(x+75*length/max, y+46*length/max);
		ctx.lineTo(x+77*length/max, y+208*length/max);
		ctx.lineTo(x+129*length/max, y+208*length/max);
		ctx.lineTo(x+122*length/max, y+42*length/max);
		ctx.lineTo(x+173*length/max, y+41*length/max);
		ctx.lineTo(x+169*length/max, y+0*length/max);
		ctx.lineTo(x+0*length/max, y+4*length/max);
		ctx.lineTo(x+0*length/max, y+4*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
		ctx.closePath();
	}

	function uLetter(x,y,length,color,SorF,ctx)
	{
		max = 207;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+47*length/max, y+11*length/max);
		ctx.lineTo(x+53*length/max, y+158*length/max);
		ctx.lineTo(x+155*length/max, y+162*length/max);
		ctx.lineTo(x+156*length/max, y+0*length/max);
		ctx.lineTo(x+206*length/max, y+3*length/max);
		ctx.lineTo(x+207*length/max, y+156*length/max);
		ctx.lineTo(x+179*length/max, y+190*length/max);
		ctx.lineTo(x+64*length/max, y+191*length/max);
		ctx.lineTo(x+9*length/max, y+163*length/max);
		ctx.lineTo(x+0*length/max, y+12*length/max);
		ctx.lineTo(x+0*length/max, y+12*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
		ctx.closePath();
	}

	function vLetter(x,y,length,color,SorF,ctx)
	{
		max = 246;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+138*length/max, y+157*length/max);
		ctx.lineTo(x+201*length/max, y+12*length/max);
		ctx.lineTo(x+246*length/max, y+14*length/max);
		ctx.lineTo(x+171*length/max, y+187*length/max);
		ctx.lineTo(x+100*length/max, y+187*length/max);
		ctx.lineTo(x+0*length/max, y+3*length/max);
		ctx.lineTo(x+66*length/max, y+0*length/max);
		ctx.lineTo(x+66*length/max, y+0*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
		ctx.closePath();
	}

	function wLetter(x,y,length,color,SorF,ctx)
	{
		max = 326;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+0*length/max, y+11*length/max);
		ctx.lineTo(x+68*length/max, y+7*length/max);
		ctx.lineTo(x+135*length/max, y+116*length/max);
		ctx.lineTo(x+167*length/max, y+2*length/max);
		ctx.lineTo(x+207*length/max, y+3*length/max);
		ctx.lineTo(x+242*length/max, y+111*length/max);
		ctx.lineTo(x+284*length/max, y+2*length/max);
		ctx.lineTo(x+326*length/max, y+0*length/max);
		ctx.lineTo(x+254*length/max, y+226*length/max);
		ctx.lineTo(x+186*length/max, y+66*length/max);
		ctx.lineTo(x+153*length/max, y+211*length/max);
		ctx.lineTo(x+2*length/max, y+17*length/max);
		ctx.lineTo(x+2*length/max, y+17*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
		ctx.closePath();
	}

	function xLetter(x,y,length,color,SorF,ctx)
	{
		max = 198;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+0*length/max, y+2*length/max);
		ctx.lineTo(x+52*length/max, y+5*length/max);
		ctx.lineTo(x+107*length/max, y+89*length/max);
		ctx.lineTo(x+159*length/max, y+0*length/max);
		ctx.lineTo(x+198*length/max, y+4*length/max);
		ctx.lineTo(x+131*length/max, y+110*length/max);
		ctx.lineTo(x+170*length/max, y+171*length/max);
		ctx.lineTo(x+131*length/max, y+171*length/max);
		ctx.lineTo(x+107*length/max, y+116*length/max);
		ctx.lineTo(x+88*length/max, y+163*length/max);
		ctx.lineTo(x+38*length/max, y+164*length/max);
		ctx.lineTo(x+87*length/max, y+100*length/max);
		ctx.lineTo(x+87*length/max, y+100*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
		ctx.closePath();
	}

	function yLetter(x,y,length,color,SorF,ctx)
	{
		max = 207;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+0*length/max, y+2*length/max);
		ctx.lineTo(x+72*length/max, y+1*length/max);
		ctx.lineTo(x+105*length/max, y+75*length/max);
		ctx.lineTo(x+156*length/max, y+0*length/max);
		ctx.lineTo(x+207*length/max, y+4*length/max);
		ctx.lineTo(x+134*length/max, y+100*length/max);
		ctx.lineTo(x+138*length/max, y+187*length/max);
		ctx.lineTo(x+80*length/max, y+186*length/max);
		ctx.lineTo(x+80*length/max, y+101*length/max);
		ctx.lineTo(x+80*length/max, y+101*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
		ctx.closePath();
	}

	function zLetter(x,y,length,color,SorF,ctx)
	{
		max = 217;
		// ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x+207*length/max, y+0*length/max);
		ctx.lineTo(x+211*length/max, y+62*length/max);
		ctx.lineTo(x+79*length/max, y+64*length/max);
		ctx.lineTo(x+217*length/max, y+197*length/max);
		ctx.lineTo(x+18*length/max, y+196*length/max);
		ctx.lineTo(x+15*length/max, y+153*length/max);
		ctx.lineTo(x+126*length/max, y+162*length/max);
		ctx.lineTo(x+0*length/max, y+34*length/max);
		ctx.lineTo(x+0*length/max, y+34*length/max);
		SorF == 'stroke' ? ctx.strokeStyle = color : ctx.fillStyle = color;
		SorF == 'fill' ? ctx.fill() : ctx.stroke();
		ctx.closePath();
	}

	function canvasWrite(string,x,y,length,color,SorF,ctx)
	{
		charSize = length / string.length;
		for(i = 0;i<string.length;i++)
		{
			switch(string.charAt(i))
			{
				case 'a':
					aLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;

				case 'b':
					bLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
				
				case 'c':
					cLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
					
				case 'd':
					dLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
				
				case 'e':
					eLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
				
				case 'f':
					fLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
				
				case 'g':
					gLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
				
				case 'h':
					hLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
				
				case 'i':
					iLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
				
				case 'j':
					jLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
				
				case 'k':
					kLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
				
				case 'l':
					lLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
				
				case 'm':
					mLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
				
				case 'n':
					nLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
				
				case 'o':
					oLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
				
				case 'p':
					pLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
				
				case 'q':
					qLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
				
				case 'r':
					rLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
				
				case 's':
					sLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
				
				case 't':
					tLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
				
				case 'u':
					uLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
				
				case 'v':
					vLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
				
				case 'w':
					wLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
				
				case 'x':
					xLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
				
				case 'y':
					yLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
				
				case 'z':
					zLetter(x+i*charSize,y,charSize,color,SorF,ctx);
				break;
				
				default:
				i--;
			}
			
		}
	}

	function canvasWriteRandomColors(string,x,y,length,SorF,ctx)
	{
		charSize = length / string.length;
		for(i = 0;i<string.length;i++)
		{
			switch(string.charAt(i))
			{
				case 'a':
					aLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;

				case 'b':
					bLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
				
				case 'c':
					cLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
					
				case 'd':
					dLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
				
				case 'e':
					eLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
				
				case 'f':
					fLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
				
				case 'g':
					gLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
				
				case 'h':
					hLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
				
				case 'i':
					iLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
				
				case 'j':
					jLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
				
				case 'k':
					kLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
				
				case 'l':
					lLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
				
				case 'm':
					mLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
				
				case 'n':
					nLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
				
				case 'o':
					oLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
				
				case 'p':
					pLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
				
				case 'q':
					qLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
				
				case 'r':
					rLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
				
				case 's':
					sLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
				
				case 't':
					tLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
				
				case 'u':
					uLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
				
				case 'v':
					vLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
				
				case 'w':
					wLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
				
				case 'x':
					xLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
				
				case 'y':
					yLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
				
				case 'z':
					zLetter(x+i*charSize,y,charSize,randomColor(),SorF,ctx);
				break;
				
				default:
			}
			
		}
	}
//End letter stuff