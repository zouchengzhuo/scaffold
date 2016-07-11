/**
 * Created by czzou on 2016/7/8.
 */
var Vue = require('vue');
//用这种方式，模块2和模块2.1就会被打包到一起
//var sub_com=require('./sub_com.js');
// 定义组件
var com = Vue.extend({
    template: '<p class="compo2">组件二</p><sub-com></sub-com>',
    //异步的延时模块，用这种方式，模块2和模块2.1会被分开打包
    components: {
        'sub-com': function (resolve) {
            setTimeout(function(){
                require(['./sub_modules/sub_module.js'], resolve)
            },2000);
        }
    }
});
module.exports=com;
