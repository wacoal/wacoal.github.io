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




$(function(){

		canvas = document.getElementById('canvas');
		canvas2 = document.getElementById('canvas2');

		$("#js_btn_rotate").on('click',function(){
			rotate();
		});
});

// var createObjectURL = (window.URL && window.URL.createObjectURL) ? function(file) {
// 		return window.URL.createObjectURL(file);
// } : (window.webkitURL && window.webkitURL.createObjectURL) ? function(file) {
// 		return window.webkitURL.createObjectURL(file);
// } : undefined;
// var filereader = new FileReader();
// //var objFile = document.getElementById("selfile");
//
// objFile.addEventListener("change", function(e) {
// 		$(".loading").show();
// 		//var file = e.target.files[0];
// 		angle = 0;
// 		posX = 0;
// 		posY = 0;
// 		//$('.trimming-label').removeClass('disabled');
// 		dataUrl = createObjectURL ? createObjectURL(file) : e.target.result;
// 		main();
// }, false);



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

						trimRestore();
						testWrite();
				}, false);


		}
}


function testWrite(){
	$("#xxx").html("test");
	$("#originsize").html(imageWidth);
	$("#nowsize").html(repWidth);
}


	$hammerObj.on("pan",function(event) {
      if(event.isFinal) { //end

          panTime = false;
          $jqTgPanPinchArea.data("down", false);
          if(Number(String($jqTgPanPinchElm.css("left")).replace("px", "")) < 0)
              $jqTgPanPinchElm.css("left", "0px");
          if(Number(String($jqTgPanPinchElm.css("left")).replace("px", "")) > ($jqTgPanPinchArea.width() - $jqTgPanPinchElm.width()))
              $jqTgPanPinchElm.css("left", ($jqTgPanPinchArea.width() - $jqTgPanPinchElm.width()) + "px");
          if(Number(String($jqTgPanPinchElm.css("top")).replace("px", "")) < 0)
              $jqTgPanPinchElm.css("top", "0px");
          if(Number(String($jqTgPanPinchElm.css("top")).replace("px", "")) > ($jqTgPanPinchArea.outerHeight() - $jqTgPanPinchElm.height()))
              $jqTgPanPinchElm.css("top", ($jqTgPanPinchArea.outerHeight() - $jqTgPanPinchElm.height()) + "px");
      } else {
          if(!panTime) { //start
              panTime = event.timeStamp;

              $jqTgPanPinchArea
                  .data("down", true)
                  .data("x", event.center.x)
                  .data("y", event.center.y)
                  .data("elmPosX", Number(String($jqTgPanPinchElm.css("left")).replace("px", "")))
                  .data("elmPosY", Number(String($jqTgPanPinchElm.css("top")).replace("px", "")));

							var test = $jqTgPanPinchArea.data("x");
							console.log(test);

          } else { //move
              if ($jqTgPanPinchArea.data("down") == true) {
                  $jqTgPanPinchElm.css({
                      "left": ($jqTgPanPinchArea.data("elmPosX") - ($jqTgPanPinchArea.data("x") - event.center.x)) + "px",
                      "top": ($jqTgPanPinchArea.data("elmPosY") - ($jqTgPanPinchArea.data("y") - event.center.y)) + "px"
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
          var preScale = String($jqTgPanPinchElm.css("transform")).replace("matrix(", "");
          preScale = preScale.replace(")", "");
          preScale = preScale.split(",");
          preScale = Math.sqrt(preScale[0] * preScale[0] + preScale[1] * preScale[1]);
          $jqTgPanPinchArea
              .data("preScale", preScale)
              .data("scale", event.scale);
      } else { //move
          if($pinchTimer) clearTimeout($pinchTimer);
          $jqTgPanPinchElm.css("transform", "scale(" + ($jqTgPanPinchArea.data("preScale") + (event.scale - $jqTgPanPinchArea.data("scale"))) + ")");
          $pinchTimer = setTimeout(function() { //end
              pinchTime = false;
          }, 100);
      }
  });

// var isTouch = ('ontouchstart' in window);
// var mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
// $('#imageBox').on({
// 		'touchstart mousedown': function(e) {
// 				if (!ctx) return;
// 				e.preventDefault();
// 				this.pageX = (isTouch ? event.changedTouches[0].pageX : e.pageX);
// 				this.pageY = (isTouch ? event.changedTouches[0].pageY : e.pageY);
// 				this.left = $(this).position().left;
// 				this.top = $(this).position().top;
// 				this.touched = true;
// 		},
// 		'touchmove mousemove': function(e) {
// 				if (!this.touched) return;
// 				e.preventDefault();
// 				this.left =  -(this.pageX - (isTouch ? event.changedTouches[0].pageX : e.pageX) );
// 				this.top =  -(this.pageY - (isTouch ? event.changedTouches[0].pageY : e.pageY) );
//
// 				var transX = this.left;
// 				var transY = this.top;
// 				if(angle == 90){
// 						transX = this.top;
// 						transY = -this.left;
// 				}else if(angle == 180){
// 						transX = -this.left;
// 						transY = -this.top;
// 				}else if(angle == 270){
// 						transX = -this.top;
// 						transY = this.left;
// 				}
// 				bufPosX = posX;
// 				bufPosY = posY;
// 				transX = repWidth < repHeight ? 0 : transX;
// 				transY = repWidth > repHeight ? 0 : transY;
// 				posX += angle % 180 ? transY : transX;
// 				posY += angle % 180 ? transX : transY;
// 				var res = ambit();
// 				if(res){
// 						posX = bufPosX;
// 						posY = bufPosY;
// 						transX = transY = 0;
// 				}
// 				translate(transX, transY);
// 				this.pageX = (isTouch ? event.changedTouches[0].pageX : e.pageX);
// 				this.pageY = (isTouch ? event.changedTouches[0].pageY : e.pageY);
// 		},
// 		'touchend mouseup mouseout': function(e) {
// 				trimRestore();
// 				if (!this.touched) return;
// 				this.touched = false;
// 		},
// 		'gestureChange': function(e) {
// 				//this.scale    = e.scale;
// 				alert(e.scale);
// 		},
// 		'mousewheelevent': function(e) {
// 				var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
// 				if (delta < 0){
// 					e.preventDefault();
// 					this.scale    = delta;
// 					//下にスクロールした場合の処理
// 				} else if (delta > 0){
// 					e.preventDefault();
// 					this.scale    = delta;
// 					//上にスクロールした場合の処理
// 				}
// 		}
//
// });

function translate(x, y){
		ctx.fillStyle = "rgb(0, 0, 0)";
		ctx.fillRect(0, 0, Math.max(canvas.width, canvas.height) + 1, Math.max(canvas.width, canvas.height) + 1);
		ctx.translate(x, y);
		ctx.drawImage(image, 0, 0, repWidth, repHeight);
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
		canvas.width = angle % 180 ? repHeight : repWidth;
		canvas.height = angle % 180 ? repWidth : repHeight;
		ctx.fillRect(0,0,canvas.width + 1,canvas.height + 1);
		ctx.rotate(angle * Math.PI / 180);
		ctx.translate( -( angle == 180 || angle == 270 ? repWidth : 0), -( angle == 90|| angle == 180  ? repHeight : 0) );
		ctx.drawImage(image, 0, 0, repWidth, repHeight);
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

//トリミング位置の初期化
function trimRestore(){
		var tbPos = $( "#thumbBox" ).offset();
		var cvPos = $( "#canvas" ).offset();
		trimX = tbPos.left - cvPos.left;
		trimY = tbPos.top - cvPos.top;
}

function ambit(){
		var res = false;
		if(trimY < Math.abs(posY) && trimY >= 0){
				res = true
		} else if(trimX < Math.abs(posX) && trimX >= 0){
				res = true
		}
		var cos = Math.round(1 * Math.cos(angle / 180 * Math.PI));
		var sin = Math.round(-1 * Math.sin(angle / 180 * Math.PI));
		blobX = Math.max(0, trimX - posX * sin);
		blobY = Math.max(0, trimY - posY * cos);
		return res;
}

function sendImage(){
		if (!ctx) return;
		$(".loading").show();
		console.log(blobX, blobY);
		var imageData = ctx.getImageData(trimX, trimY, minWidth, minHeight);
		canvas2.width = minWidth;
		canvas2.height = minHeight;
		ctx2.putImageData(imageData, 0, 0);
		var png_img = canvas2.toDataURL();
		var jpeg_img = canvas2.toDataURL('image/jpeg');
		if( png_img.length > jpeg_img.length ){
				/*jpegの方が軽い*/
				var blob = base64ToBlob(canvas2.toDataURL('image/jpeg'), 'image/jpeg');
				sendImageBinary(blob);
		}else{
				/*pngの方が軽い又はjpeg出力未対応でpng化された等*/
				var blob = base64ToBlob(canvas2.toDataURL());
				sendImageBinary(blob);
		}
}

// バイナリ化した画像をPOSTで送る関数
var sendImageBinary = function(blob) {
		var formData = new FormData();
		formData.append('image', blob);
		formData.append('isMain', 'true');
		formData.append('no', '1');
		$.ajax({
				type: 'POST',
				//url: 'Per_SP_prof_step3.upload',
				url: srcImgPost,
				data: formData,
				contentType: false,
				processData: false,
				success:function(date, dataType){
						$(".loading").hide();
						var $img = $('img');
						var imgSrc = $img.attr('src');
						console.log(imgSrc);
						$img.attr('src', "");
						$img.attr('src', imgSrc + '?' + (new Date())*1);
						location.href = '/wo/victory/samplelist.phtml';
				}
				,
				error: function(XMLHttpRequest, textStatus, errorThrown){
				}
		});
};

// 引数のBase64の文字列をBlob形式にしている
var base64ToBlob = function(base64, type){
		type = type || 'image/png';
		var base64Data = base64.split(',')[1], // Data URLからBase64のデータ部分のみを取得
				data = window.atob(base64Data), // base64形式の文字列をデコード
				buff = new ArrayBuffer(data.length),
				arr = new Uint8Array(buff),
				blob, i, dataLen;

		// blobの生成
		for( i = 0, dataLen = data.length; i < dataLen; i++){
				arr[i] = data.charCodeAt(i);
		}
		try{
						blob = new Blob([arr], {type: 'image/png'});
		}catch(e){
						window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
						if (e.name == 'TypeError' && window.BlobBuilder) {
								var bb = new BlobBuilder();
								bb.append(arr);
								blob = bb.getBlob('image/png');
						} else {
								alert('['+e.message+']\nこのブラウザではトリミング画像をアップロードできませんでした。\n通常のアップロードページに移動します。');
								//location.href = 'Per_SP_profileImg.html';
						}
		 }
		return blob;
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
