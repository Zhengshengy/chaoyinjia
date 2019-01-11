<template>
  <div class="con">
    <div class="tu">
      <img :src="src" alt="">
      <div class="bon" style="position: absolute;bottom: 15%">
          <div class="btn" @click="add">
            <span>保存海报到本地</span>
          </div>
        <div class="btn btn1" v-clipboard:copy="copyurl"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError">
            <span>复制推广链接</span>
        </div>
    </div>
    <div style="height: 100px"></div>
    </div>
    <div class="di">
        <Footer></Footer>
    </div>
    <div v-transfer-dom>
      <alert v-model="show" :title="title" >长按保存到本地</alert>
    </div>
    <toast v-model="showSuccess">{{text}}</toast>
    <Retu/>
  </div>
</template>

<script>
  import { AlertModule, Alert,Toast,  TransferDomDirective as TransferDom } from 'vux'
    import Footer from '@/components/footer'
  import Retu from '@/components/retu'
    export default {
        name: "blanklogo",
        directives: {
          TransferDom
        },
        components:{
          Footer,
          Alert,
          AlertModule,
          Toast,
          Retu
        },
        data(){
          return{
            src:'',
            show:false,
            title:'提示',
            copyurl:'',
            cid:'',
            showSuccess:false,
            text:'',
          }
        },
      created(){
          this.src = this.$route.query.src
          this.cid = this.$route.query.cid
          let uid = localStorage.getItem('userid')
          this.copyurl = `https://www.xiaofeishuwangluo.com/blank/#/recommend?userid=${uid}&cid=${this.cid}`
      },
      methods:{
          add(){
            this.show = true
          },
          onCopy(){
            this.text = "复制成功"
            this.showSuccess = true
          },
          onError(){
            this.text = "复制失败"
          this.showSuccess = true
          }
      }
    }
</script>

<style scoped>
.con::before{
  content:" ";
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    background-color:rgb(51,51,51);
    z-index:-100;
}
  .tu{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .tu img{
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    margin: auto;
  }
  .bon{
    width: 100%;
    margin-top: 10px;
  }
  .di{
    position: fixed;
    bottom: 0;
  }
  .btn{
    width: 85%;
    margin: 0 auto;
    text-align: center;
    padding: 10px 0;
    background: #F6C93C;
    color: #fff;
    border-radius: 5px;
  }
  .btn1{
    margin-top: 20px;
    background: rgb(255,52,0);
  }
</style>
