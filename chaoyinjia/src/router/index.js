import Vue from 'vue'
import Router from 'vue-router'
import Center from '@/components/center'
import Card from '@/components/card'
import Details from '@/components/details'
import Schedule from '@/components/schedule'
import Personal from '@/components/personal'
import Redlining from '@/components/redlining'
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
      component: Card
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
      path: '/schedule',
      name: 'Schedule',
      component: Schedule
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
      path: '/redlining',
      name: 'Redlining',
      component: Redlining
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
        title: '邀请队员'   // 标题设置
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
        title: '银行卡'   // 标题设置
      }
    },
  ]
})
