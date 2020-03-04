<template>
  <div id="focus-map-3d">
    <div id="focus-map-3d-box">     
      <ul class="focus-map-3d-list" v-for="item in imgurl" :key="item"
      @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
      </ul>      
    </div>
    <!-- <input type="button" value="上一张" @click="last"/>
    <input type="button" value="下一张" @click="next"/> -->
  </div>
</template>

<script>
export default {
  name: "focusMap3d",
  data(){
    return {
      iCeils: 0,
      iRows: 0,
      aXy: [],
      num: 0,
      imgurl: [
        '/static/img/worldSite/2.jpg',
        '/static/img/worldSite/4.jpg',
        '/static/img/worldSite/7.jpg',
        '/static/img/worldSite/8.jpg',
        '/static/img/worldSite/9.png',
        '/static/img/worldSite/10.jpg',
        '/static/img/worldSite/11.jpg',
        '/static/img/worldSite/12.jpeg',
        '/static/img/worldSite/13.jpg',
      ],
      startX: 0,
      currentX: 0,
      itemWidth: 0
    }
  },
  mounted(){
    this.init()
  },
  methods: {
    setXy(obj, iCeils, iRows){
      let arr = [];
      for(let i = 0; i < iRows; i ++){
        let arr2 = [];
        for(let j = 0; j < iCeils; j ++){
          obj[i * iCeils + j].xIndex = j;
          obj[i * iCeils + j].yIndex = i;
          obj[i * iCeils + j].style.backgroundPosition = `${-j*this.itemWidth}px ${-i*40}px`;
          arr2.push(obj[i * iCeils + j]);
        }
        arr.push(arr2);
      }
      return arr;
    },
    init(){
      let oBox = document.querySelector("#focus-map-3d-box")
      let aList = document.querySelectorAll(".focus-map-3d-list");
      let oBtn = document.querySelectorAll("input");
      this.iCeils = Math.floor(oBox.clientWidth / (aList[0].children[0].offsetWidth));
      this.iRows = oBox.clientHeight / (aList[0].children[0].offsetHeight);
      this.itemWidth = aList[0].children[0].offsetWidth
      for(let i = 0; i < aList.length; i ++){
        aList[i].style.zIndex = aList.length - i;
        this.aXy.push(this.setXy(aList[i].children, this.iCeils, this.iRows));
      }
    },
    toTab(aXy, x, y, fn, iDelay, iDisX, iDisY){
      if(!aXy[y] || !aXy[y][x]){
        return;
      }
      if(fn){
        fn.call(aXy[y][x]);
        clearTimeout(aXy[y][x].timer);
        aXy[y][x].timer = setTimeout(() => {
          this.toTab(aXy, x+iDisX, y, fn, iDelay, iDisX, iDisY);
          this.toTab(aXy, x, y+iDisY, fn, iDelay, iDisX, iDisY);
        }, iDelay)
      }
    },
    displayBlock(){
      let oList = document.querySelector(".focus-map-3d-list");
      let aLi = oList.querySelectorAll("li");
      for(let i = 0; i < aLi.length; i ++){
        aLi[i].style.display = 'block'
      }
    },
    displayNone(){
      let oList = document.querySelector(".focus-map-3d-list");
      let aLi = oList.querySelectorAll("li");
      for(let i = 0; i < aLi.length; i ++){
        aLi[i].style.display = 'none'
      }
    },  
    next(){
      if(this.num < this.aXy.length-1){
        let aList = document.querySelectorAll(".focus-map-3d-list");
        
        this.toTab(this.aXy[this.num], this.iCeils-1, this.iRows-1, function(){
          this.style.transition = "1s background,.2s border,.3s .15s box-shadow,2s .3s -webkit-transform,2s .3s opacity"; 
          this.style.borderColor = "rgba(0,0,0,0.6)";
          this.style.boxShadow = "0 0 30px yellow";
          this.style.WebkitTransform = "translate(-50px,-150px) rotateX(-720deg) rotateY(-360deg)";
          this.style.opacity = 0;

          if(this.xIndex == 0 && this.yIndex == 0){
              setTimeout(() => {
                this.parentNode.style.visibility = "hidden"
              }, 2000)
          }
        }, 50, -1, -1);
        this.num ++ 
      }
    },
    last(){
      if(this.num > 0){
        this.num --
        let aList = document.querySelectorAll(".focus-map-3d-list");
        aList[this.num].style.visibility = "visible";

        this.toTab(this.aXy[this.num], 0, 0, function(){
          this.style.transition = "1s background, .2s border, .3s box-shadow, 1s -webkit-transform ease-in, 1s opacity ease-in"; 
          this.style.borderColor = "rgba(0,0,0,0)";
          this.style.boxShadow = "0 0 0 blue";
          this.style.WebkitTransform = "translate(0px,0px) rotateX(0deg) rotateY(0deg)";
          this.style.opacity = 1;
        }, 50, 1, 1);
      }
    },
    touchStart(e){
      this.startX = e.touches[0].pageX 
    },
    touchMove(e){
      this.currentX = e.touches[0].pageX 
    },
    touchEnd(){
      if(this.currentX - this.startX > 0){
        this.last()
      }else{
        this.next()
      }
    }
  }
}
</script>

<style>
  #focus-map-3d { 
    margin: 20px 0px; 
    height: 280px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  #focus-map-3d-box {
    width: 96%;
    height: 280px;
    margin: 5px 0px; 
    position: relative;
    }
  .focus-map-3d-list{ 
    width: 100%;
    height: 280px;  
    -webkit-perspective: 600px; 
    -webkit-transform-style: preserve-3d; 
    position: absolute;
    left: 0;
    top: 0;
    }
  .focus-map-3d-list li{ 
    width: 10%;
    height: 40px; 
    border: 1px solid rgba(0,0,0,0);
    float: left;
    box-shadow: 0 0 0 blue;
    background:url('/static/img/worldSite/2.jpg') no-repeat;
    }

  .focus-map-3d-list:nth-of-type(2) li{ 
    background:url('/static/img/worldSite/4.jpg') no-repeat;
    }
  .focus-map-3d-list:nth-of-type(3) li{ 
    background:url('/static/img/worldSite/7.jpg') no-repeat;
    }
  .focus-map-3d-list:nth-of-type(4) li{ 
    background:url('/static/img/worldSite/8.jpg') no-repeat;
    }
  .focus-map-3d-list:nth-of-type(5) li{ 
    background:url('/static/img/worldSite/9.png') no-repeat;
    }
  .focus-map-3d-list:nth-of-type(6) li{ 
    background:url('/static/img/worldSite/10.jpg') no-repeat;
    }
  .focus-map-3d-list:nth-of-type(7) li{ 
    background:url('/static/img/worldSite/11.jpg') no-repeat;
    }
  .focus-map-3d-list:nth-of-type(8) li{ 
    background:url('/static/img/worldSite/12.jpeg') no-repeat;
    }
  .focus-map-3d-list:nth-of-type(9) li{ 
    background:url('/static/img/worldSite/13.jpg') no-repeat;
    }
  /* #focus-map-3d input{ 
    width: 60px;
    height: 60px; 
    border-radius: 50%;
    } */
</style>