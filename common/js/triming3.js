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


function main(dataUrl) {
		if (canvas.getContext) {
				ctx = canvas.getContext('2d');
				ctx2 = canvas2.getContext('2d');
				image.src = dataUrl;
				image.addEventListener('load', function(){
						//$(".loading").hide();
						imageWidth = image.width;
						imageHeight = image.height;
						repWidth = imageWidth < imageHeight ? minWidth : minHeight / imageHeight * imageWidth;
						repHeight = imageHeight < imageWidth ? minHeight : minWidth / imageWidth * imageHeight;

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
							top: (repHeight / 2) - 120,
							left: (repWidth /2) - 120,
							// maxWidth: repWidth,
							// maxHeight: repHeight
						});

						elmMaxSize = repWidth < repHeight ? repWidth / 240 : repHeight / 240;

						$("#x").html(elmMaxSize);

				}, false);

		}
}
//トリミング位置の初期化
function trimRestore(){
		var tbPos = $( "#js_triming_element" ).offset();
		var cvPos = $( "#canvas" ).offset();
		trimX = tbPos.left - cvPos.left;
		trimY = tbPos.top - cvPos.top;
		console.log(tbPos,cvPos);
}

$(function(){

	$(window).on("load",function(){
		canvas = document.getElementById('canvas');
		canvas2 = document.getElementById('canvas2');



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

							var test = $jqIdTrimingArea.data("x");
							console.log(test);

          } else { //move
              if ($jqIdTrimingArea.data("down") == true) {
                  $jqIdTrimingElm.css({
                      "left": ($jqIdTrimingArea.data("elmPosX") - ($jqIdTrimingArea.data("x") - event.center.x)) + "px",
                      "top": ($jqIdTrimingArea.data("elmPosY") - ($jqIdTrimingArea.data("y") - event.center.y)) + "px"
                  });
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
      }
  });

	//$("#target").hammer(options).bind("pan", myPanHandler);
});
