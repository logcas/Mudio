import Vue from 'vue'
import Router from 'vue-router'
import Hello from './views/Hello.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: Hello,
    },
    {
      path: '/app',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
      children: [
        {
          path: '/',
          name: 'discovery',
          component: () => import('./views/Discovery.vue'),
        },
        {
          path: 'me',
          name: 'me',
          component: () => import('./views/Me.vue'),
        },
        {
          path: 'setting',
          name: 'setting',
          component: () => import('./views/Setting.vue'),
        }
      ]
    },
    {
      path: '/album/:uid',
      name: 'album',
      component: () => import('./views/AlbumDetail.vue'),
    },
    {
      path: '/songlist/:uid',
      name: 'songlist',
      component: () => import('./views/SongListDetail.vue'),
    },
    {
      path: '/player',
      name: 'player',
      component: () => import('./components/Player.vue'),
    }
  ]
})
