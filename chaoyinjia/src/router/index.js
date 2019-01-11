import Vue from 'vue'
import Router from 'vue-router'
import Center from '@/components/center'
import Card from '@/components/card'
import Details from '@/components/details'
import Schedule from '@/components/schedule'
import Personal from '@/components/personal'
import Deposit from '@/components/deposit'
import Message from '@/components/message'
import Closing from '@/components/closing'
import Group from '@/components/group'
import Minute from '@/components/minute'
import Invited from '@/components/invited'
import Promote from '@/components/promote'
import Registercard from '@/components/registercard'
import Been from '@/components/been'
import Invit from '@/components/invit'
import Blankmain from '@/components/blankmain'
import SchCenter from '@/components/schCenter'
import Apply from '@/components/apply'
import Recommend from '@/components/recommend'
import Reg from '@/components/reg'
import Recommain from '@/components/recommain'
import Blanklogo from '@/components/blanklogo'
import Mustsee from '@/components/mustsee'
import Handbook from '@/components/handbook'
import Incetext from '@/components/incetext'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Personal',
      component: Personal,
      meta: {
            title: '芝麻银家'   // 标题设置
      }
    },
    {
      path: '/card',
      name: 'Card',
      component: Card,
      meta: {
            title: '推荐办卡'   // 标题设置
      }
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend,
      meta: {
            title: '我要办卡'   // 标题设置
      }
    },
    {
      path: '/center',
      name: 'Center',
      component: Center,
      meta: {
            title: '完善资料'   // 标题设置
      }
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg,
      meta: {
            title: '完善资料'   // 标题设置
      }
    },
    {
      path: '/schedule',
      name: 'Schedule',
      component: Schedule,
      meta:{
        title:'进度查询'
      }
    },
    {
      path: '/schCenter',
      name: 'SchCenter',
      component: SchCenter,
      meta:{
        title:'进度查询'
      }
    },
    {
      path: '/details',
      name: 'Details',
      component: Details,
      meta: {
        title: '订单明细'   // 标题设置
      }
    },
    {
      path: '/deposit',
      name: 'Deposit',
      component: Deposit,
      meta: {
        title: '收入明细'   // 标题设置
      }
    },
    {
      path: '/message',
      name: 'Message',
      component: Message,
      meta: {
        title: '系统通知'   // 标题设置
      }
    },
    {
      path: '/closing',
      name: 'Closing',
      component: Closing,
      meta: {
        title: '结算'   // 标题设置
      }
    },
    {
      path: '/group',
      name: 'Group',
      component: Group,
      meta: {
        title: '我的团队'   // 标题设置
      }
    },
    {
      path: '/minute',
      name: 'Minute',
      component: Minute,
      meta: {
        title: '消息通知'   // 标题设置
      }
    },
    {
      path: '/invited',
      name: 'Invited',
      component: Invited,
      meta: {
        title: '邀请队员'   // 标题设置
      }
    },
    {
      path: '/promote',
      name: 'Promote',
      component: Promote,
      meta: {
        title: '推广海报'   // 标题设置
      }
    },
    {
      path: '/registercard',
      name: 'Registercard',
      component: Registercard,
      meta: {
        title: '推荐办卡'   // 标题设置
      }
    },
    {
      path: '/been',
      name: 'Been',
      component: Been,
      meta: {
        title: '关注页面'   // 标题设置
      }
    },
    {
      path: '/invit',
      name: 'Invit',
      component: Invit,
      meta: {
        title: '加入芝麻银家'   // 标题设置
      }
    },
    {
      path: '/blankmain',
      name: 'Blankmain',
      component: Blankmain,
      meta: {
        title: '信用卡介绍'   // 标题设置
      }
    },
    {
      path: '/recommain',
      name: 'Recommain',
      component: Recommain,
      meta: {
        title: '信用卡介绍'   // 标题设置
      }
    },
    {
      path: '/apply',
      name: 'Apply',
      component: Apply,
      meta: {
        title: '申请人信息'   // 标题设置
      }
    },
    {
      path: '/blanklogo',
      name: 'Blanklogo',
      component: Blanklogo,
      meta: {
        title: '推荐信用卡'   // 标题设置
      }
    },
    {
      path: '/mustsee',
      name: 'Mustsee',
      component: Mustsee,
      meta: {
        title: '必看课程'   // 标题设置
      }
    },

    {
      path: '/handbook',
      name: 'Handbook',
      component: Handbook,
      meta: {
        title: '操作指南'   // 标题设置
      }
    },
    {
      path: '/incetext',
      name: 'Incetext',
      component: Incetext,
      meta: {
        title: '操作指南'   // 标题设置
      }
    },
  ]
})
