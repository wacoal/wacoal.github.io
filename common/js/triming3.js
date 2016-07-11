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
var ratio = 1;

function main(dataUrl) {
		if (canvas.getContext) {
				ctx = canvas.getContext('2d');
				ctx2 = canvas2.getContext('2d');
				image.src = dataUrl;
				image.addEventListener('load', function(){
						//$(".loading").hide();
						imageWidth = image.width;
						imageHeight = image.height;
						repWidth  = imageWidth < imageHeight ? minWidth : minHeight / imageHeight * imageWidth;
						repHeight = imageHeight < imageWidth ? minHeight : minWidth / imageWidth * imageHeight;

						repWidth  = parseInt(repWidth);
						repHeight = parseInt(repHeight);

						canvas.width = repWidth;
						canvas.height = repHeight;
						ctx.drawImage(image, 0, 0, repWidth, repHeight);
						ctx.save();

						//trimRestore();
						$("#js_triming_area").css({
							width: repWidth,
							height: repHeight
						});
						$("#js_triming_element").css({
							top: (repHeight / 2) - (targetSize / 2),
							left: (repWidth /2) - (targetSize / 2),
							// maxWidth: repWidth,
							// maxHeight: repHeight
						});

						elmMaxSize = repWidth < repHeight ? repWidth / targetSize : repHeight / targetSize;

						//TODO function化したい
						topOffset =  $("#js_triming_area").offset().top;
						leftOffset = $("#js_triming_area").offset().left;
						$("#o-size").html(imageWidth);
						$('#now-size').html(parseInt(repWidth));
						$("#x").html(leftOffset);
						$("#y").html(topOffset);

						elmX = ( ( repWidth/ 2) - (targetSize / 2) ) + leftOffset;
						//elmY = ( (repHeight / 2) - (targetSize / 2) ) + topOffset;
						elmY = ( (repHeight / 2) - (targetSize / 2) );
						elmX = parseInt(elmX);
						elmY = parseInt(elmY);
						$("#x_now").html(elmX);
						$("#y_now").html(elmY);

						ratio = figureScale(imageWidth,repWidth);

						console.log(ratio);

				}, false);

		}
}

function figureScale(original,now){
	var scale = original / now;
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

		$("#js_triming_area").css({
			width: rotateWidth,
			height: rotateHeight
		});
		$("#js_triming_element").css({
			top: (rotateHeight / 2) - 120,
			left: (rotateWidth /2) - 120,
		});

		elmMaxSize = repWidth < repHeight ? repWidth / 240 : repHeight / 240;

		//TODO function1 回転したとき横は縦の値を入れるべきか
		// topOffset =  $(canvas).offset().top;
		// leftOffset = $(canvas).offset().left;
		// $("#o-size").html(imageWidth);
		// $('#now-size').html(parseInt(repWidth));
		// $("#x").html(leftOffset);
		// $("#y").html(topOffset);

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
	});

	//ライブラリの初期設定
	var $idTrimingArea = document.getElementById("js_triming_area");
	//var $idTrimingArea = document.getElementById("canvas");
	var $jqIdTrimingArea = $($idTrimingArea);
	var $idTrimingElm = document.getElementById("js_triming_element");
	var $jqIdTrimingElm = $($idTrimingElm);
	var $hammerObj = new Hammer($idTrimingElm);
	var $hammerObj2 = new Hammer($idTrimingArea);
	var panTime = false;
	var pinchTime = false;
	var $pinchTimer = {};
	$hammerObj.get("pan").set({ enable: true });
	$hammerObj.get("pinch").set({ enable: true });
	$jqIdTrimingElm.css("transform", "scale(1)");

	//var obj = $($idTrimingElm);
	//var rect = obj.getBoundingClientRect();

	// 座標を計算する
	// var positionX;
	// var positionY;

	// window.onload = function() {
  //   var element = document.getElementById('canvas');
  //   var rect = element.getBoundingClientRect();
	//
  //   console.log(rect.left);   // x座標(絶対座標)
  //   console.log(rect.top);    // y座標(絶対座標)
  //   console.log(rect.width);  // 幅
  //   console.log(rect.height); // 高さ
	//
	// 	// function getRect(){
	// 	// 	positionX = rect.left + window.pageXOffset;
	// 	// 	positionY = rect.top + window.pageYOffset;
	// 	// }
	// }



	var $idAreaImage = $("#js_triming_areaImage");
	$idAreaImage.load(function() {
      //console.log('読み込み完了');
			//var element = document.getElementById('js_triming_areaImage');
			var originalWidth  = $(this).width();
			var originalHeight = $(this).height();
	    var originalTop    = $(this).offset().top;
			var originalLeft   = $(this).offset().left;

	    console.log(originalTop,originalLeft,originalWidth,originalHeight);   // x座標(絶対座標)
	    // console.log(rect.top);    // y座標(絶対座標)
	    // console.log(rect.width);  // 幅
	    // console.log(rect.height); // 高さ
  });

	// window.onload = function() {
	// 	var element = document.getElementById('js_triming_areaImage');
  //   var rect = element.getBoundingClientRect();
	//
  //   console.log(rect.left);   // x座標(絶対座標)
  //   console.log(rect.top);    // y座標(絶対座標)
  //   console.log(rect.width);  // 幅
  //   console.log(rect.height); // 高さ
	// }

	$hammerObj.on("pan",function(event) {
      if(event.isFinal) { //end
          panTime = false;
          $jqIdTrimingArea.data("down", false);
          if(Number(String($jqIdTrimingElm.css("left")).replace("px", "")) < 0)
              $jqIdTrimingElm.css("left", "0px");
          if(Number(String($jqIdTrimingElm.css("left")).replace("px", "")) > ($jqIdTrimingArea.width() - $jqIdTrimingElm.width()))
              $jqIdTrimingElm.css("left", ($jqIdTrimingArea.width() - $jqIdTrimingElm.width()) + "px");
          if(Number(String($jqIdTrimingElm.css("top")).replace("px", "")) < 0)
              $jqIdTrimingElm.css("top", "0px");
          if(Number(String($jqIdTrimingElm.css("top")).replace("px", "")) > ($jqIdTrimingArea.outerHeight() - $jqIdTrimingElm.height()))
              $jqIdTrimingElm.css("top", ($jqIdTrimingArea.outerHeight() - $jqIdTrimingElm.height()) + "px");

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
                  $jqIdTrimingElm.css({
                      "left": ($jqIdTrimingArea.data("elmPosX") - ($jqIdTrimingArea.data("x") - event.center.x)) + "px",
                      "top": ($jqIdTrimingArea.data("elmPosY") - ($jqIdTrimingArea.data("y") - event.center.y)) + "px"
                  });

									//座業の決定
									//elmX = ( ($jqIdTrimingArea.data("elmPosX") - ($jqIdTrimingArea.data("x") - event.center.x)) ) + leftOffset;
									//elmY = ($jqIdTrimingArea.data("elmPosY") - ($jqIdTrimingArea.data("y") - event.center.y))  + topOffset;
									elmX = ( ($jqIdTrimingArea.data("elmPosX") - ($jqIdTrimingArea.data("x") - event.center.x)) );
									elmY = ($jqIdTrimingArea.data("elmPosY") - ($jqIdTrimingArea.data("y") - event.center.y));
									elmX = parseInt(elmX);
									elmY = parseInt(elmY);
									if( elmX < 0){
										elmX = 0;
									}
									if( elmX > repWidth - targetSize ){
										elmX = repWidth - targetSize;
									}
									if( elmY < 0){
										elmY = 0;
									}
									if( elmY > repHeight - targetSize ){
										elmY = repHeight - targetSize;
									}
									$("#x_now").html(elmX);
									$("#y_now").html(elmY);
              }
          }
      }
  });

	//pinch event
  $hammerObj2.on("pinch",function(event) {
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
					$("#x").html(preScale);
      } else { //move
          if($pinchTimer) clearTimeout($pinchTimer);
					var scaleSize = $jqIdTrimingArea.data("preScale") + (event.scale - $jqIdTrimingArea.data("scale"));
					if( scaleSize > elmMaxSize ){
						scaleSize = elmMaxSize
					}
          $jqIdTrimingElm.css("transform", "scale(" + scaleSize + ")");
          $pinchTimer = setTimeout(function() { //end
              pinchTime = false;
          }, 100);

					elmX = ( ($jqIdTrimingArea.data("elmPosX") - ($jqIdTrimingArea.data("x") - event.center.x)) ) + leftOffset;
					elmY = ($jqIdTrimingArea.data("elmPosY") - ($jqIdTrimingArea.data("y") - event.center.y))  + topOffset;;
					elmX = parseInt(elmX);
					elmY = parseInt(elmY);
					$("#x_now").html(elmX);
					$("#y_now").html(elmY);
					$("#scale").html(scale);

      }
  });


});

function sendImage(){
		if (!ctx) return;
		//$(".loading").show();
		//console.log(blobX, blobY);
		//var imageData = ctx.getImageData(trimX, trimY, minWidth, minHeight);
		//TODO
}

$('#js_btn_upload').off("click").on("click",function(e){
	if (!ctx) return false;
	srcImgPost = $(this).closest("form").attr("action");
	if(preventEvent){
		e.preventDefault();
		var this_id = ("#")+$(this).attr("id");
		var tit1 = ("ご注意ください");
		$.alerts.btnOk1 = ("画像を送信する");
		$.alerts.btnNg1 = ("キャンセルする");
		var txt1 = ('\
			<div class="caution"><div class="caution__cont">\
				<ul class="listDott">\
					<li><p>アナタがこれから投稿する画像は、身分証を元に事務局で日々チェックを行っています</p></li>\
					<li><p>本人が撮影したものでない画像は、<strong class="note">すぐにバレます</strong></p></li>\
					<li><p><strong class="note">ネットで拾った画像を利用する行為</strong>は絶対にやめてください</p></li>\
					<li><p>そのような方は、<strong class="note">サイトの利用を停止します</strong></p></li>\
				</ul>\
			</div></div>\
		');

		(function () {
			jConfirm2( txt1, tit1, function(r) {
				if( r == true){
					preventEvent = false;
					//$(this_id)[0].click();
					sendImage();
				} else {
					return false;
				}
			});
		}());

	} else {
		preventEvent = true;
	}
});
