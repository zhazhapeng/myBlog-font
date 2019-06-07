// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import axios from 'axios'
import App from './App'
import router from './router'


Vue.config.productionTip = false
Vue.use(VueResource)
Vue.prototype.$axios=axios;

//注册一个全局自定义指令
Vue.directive('rainbow',{
	bind:function(el,binding,vnode){
//		console.log(Math.random().toString().slice(3,9));
		el.style.color='#'+Math.random().toString().slice(2,8);
	}
})

Vue.directive('them',{
	bind:function(el,binding,vnode){
		if(binding.value=='wide'){
			el.style.maxWidth="1260px";
		}else if(binding.value=='narrow'){
			el.style.maxWidth='860px';
		}
	}
})

//过滤器
Vue.filter('to-uppercase',function(value){
	return value.toUpperCase();
})
Vue.filter('jiequ',function(value){
	return value.slice(0,100)+'...';
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
