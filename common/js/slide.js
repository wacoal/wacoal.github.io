$(function() {
  var winMaxWidth = 280;
  var winMaxHeight = 498;
  var touchArea = ('#slide-line');
  var $touchArea = $(touchArea);
  var moveDis;
  var cnt = 1;
  var fixMoveCnt = 100;
  var sotfunc = 0;
  var startX;
  var curX;
  var slideCnt = $(touchArea + " .slide-line__item").length;

  $touchArea.width(100 * slideCnt + '%');
  $(touchArea + " .slide-line__item").width(100 / slideCnt + '%');

  for (var i = 0; i < slideCnt; i++) {
    if (i == 0) {
      $('#ball').append('<span class="box-ball__item line__item is_active">●</span>');
    } else {
      $('#ball').append('<span class="box-ball__item line__item">●</span>');
    }
  }

  var touchBox = $touchArea[0];
  touchBox.addEventListener('touchstart', touchHandler, false);
  touchBox.addEventListener('touchmove', touchHandler, false);
  touchBox.addEventListener('touchend', touchHandler, false);

  function touchHandler(e) {
    e.preventDefault();
    var touch_ = e.touches[0];
    if (e.type == 'touchstart') { startX = touch_.pageX; }
    if (e.type == 'touchmove') { curX = touch_.pageX; }
    if (e.type == 'touchend') {
      clearInterval(sotfunc);
      if (startX < curX) {
        if (cnt > 1) {
          moveDis = moveDis - fixMoveCnt;
          if ($touchArea.hasClass('has_move' + cnt)) {
            $touchArea.removeClass('has_move' + cnt);
          }
          cnt--;
          $touchArea.addClass('has_move' + cnt);
          ballActive();
        }
      } else if (startX > curX) {
        if (cnt < slideCnt) {
          moveDis = fixMoveCnt * cnt;
          if ($touchArea.hasClass('has_move' + cnt)) {
            $touchArea.removeClass('has_move' + cnt);
          }
          cnt++;
          $touchArea.addClass('has_move' + cnt);
          ballActive();
        }
      }
      settimeMove();
    }
  }

  $(window).on('load resize', function() {
    var timer_ = false;
    if (timer_ !== false) {
      clearTimeout(timer_);
    }
    timer_ = setTimeout(function() {
      slideSize();
    }, 20);
  });

  function settimeMove() {
    sotfunc = setInterval(function() {
      if (cnt < slideCnt) {
        if ($touchArea.hasClass('has_move' + cnt)) {
          $touchArea.removeClass('has_move' + cnt);
        }
        cnt++;
        $touchArea.addClass('has_move' + cnt);
        ballActive();
      } else {
        if ($touchArea.hasClass('has_move' + cnt)) {
          $touchArea.removeClass('has_move' + cnt);
        }
        cnt = 1;
        $touchArea.addClass('has_move' + cnt);
        ballActive();
      }
    }, 5000);
  }

  function ballActive() {
    $('#ball .box-ball__item.is_active').removeClass('is_active');
    $('#ball .box-ball__item').eq(cnt - 1).addClass('is_active');
  }

  function slideSize() {
    var winWidth_ = $(window).width();
    var winHeight_ = $(window).height();
    if (winHeight_ - 60  < winMaxHeight) {
      var imgWidth = winWidth_ - 120;
      $('#slide-line-wrap, #slide-pic').css({
        'height': imgWidth *　1.78,
        'width': imgWidth
      });
    } else {
      $('#slide-line-wrap, #slide-pic').css({
        'height': winMaxHeight,
        'width': winMaxWidth
      });
    }
  }

  settimeMove();
});
