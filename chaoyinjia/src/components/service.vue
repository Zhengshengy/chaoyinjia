<template>
    <div class="become" v-show="show1==true">
        <div class="dext">
          <div class="daili">
            <div class="tomut">
            <div class="ontom">
              <div class="font">芝麻银家官方客服</div>
              <div class="guanfang" >添加官方客服，为您排忧解惑</div>
              <img class="imgfo" :src="accountsUrl" alt="">
              <div class="tonsfo" >长按扫一扫</div>
              <div class="number" >
                <div class="imgsck" @click="tell">
                  <img src="../assets/pothon.png" alt="">
                </div>
              </div>
            </div>
          </div>
          </div>
          <img class="dect" src="../assets/guan.png" width="100%" alt="" @click="dis">
        </div>
    </div>
</template>
<script>
  import { Flexbox, FlexboxItem, Divider } from 'vux'
  export default {
    name:'Service',
    components: {
      Flexbox,
      FlexboxItem,
      Divider
  },

    data(){
      return{
          show1:false,
          accountsUrl:'',
          userphone:''
      }
    },
      created(){
      this.$ajax.get('https://www.xiaofeishuwangluo.com/base/publicSysData').then(e=>{
          this.userphone = e.data.data.mobile
          this.accountNummber = e.data.data.accountNummber
          this.accountsUrl = e.data.data.accountsUrl
          this.wxNumber = e.data.data.wxNumber
        })
    },
    methods:{
      dis(){
        this.$emit('success',false)
      },
      tell(){
          console.log(this.userphone)
          window.location.href = 'tel://' + this.userphone
      },
    }
  }
</script>
<style scoped>
    .become{
        width:100%;
        height: 100%;
        position: fixed;
        top:0;
        background-image:url("../assets/touming.png") ;
        background-repeat:no-repeat;
        z-index: 999;
    }
    .dext{
        position: relative;
        left: 0;bottom:0;top: 0px;
        right: 0;margin: auto;
        width: 75%;
        height: 100%;
    }
    .become .daili{
        position: fixed;
        left: 0;bottom:0;top: 0px;
        background-image:url("../assets/kefu.png") ;
        background-size: 100% 100%;
        right: 0;margin: auto;
        width: 75%;height: 60%;
    }
    .tomut{
      width: 100%;height: 100%;position: absolute;top:0;
    }
    .ontom{
      width: 100%;position: relative;top:0;height: 100%;
    }
    .font{
      position: absolute;
      width: 100%;
      top: -5%;
      font-size: 20px;text-align: center;
      font-weight: 600;color: #000;
    }
    .guanfang{
      position: absolute;
      width: 100%;
      text-align: center;
      font-weight: 600;
      top:2%;
      font-size: 14px;color:#C3C3C3;letter-spacing:0;
    }
    .tonsfo{
      position: absolute;
      top:55%;
      text-align: center;
      left: 0;right: 0;
      font-size: 14px;color:#383838;
      display: block;margin:auto;
    }
    .ontom .imgfo{
      position: absolute;
      top:10%;
      width: 63%;left: 0;right: 0;
      display: block;margin:auto;
    }
    .imgsck{
      position: absolute;
      top:68%;
      width: 72%;left: 0;right: 0;
      margin:auto;
    }
 .dect{
   position: absolute;
   bottom: 15%;z-index: 100;width: 10%;right: 0;left: 0;margin: auto;
 }
  .number{
    width: 100%;margin: 16% auto 0;
  }
  .posfon img{
    width: 100%;
    display: block;
  }
   .number img{
     width: 100%;
   }
</style>
