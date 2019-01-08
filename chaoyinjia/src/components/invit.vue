<template>
    <div class="tomImg">
        <div class="im_top">
            <img src="../assets/invite.png" width="100%" alt="">
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
                              <span style="font-size: 14px;color:#000;font-weight: 600">芝麻银家</span><br>
                              <span style="font-size: 12px;color:#4F4F4F;padding-top: 5px;">工号：<span>1</span></span>
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
        <div class="bottom" @click="tocenter">
            <div class="btn">
              <span>下一步</span>
            </div>
        </div>
      <Retu/>
      <toast v-model="showSuccess">{{text}}</toast>
      <div v-transfer-dom>
      <x-dialog v-model="show1" class="dialog-demo">
        <div class="img-box">
          <img src="../assets/qrcode.jpg" style="max-width:100%">
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
          show1:false,
          username:"",
          superior_uid:''
        }
      },
    created(){
        this.userphone = localStorage.getItem('userphone')
        this.uid = localStorage.getItem('userid')
        this.username = localStorage.getItem('username')
        this.superior_uid = this.getUrlKey('userid')

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
        wexin(){
          this.show1 = true
        },
        tocenter(){
          this.$router.push('/center')
        },
        getUrlKey(name){//获取url 参数
   return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
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
        background: #f6c93c;
        padding: 5px;
    }
    .btn{
      text-align: center;
      padding: 10px;
      color: #fff;
      font-size: 14px;
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
