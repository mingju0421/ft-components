import Vue from 'vue'
import App from './components/calender/index'
import Moment from 'simple-time-mj'
import {Select, Popover} from 'element-ui'

Vue.use(Select)
Vue.use(Popover)
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$Moment = Moment

new Vue({
  render: h => h(App),
}).$mount('#app')
