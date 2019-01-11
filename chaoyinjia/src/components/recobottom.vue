<template>
  <div>
    <div class="bottom">
      <img src="../assets/footer.png" width="100%" alt="" style="margin-bottom: 40px">
      <div class="fo" @click="wexin">
        <img src="../assets/foucs.png" width="100%" height="100%" alt="">
      </div>
      <div style="width: 100%;background: #F6C93C;text-align: center;color: #fff;line-height: 40px;position: fixed;bottom: 0" @click="toblankcenter"><span>立即申请</span></div>
  </div>
    <div v-transfer-dom>
      <x-dialog v-model="show1" class="dialog-demo">
        <div class="img-box">
          <img src="../assets/qrcode.jpg" style="max-width:100%">
        </div>
        <div @click="show1=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
    <div class="fenxiang" v-show="dis==true">
      <img src="../assets/anniu.png" alt="" class="anniu" @click="dis1">
      </div>
  </div>

</template>
<script>
  import {XDialog,TransferDomDirective as TransferDom ,Flexbox, FlexboxItem,} from 'vux'
  export default {
    name:'Recobottom',
    directives: {
    TransferDom,
      Flexbox,
      FlexboxItem,
  },
    components: {
        XDialog,
    },
    props: {
      cid: {
        type:String,
        required:true
      },
      sid: {
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
    methods:{
      wexin(){
        this.show1 = true
      },

      dis1(){
        this.dis = false
      },
      toblankcenter(){
        this.$router.push({path:'/apply',query:{sid:this.sid,cid:this.cid,reward:this.reward,channel:this.channel,cname:this.cname,creditcardId:this.creditcardId,blankurl:this.blankurl}})
      }
    }
  }
</script>
  <style lang="less" scoped>
@import '~vux/src/styles/close';
  .bottom{
  width: 100%;
  bottom: 0;
  position: relative;
  background: #fff;
  /*background-image: url("../assets/footer.png");*/
}
.fo{
  width: 22%;
  position: absolute;
  top:8%;right:5%;
  font-size: 14px;
  color: #fff;
  text-align: center;
}
  .dialog-demo {
  .weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height: auto;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
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
