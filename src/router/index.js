import Vue from 'vue'
import Router from 'vue-router'

const Games = () => import('../views/games/Games') 
const MessageBoard = () => import('../views/messageBoard/MessageBoard') 
const Profile = () => import('../views/profile/Profile') 
const Show = () => import('../views/show/Show')
const Home = () => import('../views/home/Home')

Vue.use(Router)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/show',
    component: Show
  },
  {
    path: '/games',
    component: Games
  },
  {
    path: '/messageboard',
    component: MessageBoard
  },
  {
    path: '/profile',
    component: Profile
  }
]
/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export default new Router({
  routes,
  mode: 'history'
})
