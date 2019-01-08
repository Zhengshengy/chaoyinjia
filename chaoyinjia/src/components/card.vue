<template>
  <div style="background: #F5F5F5">
    <div class="top">
      <img src="" alt="">
    </div>
    <div class="card" style="margin:15px auto 0;padding: 10px;background: #fff">
      <flexbox>
      <flexbox-item><div class="flex-demo">1</div></flexbox-item>
      <flexbox-item><div class="flex-demo">
        <span style="font-weight: 600">平安曼联红魔...</span><br>
        <span style="color: #a7a4a4">绯红模印花纹...</span>
        <span style="color: #a7a4a4">刷卡免年费</span>
      </div></flexbox-item>
      <flexbox-item><div class="flex-demo">
        <div style="text-align: center;border: 2px solid #ff008d9c;padding: 5px 10px;color: #ff008d9c;border-radius: 5px">立即申请</div>
      </div></flexbox-item>
    </flexbox>
    </div>
    <div class="main" style="padding: 10px 10px 0">
      <span style="font-weight: 600;">推荐银行</span>
      <Banka style="margin-top: 5px" />
    </div>
      <div>
         <Footer />
      </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem,Grid, GridItem,Divider} from 'vux'
import Footer from '@/components/footer'
import Banka from '@/components/banka'

  export default {
  name:'Card',
  components: {
    Flexbox,
    FlexboxItem,
    Grid,
    GridItem,
    Divider,
    Footer,
    Banka
  },

  data () {
    return {
      username:'',
      headImgUrl:''
    }
  },
  beforeCreate() {
    if (localStorage.getItem('openid')) {
        this.$ajax.get('https://www.xiaofeishuwangluo.com/creditcard/selectCreditCard?openid='+openid)
      .then(response => {
        console.log(response)
          .catch(error => {
            console.log(error)
          })
      })
    }else {
      function getUrlKey(name){//获取url 参数
   return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;}
      let openid=getUrlKey("openid");
      if (!openid)  {
        window.location.href = 'https://www.xiaofeishuwangluo.com/wxpublic/open?state=1'
      }else {
        let openid = this.getUrl(openid)
        this.$ajax.get('https://www.xiaofeishuwangluo.com/creditcard/selectCreditCard?openid='+openid).then(e=>{
          console.log(e)
        })

      }
    }
  },
  methods:{

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
</style>
