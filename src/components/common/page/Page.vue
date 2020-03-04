<template>
  <div id="page">
    <div id="div1"></div>
  </div>
</template>

<script>
export default {
  name: 'Page',
  props:{
    settingData:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      result: {}
    }
  },
  mounted(){
    this.returnData(this.settingData.nowNum, this.settingData.allNum, this.settingData.showNum)
    this.page(this.settingData)   
  },
  methods: {
    returnData(nowNum, allNum, showNum){
      this.$emit('resultData',{"currentPage": nowNum, "pageNumberall": allNum, "showNum": showNum})
    },
    page(opt){
      if(!opt.id) return
      let obj = document.querySelector(opt.id)
      let nowNum = opt.nowNum || 1;
			let allNum = opt.allNum || 5;
      let callBack = opt.callBack || function(){};
      let showNum = opt.showNum
      let midNum = Math.ceil(opt.showNum / 2)

      //创建首页
      if(nowNum > midNum && allNum > showNum){
        let oA = document.createElement('a');
				oA.href = '#1';
				oA.innerHTML = '首页';
				obj.appendChild(oA);
      }
      //创建上一页
      if(nowNum > 1){ //不是首页就是上一页
				let oA = document.createElement('a');
				oA.href = `#${nowNum - 1}`;
				oA.innerHTML = '上一页';
				obj.appendChild(oA);
      }
      //创建显示页数小于要展示的页数
      if(allNum <= showNum){
				for(let i = 1; i <= allNum; i ++){
            let oA = document.createElement('a');
            oA.href = '#';
            if(i == nowNum){
              oA.innerHTML = i;
            }else{
              oA.innerHTML = `[${i}]`;
            }
            obj.appendChild(oA);
          }
        }else{
          //创建显示页数大于于要展示的页数
          for(let i = 1; i <= showNum; i ++){
            let oA = document.createElement('a');
            if(nowNum < midNum){
                oA.href = `#${i}`;
                if(nowNum == i){
                  oA.innerHTML = i;
                }else{
                  oA.innerHTML = `[${i}]`;
                }
              }else if(nowNum + midNum > allNum){ //显示当快接近末尾时，页数不需要改变了
                oA.href = `#${allNum - showNum + i}`;
                if(allNum - showNum + i == nowNum){
                  oA.innerHTML = nowNum;
                }else{
                  oA.innerHTML = `[${allNum - showNum + i}]`;
                }
              }else{
                oA.href = `#${nowNum - midNum + i}`;
                if(i == midNum){ //显示最中间的那个页数
                  oA.innerHTML = nowNum;
                }else{
                  oA.innerHTML = `[${nowNum - midNum + i}]`;
                }
              }					
              obj.appendChild(oA);
            }
          }
          if((allNum - nowNum) >= 1){
            let oA = document.createElement('a');
            oA.href = `#${nowNum + 1}`;
            oA.innerHTML = '下一页';
            obj.appendChild(oA);
          }
          
          if((allNum - nowNum) >= midNum && allNum > showNum){
            let oA = document.createElement('a');
            oA.href = `#${allNum}`;
            oA.innerHTML = '末页';
            obj.appendChild(oA);
          }
          
          callBack(nowNum, allNum);

          let aA = obj.querySelectorAll('a')
          let _this = this
          for(let i = 0; i < aA.length; i ++){
            aA[i].onclick = function(){
              let nowNum = parseInt(this.getAttribute('href').substring(1));
              obj.innerHTML = '';
  
              _this.returnData(nowNum, allNum, showNum)
              _this.page({
                id: opt.id,
                nowNum: nowNum,
                allNum: allNum,
                showNum: showNum,
                callBack: callBack
              })
            }
          }
    }
  }
}
</script>

<style>
  #page {
    margin: 10px;
    width: 100%;
  }
  #div1{
    /* margin: 20px; */
    width: 100%;
  }
  a{
    margin: 5px;
    font-size: 20px;
  }
</style>