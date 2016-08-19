
var ctx;
var dataUrl;
var image = new Image();
var imageWidth, imageHeight;
var imgResizeWidth, imgResizeHeight;
var imgResizeWidthPos, imgResizeHeightPos;
var capWidth = 240;
var capHeight = 240;
var moveX = 0;
var moveY = 0;
var widthLong = true;
var resizeTime;
var changeTime;
var movingTime;
var rotateLock = false;
//var bufRad = 0;
var $idLoading  = $("#js_loading");

$(function(){

	var canvas = document.getElementById('canvas');

	var radForm = document.getElementById("rad");
	radForm.addEventListener("input", function(e) {
		clearTimeout(changeTime);
		changeTime = setTimeout(function(){
			rotateLock = true;
			canvasRotate(0);
		},1);
	}, false);
	$("#rad").on("touchend mouseup", function(e) {
		rotateLock = false;
		canvasRotate(0);
	});

	var isTouch = ('ontouchstart' in window);
	$('#js_triming_area').on({

		'touchstart mousedown': function(e) {
			e.preventDefault();
			this.bufX = this.pageX = (isTouch ? event.changedTouches[0].pageX : e.pageX);
			this.bufY = this.pageY = (isTouch ? event.changedTouches[0].pageY : e.pageY);
			this.touched = true;
		},
		'touchmove mousemove': function(e) {
			if (!this.touched) return;
			e.preventDefault();

			var pm, pmX, pmY;
			var rad = radForm.value - 0;
			if(rad >= -45 && rad <= 45)      { pm = true; pmX = +1; pmY = +1 }
			else if(rad > 45 && rad <= 135)  { pm = false; pmX = -1; pmY = +1 }
			else if(rad < -45 && rad >= -135){ pm = false; pmX = +1; pmY = -1}
			else                             { pm = true; pmX = -1; pmY = -1}

			if(widthLong == pm){
				this.pageX = (isTouch ? event.changedTouches[0].pageX : e.pageX);
				if(pm) moveX += (this.pageX - this.bufX) * pmX;
				 else  moveY += (this.pageX - this.bufX) * pmX;
				this.bufX = this.pageX;
			}else{
				this.pageY = (isTouch ? event.changedTouches[0].pageY : e.pageY);
				if(pm) moveY += (this.pageY - this.bufY) * pmY;
				 else  moveX += (this.pageY - this.bufY) * pmY;
				this.bufY = this.pageY;
			}

			clearTimeout(movingTime);
			movingTime = setTimeout(function(){
				canvasRotate(9);
			},1);

		},
		'touchend mouseup mouseout': function(e) {
			if (!this.touched) return;
			this.touched = false;
			rotateLock = false;
			canvasRotate(0);
		}

	});

});

function canvasTo(dataUrl){
	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
		image.src = dataUrl;
		image.addEventListener('load', function(){

			moveX = 0;
			moveY = 0;

			document.getElementById('canvasCtrl').reset();

			widthLong = image.width > image.height ? true :false;

			imageWidth = image.width;
			imageHeight = image.height;
			imgResizeWidth = imageWidth < imageHeight ? capWidth : capHeight / imageHeight * imageWidth;
			imgResizeHeight = imageHeight < imageWidth ? capHeight : capWidth / imageWidth * imageHeight;

			imgResizeWidthPos = canvas.width/2 - imgResizeWidth/2;
			imgResizeHeightPos = canvas.height/2 - imgResizeHeight/2;

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.save();
			ctx.translate(imgResizeWidthPos, imgResizeHeightPos);
			ctx.drawImage(image, 0, 0, imgResizeWidth, imgResizeHeight);
			ctx.restore();
			canvasCapBoxArea();

			$idLoading.addClass("hide");

		}, false);
	}
}

function canvasRotate(updown){
	var rad = document.getElementById("rad").value - 0;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.save();
	ctx.translate(canvas.width/2, canvas.height/2);
	ctx.rotate(rad * Math.PI / 180);
	ctx.translate(moveX || 0 , moveY || 0);
	ctx.translate( -1 * canvas.width/2, -1 * canvas.height/2 );
	ctx.translate(imgResizeWidthPos, imgResizeHeightPos);
	ctx.drawImage(image, 0, 0, imgResizeWidth, imgResizeHeight);
	ctx.restore();
	canvasCapBoxArea();
	if(updown == 9 || rotateLock) return;

	//ďż˝pďż˝xďż˝Ěďż˝ďż˝đ˛×ďż˝
	//var sub = rad - bufRad;
	//sub -= Math.floor(sub / 360.0) * 360.0;
	//if(sub > 180.0)	sub -= 360.0;
	//bufRad = rad;

	colorLT = ctx.getImageData(canvas.width/2 - capWidth/2+1, canvas.height/2 - capHeight/2+1, 1, 1).data;
	colorRT = ctx.getImageData(canvas.width/2 - capWidth/2-2 + capWidth, canvas.height/2 - capHeight/2+1, 1, 1).data;
	colorLB = ctx.getImageData(canvas.width/2 - capWidth/2+1, canvas.height/2 - capHeight/2-2 + capHeight, 1, 1).data;
	colorRB = ctx.getImageData(canvas.width/2 - capWidth/2-2 + capWidth, canvas.height/2 - capHeight/2-2 + capHeight, 1, 1).data;

	if(
		updown != -1 &&
		(colorLT[0] == 0 && colorLT[1] == 0 && colorLT[2] == 0 && colorLT[3] == 0 ) ||
		(colorRT[0] == 0 && colorRT[1] == 0 && colorRT[2] == 0 && colorRT[3] == 0 ) ||
		(colorLB[0] == 0 && colorLB[1] == 0 && colorLB[2] == 0 && colorLB[3] == 0 ) ||
		(colorRB[0] == 0 && colorRB[1] == 0 && colorRB[2] == 0 && colorRB[3] == 0 )
	){
		resizeTimeout(1.05, 1);
	}else if(updown != 1){
		resizeTimeout(0.95, -1);
	}

	function resizeTimeout(range, rote){
		clearTimeout(resizeTime);
		resizeTime = setTimeout(function(){
			bufImgResizeWidth = imgResizeWidth;
			bufImgResizeHeight = imgResizeHeight;
			imgResizeWidth *= range;
			imgResizeHeight *= range;
			imgResizeWidthPos += (bufImgResizeWidth - imgResizeWidth)/2;
			imgResizeHeightPos += (bufImgResizeHeight - imgResizeHeight)/2;
			canvasRotate(rote);
		}, 0);
	}
}

function canvasCapBoxArea(){

	var left_pos = canvas.width/2 - capWidth/2;
	var top_pos = canvas.height/2 - capHeight/2;

	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.strokeRect(left_pos, top_pos, capWidth, capHeight);
	ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
	ctx.fillRect(0, 0, left_pos, canvas.height);
	ctx.fillRect(left_pos, 0, canvas.width, top_pos);
	ctx.fillRect(left_pos + capWidth, top_pos, canvas.width, canvas.height);
	ctx.fillRect(left_pos, top_pos + capHeight, capWidth, canvas.height);

	$('#rad').css({
		top: top_pos + capHeight + 50,
		left: left_pos,
		width: capWidth,
		display: 'block',
		zIndex: '9999'
	});

}
