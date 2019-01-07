<template>
  <div>
    <div class="box">
      <img src="../assets/yiguanzhu.png" alt="" class="yi">
      <img src="../assets/qrcode.jpg" alt="" class="er">
      <div class="di" @click="to"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'Been',
    methods:{
      to(){
        this.$router.push('/')
      }
    }
  }
</script>
<style scoped>
  .box{
    width: 100%;
    position: relative;
  }
  .box .yi{
    width: 100%;
    height: auto;
  }
  .er{
    width: 60%;
    height: auto;
    position: absolute;
    top: 43%;
    left: 0;
    right: 0;
    margin: auto;;
  }
  .di{
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 0;
  }
</style>
