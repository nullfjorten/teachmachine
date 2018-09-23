import Vue from 'vue'
import Router from 'vue-router'

import Course from '@/components/Course'
import CourseModule from '@/components/CourseModule'
import ArithmeticTasks from '@/components/ArithmeticTasks'
import NynorskTasksHouseTypesOrderBySize from '@/components/NynorskTasksHouseTypesOrderBySize'
import NynorskTasksNumbersOrderBySize from '@/components/NynorskTasksNumbersOrderBySize'
import Home from '@/components/Home'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'ArithmeticTasks',
      component: ArithmeticTasks
    },
    {
        path: '/arithmetic',
        name: 'ArithmeticTasks',
        component: ArithmeticTasks
    },
    {
      path: '/nynorsk',
      name: 'NynorskTasks',
      component: NynorskTasksHouseTypesOrderBySize
    },
    {
        path: '/nynorsktall',
        name: 'NynorskTasksTall',
        component: NynorskTasksNumbersOrderBySize
    },
    /*{
      path: '/',
      name: 'Home',
      component: Home
    }*/

  ]
})
