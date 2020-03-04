<template>
  <div id="dyn-paging" >
    <ul id="ul1-paging"></ul>
    <Page :settingData="opt" @resultData="resultData"></Page>
  </div>
</template>

<script>
import {startMove} from '@/assets/common/move.js'
import Page from "@/components/common/page/Page"
export default {
  name: "DynPaging",
  components: {
    Page
  },
  props:{
    
  },
  data(){
    return {
      json: {
        title:[
					'2_f.png',
          '2_h.png',
          '2_m.png',
          '2_t.png',
          'a_f.png',
          'a_h.png',
          'a_m.png',
          'a_t.png',
          'j_f.png',
          'j_h.png',
          'j_m.png',
          'j_t.png',
          'q_f.png',
          'q_h.png',
          'q_m.png',
          'q_t.png',
          'k_f.png',
          'k_h.png',
          'k_m.png',
          'k_t.png',
          'mouse.png',
          'ox.png',
          'tigger.png',
          'rabbit.png',
          'dragon.png',
          'snake.png',
          'horse.png',
          'sheep.png',
          'monkey.png',
          'rooster.png',
          'dog.png',
          'pig.png',
          'bing.png',
          'bing_hei.png',
          'che_h.png',
          'che_hei.png',
          'ma_h.png',
          'ma_hei.png',
          'pao_h.png',
          'pao_hei.png',
          'shi_h.png',
          'shi_hei.png',
          'xiang_h.png',
          'xiang_hei.png',
          'jiang.png',
          'shuai.png'
				]
      },
      arr: [],
      iNow: 9,
      now: 1,
      delay: 100,
      opt:{
        id: '#div1',
        nowNum: 3,
        allNum: this.allNUm,
        showNum: 3,
        callBack: (now, all) => {
          // console.log(`currentPage:${now}, pageNumber:${all}`)
        }
      },
      parameter:{}
    }
  },
  mounted(){
    this.createPage() //创建页面
    
  },
  computed: {
    allNUm(){
      return Math.ceil(this.json.title.length / 10)
    }
  },
  methods: {
    resultData(e){  //这里类似于onclick事件
      this.parameter = e
      this.dynmamicPaging(this.parameter)
    },
    createPage(){
      let oUl = document.querySelector('#ul1-paging')
      let len = this.json.title.length
      let num = this.now * 10 < len ? 10 : len - (this.now - 1) * 10

      for(let i = 0; i < num; i ++){
        let oLi = document.createElement('li');
        let oImg = document.createElement('img')
        oImg.src = `/static/img/dynpaging/${this.json.title[(this.now - 1) * 10 + i]}`;
        oLi.appendChild(oImg)
        oUl.appendChild(oLi);
      }
      let aLi = oUl.getElementsByTagName('li');
      //记录每个元素的位置
      for(let i = 0; i < aLi.length; i ++){
        this.arr.push([aLi[i].offsetLeft, aLi[i].offsetTop])
      }
      //给每个元素加定位
      for(let i = 0; i < aLi.length; i ++){
        aLi[i].style.position = 'absolute'; 
        aLi[i].style.left = this.arr[i][0] + 'px';
        aLi[i].style.top = this.arr[i][1] + 'px';
        aLi[i].style.margin = 0;  //去除原先的margin，否则在定位的基础上加上margin，位置会出错         
      }
    },
    dynmamicPaging(settingData){
      this.now = settingData.currentPage  

      let len = this.json.title.length
      let num = this.now * 10 < len ? 10 : len - (this.now - 1) * 10
      let oUl = document.querySelector('#ul1-paging')
      let aLi = oUl.getElementsByTagName('li');  
      // console.log(num, this.now)     
      let timer = setInterval(() => {
          startMove(aLi[this.iNow],{left: 200, top: 300,opacity: 0})					
          if(this.iNow == 0){
            clearInterval(timer);
            this.iNow = num - 1;
            for(let i = 0; i < num; i ++){
              let oImg = aLi[i].getElementsByTagName('img')[0]
              // oImg.setAttribute('src', `/static/img/dynpaging/${this.json.title[(this.now - 1) * 10 + i]}`)
                oImg.src = `/static/img/dynpaging/${this.json.title[(this.now - 1) * 10 + i]}`
              if(!this.json.title[(this.now - 1) * 10 + i]){
                aLi[i].style.display = 'none'
              }
            }
            let timer2 = setInterval(() => {
              startMove(aLi[this.iNow], {left: this.arr[this.iNow][0], top: this.arr[this.iNow][1], opacity: 100})           
              if(this.iNow == 0){
                clearInterval(timer2);
                this.iNow = num - 1;                  
              }else{
                this.iNow --;
              }
            }, this.delay)
          }else{
            this.iNow --
          }												
        }, this.delay)
        // if(this.now * 10 < len) this.now ++ 

    }
  }
}
</script>

<style>
    #dyn-paging {
      margin:0 3px;
      width: 100%;
    }
    #ul1-paging {
      width: 100%;
      height: 200px;
      }
		#ul1-paging li{
      width: 15%;
      height: 80px;
      /* border: 1px solid #666; */
      float: left;
      overflow: hidden;
      margin: 8px;
      }
    #ul1-paging li img{
      width: 100%;
      height: 100%;
      }

</style>