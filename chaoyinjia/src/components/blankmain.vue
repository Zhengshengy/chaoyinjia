<template>
  <div>
    <div class="concon" v-html="con" ></div>
    <Bottom :blanklogo='blanklogo'  :cids="cids" :creditcardId="creditcardId" :cname="cname" :channel="channel" :reward="reward" :blankurl="blankurl"
    />
    <Footer></Footer>
    <div style="height: 100px"></div>
  </div>
</template>
<script>
  import Bottom from '@/components/bottom'
  import Footer from '@/components/footer'
  import wx from 'weixin-js-sdk'
  export default {
    name: 'blankmain',
    components: {
      Bottom,
      Footer
    },
    data(){
      return{
        con:'',
        blanklogo:'',
        uid:'',
        url:'',
        cids:'',
        cname:'',
        channel:'',
        creditcardId:'',
        reward:'',
        blankurl:'',
        cimg:''
      }
    },
    created(){
      let cid = this.$route.query.cid
      console.log(cid)
      this.cids = this.$route.query.cid
      this.uid = localStorage.getItem('userid')
      this.$ajax(`https://www.xiaofeishuwangluo.com/creditcard/selectCreditCardByKey?uid=${this.uid}&cid=${cid}`).then(e=>{
        console.log(e)
        this.con = e.data.data.blankdetails
        this.blanklogo = e.data.data.blanklogo
        console.log(this.con)
        this.cname =   e.data.data.cname
        this.channel = e.data.data.channel
        this.creditcardId = e.data.data.cid
        this.reward = e.data.data.reward
        this.blankurl = e.data.data.blankurl
        this.cimg = e.data.data.cimg
      })
        var cimg = this.cimg
        var cname = this.cname+'信用卡办理'
        var link = `https://www.xiaofeishuwangluo.com/blank/#/recommain?userid=${this.uid}&cid=${cid}`
        var desc="芝麻银家服务平台，多家银行任意申请，秒批高额度，特约办理通道";


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
    background: blue;
  }
</style>
