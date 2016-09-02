$(function() {
  var $target = $('#trimming_area');
  var targetWidth = $target.width();
  var targetHeight = $target.height();
  
  var $img = $('#image');
  var originalImgWidth;
  var originalImgHeight;
  
  var width = 0;
  var height = 0;
  
  var left = 0;
  var top = 0;
  
  var scale = 1;
  var rotation = 0;
  
  function initialize() {
    originalImgWidth = $img.width();
    originalImgHeight = $img.height();
    $('#oWidth').text(originalImgWidth + 'px');
    $('#oHeight').text(originalImgHeight + 'px');
    
    width = targetWidth;
    height = targetHeight;
    
    left = 0;
    top = 0;
    
    if (originalImgHeight < originalImgWidth) {
      width = originalImgWidth * (targetHeight / originalImgHeight);
      left = (targetWidth - width) / 2;
    } else if (originalImgWidth < originalImgHeight) {
      height = originalImgHeight * (targetWidth / originalImgWidth);
      top = (targetHeight - height) / 2;
    }
    
    scale = 1;
    rotation = 0;
    setStyle();
  }

  initialize();
  
  var mc = new Hammer($('#work_space')[0]);
  mc.get('pinch').set({ enable: true });

  // --- pan ------>
  
  var panLeft;
  var panTop;
  
  mc.on('panstart', function(e) {
    panLeft = left;
    panTop = top;
  });

  mc.on('panmove', function(e) {
    switch(rotation) {
      case 0:
        left = panLeft + e.deltaX;
        top = panTop + e.deltaY;
        break;
      case 90:
        left = panLeft + e.deltaY;
        top = panTop - e.deltaX;
        break;
      case 180:
        left = panLeft - e.deltaX;
        top = panTop - e.deltaY;
        break;
      case 270:
        left = panLeft - e.deltaY;
        top = panTop + e.deltaX;
        break;
    }
    setStyle();
  });

  mc.on('panend', function(e) {
    panend();
  });
  
  function panend() {
    if (0 <= left) {
      left = 0;
    } else if (left + width < targetWidth) {
      left = targetWidth - width;
    }
    
    if (0 <= top) {
      top = 0;
    } else if (top + height < targetHeight) {
      top = targetHeight - height;
    }
    
    setStyle();
  }
  
  // --- /pan ------>
  
   // --- pinch ------>
  
  var isPinch = false;
  
  mc.on('pinchstart', function(e) {
    isPinch = true;
    scale = 1;
    setStyle();
  });

  mc.on('pinchmove', function(e) {
    scale = e.scale;
    setStyle();
  });

  mc.on('pinchend', function(e) {
    if (isPinch) {
      isPinch = false;
      pinchend();
    }
  });

  mc.on('pinchcancel', function(e) {
    if (isPinch) {
      isPinch = false;
      pinchend();
    }
  });
  
  function pinchend() {
    var width_ = width * scale;
    var height_ = height * scale;
    left += (width - width_) / 2;
    top += (height - height_) / 2;
    width = width_;
    height = height_;
    
    if (width < targetWidth) {
      left = 0;
      width = targetWidth;
      height = originalImgHeight * (targetWidth / originalImgWidth);
    }
    if (height < targetHeight) {
      top = 0;
      width = originalImgWidth * (targetHeight / originalImgHeight);
      height = targetHeight;
    }
    
    scale = 1;
    setStyle();
    
    panend();
  }
  
  // --- /pinch ------>
  
  // --- rotate ------>
  
  $('#left_rotation').on('click', function() {
    rotation = (rotation == 0) ? 270 : (rotation - 90);
    setStyle();
  });
  
  $('#right_rotation').on('click', function() {
    rotation = (rotation == 270) ? 0 : (rotation + 90);
    setStyle();
  });
  
  function setStyle() {
    $img.css({
      'left': left + 'px',
      'top': top + 'px',
      'width': width + 'px',
      'height': height + 'px',
      'transform-origin': ((targetWidth / 2) - left) + 'px ' + ((targetHeight / 2) - top) + 'px',
      'transform': 'rotate(' + rotation + 'deg) scale(' + scale + ')'
    });
    
    //TODO
    trimming();
  }
  
  // --- /rotate ------>
  
  $('#reset').on('click', function() {
    initialize();
  });
  
  $('#trimming').on('click', function() {
    trimming();
  });
  
  function trimming() {
    $('#width').text(Math.floor(width) + 'px');
    $('#height').text(Math.floor(height) + 'px');
    $('#left').text(Math.floor(left) + 'px');
    $('#top').text(Math.floor(top) + 'px');
    $('#x').text(Math.floor(-left) + 'px');
    $('#y').text(Math.floor(-top) + 'px');
    $('#x2').text(Math.floor(-left * (originalImgWidth / width)) + 'px');
    $('#y2').text(Math.floor(-top * (originalImgHeight / height)) + 'px');
  }
  
  // $('#file').on('change', function() {
  //   if (this.files && this.files[0]) {
  //     $img.remove();
  //     
  //     var reader = new FileReader();
  //     reader.onload = function(e) {
  //       $img = $('<img id="image" src="' + e.target.result + '">')
  //       $('#frame').before($img);
  //       
  //       initialize();
  //     }
  //     reader.readAsDataURL(this.files[0]);
  //   }
  // });
  
  // $('#zoomIn').on('click', function() {
  //   scale = 1.5;
  //   pinchend();
  // });
  // 
  // $('#zoomOut').on('click', function() {
  //   scale = 0.7;
  //   pinchend();
  // });
});
