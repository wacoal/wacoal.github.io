


// registration
//Vue.component('text-test', textTest);



// root instance
var app = new Vue({
    el: '#app',
    data: {
        partterns: [ 0, 0, 0, 0 ]
    },
    components: {
        'pattern-component': patternComponent,
        'text-test': textTest
    }
});

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
