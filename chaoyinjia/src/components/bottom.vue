<template>
  <div>
    <div class="bottom">
      <div style="width: 90%;margin: 10px auto">
        <div class="left" @click="dis2">分享赚钱</div>
        <div class="left right" @click="toblogo">推广海报</div>
      </div>
      <div class="btn" @click="toapply">立即申请</div>
    </div>
    <div class="fenxiang" v-show="dis==true">

      <img src="../assets/anniu.png" alt="" class="anniu" @click="dis1">
    </div>
  </div>

</template>
<script>
  import {XDialog,TransferDomDirective as TransferDom ,Flexbox, FlexboxItem,} from 'vux'
  export default {
    name:'Bottom',
    directives: {
    TransferDom,
      Flexbox,
      FlexboxItem,
  },
    components: {
        XDialog,
    },
    props: {
      blanklogo: {
        type:String,
        required:true
      },
      cids: {
        type:String,
        required:true
      },
      creditcardId: {
        type:String,
        required:true
      },
      cname: {
        type:String,
        required:true
      },
      channel: {
        type:String,
        required:true
      },
      reward: {
        type:Number,
        required:true
      },
      blankurl:{
        type:String,
        required:true
      }
    },
    data(){
      return{
        show1:false,
        chu:false,
        dis:false
      }
    },
    created(){
      this.sid = localStorage.getItem('userid')
    },
    methods:{
      wexin(){
        this.show1 = true
      },
      toblogo(){
        this.$router.push({path:'/blanklogo',query:{src:this.blanklogo,cid:this.cids}})
      },
      dis1(){
        this.dis = false
      },
      dis2(){
        this.dis = true
      },
      toblankcenter(){
        this.$router.push('/apply')
      },
      toapply(){
        this.$router.push({path:'/apply',query:{sid:this.sid,cid:this.cid,reward:this.reward,channel:this.channel,cname:this.cname,creditcardId:this.creditcardId,blankurl:this.blankurl}})
      }
    }
  }
</script>
  <style lang="less" scoped>
.bottom{
  width: 100%;
  height: 100px;
  background: #fff;
  position: fixed;
  bottom: 0;
  text-align: center;
  color: #fff;
  z-index: 20;
}

    .left{
      width: 45%;
      background: #F6C93C;
      float: left;
      height: 30px;
      line-height: 30px;
      border-radius: 5px;
    }
    .right{
      margin-left: 10%;
    }
    .btn{
      width: 90%;
      height: 30px;
      background: #F6C93C;
      position: absolute;
      bottom: 10px;
      left: 0;
      right: 0;
      margin: auto;
      line-height: 30px;
      border-radius: 5px;
    }
    .fenxiang{
    background-image: url("../assets/fenxiang.png");
    background-size: 100%;
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
  }
  .anniu{
    width: 30%;
    height: auto;
    position: absolute;
    top: 45%;
    left: 33%;
  }
</style>
