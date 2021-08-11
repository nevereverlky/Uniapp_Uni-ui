import Vue from 'vue'
import App from './App'
import request from './utils/request'

Vue.config.productionTip = false
//定义全局数据 通过vue的原型来实现
// Vue.prototype.baseURL="";>>>>this.baseURL取出
Vue.prototype.request=request;
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
