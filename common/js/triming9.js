
var $idTrimArea = $("#js_triming_area");
var $idTrimImg  = $("#js_triming_image");
var $idLoading  = $("#js_loading");
var $idTarget   = $("#js_triming_target");

var windowWidth  = $(window).width();
var windowHeight = $(window).height();
var originWidth;
var originHeight;
var originalX;
var originalY;
// var originalX = $idTrimImg.offset().left;
// var originalY = $idTrimImg.offset().top;

var repWidth  = 1;
var repHeight = false;
var repWidthPos  = 1;
var repHeightPos = 1;
var minWidth  = 240;
var minHeight = 240;
var widthLong = true;

//canvas
var dataUrl="";
var ctx;
var image = new Image();
var canvas;
var canvas2;
var posX = 0;
var posY = 0;

///現在の座標
var coordX;
var coordY;

///target
var targetY;
var targetX;
var targetWidth  = 240;
var targetHeight = 240;

//rotate
var angle = 0;

var slideY = 0;
var slideX = 0;

$(window).on("resize load",function(){
	windowWidth  = $(window).width();
	windowHeight = $(window).height();

	canvas = document.getElementById('canvas');
	canvas2 = document.getElementById('canvas2');

	getTargetInfo();
});

///canvasに画像を描写
function main(dataUrl) {
		if (canvas.getContext) {
				ctx = canvas.getContext('2d');
				image.src = dataUrl;
				image.addEventListener('load', function(){

						canvas.width = windowWidth;
						canvas.height = windowHeight;

						imageWidth = image.width;
						imageHeight = image.height;
						repWidth = imageWidth < imageHeight ? minWidth : minHeight / imageHeight * imageWidth;
						repHeight = imageHeight < imageWidth ? minHeight : minWidth / imageWidth * imageHeight;

						widthLong = image.width > image.height ? true :false;

						repWidthPos = canvas.width/2 - repWidth/2;
						repHeightPos = canvas.height/2 - repHeight/2;

						slideY = imageWidth < imageHeight ? targetHeight / 2 : 0 ;
						slideX = imageHeight < imageWidth ? targetWidth / 2 : 0 ;

						ctx.clearRect(0, 0, canvas.width, canvas.height);
						ctx.save();
						ctx.translate(repWidthPos, repHeightPos);
						ctx.drawImage(image, 0, 0, repWidth, repHeight);
						ctx.restore();
						//trimRestore();
						originalY = ( windowHeight / 2 ) - ( repHeight / 2 );
						originalX = ( windowWidth / 2 ) - ( repWidth /2 );
						$("#canvas").css({
							// top  : originalY,
							// left : originalX
						});
						$idLoading.addClass("hide");

				}, false);
		}
}

$("#js_btn_rotate").on("click",function(){
	rotate();
	// if (!ctx) return;
	// restore();
	// ctx.setTransform(1,0,0,1,0,0);
	// ctx.scale(0.5,0.5);
	// ctx.drawImage(image, 0, 0, repWidth, repHeight);
});

//canvasの初期化
function restore(){
		posX = 0;
		posY = 0;
		canvas.width = repWidth;
		canvas.height = repHeight;
		ctx.restore();
		//ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.drawImage(image, 0, 0, repWidth, repHeight);
		ctx.save();
}

function rotate(){
		if (!ctx) return;
		restore();
		angle = angle >= 270 ? 0 : angle + 90;
		if(angle % 180) {
				repWidth = imageWidth < imageHeight ? minHeight : minWidth / imageHeight * imageWidth;
				repHeight = imageHeight < imageWidth ? minWidth : minHeight / imageWidth * imageHeight;
		} else {
				repWidth = imageWidth < imageHeight ? minWidth : minHeight / imageHeight * imageWidth;
				repHeight = imageHeight < imageWidth ? minHeight : minWidth / imageWidth * imageHeight;
		}

		var rotateWidth  = angle % 180 ? repHeight : repWidth;
		var rotateHeight = angle % 180 ? repWidth : repHeight;
		canvas.width  = rotateWidth;
		canvas.height = rotateHeight;
		ctx.fillRect(0,0,canvas.width + 1,canvas.height + 1);
		ctx.rotate(angle * Math.PI / 180);
		ctx.translate( -( angle == 180 || angle == 270 ? repWidth : 0), -( angle == 90|| angle == 180  ? repHeight : 0) );
		ctx.drawImage(image, 0, 0, repWidth, repHeight);

		originalY = ( windowHeight / 2 ) - ( rotateHeight / 2 );
		originalX = ( windowWidth / 2 ) - ( rotateWidth /2 );
		$("#canvas").css({
			top  : originalY,
			left : originalX
		});
}

function getTargetInfo(){
	targetY = $idTarget.offset().top;
	targetX = $idTarget.offset().left;
	//console.log(targetY,targetX);
}

///現在の座標の取得
function getCoord(){
	coordY = $idTrimImg.offset().top;
	coordX = $idTrimImg.offset().left;
}

//==========================================================================

//ライブラリの初期設定
var $idTrimingArea   = document.getElementById("js_triming_area");
var $jqIdTrimingArea = $($idTrimingArea);
//var $idTrimingElm    = document.getElementById("js_triming_image");
var $idTrimingElm    = document.getElementById("canvas");
var $jqIdTrimingElm  = $($idTrimingElm);
var $hammerObj       = new Hammer($idTrimingArea);
var panTime          = false;
var pinchTime        = false;
var $pinchTimer      = {};
var scaleSize        = 1;

var elmWidth;
var elmHeight;
var areaWidth;
var areaHeight;

///動き
var elmMoveX;
var elmMoveY;

//動き出す直前のx座標
var startX;
var lastX;
var lastY;

$hammerObj.get("pan").set({ enable: true });
$hammerObj.get("pinch").set({ enable: true });
$jqIdTrimingElm.css({
		transform: "scale(1)",
		//transformOrigin: "0% 0%"
	});

// 小数点n位までを残す関数 (四捨五入)
function floatFormat( number, n ) {
	var _pow = Math.pow( 10 , n ) ;
	return Math.round( number * _pow ) / _pow ;
}

$(window).on("resize load",function(){
	areaWidth = $jqIdTrimingArea.width();
	areaHeight= $jqIdTrimingArea.height();
	getElmSize();
});

function getElmSize(){
	elmWidth  = $jqIdTrimingElm.width();
	elmHeight = $jqIdTrimingElm.height();
	elmX      = $jqIdTrimingElm.offset().left;
	elmY      = $jqIdTrimingElm.offset().top;
	$("#elmWidth").html(elmWidth);
	$("#elmHeight").html(elmHeight);
	// elmX      = Number(String($jqIdTrimingElm.css("left")).replace("px", ""));
	// elmY      = Number(String($jqIdTrimingElm.css("top")).replace("px", ""));
	//areaHeight= $jqIdTrimingArea.outerHeight();
}

///上下左右の動き
$hammerObj.on("pan",function(event){
	if(event.isFinal) { //end

		panTime = false;
		$jqIdTrimingArea.data("down", false);

		var overRight = targetX - (repWidth - targetWidth);
		if( elmMoveX < overRight){
			//$jqIdTrimingElm.css("left", (areaWidth - elmWidth - targetX) + "px");
			//elmMoveX = (areaWidth - elmWidth - targetX);
			elmMoveX = overRight;
		}
		if( elmMoveX > targetX ){
			elmMoveX = targetX;
		}

		var overTop = targetY - (repHeight - targetHeight);
		if( elmMoveY < overTop){
			//$jqIdTrimingElm.css("top", (areaHeight - elmHeight - targetY) + "px");
			elmMoveY = overTop;
		}

		if( elmMoveY > targetY){
			//$jqIdTrimingElm.css("top", targetY);
			elmMoveY = targetY;
		}

		ctx.clearRect(0, 0, windowWidth, windowHeight);
		ctx.save();
		ctx.translate(elmMoveX, elmMoveY);
		ctx.drawImage(image, 0, 0, repWidth, repHeight);
		ctx.restore();

		// getElmSize();
		// console.log(repHeightPos);
	} else {
		if(!panTime) { //start
			panTime = event.timeStamp;
			$jqIdTrimingArea
					.data("down", true)
					.data("x", event.center.x)
					.data("y", event.center.y)
					.data("elmPosX", Number(String($jqIdTrimingElm.css("left")).replace("px", "")))
					.data("elmPosY", Number(String($jqIdTrimingElm.css("top")).replace("px", "")));
		} else { //move
			if ($jqIdTrimingArea.data("down") == true) {
				elmMoveX = widthLong == true ? event.center.x / 2 : event.center.x;
				elmMoveY = widthLong == true ? event.center.y : event.center.y /2 ;
				// elmMoveX = ( ( ($jqIdTrimingArea.data("x") - event.center.x)) );
				// elmMoveY = ( ( ($jqIdTrimingArea.data("y") - event.center.y)) );

				ctx.clearRect(0, 0, windowWidth, windowHeight);
				ctx.save();
				//ctx.translate(event.center.x, event.center.y/2);
				ctx.translate(elmMoveX, elmMoveY);
				ctx.drawImage(image, 0, 0, repWidth, repHeight);
				ctx.restore();
			}
			//console.log(elmMoveX);
		 $("#elmMoveX").html(elmMoveY);
		 $("#slideX").html(elmMoveY + repHeight);
		 $("#slideY").html(event.center.y);
		 $("#lastX").html(targetY);
		 $("#lastY").html(targetY - (repHeight - targetHeight));
		}
	}
});
$hammerObj.on("panstart",function(event){
	var startX = $jqIdTrimingElm.offset().left;
	$("#startX").html(startX);
});

///ピンチインピンチアウト
$hammerObj.on("pinch",function(event) {
		event.preventDefault ? event.preventDefault() : (event.returnValue = false);
		if(!pinchTime) { //start
			pinchTime = event.timeStamp;
			var preScale = String($jqIdTrimingElm.css("transform")).replace("matrix(", "");
			preScale = preScale.replace(")", "");
			preScale = preScale.split(",");
			preScale = Math.sqrt(preScale[0] * preScale[0] + preScale[1] * preScale[1]);
			$jqIdTrimingArea
					.data("preScale", preScale)
					.data("scale", event.scale);
		} else { //move
			if($pinchTimer) clearTimeout($pinchTimer);
			scaleSize = $jqIdTrimingArea.data("preScale") + (event.scale - $jqIdTrimingArea.data("scale"));
			scaleSize = floatFormat( scaleSize, 2 );
			scaleSize = scaleSize > 2 ? 2 : scaleSize;

			$("#scale").html(scaleSize);

			$jqIdTrimingElm.css({
				"transform": "scale(" + scaleSize + ")"
			});

			$pinchTimer = setTimeout(function() { //end
					pinchTime = false;
			}, 100);
		}
});
//ピンチはじまり
$hammerObj.on("pinchstart",function(event) {
	var startX = $jqIdTrimingElm.offset().left;
	$("#startX").html(startX);
});


///ピンチおわり
$hammerObj.on("pinchend",function(event) {

	// ///座標の計算
	// var lastX = $jqIdTrimingElm.offset().left;
	// var lastY = $jqIdTrimingElm.offset().top;
	// lastX = floatFormat( lastX, 2 );
	// lastY = floatFormat( lastY, 2 );
	// var nowCoordX;
	// var nowCoordY;
	//
	// if( scaleSize > 1 ) {
	// 	//nowCoordX = elmX - ( (elmWidth * scaleSize) / 4 ) - elmWidth /2;
	// 	nowCoordX = lastX * scaleSize;
	// 	nowCoordX = floatFormat( nowCoordX, 2 );
	// 	nowCoordY = lastY * scaleSize;
	// 	nowCoordY = floatFormat( nowCoordY, 2 );
	// 	// nowCoordY = elmY - ( (elmHeight * scaleSize) / 4 );
	// } else {
	// 	nowCoordX = lastX * scaleSize;
	// 	nowCoordY = lastY * scaleSize;
	// }
	//
	//
	// elmX      = $jqIdTrimingElm.offset().left;
	// $("#elmX").html(elmX);
	// //画像の幅と高さ調整
	// var nowWidth;
	// var nowHeight;
	// if( (elmWidth * scaleSize) > targetWidth ){
	// 	nowWidth = (elmWidth * scaleSize)
	// } else {
	// 	nowWidth = targetWidth;
	// }
	// if( (elmWidth * scaleSize) > targetHeight ){
	// 	nowHeight = (elmHeight * scaleSize)
	// } else {
	// 	nowHeight = targetHeight;
	// }
	// repWidth  = nowWidth < nowHeight ? targetWidth : targetHeight / nowHeight * nowWidth;
	// repHeight = nowHeight < nowWidth ? targetHeight : targetWidth / nowWidth * nowHeight;


	if (!ctx) return;
	restore();

	ctx.clearRect(0,0,canvas.width,canvas.height);

	canvas.width = repWidth;
	canvas.height = repHeight;
	// repWidth = elmWidth * scaleSize;
	// repHeight = elmHeight * scaleSize;
	ctx.setTransform(1,0,0,1,0,0);
	ctx.scale(scaleSize,scaleSize);
	ctx.drawImage(image, 0, 0, repWidth, repHeight);

	$jqIdTrimingElm.css({
		transform: "scale(1)"
	});


	// $jqIdTrimingElm.css({
	// 	width : elmWidth * scaleSize,
	// 	height: elmHeight * scaleSize,
	// 	top   : nowCoordY,
	// 	left  : nowCoordX,
	// 	transform: "scale(1)"
	// });

});

///==========================================================================
