<template>
  <div id="show">
    <FocusMap :imgurl="imgurl"></FocusMap>
    <FocusMap3d></FocusMap3d>
  </div>
</template>

<script>
import FocusMap from "@/components/common/focusMap/FocusMap"
import FocusMap3d from "@/components/common/focusMap3d/FocusMap3d"
export default {
  name: "show",
  components: {
    FocusMap,
    // DynPaging
    FocusMap3d
  },
  data(){
    return {
      imgurl: [
      '/static/img/focusMap/8.jpg',
      '/static/img/focusMap/12.jpeg',
      '/static/img/focusMap/7.jpg',
      '/static/img/focusMap/10.jpg',
      '/static/img/focusMap/6.jpg'
      ]
    }
    
  },
  methods: {
    
  }
}
</script>

<style>
  #show{
    /* display: flex;
    flex-wrap: wrap; */
    width: 100%;
  }
</style>