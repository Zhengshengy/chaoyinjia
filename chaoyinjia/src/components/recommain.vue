<template>
  <div>
    <div class="concon" v-html="con"></div>
    <Recobottom :sid="sid" :cid="cid" :creditcardId="creditcardId" :cname="cname" :channel="channel" :reward="reward" :blankurl="blankurl"  />
  </div>
</template>
<script>
  import Recobottom from '@/components/recobottom'
  import wx from 'weixin-js-sdk'
  export default {
    name: 'Recomain',
    components: {
      Recobottom,
    },
    data(){
      return{
        con:'',
        blanklogo:'',
        sid:'',
        url:'',
        cid:'',
        cname:'',
        channel:'',
        creditcardId:'',
        reward:'',
        blankurl:'',
        cimg:'',
        userid:''
      }
    },
    created(){
      function getUrlKey(name){//获取url 参数
   return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;}
      this.userid = localStorage.getItem('userid')
      this.cid = this.$route.query.cid
      let uid = getUrlKey('userid')
      if (uid){
        this.sid = uid
      } else {
        this.sid = this.$route.query.sid
      }

      // if (uid){
      //      this.sid = uid
      //    } else if(!uid){
      //      if (localStorage.getItem('ustatus')=='2'){
      //       this.sid = localStorage.getItem('userid')
      //     }else {
      //       this.sid = '1'
      //     }
      //   }

      this.$ajax(`https://www.xiaofeishuwangluo.com/creditcard/selectCreditCardByKey?uid=${this.userid}&cid=${this.cid}`).then(e=>{
        console.log(e)
        this.con = e.data.data.blankdetails
        this.blanklogo = e.data.data.blanklogo
        this.cname =   e.data.data.cname
        this.channel = e.data.data.channel
        this.creditcardId = e.data.data.cid
        this.reward = e.data.data.reward
        this.blankurl = e.data.data.blankurl
        this.cimg = e.data.data.cimg

        var link = `https://www.xiaofeishuwangluo.com/blank/?#/recommain?userid=${this.userid}&cid=${this.cid}`
        var desc="芝麻银家服务平台，多家银行任意申请，秒批高额度，特约办理通道";
        var cname = this.cname+'信用卡办理'
        var cimg = this.cimg
        this.url = encodeURI(location.href.split('#')[0])
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
                title: cname, // 分享标题

                link:  link,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: cimg, // 分享图标
                success: function () {
                },
                cancel: function () {
                }
              });
              wx.onMenuShareAppMessage({
                title: cname, // 分享标题
                link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                desc: desc,
                imgUrl: cimg, // 分享图标
                success: function () {
                },
                cancel: function () {
                }
              })
            });
            }
        })
      })

    },
  }
</script>
<style>
  .concon img{
    width: 100%;
    height: auto;
  }
  .dibudibu{
    width: 100%;
    height: 10%;
    position: fixed;
    bottom: 0;
  }
</style>
