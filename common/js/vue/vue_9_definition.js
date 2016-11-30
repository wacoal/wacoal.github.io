// definition


var patternComponent = Vue.extend({
    // data: function(){
    //     return {
    //         list: ["A", "B", "C", "D"]
    //     }
    // },
    //props: [ 'pattern' ],
    template: '<div>A custom ffff!</div>'
});
var textTest = Vue.extend({
    template: '<div>A custom component!</div>'
});


var profText64Component = Vue.extend({
    data: {
      newEvent: {
        name: '',
      },
    },
    methods: {
        onBlur: function(e){
          console.log(this.pattern);
            this.pattern++;
            if(this.pattern >= this.list.length){
                this.pattern = 0;
            }
        },
        onKeyup: function(){
            console.log("te");
        }
    },
    computed: {
        // mark : function(){
        //     return this.list[this.pattern];
        // },
    },
    //template: '<li @click="change">{{mark}}</li>'
    //template: '<input type="text" name="name" @blur="onBlur" @keyup="onKeyup" size="40" data-maxlength="10" value="" placeholder="名前を入力してください" class="form-control__item js_input">'
});
