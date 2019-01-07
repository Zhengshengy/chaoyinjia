<template>
  <div>
    <div class="bottom">
      <img src="../assets/footer.png" width="100%" alt="">
      <div class="focus" @click="wexin">
        <img src="../assets/foucs.png" width="100%" height="100%" alt="">
      </div>
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
  </div>

</template>
<script>
  import {XDialog,TransferDomDirective as TransferDom } from 'vux'
  export default {
    name:'Footer',
    directives: {
    TransferDom
  },
    components: {
        XDialog,
    },
    data(){
      return{
        show1:false
      }
    },
    methods:{
      wexin(){
        this.show1 = true
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
.focus{
  width: 22%;
  position: absolute;
  top:15%;right:5%;
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
</style>
