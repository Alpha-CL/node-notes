///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';



import * as loginServ from "./service/loginService";


//-------------------------------------------------------------------------------------------------------------------//


store.dispatch("loginUser/whoAmI");         //在网站被访问时，需要用token去换取用户的身份


// loginServ.login('alpha', '666666')
// 	.then(resp => {
//
// 		console.log(resp);
// 	});


// loginServ
// 	.whoAmI()
// 	.then(resp => {
// 		console.log(resp);
// 	})
// 	.catch(err => {
// 		console.dir(err);
// 	});


//-------------------------------------------------------------------------------------------------------------------//


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
