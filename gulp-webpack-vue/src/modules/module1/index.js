/**
 * Created by czzou on 2016/7/8.
 */
var Vue = require('vue');
var template=require('./module1.html');
// 定义组件
var comm = Vue.extend({
    template: template,
    data:function () {
        return {
            items:[{a:1,b:2,c:3},{a:4,b:5,c:5},{a:7,b:8,c:9}]
        }
    }
});
module.exports=comm;