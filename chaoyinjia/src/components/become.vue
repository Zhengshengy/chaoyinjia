<template>
    <div class="ecome">
        <div class="dext" @click="tocenter">
          <img class="daili" src="../assets/daili.png" alt="" >
        </div>
    </div>
</template>
<script>
  export default {
    name:'Become',
    methods:{
      tocenter(){
        this.$router.push('/reg')
      }
    }
  }
</script>
<style>
    .ecome{
        width:100%;
        position: fixed;
        top:0;bottom:0;left:0;
        right: 0;margin: auto;
        background-image:url("../assets/touming.png") ;
        background-repeat:no-repeat;
    }
    .dext{
        position: fixed;
        width: 100%;
        left: 0;bottom:0;top: 0px;
        right: 0;margin: auto;

    }
    .ecome .daili{
        position: absolute;
        left: 0;bottom:0;top: 0px;
        right: 0;margin: auto;
        width: 80%;
    }
</style>
