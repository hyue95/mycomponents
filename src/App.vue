<template>
  <div id="app">
    


    <MainTabBar></MainTabBar>
    <router-view/>
  </div>
</template>

<script>
import Home from './views/home/Home'
import MainTabBar from './components/content/mainTabbar/MainTabBar'
export default {
  name: 'App',
  components:{
    Home,
    MainTabBar,

  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
