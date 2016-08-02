
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
var minWidth  = 240;
var minHeight = 240;
var repMinWidth = minWidth;
var repMinHeight = minHeight;

///現在の座標
var coordX;
var coordY;

///target
var targetY;
var targetX;
var targetWidth  = 240;
var targetHeight = 240;

var slideY = 0;
var slideX = 0;

$(window).on("resize load",function(){
	windowWidth  = $(window).width();
	windowHeight = $(window).height();
	//console.log(originWidth,originHeight,windowWidth,windowHeight,repWidth,repHeight);
	//console.log(originalY);
	getTargetInfo();
});

///画像のオリジナルサイズ取得 & $idTrimImgを端末サイズに
$idTrimImg.on('load',function(){
		windowWidth  = $(window).width();
		windowHeight = $(window).height();
    var img = new Image();
    img.src = $idTrimImg.attr('src');
    originWidth = img.width;
    originHeight = img.height;
    if(originWidth != 0 || originHeight != 0){
			if( originWidth < originHeight ){
				repWidth = minWidth;
				repMinWidth = minWidth;
				slideY =  (targetHeight / 2 );
			} else {
				repWidth = minHeight / originHeight * originWidth;
				repMinWidth = repWidth;
			}
			if( originHeight < originWidth ){
				repHeight = minHeight;
				repMinHeight = minHeight;
				slideX =  (targetWidth / 2 );
			} else {
				repHeight = minWidth / originWidth * originHeight;
				repMinHeight = repHeight;
			}
			// slideX =  (repWidth / 2 );
			// slideY =  (repHeight / 2 );
			// repWidth  = originWidth < originHeight ? minWidth : minHeight / originHeight * originWidth;
			// repHeight = originHeight < originWidth ? minHeight : minWidth / originWidth * originHeight;
			originalY = ( windowHeight / 2 ) - ( repHeight / 2 );
			originalX = ( windowWidth / 2 ) - ( repWidth /2 );
			$idTrimImg.css({
				width    : repWidth,
				height   : repHeight,
				top      : originalY,
				left     : originalX,
				minWidth : repMinWidth,
				minHeight: repMinHeight,
			});
    }
		$idLoading.addClass("hide");
});

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
var $idTrimingElm    = document.getElementById("js_triming_image");
var $jqIdTrimingElm  = $($idTrimingElm);
var $hammerObj      = new Hammer($idTrimingArea);
var panTime     = false;
var pinchTime   = false;
var $pinchTimer = {};
var scaleSize = 1;

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

	// elmX      = Number(String($jqIdTrimingElm.css("left")).replace("px", ""));
	// elmY      = Number(String($jqIdTrimingElm.css("top")).replace("px", ""));
	//areaHeight= $jqIdTrimingArea.outerHeight();
}

///上下左右の動き
$hammerObj.on("pan",function(event){
	if(event.isFinal) { //end
		getElmSize();
		panTime = false;
		$jqIdTrimingArea.data("down", false);
		// if( elmMoveX + slideX < targetX){
		// 	$jqIdTrimingElm.css("left", (areaWidth - elmWidth - targetX) + "px");
		// }
		// if( elmMoveX > targetX ){
		// 	$jqIdTrimingElm.css("left", targetX);
		// }
		// if( elmMoveY + slideY < targetY){
		// 	$jqIdTrimingElm.css("top", (areaHeight - elmHeight - targetY) + "px");
		// }
		// if( elmMoveY > targetY){
		// 	$jqIdTrimingElm.css("top", targetY);
		// }
		//getElmSize();
		//console.log(elmX,elmY,areaWidth,elmWidth);
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
				elmMoveX = ( ($jqIdTrimingArea.data("elmPosX") - ($jqIdTrimingArea.data("x") - event.center.x)) );
				elmMoveY = ( ($jqIdTrimingArea.data("elmPosY") - ($jqIdTrimingArea.data("y") - event.center.y)) );
				$jqIdTrimingElm.css({
						"left": elmMoveX + "px",
						"top" : elmMoveY + "px"
				});
			}
			//console.log(elmMoveX);
			// $("#elmY").html(elmMoveX + slideX);
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
			$jqIdTrimingElm.css({
				"transform": "scale(" + scaleSize + ")"
			});
			$pinchTimer = setTimeout(function() { //end
					pinchTime = false;
			}, 100);

			$("#scale").html(scaleSize);
		}
});
//ピンチはじまり
$hammerObj.on("pinchstart",function(event) {
	var startX = $jqIdTrimingElm.offset().left;
	$("#startX").html(startX);
});
///ピンチおわり
$hammerObj.on("pinchend",function(event) {
	//$jqIdTrimingElm.after();
	//getElmSize();
	///TO DO なんかずれる
	///座標の計算
	var lastX = $jqIdTrimingElm.offset().left;
	var lastY = $jqIdTrimingElm.offset().top;
	lastX = floatFormat( lastX, 2 );
	lastY = floatFormat( lastY, 2 );
	$("#lastX").html(lastX);
	$("#lastY").html(lastY);
	var nowCoordX;
	var nowCoordY;

	if( scaleSize > 1 ) {
		//nowCoordX = elmX - ( (elmWidth * scaleSize) / 4 ) - elmWidth /2;
		nowCoordX = lastX * scaleSize;
		nowCoordY = lastY * scaleSize;
		// nowCoordY = elmY - ( (elmHeight * scaleSize) / 4 );
	} else {
		nowCoordX = lastX * scaleSize;
		nowCoordY = lastY * scaleSize;
	}

	elmX      = $jqIdTrimingElm.offset().left;
	//$("#elmX").html(elmX);
	//画像の幅と高さ調整
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

	$jqIdTrimingElm.css({
		width : elmWidth * scaleSize,
		height: elmHeight * scaleSize,
		top   : nowCoordY,
		left  : nowCoordX,
		transform: "scale(1)"
	});

	$("#nowCoordX").html(nowCoordX);

	// if( originWidth < originHeight ){
	// 	slideY = ( elmHeight * scaleSize ) /2;
	// 	slideX = (targetWidth * scaleSize / 2 );
	//
	// }else {
	// 	slideY = (targetHeight * scaleSize / 2 );
	// 	slideX = ( elmWidth * scaleSize ) /2
	// }
	getElmSize();
	//
	// $("#elmY").html(elmX);
	// $("#elmX").html(nowCoordX);
});

//==========================================================================
