import Vue from 'vue'
import Router from 'vue-router'
import Form from '@/components/form'

Vue.use(Router)

export default new Router({
	linkActiveClass: 'active',
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'form',
      component: Form
    }
  ]
})
