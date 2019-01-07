<template>
    <div class="ntom">
        <div class="boif">
            <div class="topnot" >
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <div class="bac">
                            <img src="../assets/dream.png" alt="">
                        </div>
                        <div class="right_bonts">
                             <div class="fontimge">
                               <img :src="qrcode" width="15%" alt="">
                             </div>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="bac">
                            <div class="heidth">
                                <img src="../assets/drem1.jpg" alt="">
                            </div>
                            <div class="right_bontb">
                                <flexbox :gutter="0">
                                  <flexbox-item ><div class="flex-demo">
                                    <flexbox :gutter="0">
                                      <flexbox-item :span="4"><div class="flex-demo">
                                          <div class="fontinmg">
                                              <img :src="heardImg" alt="">
                                          </div>
                                      </div></flexbox-item>
                                      <flexbox-item ><div class="flex-demo">
                                          <div class="fontinmgs">
                                          <div style="color: #000">芝麻银行</div>
                                              <div style="color: #5F5A50">
                                                  <span>职务：</span>
                                                  <span>{{grade}}</span><br>
                                                  <span>ID:</span>
                                                  <span style="margin-right: 5px">{{id}}</span>
                                              </div>
                                          </div>
                                      </div></flexbox-item>
                                    </flexbox>
                                  </div></flexbox-item>
                                  <flexbox-item :span="4"><div class="flex-demo">
                                        <div class="fontimges">
                                           <img :src="qrcode" width="15%" alt="">
                                         </div>
                                  </div></flexbox-item>
                                </flexbox>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="bac">
                            <div class="heidth">
                                <img src="../assets/dream2.jpg" alt="">
                                <div class="right_bont">
                                    <div class="fontimg">
                                       <img :src="qrcode" width="15%" alt="">
                                    </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div class="bottm">
            <div class="texe">
                <div class="font" >点击保存图片或发送好友</div>
            </div>
            <div class="rout" style="width: 40%;margin: 10px auto 0">
                <img src="../assets/yaoqin.png" alt="">
            </div>
            <div class="boncom">
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
    </div>
</template>
<script>
import { Flexbox, FlexboxItem, Divider } from 'vux'
import Swiper from "swiper"
  export default {
    name:'Promote',
    components: {
       Flexbox,
       FlexboxItem,
    },
      data(){
        return{
          heardImg:'',
          grade:'',
          id:'',
          qrcode:''
        }
      },
    mounted(){
      let url = encodeURI(window.location.href)
      this.$ajax.get('www.xiaofeishuwangluo.com/user/getQrcode?url='+url).then(e=>{
          this.qrcode = e.data.data
      })
      this.grade = localStorage.getItem('grade')
      this.heardImg = localStorage.getItem('headImgUrl')
      this.id = localStorage.getItem('userid')
      var mySwiper = new Swiper ('.swiper-container', {
      spaceBetween: 25,
      freeMode: true,
      initialSlide :1,//默认第二个
      slidesPerView: 1.25,//可见个数2
      centeredSlides: true,//居中
      observer:true,
      observeParents:true,
    })
    },
      methods:{
        dabcake() {
            this.$router.push({path: "/registercard"});
        }
      }
  }
</script>
<style  scoped>
 .ntom{
   padding: 30px 0 0px;
   background: #363636;
 }
 img{
    width: 100%;
    height: auto;
  }
.heidth{
    position: relative;
    top:0;
    left: 0;
}
.right_bonts{
    position: absolute;
    width: 40%;
    height: auto;
    bottom:10%;
    right: 0;
    z-index: 10;
}
.right_bont{
    position: absolute;
    width: 50%;
    height: auto;
    bottom:22.5%;
    left: 0;
    z-index: 10;
}
.fontimge{
    position: absolute;
    width: 35%;
    right: 2%;
}
.fontimg{
    position: absolute;
    width: 60%;
    left: 21%;
}
.right_bontb{
    position: absolute;
    bottom:16%;
    right: 0;
    width: 60%;
    font-size: 12px;
}
.fontimges{
    position: absolute;
    width: 32%;
    right: 0;
    top:14px;
}
.fontinmg{
    position: absolute;
    width: 20%;
    left: 1px;
    top: 36px;
}
.fontinmgs{
    position: absolute;
    font-size: 12px;
    /*width: 20%;*/
    left: 23%;
    top: 24px;
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
    .img{
        width: 80%;
        margin: 0 auto;
    }
</style>
