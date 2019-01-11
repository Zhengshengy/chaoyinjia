<template>
    <div class="closing">
        <div class="progress">
             <img src="../assets/jiesuanI.png" width="100%" alt="">
        </div>
        <div class="context">
            填写申请人信息：
        </div>
      <div style="padding:0px 0px 5px;">
        <div class="bonsave">
          <div class="vitext">姓名:
              <input type="text" placeholder="请输入真实姓名" style="outline:none;" v-model="name">
          </div>
          <div class="vitext">身份证号：
              <input type="text" placeholder="请输入申请人身份证号" style="outline:none;" v-model="idcard" @blur="vadait"></div>
          <div class="vitext">手机号：
              <input type="number" placeholder="请输入申请人手机号" style="outline:none;" v-model="userphone"></div>
          </div>
      </div>
      <div style="background: #fff;padding: 0px 5px 10px;color: #B5B5B5;">
          <div class="text_cn">
            <div class="text_ne">1、请务必填写申请人真实个人信息,身份证号码务必填写正确。</div>
            <div class="text_ne">2、办卡审核通知将直接以短信的形式发送至手机。</div>
            <div class="text_ne">3、芝麻银家平台申请信用卡不收任何费用，如果需要用请向平台客服举报。</div>
          </div>
    </div>
      <div class="herder">
         <flexbox>
            <flexbox-item :span="1"><div class="flex-demo">
              <div class="sting">
                <img src="../assets/agree.png"  alt="">
              </div>
            </div></flexbox-item>
              <flexbox-item><div class="flex-demo"><div style="color: #5D5D5D;letter-spacing:1px;">我已认真阅读并完全同意《芝麻银家服务条款》的所有条款</div></div></flexbox-item>
        </flexbox>
        <div class="fontS" @click="submit">
            <span>下一步</span>
        </div>
       </div>
      <div class="disfoot" style="position: fixed;bottom: 0;">
        <Footer></Footer>
      </div>
      <toast v-model="show2" type="text" >{{messages}}</toast>
    </div>
</template>
<script>
import { Cell, XButton, Countdown,Flexbox, FlexboxItem,Toast } from 'vux'
import Footer from '@/components/footer'
export default {
    name:'Apply',
  components: {
    Cell,
    XButton,
    Countdown,
    Flexbox,
    FlexboxItem,
    Footer,
    Toast
  },
  data(){
      return{
        name:'',
        idcard:'',
        userphone:'',
        show2:false,
        messages:'',
        blankurl:''
      }
  },
  methods:{
    submit(){
      let sid = this.$route.query.sid
      let cid = this.$route.query.cid
      let creditcardId = this.$route.query.creditcardId
      let cname = this.$route.query.cname
      let channel = this.$route.query.channel
      let reward = this.$route.query.reward
      this.blankurl = this.$route.query.blankurl
      console.log(this.blankurl)
      this.$ajax.get(`https://www.xiaofeishuwangluo.com/applicationdetails/savenApplicationDetails?applicationName=${this.name}&applicationIdcard=${this.idcard}&recommendUid=1&blankname=${cname}&applicationPhone=${this.userphone}&channel=${channel}&creditcardId=${creditcardId}&reward=${reward}`).then(e=>{
        console.log(e)
        if (e.data.status==200){
          window.location.href = this.blankurl
        }
      })
    },
    vadait(){
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (this.idcard === '') {
        this.show2 = true
     this.messages = '身份证号不能为空';
      }else if(!reg.test(this.idcard)){
        this.show2 = true
     this.messages = '请输入正确的身份证号';
    }
    }
  }

}
</script>
<style scoped>
.closing{
    width:100%;
    height: 100%;
   background: #f5f5f5;
}
.closing::before{
content:" ";
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    background-color:#F5F5F5;
    z-index:-100;
}
.context{
    text-align: left;
    font-size: 16px;
    width: 85%;margin: 0 auto;
    padding: 8px 0 8px;
}
  .bonsave{
      padding: 5px 28px 0px;
      background: #fff;
  }
  .bonsave input{
      outline:none;border-width: 0;
      font-size: 14px; color: #000000;
      background: #fff;
  }
  .vitext{
      width: 100%;
      border-bottom: 1px solid #C7C7C7;
      font-size: 14px; color: #5d5d5d;
      padding: 12px 0;
  }
    .text_cn{
        padding: 5px 8px;
    }
    .text_ne{
        font-size: 13px;
        margin-top: 3px;
        letter-spacing:1px;
    }
      .vitext:nth-child(3){
    border-bottom: 0;
    padding: 13px 0;
  }
    .herder{
      padding: 15px 10px;
    }
    .sting{
      width: 100%;
    }
    .sting img{
       width: 50%;height: auto;float: right;
    }
    .fontS{
       width: 60%;margin:10px auto 0;padding: 8px;background: #f9c63c;
      font-size: 14px;color:#fff;text-align: center;
    }
.sub{
  position: fixed;bottom: 0;left: 0;width: 100%;background-color: #ccc;font-size: 14px;text-align: center;line-height: 42px;color: #fff
}
.sub1{
  position: fixed;bottom: 0;left: 0;width: 100%;font-size: 14px;text-align: center;line-height: 42px;color: #fff;
  background: rgb(251,203,31);
}
</style>
