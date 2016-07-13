//document.createElement('main');

var angle = 0;
var repWidth = 1;
var repHeight = false;
var minWidth = 320;
var minHeight = 240;
var imageWidth;
var imageHeight;

var trimX;
var trimY;
var trimWidth;

var posX = 0;
var posY = 0;
var blobX = 0;
var blobY = 0;

var dataUrl="";
var ctx;
var ctx2
var image = new Image();

var canvas;
var canvas2;

var preventEvent = true;
var srcImgPost;

var elmMaxSize;
var topOffset;
var leftOffset;
var elmX;
var elmY;
var targetSize = 240;
var scaleElmSize = targetSize;
var elmSize;
var ratio = 1;
var scaleRatio = 1;
var scaleMaxWidth;
var scaleMaxHeight;
var maxScale;
var limitScale;
var minScale;

function main(dataUrl) {
	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
		ctx2 = canvas2.getContext('2d');
		image.src = dataUrl;
		image.addEventListener('load', function(){
			$(".loading").hide();
			imageWidth = image.width;
			imageHeight = image.height;
			repWidth  = imageWidth < imageHeight ? minWidth : minHeight / imageHeight * imageWidth;
			repHeight = imageHeight < imageWidth ? minHeight : minWidth / imageWidth * imageHeight;

			// repWidth  = parseInt(repWidth);
			// repHeight = parseInt(repHeight);

			scaleMaxWidth = repWidth / scaleElmSize;
			scaleMaxHeight = repHeight / scaleElmSize;
			maxScale = scaleMaxWidth < scaleMaxHeight ? scaleMaxWidth : scaleMaxHeight;
			limitScale = maxScale;

			test_info();

			canvas.width = repWidth;
			canvas.height = repHeight;
			ctx.drawImage(image, 0, 0, repWidth, repHeight);
			ctx.save();

			elmMaxSize = repWidth < repHeight ? repWidth / scaleElmSize : repHeight / scaleElmSize;

			//trimRestore();
			$("#js_triming_area").css({
				width: repWidth,
				height: repHeight
			});
			$("#js_triming_element").css({
				top: (repHeight / 2) - (scaleElmSize / 2),
				left: (repWidth /2) - (scaleElmSize / 2),
				// maxWidth: elmMaxSize,
				// maxHeight: elmMaxSize
			});

			//TODO function化したい
			topOffset =  $("#js_triming_area").offset().top;
			leftOffset = $("#js_triming_area").offset().left;
			elmSize = scaleElmSize;
			elmX = ( ( repWidth/ 2) - (scaleElmSize / 2) ) + leftOffset;
			elmY = ( (repHeight / 2) - (scaleElmSize / 2) );

			ratio = figureScale(imageWidth,repWidth);

			trimData();
			test_info();

		}, false);

	}
}

function figureScale(original,now){
	var scale = original / now;
	//scale = parseInt(scale);
  return scale;
}

//トリミング位置の初期化
function trimRestore(){
		var tbPos = $( "#js_triming_element" ).offset();
		var cvPos = $( "#canvas" ).offset();
		trimX = tbPos.left - cvPos.left;
		trimY = tbPos.top - cvPos.top;
		console.log(tbPos,cvPos);
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

		// $("#js_triming_area").css({
		// 	width: rotateWidth,
		// 	height: rotateHeight
		// });
		// $("#js_triming_element").css({
		// 	top: (rotateHeight / 2) - 120,
		// 	left: (rotateWidth /2) - 120,
		// });
		//
		// elmMaxSize = repWidth < repHeight ? repWidth / 240 : repHeight / 240;

		trimRestore();
}
//canvasの初期化
function restore(){
		posX = 0;
		posY = 0;
		canvas.width = repWidth;
		canvas.height = repHeight;
		ctx.restore();
		ctx.drawImage(image, 0, 0, repWidth, repHeight);
		ctx.save();
}




$(function(){

	$(window).on("load",function(){
		canvas = document.getElementById('canvas');
		canvas2 = document.getElementById('canvas2');
		$("#js_btn_rotate").on('click',function(){
			rotate();
		});

		img = canvas;
	});

});

var startDistance;
var moveDistance;
var currentScale = 1;
var saveScale = 1; //拡大率（縮小率）の初期値
var eventKind = '';
var elm = document.getElementById('animationLayer'); //タップを取得するエレメントを定義
//var img = document.getElementById('img01'); //拡大させる画像を定義
//var img = canvas; //拡大させる画像を定義
var img;

elm.addEventListener('touchstart', touchStart, false);//タップされた瞬間
elm.addEventListener('touchstart', touchMove, false);//指を動かしている
elm.addEventListener('touchstart', touchEnd, false);//指が画面から離れた

//タップされた瞬間に実行されるメソッド
function touchStart(e) {
    switch (e.touches.length) {
      case 1:
        eventKind = 'flick';
      case 2:
        eventKind = 'pinch';
        pinchStart(e);
        break;
      default:
        break;
    }
}

//指が動いている時に実行されるメソッド
function touchMove(e) {
    e.preventDefault();
    switch (e.touches.length) {
      case 2:
        pinchMove(e);
        break;
      default:
        break;
    }
}

//指が離れた時に実行されるメソッド
function touchEnd(e) {
    switch (eventKind) {
      case 'pinch':
        pinchEnd(e);
        break;
      default:
        break;
    }
}


function pinchStart(e){

  //スタート時の指の距離を保持
  startDistance = getDistance(e);

}

function pinchMove(e){

  //2本指の距離を計算
  moveDistance = getDistance(e);

  //start時の距離を基準に動いた比率を計算
  currentScale = moveDistance / startDistance;

  //拡大率を算出
  saveScale = saveScale * currentScale;

  img.style.webkitTransform =
    'scale3d(' + saveScale + ',' + saveScale + ', 1)';
}

function pinchEnd(e){
  if(saveScale < 1){
    saveScale = 1;
    img.style.webkitTransform =
      'scale3d(' + saveScale + ',' + saveScale + ', 1)';
  }
}

//指の距離を測るメソッド.
function getMeasure(e) {
 return Math.sqrt(
     Math.pow(
         Number(e.touches[0].pageX) - Number(e.touches[1].pageX), 2) +
     Math.pow(
         Number(e.touches[0].pageY) - Number(e.touches[1].pageY), 2));
}

//ポストするデータなので、比率を掛ける
function trimData(){
	trimWidth = scaleElmSize * ratio;
	trimX     = elmX * ratio;
	trimY     = elmY * ratio;
	console.log(trimWidth);
	console.log(trimX);
	console.log(trimY);
	//alert(trimWidth);
}


function sendImage(){
		if (!ctx) return;
		//$(".loading").show();
		//console.log(blobX, blobY);
		//var imageData = ctx.getImageData(trimX, trimY, minWidth, minHeight);
		//TODO
		var jqxhr;
		if (jqxhr) {
			return;
		}
		jqxhr = $.ajax({
				url : 'triming3.html',
				data : data,
				type : 'post',
				timeout: 10000,
				data: {
		        trimWidth: trimWidth,
		        trimX: trimX
		    }
			}).done(function(rs){
				// if ( rs == 0 ){
				// 	var tit1 = ("リクエストしました");
				// 	r = '<?=$pfmr->getProp("user1.handle")?>さんに<?=EC_NAME?>のリクエストをしました。';
				// } else {
				// 	var tit1 = ("リクエストできませんでした");
				// 	r = rs;
				// }
				// jAlert(r, tit1);
				return false;
			})
			.fail(function(){
				// var tit1 = ("エラーです");
				// r = '<p>リクエストできませんでした。</p>';
				// jAlert(r, tit1);
				return false;
			})
			.always(function(){
				return false;
			})
		;
}



$('#js_btn_upload').off("click").on("click",function(e){
	if (!ctx) return false;
	test  = elmSize * ratio;
	testX = elmX * ratio;
	testY = elmY * ratio;
	console.log(test,testX,testY);
	sendImage();
	// srcImgPost = $(this).closest("form").attr("action");
	// if(preventEvent){
	// 	e.preventDefault();
	// 	var this_id = ("#")+$(this).attr("id");
	// 	var tit1 = ("ご注意ください");
	// 	$.alerts.btnOk1 = ("画像を送信する");
	// 	$.alerts.btnNg1 = ("キャンセルする");
	// 	var txt1 = ('\
	// 		<div class="caution"><div class="caution__cont">\
	// 			<ul class="listDott">\
	// 				<li><p>アナタがこれから投稿する画像は、身分証を元に事務局で日々チェックを行っています</p></li>\
	// 				<li><p>本人が撮影したものでない画像は、<strong class="note">すぐにバレます</strong></p></li>\
	// 				<li><p><strong class="note">ネットで拾った画像を利用する行為</strong>は絶対にやめてください</p></li>\
	// 				<li><p>そのような方は、<strong class="note">サイトの利用を停止します</strong></p></li>\
	// 			</ul>\
	// 		</div></div>\
	// 	');
	//
	// 	(function () {
	// 		jConfirm2( txt1, tit1, function(r) {
	// 			if( r == true){
	// 				preventEvent = false;
	// 				//$(this_id)[0].click();
	// 				sendImage();
	// 			} else {
	// 				return false;
	// 			}
	// 		});
	// 	}());
	//
	// } else {
	// 	preventEvent = true;
	// }
});





var maxmax;
var scaleSize;
function test_info(){
	$("#scaleSize").html(scaleSize);
	$("#maxScale").html(maxScale);
	$("#elmSize").html(elmSize);
	$("#scaleElmSize").html(scaleElmSize);
	$("#limitScale").html(limitScale);
	$("#maxmax").html(maxmax);
}
