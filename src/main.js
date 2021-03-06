import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import App from "./App.vue";
import router from "./router";
import store from "@/store/index";
// 导入element UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./icon"
import "./router/permit"
// import global from "./utils/global"
// Vue.use(global)
Vue.use(ElementUI);
Vue.use(VueCompositionApi);
// import 'normalize.css'
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
