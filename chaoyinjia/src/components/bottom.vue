<template>
  <div>
    <div class="bottom">
      <img src="../assets/footer.png" width="100%" alt="">
      <div class="fo" @click="wexin">
        <img src="../assets/foucs.png" width="100%" height="100%" alt="">
      </div>
      <div style="width: 71%;margin: 0 auto;height: auto">
        <div style="padding: 8px 40px;float: left;background: #F6C93C;color: #fff" @click="dis2">
          <span>分享赚钱</span>
        </div>
        <div style="padding: 8px 40px;float: left;background: #F6C93C;color: #fff;margin-left: 10px" @click="chulai">
          <span>推广海报</span>
        </div>
      </div>
      <div style="width: 100%;background: #F6C93C;margin-top: 45px;text-align: center;color: #fff;line-height: 40px" @click="toblankcenter"><span>下一步</span></div>
  </div>
    <div style="background: rgba(0,0,0,0.5);width: 100%;height:100%;position: fixed;top:0
    ;" v-show="chu">
      <img :src=blanklogo alt="" style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;margin:auto">
      <img src="../assets/guan.png" alt="" style="position: absolute;left: 0;bottom: 10%;right: 0;width: 10%;margin: auto" @click="xiao">
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

      chulai(){
        this.chu = true
      },
      xiao(){
        this.chu = false
      },
      dis1(){
        this.dis = false
      },
      dis2(){
        this.dis = true
      },
      toblankcenter(){
        this.$router.push('/apply')
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
