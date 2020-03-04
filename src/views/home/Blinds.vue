<template>
  <div id="blinds">
    <ul id="ul1">
      <li v-for="(item1,index1) in content1" :key="index1">
        <div>
          <p v-for="value1 in item1" :key="value1">{{value1}}</p>
        </div>
      </li>
    </ul>
    <ul id="ul2">
      <li v-for="(item2,index2) in content2" :key="index2">
        <div>
          <p v-for="value2 in item2" :key="value2">{{value2}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {startMove} from '@/assets/common/move.js'
export default {
  name: 'Blinds',
  data(){
    return {
      content1: [
        [
          111111111,
          222222222
        ],
        [
          333333333,
          444444444
        ],
        [
          555555555,
          666666666
        ],
        [
          777777777,
          888888888
        ]
      ],
      content2: [
        [
          'aaaaaaaaa',
          'bbbbbbbbb'
        ],
        [
          'ccccccccc',
          'ddddddddd'
        ],
        [
          'eeeeeeeee',
          'fffffffff'
        ],
        [
          'ggggggggg',
          'hhhhhhhhh'
        ]
      ],
      delay: 2000,
      interval: 4000,
      timeDifference: 100
    }
  },
  methods: {
    toShow(obj){
      let aDiv = obj.querySelectorAll('div')
      let iNow = 0
      let timer = null
      let onoff = true

      window.setInterval(() => {
        timer = window.setInterval(() => {
          if(iNow == aDiv.length){
            clearInterval(timer);
            iNow = 0;
            onoff = !onoff; //控制每一次滑动的方向
          }else{
            startMove(aDiv[iNow],{top:onoff == true ? 0 : -30});
            iNow ++;
          }		
        }, this.timeDifference) //每一行滑动之间的间隔时间
      }, this.interval)
      
    }
  },
  mounted(){
    let oUl1 = document.querySelector('#ul1')
    let oUl2 = document.querySelector('#ul2')

    this.toShow(oUl1)
    window.setTimeout(() => {
      this.toShow(oUl2)
    }, this.delay) 
  }
}
</script>

<style>
  #blinds{
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  #ul1,#ul2{
    width: 300px;
    height: auto;
    border-top: 1px solid #000;
    margin: 20px;
  }
  li{
    list-style: none;
    width: 100%;
    height: 30px;
    overflow: hidden;
    position: relative;
    border-bottom: 1px dashed #333;
    line-height: 30px;
    display: flex;
    justify-content: center;
  }
  li div{
    position: absolute;
    top: -30px;
  }
	li div p{
    height: 30px;
    text-align: center;
  }
</style>