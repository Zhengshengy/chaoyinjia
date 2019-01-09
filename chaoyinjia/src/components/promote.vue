<template>
    <div class="ntom" id="ntom" >
      <div class="boifk"  v-if="stack==true" >
        <div class="fontman" >
          <div class="ontes">
            <cell v-for="(type, index) in types" :key="type" >
              <spinner :type="type" :size="index === 0 ? '60px' : ''"></spinner>
            </cell>
          </div>
        </div>
      </div>
      <div class="boif" style="padding-top: 30px;" :style="display" >
            <div class="topnot" >
              <div class="swiper-container">
                  <div class="swiper-wrapper">
                      <div class="swiper-slide">
                          <div class="bac" >
                              <img class="imga" :src="garde.one" alt="" >
                          </div>
                      </div>
                    <div class="swiper-slide">
                          <div class="bac" >
                              <img class="imga" :src="garde.two" alt="" >
                          </div>
                      </div>
                    <div class="swiper-slide" style="width: 90%;margin: 0 auto">
                          <div class="bac" >
                              <img class="imga" :src="garde.three" alt="">
                          </div>
                      </div>
                  </div>
              </div>
          </div>
            <div class="bottm" style="position: fixed;bottom: 0;width: 100%">
              <div class="texe">
                  <div class="font" style="margin-bottom: 4%;letter-spacing:2px;  ">长按保存图片或发送好友</div>
              </div>
              <div class="rout" style="width: 40%;margin: 0 auto 9%" @click="fenxiang">
                  <img src="../assets/yaoqin.png" alt="">
              </div>
              <div class="boncom" >
              <div class="fonbomone">
                  <flexbox >
                    <flexbox-item><div class="flex-demo">
                        <div class="yaoqing" style="border:1px solid #f6c93c;color:#f6c93c">邀请代理</div>
                    </div></flexbox-item>
                    <flexbox-item><div class="flex-demo">
                        <div class="clastom" style="border:1px solid #10aeff;color:#10aeff" v-on:click="dabcake(1)">推荐办卡</div>
                    </div></flexbox-item>
                  </flexbox>
              </div>
            </div>
          </div>
        </div>
      <toast v-model="show2" type="text">长按保存图片</toast>
    </div>
</template>
<script>
import { Flexbox, FlexboxItem, Spinner, Cell ,Toast } from 'vux'
import Swiper from "swiper"
  export default {
    name:'Promote',
    components: {
       Flexbox,
       FlexboxItem,
       Spinner,
       Cell,
       Toast
    },
      data(){
        return{
          types: ['bubbles',],
          heardImg:'',
          id:'',
          stack:true,
          garde:[],
          display:{display:'none'},
          show2:false
        }
      },
    mounted(){
      this.id = localStorage.getItem('userid')
      var mobileHeight=window.innerHeight+"px";
      document.getElementById('ntom').style.minHeight=mobileHeight;
      this.$ajax.get('https://www.xiaofeishuwangluo.com/userposter/selectPoster?userid='+this.id).then(e=>{
          this.garde = e.data.data
          this.garde.one=e.data.data.posterAgencyone
          this.garde.two=e.data.data.posterAgencytwo
          this.garde.three=e.data.data.posterAgencythree
          this.stack=false
          if(this.stack==false){
            this.display.display='block'
          }
      })
      var mySwiper = new Swiper ('.swiper-container', {
      spaceBetween: 20,
      freeMode: true,
      initialSlide :1,//默认第二个
      slidesPerView: 1,//可见个数2
      centeredSlides: true,//居中
      observer:true,
      effect : 'coverflow',
      observeParents:true,
    })
    },
      methods:{
        dabcake() {
            this.$router.push({path: "/registercard"});
        },
        fenxiang(){
          this.show2 = true
        }
      }
  }
</script>
<style  scoped>
 .ntom{
   width:100%;height: 100%;
   position: relative;background: #363636;
 }
img{
  width: 100%;
  height: auto;
}
.boifk{
  width: 100%;height: 100%;
}
.fontman{
  background: #000;width: 100%;position: absolute;top:0;height: 100%;
}
.ontes{
  width: 30%;margin: 0 auto;
}
.bac{
  width: 60%;
  margin: 5% auto;
}
.bac img{
  width: 100%;margin: 0 auto;
}
.weui-cell{
  width:100%;height: 100%;

}
.vux-spinner {
    stroke: #fff;
    fill: #fff;
    position: fixed;bottom:0;right:0;
    top: 0;left: 0;margin: auto;
    z-index: 100;
    vertical-align: middle;
    display: inline-block;
    width: 70px;
    height: 70px;
}
.imga{
  margin: 0 auto;
  box-shadow: 3px 5px 5px #716f6f;
  -webkit-box-shadow:3px 5px 5px #716f6f;
  -moz-box-shadow:3px 5px 5px #716f6f;
  width: 100%;
  height: auto;
}
  .bottm{
      padding-top: 10%;
      text-align: center;
      font-size: 14px;
      color: #fff;
  }
  .boncom{
      background: #E6E6E6;
      margin-top: 15px;
      padding: 8px 20px;
  }
  .fonbomone{
      width: 100%;
  }
  .yaoqing,.clastom{
      text-align: center;
      font-size: 14px;
      padding: 8px 0;
      width: 90%;
  }
</style>
