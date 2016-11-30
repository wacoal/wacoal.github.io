


// registration
//Vue.component('text-test', textTest);



// root instance
// var app = new Vue({
//     el: '#app',
//     data: {
//         partterns: [ 0, 0, 0, 0 ]
//     },
//     components: {
//         'pattern-component': patternComponent,
//         'text-test': textTest
//     }
// });

var prof = new Vue({
    el: '#prof',
    data: {
        //partterns: [ 0, 0, 0, 0 ]
    },
    components: {
        'prof-text-64-component': profText64Component,
    }
});
/*
var exsample = new Vue({
  el: '#example'
});
*/

//
//
// testFunction: function(){
//   // var val = this.maxlength;
//   // console.log(val);
//   //e.preventDefault();
//   if (this.isValid) {
//     //document.getElementsByClassName("errors").className = "";
//     var args = {
//       url: '/ajax/member/{{ $member->id }}',
//       data: {
//         'pet': 'dfsa',
//       },
//       context:'ホゲホゲ',
//     };
//     ajax_post(args, function(data, textStatus, jqXHR){
//       if (data && data.is_success) {
//         $(this).addClass('is_on');
//
//         // var count_ = $(this).find('.is_count');
//         // count_.text(parseInt(count_.text()) + 1);
//       } else {
//         console.log(textStatus);
//       }
//       //return false;
//
//     });
//
//
//     //
//     // $(".errors").addClass("errors_off");
//     // var jqxhr;
//     // if (jqxhr) {
//     //   return;
//     // }
//     // jqxhr = $.ajax({
//     // 	type: "POST",
//     //   url: '/ajax/member/{{ $member->id }}/',
//     //   //url: ajaxUrl,
//     // 	dataType: 'html',
//     //   timeout: 10000,
//     //   data: {
//     //     'pet': 'dfsa',
//     //   },
//     // })
//     // .done(function(data){
//     //   console.log("test");
//     // })
//     // .fail(function(data){
//     // 	console.log("fail");
//     // })
//     // .always(function(data){
//     //   return false;
//     // });
//   }else{
//     console.log("need edit")
//   }
// });
