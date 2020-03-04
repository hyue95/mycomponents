<template>
  <div>
    	<div id="wrap">
      <ul id="list">
      </ul>
      <div id="hour"></div>
      <div id="min"></div>
      <div id="sec"></div>
      <div class="ico"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Clock',
  mounted(){
    this.createClock()
    this.toTime()
    
  },
  methods: {
    createClock(){
      let oList = document.getElementById("list");
      let aLi = "";
      let sCss = "";
      for(let i = 0; i < 60; i ++)
      {
        aLi += `<li style="-webkit-transform:rotate(${i*6}deg);"></li>`
      }
      oList.innerHTML = aLi;
      window.setInterval(() => {
        try{
          this.toTime()
        }catch(e){
          
        }
      }, 1000)
    },
    toTime(){
      let oHour = document.getElementById("hour");
      let oMin = document.getElementById("min");
      let oSec = document.getElementById("sec");
      let oDate = new Date();
      let iSec = oDate.getSeconds();
      let iMin = oDate.getMinutes() + iSec / 60; // 分钟数 + 秒数
      let iHour = oDate.getHours() + iMin / 60;

      oSec.style.WebkitTransform = `rotate(${iSec * 6}deg)`;
      oMin.style.WebkitTransform = `rotate(${iMin * 6}deg)`;
      oHour.style.WebkitTransform = `rotate(${iHour * 30}deg)`;
    }
  }
}
</script>

<style>
  #wrap {
    width: 200px;
    height: 200px;
    border: 2px solid #000; 
    border-radius: 50%; 
    position: relative;
    }
	#wrap ul{
    margin: 0;
    padding: 0;
    height: 200px;  
    position: relative; 
    list-style:none;
    }
  #wrap ul li{
    width: 2px;
    height: 6px;
    background: #000; 
    position: absolute;
    left: 98px;
    top: 0;
    /* 选择ul的中心作为旋转基点 */
    -webkit-transform-origin: center 99px;
    }
  /* #wrap ul li:nth-of-type(2){ 
    -webkit-transform:rotate(6deg);
    }
	#wrap ul li:nth-of-type(3){ 
    -webkit-transform:rotate(12deg);
    } */
    /* 刻度 */
    #wrap ul li:nth-of-type(5n+1){ 
      height:12px;
      }
    /* 时针 */
    #hour{
      width: 6px;
      height: 45px;
      background: #000; 
      position: absolute;
      left: 97px;
      top: 55px;
      -webkit-transform-origin: bottom;
      }
    /* 分针 */
    #min{
      width: 4px;
      height :65px; 
      background:#999; 
      position: absolute;
      left: 98px;
      top: 35px;
      -webkit-transform-origin: bottom;
      }
    /* 秒针 */
    #sec{
      width: 2px;
      height: 80px;
      background: red; 
      position: absolute;
      left: 99px;
      top: 20px;
      -webkit-transform-origin: bottom;
      }
    /* 钟心 */
    .ico{
      width: 20px;
      height: 20px;
      background:#000; 
      border-radius: 50%; 
      position: absolute;
      left: 90px;
      top: 90px;
      }
</style>