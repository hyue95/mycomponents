<template>
  <div id="hy-box">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount>1">
        <div v-for="(item, index) in slideCount" class="indi-item" :class="{active: index === currentIndex-1}" :key="index"></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    interval: {
      type: Number,
      default: 3000
    },
    animDuration: {
      type: Number,
      default: 300
    },
    moveRatio: {
      type: Number,
      default: 0.25
    },
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return {
      slideCount: 0,  //元素的个数
      totalWidth: 0,  //swiper的宽度
      swiperStyle: {},  //swiper的样式
      currentIndex: 1,  //当前第几张图片
      scrolling: false  //是否正在滑动
    }
  },
  mounted(){
    //1.操作DOM，在前后添加Slide
    setTimeout(() => {
      this.handleDom()

      //开启定时器
      this.startTimer()
    }, 100)

  },
  methods:{
    handleDom(){
      //1.获取元素
      let swiperEl = document.querySelector('.swiper')
      let slidesEls = swiperEl.querySelectorAll('.slide')

      //2.保存个数
      this.slideCount = slidesEls.length

      //3.如果大于1个，那么在第一个元素前添加最后一个元素，在最后一个元素添加第一个元素
      if(this.slideCount > 1){
        let cloneFirst = slidesEls[0].cloneNode(true)
        let cloneLast = slidesEls[this.slideCount-1].cloneNode(true)
        swiperEl.insertBefore(cloneLast, swiperEl.childNodes[0])
        swiperEl.appendChild(cloneFirst)
        this.totalWidth = swiperEl.offsetWidth
        this.swiperStyle = swiperEl.style
      }
      
      //4.让swiper元素，显示第一个(目前是显示前面添加的最后一个元素，所以需要修正)
      this.setTransform(-this.totalWidth)
    },
    /**
       * 设置滚动的位置
       */
    setTransform(position){
      this.swiperStyle.transform = `translateX(${position}px)`
      this.swiperStyle['-webkit-transform'] = `translateX(${position}px)`
      this.swiperStyle['-ms-transform'] = `translateX(${position}px)`
    },
    touchStart(e){
      //1.如果正在滚动，不可以拖动
      if(this.scrolling) return

      //2.关闭定时器
      this.stopTimer()

      //3.保存开始滚动的位置
      this.startX = e.touches[0].pageX  
    },
    touchMove(e){
      //1.计算拖动的距离
      this.currentX = e.touches[0].pageX
      this.distance = this.currentX - this.startX
      let currentPosition = - this.currentIndex * this.totalWidth //currentIndex初始为1，因为克隆了一个节点，并且已初始化偏移
      let movedPosition = currentPosition + this.distance

      //2.设置当前位置
      this.setTransform(movedPosition)  //此处还没有记录上一次结束的位置
    },
    touchEnd(e){
      //1.获取移动的距离
      let currentMove = Math.abs(this.distance)

      //2.判断最终的距离
      if(this.distance === 0){
        return
      }else if(this.distance > 0 && currentMove > this.totalWidth * this.moveRatio){
        this.currentIndex --
      }else if(this.distance < 0 && currentMove > this.totalWidth * this.moveRatio){
        this.currentIndex ++
      }

      //3.移动到正确的位置
      this.scrollContent(-this.totalWidth * this.currentIndex)

      //4.移动完成后重新开启定时器
      this.startTimer()

    },
    checkPosition(){  //检查是否到达最前或最后的图片了，重置位置
      window.setTimeout(() => {
        //1.校验正确的位置
        this.swiperStyle.transition = '0ms'
        if(this.currentIndex >= this.slideCount + 1){
          this.currentIndex = 1
          this.setTransform(-this.currentIndex * this.totalWidth)
        }else if(this.currentIndex <= 0){
          this.currentIndex = this.slideCount
          this.setTransform(-this.currentIndex * this.totalWidth)
        }

        //2.结束移动后的回调
        this.$emit('transitionEnd', this.currentIndex - 1)

      }, this.animDuration)
    },
    /**
       * 滚动到正确的位置
       */
    scrollContent(currentPosition){
      //1.设置正在滚动
      this.scrolling = true

      //2.开始滚动
      this.swiperStyle.transition = `transform ${this.animDuration}ms`
      this.setTransform(currentPosition)  //自动回到原来位置

      //3.重置正确的位置
      this.checkPosition()

      //4.滚动完成
      this.scrolling = false
    },
    //自动轮播
    startTimer(){
      this.playTimer = window.setInterval(() => {
        this.currentIndex ++
        this.scrollContent(-this.totalWidth * this.currentIndex)
      }, this.interval)
    },
    stopTimer(){
      window.clearInterval(this.playTimer)
    }
  }
  
}
</script>

<style>
  #hy-box {
    overflow: hidden;
    position: relative;
    margin: 40px 10px;
  }
  .swiper {
    display: flex;
  }
  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }
  .indi-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
  }
  .active{
    background-color: rgba(212,62,46,1.0);
  }
</style>