<template>
  <div id="home">
     <Swiper>
       <SwiperItem v-for="item in banners" :key="item">
         <img :src="item"/>
       </SwiperItem>
      </Swiper>
      <DynPaging></DynPaging>
     <!-- <Blinds></Blinds> -->
  </div>
</template>

<script>
import {Swiper, SwiperItem} from "@/components/common/swiper"
import DynPaging from "@/components/common/page/DynPaging"
// import Blinds from './Blinds'
export default {
  name: "Home",
  components: {
    Swiper,
    SwiperItem,
    // Blinds,
    DynPaging,
  },
  data(){
    return {
      banners: [
        '/static/img/focusMap/1.png',
        '/static/img/focusMap/2.jpg',
        '/static/img/focusMap/3.jpg',
        '/static/img/focusMap/4.jpg',
        '/static/img/focusMap/5.jpg'
        ]
    }
  },

}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#home {
  display: flex;
  flex-wrap: wrap;
}
</style>