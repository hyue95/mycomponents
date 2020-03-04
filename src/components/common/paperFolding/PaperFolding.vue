<template>
  <div id="paperFolding">
    <button @click="btn1">hiding</button>
    <button @click="btn2">showing</button>
    <div class="wrap" >
      <span>第一项</span>
      <div>
        <span>第二项</span>
        <div>
          <span>第三项</span>
          <div>
            <span>第四项</span>
            <div>
              <span>第五项</span>
              <div>
                <span>第六项</span>
                <div>
                  <span>第七项</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaperFolding',
  data(){
    return {
     
    }
  },
  mounted(){
    
  },
  methods: {
    btn1(){
      let oDiv = document.querySelector('.wrap')
      let aDiv = oDiv.querySelectorAll('div')
      for(let i = 0; i < aDiv.length; i++){
        aDiv[i].style.transition = `0.5s ${(aDiv.length - i) * 100}ms`
        aDiv[i].style.webkitTransform = "rotateX(60deg)"
      } 
    },
    btn2(){
      let oDiv = document.querySelector('.wrap')
      let aDiv = oDiv.querySelectorAll('div')
      for(let i = 0; i < aDiv.length; i ++){
        aDiv[i].style.transition = `0.5s ${i * 100}ms`
        aDiv[i].style.webkitTransform = "rotateX(0deg)" 
      }
    }
  }
}
</script>

<style>
  button {
    margin: 8px;
  }
  .wrap {
    margin: 10px auto;
    width: 302px;
    -webkit-perspective: 800px;
    -webkit-transform-style: preserve-3d; 
    position: relative;
  }
  .wrap div{ 
    /* 这里可以使最上面的位置空出来，否则第一个span会被挡住 */
    position: absolute; 
    top: 52px;
    left: 0;
    -webkit-transform-style: preserve-3d; 
    -webkit-transform-origin: top;
  }
  .wrap span{ 
    display: block;
    width: 300px;
    /* 做日历可以考虑删掉 */
    border: 1px solid #000;
    height: 50px; 
    font: 16px/50px "宋体"; 
    background: #ccc;
  }
</style>