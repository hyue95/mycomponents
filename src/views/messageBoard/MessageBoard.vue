<template>
  <div id="message-board">

    <PaperFolding2 :yiQingData="message"></PaperFolding2>
  </div>
</template>

<script>
import PaperFolding2 from '@/components/common/paperFolding/PaperFolding2'
export default {
  name: "message",
  components: {
    PaperFolding2
  },
  data(){
    return {
      message: [
        {lastUpdateTime: ''},
        {
          today: {},
          total: {}
        },
        {
          today: {},
          total: {}
        },
        {
          today: {},
          total: {}
        }
      ],
      
    }
  },
  mounted(){

  },
  created(){
    let url = this.HOST
    this.$axios.get(url).then(res => 
    {
      let list = JSON.parse(JSON.stringify(res.data)).data
      let worldData = JSON.parse(list).areaTree
      let chinaData = worldData[0]
      let provinceData = chinaData.children
      let guandongData = provinceData[1]
      let citiesData = guandongData.children
      let jieyangData = citiesData[16]

      this.message[0].lastUpdateTime = JSON.parse(list).lastUpdateTime
      this.message[1].today = JSON.parse(list).chinaAdd
      this.message[1].total = chinaData.total
      this.message[2].today = guandongData.today
      this.message[2].total = guandongData.total
      this.message[3].today = jieyangData.today
      this.message[3].total = jieyangData.total
      // console.log(list)
    })
  },
  methods: {

  }
}
</script>

<style>
  #message-board{
    display: flex;
    justify-content: center;
    height: 700px;
  }
</style>