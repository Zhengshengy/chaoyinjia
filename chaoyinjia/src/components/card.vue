<template>
  <div style="background: #F5F5F5">
    <div class="top" @click="add">
      <img src="../assets/blank.png" alt="" style="width: 100%">
    </div>
    <div class="card" style="width:89%;margin:15px auto 0;padding: 10px;background: #fff;border-radius: 5px">
      <flexbox :gutter='30'>
      <flexbox-item><div class="flex-demo">
        <img :src='cdetails.cimg' alt="" style="width: 100%;height: auto">
      </div></flexbox-item>
      <flexbox-item><div class="flex-demo">
        <flexbox orient="vertical" :gutter="0">
      <flexbox-item><div class="flex-demo" style="font-size: 14px">
        <span class="zi">{{cdetails.cname}}</span>
      </div></flexbox-item>
      <flexbox-item><div class="flex-demo">
        <span class="zi" style="color: #c1c1c1">{{cdetails.cremarks}}</span>
      </div></flexbox-item>
      <flexbox-item><div class="flex-demo" @click="shenqing(cdetails.cid)">
        <div class="naniu">立即申请</div>
      </div></flexbox-item>
    </flexbox>
      </div></flexbox-item>
    </flexbox>
    </div>
    <div class="main" style="padding: 10px 10px 0">
      <span style="font-size: 14px;">推荐银行</span>
      <Banka style="margin-top: 5px" :main="main"  />
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
      headImgUrl:'',
      main:[],
      cdetails:{},
      show1:false
    }
  },

  created() {
    if (localStorage.getItem('openid')) {
        let openid = localStorage.getItem('openid')
        this.$ajax.get('https://www.xiaofeishuwangluo.com/creditcard/selectCreditCard?openid='+openid)
      .then(response => {
        console.log(response)
          this.cdetails = response.data.data.cdetails[0]
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
          obj.grade = response.data.data.grade
          this.main.push(obj)
        })
      })
    }else {
      function getUrlKey(name){//获取url 参数
   return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;}
      let openid=getUrlKey("openid");
       localStorage.setItem('openid', openid)
      if (!openid)  {
        window.location.href = 'https://www.xiaofeishuwangluo.com/wxpublic/open?state=2'
      }else {
        let openid = getUrlKey('openid')
        localStorage.setItem('openid', openid)
        this.$ajax.get('https://www.xiaofeishuwangluo.com/creditcard/selectCreditCard?openid='+openid).then(response=>{
          this.cdetails = response.data.data.cdetails[0]
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
          obj.grade = response.data.data.grade
          this.main.push(obj)
        })
        })

      }
    }
  },
  methods:{
    add(){
        this.show1 = true
    },
    dis(){
        this.show1 = false
      },
    shenqing(cid){
      this.$router.push({path:'/blankmain',query:{cid:cid}})
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
    margin: 20px  0 0;
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
   bottom: 15%;z-index: 100;width: 10%;right: 0;left: 0;margin: auto;
 }
</style>
