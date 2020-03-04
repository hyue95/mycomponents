<template>
  <div id="paperFolding2">
    <button @click="btn1">hiding</button>
    <button @click="btn2">showing</button>
    <div class="wrap">
      <h2></h2>
      <div>
        <span id="title">
          <span v-for="(item, index) in title" :key="item" @click="choose(index)" :class="{active: index == isActive}">
            {{item}}
          </span>
        </span>
        <div>
          <span>
            <p>确诊   {{yiQingData[isActive+1].total.confirm}}</p><p v-show="yiQingData[isActive+1].today.confirm">较昨日   {{yiQingData[isActive+1].today.confirm}}</p></span>
          <div>
            <span><p>死亡   {{yiQingData[isActive+1].total.dead}}</p><p v-show="yiQingData[isActive+1].today.dead">较昨日   {{yiQingData[isActive+1].today.dead}}</p></span>
            <div>
              <span><p>治愈   {{yiQingData[isActive+1].total.heal}}</p><p v-show="yiQingData[isActive+1].today.heal">较昨日   {{yiQingData[isActive+1].today.heal}}</p></span>
              <div>
                <span><p>疑似   {{yiQingData[isActive+1].total.suspect}}</p><p v-show="yiQingData[isActive+1].today.suspect">较昨日   {{yiQingData[isActive+1].today.suspect}}</p></span>
                <div>
                  <span></span>
                  <div>
                    <span></span>
                    <div>
                      <span id="tip">数据最后更新时间:{{yiQingData[0].lastUpdateTime}}</span>       
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="bgimg"></div>
    <!-- <div>{{yiQingData}}</div> -->
  </div>
</template>

<script>
// import Clock from '@/components/common/clock/Clock'
export default {
  name: 'PaperFolding2',
  props: {
    yiQingData: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      title: ['全国', '广东', '揭阳'],
      isActive: 0,
    }
  },
  components: {

  },
  computed: {
 
  },
  mounted(){

  },
  methods: {
    btn1(){
      let oDiv = document.querySelector('.wrap')
      let aDiv = oDiv.querySelectorAll('div')
      let timer = null
      let num = aDiv.length - 1

      clearInterval(timer)  //防抖
      timer = setInterval(() => {
        aDiv[num].className = ''
        num --
        if(num < 0){
          clearInterval(timer)
        }
      }, 50)

    },
    btn2(){
      let oDiv = document.querySelector('.wrap')
      let aDiv = oDiv.querySelectorAll('div')
      let timer = null
      let num = 0 

      clearInterval(timer)  //防抖
      timer = setInterval(() => {
        aDiv[num].className = 'open'
        num ++
        if(num > aDiv.length - 1){
          clearInterval(timer)
        }
      }, 50)
    },
    choose(index){
      this.isActive = index
    }
  }
}
</script>

<style>
  @-webkit-keyframes open{
    0% {
		-webkit-transform:rotateX(-120deg);
	  }	
    40% {
      -webkit-transform:rotateX(20deg);
    }
    60% {
      -webkit-transform:rotateX(-10deg);
    }
    80% {
      -webkit-transform:rotateX(5deg);
    }
    100% {
      -webkit-transform:rotateX(0deg);
    }
  }
  button {
    margin: 8px;
    width: 100px;
    height:30px;
  }
  .wrap {
    /* margin: 30px auto; */
    width: 300px;
    -webkit-perspective: 800px;
    /* -webkit-transform-style: preserve-3d;  */
    position: relative;
  }
  .wrap h2 { 
    height: 100px;
    width: 360px;
    background:url('/static/img/message/1.jpg') no-repeat;
    background-size: 100% 100%;
    text-align: center; 
    font: 16px/50px "微软雅黑"; 
    color:#fff; 
    position: relative;
    z-index: 9;
    }
  .wrap div { 
    /* 这里可以使最上面的位置空出来，否则第一个span会被挡住 */
    position: absolute;
    /* 利用定位可以使div之间有间隔 */
    top: 52px;
    left: 0;
    -webkit-transform-style: preserve-3d; 
    -webkit-transform-origin: top;
    -webkit-transform: rotateX(-120deg); 
    transition: .5s;
  }
  .wrap>div { 
    top: 100px;
  }
  .wrap .open {
    -webkit-animation: open 2s;
    -webkit-transform: rotateX(0deg);
  }
  .wrap span { 
    display: inline-block;
    width: 360px;
    height: 50px; 
    font: 20px/50px "微软雅黑"; 
    background: red; 
    text-indent: 15px; 
    color: #fff; 
    transition: .5s; 
    /* box-shadow: inset 0 0 30px 20px rgba(0,0,0,1); */
  }
  .wrap p{
    display: inline;
    margin: 0 20px;
  }
  .wrap .open>span {
    box-shadow:inset 0 0 30px 10px rgba(0,0,0,0);
  }
  /* .wrap span:active{ 
    background:#FF0;
    text-indent: 30px;
  } */
  #bgimg {
    height: 416px;
    width: 360px;
    /* margin: -50px auto; */
    background: url('/static/img/message/1.jpeg') no-repeat;
    background-size: 100% 100%;
  }
  #title{
    display: flex;
    text-align: center;
  }
  #title span{
    background: gray;
  }
  #tip{
    font: 14px/50px "宋体"; 
    text-indent: 100px;
  }
  .active{
    background: red !important;
  }
</style>