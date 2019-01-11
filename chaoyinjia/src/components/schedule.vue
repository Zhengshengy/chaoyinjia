<template>
  <div class="bigbox" >
    <div class="progress" @click="add">
           <img src="../assets/blank.png" alt="" style="width: 100%">
      </div>
      <div class="reding">
        <div class="xuan" >选择银行</div>
        <grid :cols="3" :show-lr-borders="false">
          <grid-item v-for="i in main" :key="i.pid"  @on-item-click="toschCenter(i.pid)">
            <div class="cimg">
              <img :src="i.blankimg" alt="" >
            </div>
              <div style="margin-top: 10px;" class="grid-center">{{i.blankname}}</div>
          </grid-item>
        </grid>
      </div>
    <Retu></Retu>
    <div>
         <Footer />
      </div>
    <div class="become" v-show="show1==true">
        <div class="dext">
          <img class="daili" src="../assets/kefu.png" alt="">
          <div class="tomut">
            <div class="ontom">
              <div class="font" style="font-size: 20px;text-align: center;font-weight: 600;margin: 10px 0;color: #000">芝麻银家官方客服</div>
              <img src="../assets/qrcode.jpg" width="100%" alt="">
              <div class="number" style="color:#f6c93c;text-align: center;font-weight: 600;margin-top:15px">
                <div style="font-size: 14px">扫一扫关注加入芝麻银家</div>
                <div style="font-size: 16px;margin-top: 10px">推卡赚奖金</div>
              </div>
            </div>
          </div>
          <img class="dect" src="../assets/guan.png" width="100%" alt="" @click="dis">
        </div>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem,Grid, GridItem,Divider} from 'vux'
import Retu from '@/components/retu'
import Footer from '@/components/footer'
  export default {
  name:'Card',
  components: {
    Footer,
    Retu,
    Flexbox,
    FlexboxItem,
    Grid,
    GridItem,
    Divider
  },
  data () {
    return {
      main:[],
      show1:false
    }
  },
    created(){
    this.$ajax.get('https://www.xiaofeishuwangluo.com/progressquery/selectProgressQuery')
      .then(response => {
        console.log(response)
        this.main = response.data.data
      })
    },
  methods:{
    add(){
        this.show1 = true
    },

    dis(){
        this.show1 = false
      },
    toschCenter(pid){
        this.$router.push({path:'/schCenter',query:{pid:pid}})
    }
  }
}
</script>

<style scoped>
    .reding{
        width:90%;
        margin: 10px auto 10px;
    }
    .xuan{
        padding: 10px 0 10px;font-size: 14px;
        margin-left: 5px;
    }
    .weui-grids.vux-grid-no-lr-borders{
        text-align: center;
        background: #fff;
    }
    .grid-center{
        color:#2b2b2b;
    }
    .bigbox{
      width: 100%;
      background: #f5f5f5;
    }
  .bigbox::before{
    content:" ";
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    background-color:#F5F5F5;
    z-index:-100;
  }
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
  .cimg{
    width: 50px;
    height: 50px;
    margin: 0 auto;
    position: relative;
  }
  .cimg img{
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
  }
</style>
