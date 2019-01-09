<template>
    <div class="become" v-show="show1==true">
        <div class="dext">
          <img class="daili" src="../assets/kefu.png" alt="">
          <div class="tomut">
            <div class="ontom">
              <div class="font" style="font-size: 20px;text-align: center;font-weight: 600;margin: 10px 0;color: #000">芝麻银家官方客服</div>
              <img :src="accountsUrl" width="100%" alt="">
              <div class="number" style="color:#f6c93c;text-align: center;font-weight: 600;margin-top:15px">
                <div style="font-size: 14px">添加官方客服，为您排忧解惑</div>
                <div style="font-size: 16px;margin-top: 10px">{{userphone}}</div>
              </div>
            </div>
          </div>
          <img class="dect" src="../assets/guan.png" width="100%" alt="" @click="dis">
        </div>
    </div>
</template>
<script>
  export default {
    name:'Service',


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
      }
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
        width: 80%;
        height: 100%;
    }
    .become .daili{
        position: absolute;
        left: 0;bottom:0;top: 0px;
        right: 0;margin: auto;
        width: 100%;
    }
    .tomut{
       position: absolute;
       left:0;top: 25%;right: 0;margin: auto;
       width: 72%;z-index: 20;
    }
 .dect{
   position: absolute;
   bottom: 15%;z-index: 100;width: 10%;right: 0;left: 0;margin: auto;
 }
</style>
