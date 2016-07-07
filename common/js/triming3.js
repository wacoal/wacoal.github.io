$(function(){

		//ライブラリの初期設定
		var $tgPanPinchArea = document.getElementById("panPinch"),
				$jqTgPanPinchArea = $($tgPanPinchArea),
				$tgPanPinchElm = document.getElementById("panPinchElm"),
				$jqTgPanPinchElm = $($tgPanPinchElm),
				$hammerObj = new Hammer($tgPanPinchElm),
				$hammerObj2 = new Hammer($tgPanPinchArea),
				panTime = false,
				pinchTime = false,
				$pinchTimer = {};
		$hammerObj.get("pan").set({ enable: true });
		$hammerObj.get("pinch").set({ enable: true });
		$jqTgPanPinchElm.css("transform", "scale(1)");

		//var obj = $($tgPanPinchElm);
		//var rect = obj.getBoundingClientRect();

		// 座標を計算する
		var positionX;
		var positionY;

		window.onload = function() {
	    var element = document.getElementById('panPinchElm');
	    var rect = element.getBoundingClientRect();

	    console.log(rect.left);   // x座標(絶対座標)
	    console.log(rect.top);    // y座標(絶対座標)
	    console.log(rect.width);  // 幅
	    console.log(rect.height); // 高さ

			// function getRect(){
			// 	positionX = rect.left + window.pageXOffset;
			// 	positionY = rect.top + window.pageYOffset;
			// }
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

	//$("#target").hammer(options).bind("pan", myPanHandler);
});
