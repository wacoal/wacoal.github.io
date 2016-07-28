


var $idTrimArea = $("#js_triming_area");
var $idTrimImg  = $("#js_triming_image");
var $idLoading  = $("#js_loading");

var windowWidth;
var windowHeight;
var originWidth;
var originHeight;

var repWidth  = 1;
var repHeight = false;
var minWidth  = 320;
var minHeight = 240;

$(window).on("resize load",function(){
	windowWidth  = $(window).width();
	windowHeight = $(window).height();
	console.log(originWidth,originHeight,windowWidth,windowHeight);
});

///画像のオリジナルサイズ取得 & $idTrimImgを端末サイズに
$idTrimImg.on('load',function(){
    var img = new Image();
    img.src = $idTrimImg.attr('src');
    originWidth = img.width;
    originHeight = img.height;
    if(originWidth != 0 || originHeight != 0){
			repWidth  = originWidth < originHeight ? minWidth : minHeight / originHeight * originWidth;
			repHeight = originHeight < originWidth ? minHeight : minWidth / originWidth * originHeight;
			$idTrimImg.css({
				width     : repWidth,
				height    : repHeight,
				marginTop : - (repHeight/2),
				marginLeft: - (repWidth/2),
			});
      //$idTrimImg.width(Math.floor(originWidth/2)).height(Math.floor(originHeight/2));
    }
		$idLoading.addClass("hide");
});




//==========================================================================

//ライブラリの初期設定
var $idTrimingArea = document.getElementById("js_triming_area");
var $jqIdTrimingArea = $($idTrimingArea);
var $idTrimingElm = document.getElementById("js_triming_image");
var $jqIdTrimingElm = $($idTrimingElm);
var $hammerObj = new Hammer($idTrimingElm);
var $hammerObj2 = new Hammer($idTrimingArea);
var panTime = false;
var pinchTime = false;
var $pinchTimer = {};
$hammerObj.get("pan").set({ enable: true });
$hammerObj.get("pinch").set({ enable: true });
$jqIdTrimingElm.css("transform", "scale(1)");

// 小数点n位までを残す関数 (四捨五入)
function floatFormat( number, n ) {
	var _pow = Math.pow( 10 , n ) ;
	return Math.round( number * _pow ) / _pow ;
}

$hammerObj.on("pan",function(event){
	if(event.isFinal) { //end

	} else {

		if(!panTime) { //start

		} else { //move
			if ($jqIdTrimingArea.data("down") == true) {

			}
		}
	}
});










//
//
//
// 	var rectWidth = 100;
// 	var rectHeight = 50;
// 	var theta = 10;
//
// 	var canvas;
// 	var ctx;
//
// 	var RotateState = 0;
//
// 	// var Img = document.createElement('img');
// 	// Img.src = "http://sites.google.com/site/westinthefareast/home/datafiles/Desert.jpg";
//
// 	var repWidth = 204.8;
// 	var repHeight = 153.6;
//
// 	var angle = 0;
// 	var repWidth = 1;
// 	var repHeight = false;
// 	var minWidth = 320;
// 	var minHeight = 240;
// 	var imageWidth;
// 	var imageHeight;
// 	var trimX;
// 	var trimY;
//
// 	var dataUrl="";
// 	var ctx;
// 	var image = new Image();
//
// 	$(function(){
// 			canvas = document.getElementById('DrawField');
//
// 			$("#js_btn_rotate").on('click',function(){
// 				rotate();
// 			});
// 	});
//
//
//
// 	function main(dataUrl) {
// 			if (canvas.getContext) {
// 					canvas.setAttribute('width', '400');
// 					canvas.setAttribute('height', '400');
// 					ctx = canvas.getContext('2d');
// 					image.src = dataUrl;
// 					image.addEventListener('load', function(){
// 							//$(".loading").hide();
// 							imageWidth = image.width;
// 							imageHeight = image.height;
// 							repWidth = imageWidth < imageHeight ? minWidth : minHeight / imageHeight * imageWidth;
// 							repHeight = imageHeight < imageWidth ? minHeight : minWidth / imageWidth * imageHeight;
//
// 							canvas.width = repWidth;
// 							canvas.height = repHeight;
// 							ctx.translate(canvas.width/2,canvas.height/2);
// 							//ctx.drawImage(image, 0, 0, repWidth, repHeight);
// 							ctx.drawImage(image,-repWidth/2,-repHeight/2,repWidth,repHeight);
// 							ctx.save();
//
// 							//trimRestore();
// 					}, false);
// 			}
// 	}
//
// 	function rotate(){
// 			if (!ctx) return;
// 			restore();
// 			angle = angle >= 270 ? 0 : angle + 90;
// 			if(angle % 180) {
// 					repWidth = imageWidth < imageHeight ? minHeight : minWidth / imageHeight * imageWidth;
// 					repHeight = imageHeight < imageWidth ? minWidth : minHeight / imageWidth * imageHeight;
// 			} else {
// 					repWidth = imageWidth < imageHeight ? minWidth : minHeight / imageHeight * imageWidth;
// 					repHeight = imageHeight < imageWidth ? minHeight : minWidth / imageWidth * imageHeight;
// 			}
// 			canvas.width = angle % 180 ? repHeight : repWidth;
// 			canvas.height = angle % 180 ? repWidth : repHeight;
// 			ctx.fillRect(0,0,canvas.width + 1,canvas.height + 1);
// 			ctx.rotate(angle * Math.PI / 180);
// 			ctx.translate( -( angle == 180 || angle == 270 ? repWidth : 0), -( angle == 90|| angle == 180  ? repHeight : 0) );
// 			//ctx.drawImage(image,-repWidth/2,-repHeight/2,repWidth,repHeight)
// 			ctx.drawImage(image, 0, 0, repWidth, repHeight);
// 			//trimRestore();
// 	}
//
// 	//canvasの初期化
// 	function restore(){
// 			posX = 0;
// 			posY = 0;
// 			canvas.width = repWidth;
// 			canvas.height = repHeight;
// 			ctx.restore();
// 			ctx.drawImage(image, 0, 0, repWidth, repHeight);
// 			ctx.save();
// 	}
//
// 	//回転ボタンが押された時の処理
// 	function RotateView(){
// 		//ステータスを回転状態にする
// 		RotateState = 1;
// 		DoRotate();
// 	}
//
// 	//回転を行う処理。タイマーで再帰的に繰り返される。
// 	function DoRotate(){
// 		if (RotateState == 0){
// 			return;
// 		}
// 		else{
// 			//表示された画像を消す
// 			ctx.clearRect(-repWidth/2-10,-repHeight/2-10,repWidth+20,repHeight+20);
// 			//座標を回転させる
// 			ctx.rotate(theta * Math.PI / 180);
// 			//画像の重心がキャンバス座標の中心点にくるように画像を表示する
// 			ctx.drawImage(image,-repWidth/2,-repHeight/2,repWidth,repHeight);
// 			//30ミリ秒ごとに座標の回転と画像の描画を繰り返す
// 			setTimeout(function(){DoRotate()},30);
// 		}
// 	}
//
// 	//画像を縮小表示する処理
// 	function ShrinkView(){
// 		//表示された画像を消す
// 		ctx.clearRect(-repWidth/2-10,-repHeight/2-10,repWidth+20,repHeight+20);
// 		//画像の大きさを0.833倍にする
// 		repWidth = repWidth/1.2;
// 		repHeight = repHeight/1.2;
// 		//画像の重心がキャンバス座標の中心点にくるように画像を表示する
// 		ctx.drawImage(image,-repWidth/2,-repHeight/2,repWidth,repHeight);
// 	}
//
// 	//画像を拡大表示する処理
// 	function ExpandView(){
// 		//表示された画像を消す
// 		ctx.clearRect(-repWidth/2-10,-repHeight/2-10,repWidth+20,repHeight+20);
// 		//画像の大きさを1.2倍にする
// 		repWidth = repWidth*1.2;
// 		repHeight = repHeight*1.2;
// 		//画像の重心がキャンバス座標の中心点にくるように画像を表示する
// 		ctx.drawImage(image,-repWidth/2,-repHeight/2,repWidth,repHeight);
// 	}
//
// 	//回転を止める処理
// 	function StopRotate(){
// 		//ステータスを停止状態にする
// 		RotateState = 0;
// 	}
//
