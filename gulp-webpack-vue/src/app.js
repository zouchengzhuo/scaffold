/**
 * Created by czzou on 2016/7/7.
 */
var Vue = require('vue')
var VueRouter = require('vue-router');
Vue.use(VueRouter);
var compo1=require('./modules/module1');
require('./css/main.css');

// 路由器需要一个根组件。
// 出于演示的目的，这里使用一个空的组件，直接使用 HTML 作为应用的模板
var App = Vue.extend({})

// 创建一个路由器实例
// 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置
var router = new VueRouter()

// 定义路由规则
// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
// 创建的组件构造函数，也可以是一个组件选项对象。
// 稍后我们会讲解嵌套路由
router.map({
    '/': {
        component: compo1
    },
    '/path1': {
        component: compo1
    },
    '/path2': {
        component: function (resolve) {
            //amd规范 实现效果：
            //路由1中的模块和主页面模块打包在一起
            //路由2中的模块按需加载
            require(['./modules/module2'],resolve);
            //commonJs规范实现方式:
            //require.ensure([],function(require){
            //    var comm2=require('./components/compo2');
            //    resolve(comm2)
            //});
        }
    }
});
//默认路径
//router.go('/path1');
// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(App, '#app')
