<template>
    <div class="become" v-show="kefu==true" @click="dis">
        <div class="dext">
          <img class="daili" src="../assets/kefu.png" alt="">
        </div>
    </div>
</template>
<script>
  export default {
    name:'Service',
    // computed:{
    //   kefu:function () {
    //
    //   }
    // },

    props:{
      kefu:{
        type:Boolean,
        required:true,
      }
    },
    data(){
      return{
        show:false
      }
    },
    methods:{
      dis(){
        // this.kefu = false
        this.$emit('onshow', this.show)
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
    .become .daili{
        position: absolute;
        left: 0;bottom:0;top: 0px;
        right: 0;margin: auto;
        width: 80%;
    }

</style>
