<template>
  <div id="focus-map">
    <div id="focus-box">
      <ul>
        <li v-for="(item,index) in imgurl" :key="item" @touchstart="touchStart(index)" @touchend="touchEnd">
          <img :src="item" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {startMove} from '@/assets/common/move.js'
export default {
  name: "focusMap",
  props: {
    imgurl: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      aLilen: 0,
      ulWidth: 0,
      len: 0,
      timer: null,
      num: 0
    }
  },
  mounted(){
    this.focusMap()
  },
  methods: {
    focusMap(){
      let oUl = document.querySelector('ul')
      let aLi = oUl.querySelectorAll('li')
      this.ulWidth = oUl.offsetWidth
      this.aLilen = aLi.length
      this.len = Math.ceil(this.ulWidth / this.aLilen)

      for(let i = 0; i < this.aLilen; i ++){
        aLi[i].style.left = this.len * i + 'px';
      }

    },
    touchStart(value){
      let oUl = document.querySelector('ul')
      let aLi = oUl.querySelectorAll('li')
      for(let i = 0; i < this.aLilen; i ++){
				if( i <= value ){
					startMove( aLi[i], {left : i * 20} );
				}
				else{
					startMove( aLi[i], {left : (this.ulWidth - 80) + (i - 1) * 20} );
				}
			}
    },
    touchEnd(){
      // setTimeout(() => {
        let oUl = document.querySelector('ul')
        let aLi = oUl.querySelectorAll('li')
        for(let i = 0; i < this.aLilen; i ++){
          startMove(aLi[i], {left: this.len * i});
        }
      // }, 500)
    }
 
  }
}
</script>

<style>
  li{
    list-style: none;
  }
  #focus-box { 
    margin: 40px 0px; 
    height: 230px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  #focus-box ul {
    width: 96%;
    position: relative;
    overflow: hidden;
    height: 100%;
  }
  #focus-box ul li { 
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    transition: 0.1s left;
  }
  #focus-box ul li img{
    width: 100%;
    height: 100%;
  }
</style>