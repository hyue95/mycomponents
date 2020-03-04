<template>
  <div id="games">
    <Clock id="clock"></Clock>
    <div id="face">
      <div id="left-eye"></div>
      <div id="right-eye"></div>
    </div>
    <img :src="imgSrc" id="img1" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"/>
  </div>
</template>

<script>
import Clock from '@/components/common/clock/Clock'
export default {
  name: "Games",
  data(){
    return {
      imgSrc: "/static/img/basketball/basketball.jpg",
      disX: 0,
      disY: 0,
      prevX: 0,
      prevY: 0,
      iSpeedX: 0,
      iSpeedY: 0,
      timer: null,
      r: 25,
      leftEyeL: 60,
      leftEyeT: 60,
      rightEyeL: 140,
      rightEyeT: 60
    }
  },
  components: {
    Clock
  },
  mounted(){
    this.throwBall()
    this.eyeChange()
  },
  methods: {
    throwBall(){
      let oImg = document.querySelector('#img1')
      //将球移至中间处且变成无
      oImg.style.width = 0;
      oImg.style.height = 0;
      oImg.style.left = document.documentElement.clientWidth/2 + 'px';
      oImg.style.top = (document.documentElement.clientHeight - 50)/2 + 'px';

      //球的动态出现
      this.toChange(oImg, 150)
    },
    toChange(obj, target){
      let offsetL = obj.offsetLeft;
      let offsetT = obj.offsetTop;
      
      this.timer = setInterval(() =>{       
        if(obj.offsetWidth == target){
          clearInterval(this.timer);
          this.startMove(obj);
        }
        else{
          //球的宽度，高度每次加 10
          obj.style.width = obj.offsetWidth + 10 + 'px';
          obj.style.height = obj.offsetHeight + 10 + 'px';
          //球的位置每次向左，向上偏移此时宽高的一半
          obj.style.left = offsetL - obj.offsetWidth/2 + 'px';
          obj.style.top = offsetT - obj.offsetHeight/2 + 'px';
        }        
      },30);
    },
    startMove(obj){
      let oDivLeft = document.getElementById('left-eye');
      let oDivRight = document.getElementById('right-eye');
      clearInterval(this.timer); //防抖
      this.timer = setInterval(() =>{       
          this.iSpeedY += 3;  //任何时刻都存在自由落体速度         
          let L = obj.offsetLeft + this.iSpeedX; //当前位置L
          let T = obj.offsetTop + this.iSpeedY; //当前位置T
          
          //此时撞到左边墙壁了
          if(L < 0){
            L = 0;  //不让球出左边
            this.iSpeedX *= -1; //反向
            this.iSpeedX *= 0.75; //碰撞减速
          }
          //此时撞到右边墙壁了
          else if(L > document.documentElement.clientWidth - obj.offsetWidth){
            L = document.documentElement.clientWidth - obj.offsetWidth; //不让球出右边
            this.iSpeedX *= -1;  //反向
            this.iSpeedX *= 0.75;  //碰撞减速
          }
          //此时撞到下边墙壁了
          if(T < 0){
            T = 0;
            this.iSpeedY *= -1;
            this.iSpeedY *= 0.75;
          }
          //此时撞到上边墙壁了(这里要除去tabbar的高度)
          else if(T > document.documentElement.clientHeight - obj.offsetHeight - 50){
            T = document.documentElement.clientHeight - obj.offsetHeight - 50;
            this.iSpeedY *= -1;
            this.iSpeedY *= 0.75;
            this.iSpeedX *= 0.75; //擦到地，也让球水平方向减速
          }

          obj.style.left = L + 'px';
          obj.style.top = T + 'px';

          //让眼睛跟着动
          this.eyeMove(oDivLeft, L, T, this.leftEyeL, this.leftEyeT)
          this.eyeMove(oDivRight, L, T, this.rightEyeL, this.rightEyeT)         
        },30);
      
      },
      touchStart(ev){
        clearInterval(this.timer)
        let oImg = document.querySelector('#img1')
        this.disX = ev.touches[0].pageX  - oImg.offsetLeft; //记录此时与球的相对位置
        this.disY = ev.touches[0].pageY  - oImg.offsetTop;
        //记录上一次位置
        this.prevX = ev.touches[0].pageX ;
        this.prevY = ev.touches[0].pageY;
 
        //让钟消失
        let clockChange = document.querySelector('#clock')
        clockChange.style.display = "none"
      },
      touchMove(ev){
        let oImg = document.querySelector('#img1')
        oImg.style.left = ev.touches[0].pageX  - this.disX + 'px';
        oImg.style.top = ev.touches[0].pageY - this.disY + 'px';
        //算出出手时的速度
        this.iSpeedX = ev.touches[0].pageX - this.prevX;
        this.iSpeedY = ev.touches[0].pageY - this.prevY;
        //记录上一次的位置
        this.prevX = ev.touches[0].pageX;
        this.prevY = ev.touches[0].pageY;
      },
      touchEnd(){
        let oImg = document.querySelector('#img1')
        this.startMove(oImg)
        // this.rotateBall(oImg)
      },
      // rotateBall(obj){ //图片的球不够圆
      //   //球旋转快慢由this.speedX决定
      //   let rotateTimer = window.setInterval(() => {
      //     if(this.iSpeedX === 0) clearInterval(rotateTimer)
      //     obj.style.webkitTransform = `rotateZ(${this.iSpeedX * 10}deg)`
      //   }, 50)
      // }
      eyeChange(){
        let oDiv = document.getElementById('face')
        let oImg = document.querySelector('#img1')
        let oDivLeft = document.getElementById('left-eye');
        let oDivRight = document.getElementById('right-eye');
        let initLeft = (document.documentElement.clientWidth - oDiv.offsetWidth) / 2
        let initTop = document.documentElement.clientHeight - oImg.offsetHeight

        this.eyeMove(oDivLeft, initLeft, initTop, this.leftEyeL, this.leftEyeT)
        this.eyeMove(oDivRight, initLeft, initTop, this.rightEyeL, this.rightEyeT)
      },
      eyeMove(obj, x, y, l, t){
        let changeX = 0
        let changeY = 0
        let b = Math.abs( x - (obj.offsetLeft + obj.parentNode.offsetLeft) );
        let a = Math.abs( y - (obj.offsetTop + obj.parentNode.offsetTop) );
        
        if( x > obj.offsetLeft + obj.parentNode.offsetLeft && y < obj.offsetTop + obj.parentNode.offsetTop ){   //右下       
          changeX = Math.sin(Math.atan(b/a)) * this.r;
          changeY = Math.cos(Math.atan(b/a)) * -this.r;
        }
        else if(x > obj.offsetLeft + obj.parentNode.offsetLeft && y > obj.offsetTop + obj.parentNode.offsetTop){   //右上
          changeX = Math.sin(Math.atan(b/a)) * this.r;
          changeY = Math.cos(Math.atan(b/a)) * this.r; 
        }
        else if(x < obj.offsetLeft + obj.parentNode.offsetLeft && y > obj.offsetTop + obj.parentNode.offsetTop){   //左上
          changeX = Math.sin(Math.atan(b/a)) * -this.r;
          changeY = Math.cos(Math.atan(b/a)) * this.r;
        }
        else if(x < obj.offsetLeft + obj.parentNode.offsetLeft && y < obj.offsetTop + obj.parentNode.offsetTop){   //左下
          changeX = Math.sin(Math.atan(b/a)) * -this.r;
          changeY = Math.cos(Math.atan(b/a)) * -this.r;
        }
        obj.style.left = l + changeX + 'px';
        obj.style.top = t + changeY + 'px';
      }
  }
}
</script>

<style>
  #games{
    width: 100%;
    position: relative;
  }
  #clock{
    position: absolute;
    /* left: 110px;
    top: -100px; */
    left: 22%;
    /* top: -15%; */

  }
  #img1 {
    position: absolute;
    /* width: 100px;
    height: 100px; */
  }
  #face {
    width: 210px; 
    height: 120px; 
    background: url(/static/img/eye/eye.png) no-repeat; 
    background-size:100% 100%;
    -moz-background-size:100% 100%;  
    position: absolute; 
    left: 22%; 
    top: 200px;
    z-index: 3;
  }
  #left-eye {
    border: 8px #000 solid; 
    position: absolute; 
    left: 60px; 
    top: 50%; 
    border-radius:50%
  }
  #right-eye {
    border: 8px #000 solid; 
    position: absolute; 
    left: 140px; 
    top: 50%; 
    border-radius:50%
  }
</style>