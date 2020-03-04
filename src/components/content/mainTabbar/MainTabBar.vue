<template>
  <div id="main-tab-bar">
    <TabBar>
      <TabBarItem activeColor="blueviolet" path="/home">
        <img src="@/assets/img/tabbar/home.png" slot="item-icon"/>
        <img src="@/assets/img/tabbar/home_hover.png" slot="item-icon-active"/>
        <div slot="item-text">首页</div>
      </TabBarItem>
      <TabBarItem activeColor="blueviolet" path="/show"> 
        <img src="@/assets/img/tabbar/show.png" slot="item-icon"/>
        <img src="@/assets/img/tabbar/show_hover.png" slot="item-icon-active"/>
        <div slot="item-text">展示</div>
      </TabBarItem>
      <TabBarItem activeColor="blueviolet" path="/games">
        <img src="@/assets/img/tabbar/games.png" slot="item-icon"/>
        <img src="@/assets/img/tabbar/games_hover.png" slot="item-icon-active"/>
        <div slot="item-text">娱乐</div>
      </TabBarItem>
      <TabBarItem activeColor="blueviolet" path="/messageboard">
        <img src="@/assets/img/tabbar/message.png" slot="item-icon"/>
        <img src="@/assets/img/tabbar/message_hover.png" slot="item-icon-active"/>
        <div slot="item-text">消息</div>
      </TabBarItem>
      <!-- <TabBarItem activeColor="blueviolet" path="/profile">
        <img src="@/assets/img/tabbar/profile.png" slot="item-icon"/>
        <img src="@/assets/img/tabbar/profile_hover.png" slot="item-icon-active"/>
        <div slot="item-text">我的</div>
      </TabBarItem> -->
    </TabBar>
  </div>
</template>

<script>
import TabBar from '@/components/common/tabbar/TabBar'
import TabBarItem from '@/components/common/tabbar/TabBarItem'
export default {
  name: 'MainTabBar',
  components:{
    TabBar,
    TabBarItem
  },
  data(){
    return {

    }
  },
  mounted(){

  }
}
</script>

<style>

</style>