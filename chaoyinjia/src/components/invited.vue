<template>
    <div class="tomImg">
        <div class="im_top">
            <img :src="requestUrl" width="100%" alt="">
        </div>
        <div class="service" style="margin: 8px 0 20px;padding-right: 20px">
            <div class="reserv">
                <flexbox :gutter="0">
                  <flexbox-item><div class="flex-demo">
                      <div class="nonte" >
                          <flexbox :gutter="0">
                              <flexbox-item :span="6"><div class="flex-demo" style="width:90%;">
                                  <div class="bonts" style="background: #f6c93c"><img src="../assets/exclusive.png" width="100%" alt=""></div>
                              </div></flexbox-item>
                              <flexbox-item :span="4"><div class="flex-demo"><img src="../assets/gingili.png" width="100%" alt=""></div></flexbox-item>
                            </flexbox>
                      </div>
                  </div></flexbox-item>
                  <flexbox-item><div class="flex-demo">
                        <flexbox orient="vertical" :gutter="0">
                          <flexbox-item><div class="flex-demo" style="padding: 10px 10px 0 0">
                              <span style="font-size: 14px;color:#000;font-weight: 600">{{accountNummber}}</span><br>
                              <span style="font-size: 12px;color:#4F4F4F;padding-top: 5px;">工号：<span>{{uid}}</span></span>
                          </div></flexbox-item>
                          <flexbox-item><div class="flex-demo" style="padding-top: 10px;">
                              <flexbox>
                                  <flexbox-item><div class="flex-demo" @click="tell"><img src="../assets/dianhua.png" width="100%" alt=""></div></flexbox-item>
                                  <flexbox-item><div class="flex-demo" @click="wexin"><img src="../assets/weixin.png" width="100%" alt=""></div></flexbox-item>
                            </flexbox>
                          </div></flexbox-item>
                        </flexbox>
                  </div></flexbox-item>
                </flexbox>
            </div>
        </div>
        <div style="height: 55px"></div>
        <div class="bottom">
            <flexbox>
              <flexbox-item><div class="flex-demo" v-clipboard:copy="copyurl"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError">
                  <div class="tonm" >
                      <img src="../assets/haoyou.png" width="100%" alt="">
                  </div>
              </div></flexbox-item>
              <flexbox-item><div class="flex-demo" @click="fenxiang">
                  <div class="tonm" >
                      <img src="../assets/yaoqin.png" width="100%" alt="">
                  </div>
              </div></flexbox-item>
            </flexbox>
        </div>
      <Retu/>
      <toast v-model="showSuccess">{{text}}</toast>
      <div class="fenxiang" v-show="dis==true">

      <img src="../assets/anniu.png" alt="" class="anniu" @click="dis1">
      </div>
      <div v-transfer-dom>
      <x-dialog v-model="show1" class="dialog-demo">
        <div class="img-box">
          <img :src="accountsUrl" style="max-width:100%">
        </div>
        <div @click="show1=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
    </div>
</template>
<script>
  import {Divider, Flexbox, FlexboxItem, Toast,XDialog,TransferDomDirective as TransferDom, } from 'vux'
  import Retu from '@/components/retu'
  import wx from 'weixin-js-sdk'
  export default {
      name:'invited',
      directives: {
      TransferDom
  },
    components: {
        Flexbox,
        FlexboxItem,
        Divider,
        Retu,
        Toast,
        XDialog,
    },
      data(){
        return{
          uid:'',
          userphone:'',
          url:'',
          showSuccess:false,
          text:'',
          dis:false,
          show1:false,
          requestUrl:'',
          username:"",
          accountNummber:'',
          accountsUrl:'',
          wxNumber:'',
          copyurl:''
        }
      },
    created(){

        this.$ajax.get('https://www.xiaofeishuwangluo.com/base/publicSysData').then(e=>{
          console.log(e)
          this.uid = e.data.data.uuid
          this.userphone = e.data.data.mobile
          this.requestUrl=e.data.data.requestUrl
          this.accountNummber = e.data.data.accountNummber
          this.accountsUrl = e.data.data.accountsUrl
          this.wxNumber = e.data.data.wxNumber
        })
        this.userphone = localStorage.getItem('userphone')
        this.uid = localStorage.getItem('userid')
        this.username = localStorage.getItem('username')
        this.copyurl = 'https://www.xiaofeishuwangluo.com/blank/#/center?userid='+this.uid
        this.url = encodeURI(location.href.split('#')[0])
        var link = 'https://www.xiaofeishuwangluo.com/blank/?#/center?userid='+this.uid
        var desc="跟着银行的脚步，推卡反佣金,吃的喝的全都有，没毛病！";
        this.$ajax.get('https://www.xiaofeishuwangluo.com/wxpublic/getEncryptJsapiTicket?url='+this.url).then(e=>{
          if (e.data.status==200){
            wx.config({
              debug:false,
              appId:e.data.data.appid,
              timestamp:e.data.data.timestamp,
              nonceStr:e.data.data.noncestr,
              signature:e.data.data.signature,
              jsApiList:['onMenuShareTimeline','onMenuShareAppMessage']
            })
            wx.ready(function () {
              wx.onMenuShareTimeline({
                title: '免费零投入，全民创业梦，跟着银行一起创业去！', // 分享标题

                link:  link,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'https://www.xiaofeishuwangluo.com/logo/logo.png', // 分享图标
                success: function () {
                },
                cancel: function () {
                }
              });
              wx.onMenuShareAppMessage({
                title: '免费零投入，全民创业梦，跟着银行一起创业去！', // 分享标题
                link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                desc: desc,
                imgUrl: 'https://www.xiaofeishuwangluo.com/logo/logo.png', // 分享图标
                success: function () {
                },
                cancel: function () {
                }
              })

            });
          }
        })
     },
      methods:{
        tell(){
          window.location.href = 'tel://' + this.userphone
        },
        onCopy(e){
          this.text = "复制成功"
          this.showSuccess = true
        },
      onError(e){
        this.text = "复制失败"
          this.showSuccess = true
      },
        dis1(){
          this.dis = false
        },
        fenxiang(){
          this.dis = true
        },
        wexin(){
          this.show1 = true
        }
      }
}
</script>
  <style lang="less" scoped>
@import '~vux/src/styles/close';
    .tomImg{
        background: #f5f5f5;
    }
    .service{
        background: #fff;
    }
    .bottom{
        width: 100%;
        position: fixed;
        bottom: 0;
        box-shadow: 0px -2px 0 0 rgba(0,0,0,.1);
        background: #fff;
        padding: 5px;
    }
    .tonm{
        text-align: center;width:90%;margin: 0 auto;
        padding: 10px  0;
    }
    .fenxiang{
    background-image: url("../assets/fenxiang.png");
    background-size: 100%;
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
  }
  .anniu{
    width: 30%;
    height: auto;
    position: absolute;
    top: 45%;
    left: 33%;
  }


.dialog-demo {
  .weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height: auto;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
</style>
