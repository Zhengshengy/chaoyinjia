<template>
  <div style="background: #F5F5F5">
    <div class="top" @click="add">
      <img src="../assets/blank.png" alt="" style="width: 100%">
    </div>

    <swiper :aspect-ratio="300/780" auto loop :interval="3000" :threshold="100" :show-dots="false">
      <swiper-item class="swiper-demo-img" v-for="(i, index) in cdetails" :key="index">
        <div class="card" style="width:89%;margin:15px auto 0;padding: 10px;background: #fff;border-radius: 5px">
        <flexbox :gutter='30'>
      <flexbox-item><div class="flex-demo">
        <img :src='i.cimg' alt="" style="width: 100%;height: auto">
      </div></flexbox-item>
      <flexbox-item><div class="flex-demo">
        <flexbox orient="vertical" :gutter="0">
      <flexbox-item><div class="flex-demo" style="font-size: 14px">
        <p class="zi">{{i.cname}}</p >
      </div></flexbox-item>
      <flexbox-item><div class="flex-demo">
        <p class="zi1" style="color: #c1c1c1">{{i.cremarks}}</p >
      </div></flexbox-item>
      <flexbox-item><div class="flex-demo" @click="shenqing(i.cid)">
        <div class="naniu">立即申请</div>
      </div></flexbox-item>
      </flexbox>
        </div></flexbox-item>
      </flexbox>
        </div>
      </swiper-item>
    </swiper>
    <div class="main" style="padding: 10px 10px 0">
      <span style="font-size: 14px;">推荐银行</span>
      <Tobanka style="margin-top: 5px" :main="main" :sid="sid"  />
    </div>
    <div class="become" v-show="show1==true">
        <div class="dext">
          <img class="daili" src="../assets/kefu.png" alt="">
          <div class="tomut">
            <div class="ontom">
              <div class="font" style="font-size: 20px;text-align: center;font-weight: 600;margin: 10px 0;color: #000"></div>
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
      <div>
         <Footer />
      </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem,Grid, GridItem,Divider,Swiper,SwiperItem} from 'vux'
import Footer from '@/components/footer'
import Tobanka from '@/components/tobankas'
import wx from 'weixin-js-sdk'

  export default {
  name:'Recommend',
  components: {
    Flexbox,
    FlexboxItem,
    Grid,
    GridItem,
    Divider,
    Footer,
    Tobanka,
    Swiper,
    SwiperItem
  },

  data () {
    return {
      username:'',
      headImgUrl:'',
      main:[],
      cdetails:{},
      show1:false,
      sid:'',
      userId:'',
      url:'',
    }
  },
    created() {
    function getUrlKey(name){//获取url 参数
   return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;}
      let uid = getUrlKey('userid')
      if (uid){
           this.sid = uid
         } else if(!uid){
           if (localStorage.getItem('ustatus')=='2'){
            this.sid = localStorage.getItem('userid')
          }else {
            this.sid = '1'
          }
        }
    if (localStorage.getItem('openid')) {

        let openid = localStorage.getItem('openid')
        this.$ajax.get('https://www.xiaofeishuwangluo.com/creditcard/selectCreditCard?openid='+openid)
      .then(response => {
        console.log(response)
          this.cdetails = response.data.data.cdetails
        response.data.data.bdetails.forEach((v,k)=>{
          let obj = {}
          obj.cimg = response.data.data.bdetails[k].cimg
          obj.cid = response.data.data.bdetails[k].cid
          obj.cname = response.data.data.bdetails[k].cname
          obj.reward = response.data.data.bdetails[k].reward/100
          obj.cremarks = response.data.data.bdetails[k].cremarks
          obj.text = response.data.data.bdetails[k].clabel.split(',')[0]
          obj.con = response.data.data.bdetails[k].clabel.split(',')[1]
          this.main.push(obj)
        })
      })
    }else {
       let openid=getUrlKey("openid");
       let uids = getUrlKey('userid')

      if (!openid)  {
         if (uids) {
            window.location.href = 'https://www.xiaofeishuwangluo.com/wxpublic/open?state=1'+uids
         }else {
           window.location.href = 'https://www.xiaofeishuwangluo.com/wxpublic/open?state=1'
         }
      }else {
        localStorage.setItem('openid', openid)
        this.$ajax.get('https://www.xiaofeishuwangluo.com/creditcard/selectCreditCard?openid='+openid).then(response=>{
          this.cdetails = response.data.data.cdetails
        response.data.data.bdetails.forEach((v,k)=>{
          let obj = {}
          // console.log(arr)
          obj.cimg = response.data.data.bdetails[k].cimg
          obj.cid = response.data.data.bdetails[k].cid
          obj.cname = response.data.data.bdetails[k].cname
          obj.reward = response.data.data.bdetails[k].reward/100
          obj.cremarks = response.data.data.bdetails[k].cremarks
          obj.text = response.data.data.bdetails[k].clabel.split(',')[0]
          obj.con = response.data.data.bdetails[k].clabel.split(',')[1]
          this.main.push(obj)
        })
        })
        this.$ajax.get('https://www.xiaofeishuwangluo.com/wxpublic/selectUserByOpenid?openid='+openid)
      .then(response => {
        console.log(response)
        localStorage.setItem('username', response.data.data.nickname)
        localStorage.setItem('headImgUrl', response.data.data.headImgUrl)
        localStorage.setItem('userid', response.data.data.userid)
        localStorage.setItem('userphone', response.data.data.userphone)
        localStorage.setItem('ustatus', response.data.data.ustatus)
        localStorage.setItem('openid', response.data.data.openid)

        this.username = response.data.data.nickname
        this.headImgUrl = response.data.data.headImgUrl
        this.userId = response.data.data.userid
        if (response.data.data.ustatus=='2'){
          this.$ajax.post('https://www.xiaofeishuwangluo.com/agentdetails/selectAgentDetailsByUid?uid='+this.userId)
      .then(e => {
        if (e.data.data.grade == '1'){
          let grade = "经理"
        }else if (e.data.data.grade == '2'){
          let grade = "总监"
        }else if (e.data.data.grade == '3'){
          let grade = "银行家"
        }
        localStorage.setItem('grade', grade)

        })
        }

      })

      }
    }
          var link = 'https://www.xiaofeishuwangluo.com/blank/?#/recommend?userid='+localStorage.getItem('userid')
          var desc = "芝麻银家服务平台，多家银行任意申请，秒批高额度，特约办理通道";
          this.url = encodeURI(location.href.split('#')[0])
          this.$ajax.get('https://www.xiaofeishuwangluo.com/wxpublic/getEncryptJsapiTicket?url=' + this.url).then(e => {
            if (e.data.status == 200) {
              wx.config({
                debug: false,
                appId: e.data.data.appid,
                timestamp: e.data.data.timestamp,
                nonceStr: e.data.data.noncestr,
                signature: e.data.data.signature,
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
              })
              wx.ready(function () {
                wx.onMenuShareTimeline({
                  title: '信用卡办理', // 分享标题

                  link: link,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: 'https://www.xiaofeishuwangluo.com/logo/logo.png', // 分享图标
                  success: function () {
                  },
                  cancel: function () {
                  }
                });
                wx.onMenuShareAppMessage({
                  title: "信用卡办理", // 分享标题
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
    add(){
        this.show1 = true
    },
    dis(){
        this.show1 = false
      },
    shenqing(cid){
      this.$router.push({path:'/recommain',query:{cid:cid,sid:this.sid}})
    }
  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
  }
  .weui-grids{
    margin-top:5px;
  }
  .weui-grid{
    padding-bottom: 40px;
  }
  .vux-divider:before{
    background-position:right 0 top 50%
  }
  .vux-divider:after{
    background-position:left 0 top 50%
  }

  .text{
    width: 50%;height: 17px;
    padding: 1px;background: #ef6519;font-size: 12px;
    position: absolute;top: 0;bottom: 0;left: 0;right: 0;margin: auto
  }
  .naniu{
    border: 1px solid #F6C93C;
    color: #F6C93C!important;text-align: center;
    padding: 5px 5px;
    width: 80%;
    border-radius: 2px;
    margin: 10px  0 0;
  }
  .zi{
    text-overflow:ellipsis;
    transform: scale(0.9);margin-top:2px;
    overflow: hidden;
    white-space: nowrap;
  }
  .card{
    box-shadow: 0px -2px 0px 0px #e8e4e4, -2px 0px 0px 0px #e8e4e4,2px 0px 0px 0px #e8e4e4,0px 2px 0px 0px #e8e4e4;
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
   bottom: 5%;z-index: 100;width: 10%;right: 0;left: 0;margin: auto;
 }
  .zi1{
      width: 100%;
      height: auto;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
  }
</style>
