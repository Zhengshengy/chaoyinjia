<template>
  <div>
    <div class="concon" v-html="con" ></div>
  <Bottom :blanklogo='blanklogo' />
  </div>
</template>
<script>
  import Bottom from '@/components/bottom'
  export default {
    name: 'blankmain',
    components: {
      Bottom,
    },
    data(){
      return{
        con:'',
        blanklogo:'',
        uid:'',
        url:''
      }
    },
    created(){
      let cid = this.$route.query.cid
      this.uid = localStorage.getItem('userid')
      this.url = encodeURI(location.href.split('#')[0])
      this.$ajax(`https://www.xiaofeishuwangluo.com/creditcard/selectCreditCardByKey?uid=3&cid=${cid}`).then(e=>{
        console.log(e)
        this.con = e.data.data.blankdetails
        this.blanklogo = e.data.data.blanklogo
        console.log(this.con)
      })
      var link = 'https://www.xiaofeishuwangluo.com/blank/#/center?userid='+this.uid
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
                  alert('分享成功')
                },
                cancel: function () {
                  // this.showSuccess = true
                  // this.text = "分享失败"
                  alert('分享失败')
                }
              });
              wx.onMenuShareAppMessage({
                title: '免费零投入，全民创业梦，跟着银行一起创业去！', // 分享标题
                link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                desc: desc,
                imgUrl: 'https://www.xiaofeishuwangluo.com/logo/logo.png', // 分享图标
                success: function () {
                  // this.showSuccess = true
                  // this.text = "分享成功"
                  alert('分享成功')
                },
                cancel: function () {
                  // this.showSuccess = true
                  // this.text = "分享失败"
                  alert('分享失败')
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
