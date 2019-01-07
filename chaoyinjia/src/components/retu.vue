<template>
  <v-touch class="retur" v-on:tap="returr">
    <img src="../assets/return.png" alt="">
  </v-touch>
</template>
<script>
  export default {
    name:'Retu',
    methods:{
      returr(){
        this.$router.go(-1)
      }
    }
  }
</script>
<style>
  .retur{
    width: 50px;
    height: auto;
    position: fixed;
    right: 5%;
    bottom: 15%;
    z-index: 999;
  }
  .retur img{
    width: 100%;
    height: auto;
  }
</style>
