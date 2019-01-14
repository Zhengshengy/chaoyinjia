<!--结算-->
<template>
    <div class="closing">
        <div class="context">
            填写结算信息
        </div>
    <div style="padding:10px 10px 10px;background: #fff">
        <div class="bonsave">
            <div class="vitext">支付宝账号：
                <input type="text" style="outline:none;" v-model="alipayno">
            </div>
            <div class="vitext">手机号：
                <input type="text" style="width: 60%;" v-model="userphone" disabled>
                <div @click="checkcode" v-if="huocode==true" style="color: #f9c63c;float: right" >
                获取验证码
                </div>
                <div  v-else-if="huocode==false" style="float: right">
                <countdown  v-model="time" :start="start" @on-finish="finish">
                </countdown>
                <span>s</span>

            </div>
            </div>

            <div class="vitext">验证码：
                <input type="text" style="outline:none;" v-model="checkCode"></div>
            <div class="vitext">结算金额：
                <input type="number" style="outline:none;" v-model="money" @blur="gun"></div>
        </div>
      <div style="margin-top: 10px;background: #fff;padding: 10px 15px"></div>
      <div style="background: #fff;padding: 0px 15px 10px;color: #B5B5B5">
          <div class="text_cn">
              <h3 style="text-align: center;font-size: 14px;color:#474747;margin-bottom: 15px">注意事项</h3>
            <div class="text_ne">1、输入的结算金额必须是整数。</div>
            <div class="text_ne">2、如果结算系统繁忙，结算讲话延迟到账</div>
            <div class="text_ne">3、提现金额将于两小时之内到账，如有问题请联系客服。</div>
          </div>
    </div>
      <!--<div style="height: 40px">-->
    </div>
      <div style="position: fixed;bottom: 0;left: 0;width: 100%">
      <div v-if="sub2==true"  class="sub">
        <span>确认</span>
    </div>
        <div v-else @click="submit" class="sub1">
        <span>确认</span>
    </div>
          <div style="display:none" >{{ exitsVal }}</div>
    </div>
     <toast v-model="show2" type="text">{{message}}</toast>
      <Retu />
    </div>
</template>
<script>
import { Cell, XButton, Countdown,Toast } from 'vux'
import Retu from '@/components/retu'
export default {
    name:'Closing',
  components: {
    Cell,
    XButton,
    Countdown,
    Retu,
    Toast
  },
    computed:{
    exitsVal:function(){
        this.ifExist=Number(Boolean(this.alipayno))+Number(Boolean(this.userphone))+Number(Boolean(this.checkCode))+Number(Boolean(this.money))
    }
  },
  watch:{
      ifExist(newVal,oldVal){
      if(Number(newVal) === 4){
        this.sub2 = false
      }else{
        this.sub2 = true
      }
    }
},
    data () {
    return {
      alipayno:'',
      userphone:'',
      checkCode:'',
      money:'',
      sub2:true,
      ifExist:0,
      start:false,
      huocode:true,
      time:180,
      phone:'',
      show2:false,
      message:''
    }
  },
    mounted(){
      this.userphone = localStorage.getItem('userphone').replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      this.phone=localStorage.getItem('userphone')
    },
    methods:{
        submit(){
            let uid = localStorage.getItem('userid')
            this.$ajax.get(`https://www.xiaofeishuwangluo.com//moneydetails/drawcash?uid=${uid}&money=${this.money}&alipayno=${this.alipayno}&userphone=${this.phone}&checkCode=${this.checkCode}`).then(e=>{
                console.log(e)
                if (e.data.status==200){
                     this.show2 = true
                     this.message = "提现成功"
                    this.$router.push('/deposit')
                }else if (e.data.status==500){
                    this.show2 = true
                    this.message = e.data.msg

                }
            })
        },
        checkcode(){
          let phone = localStorage.getItem('userphone')
        this.$ajax.get('https://www.xiaofeishuwangluo.com/sms/sendingSMS?userphone='+phone).then(e => {
          this.huocode = false
          this.start = true
      })
        },
        finish (index) {
      this.huocode = true
      this.start = false
      this.time = 180
    },
      gun(){
          window.scrollTo(0, 0);
      }
    }
}
</script>
<style scoped>
.closing{
    width:100%;
    height: 627px;
}
.closing::before {
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    z-index: -100;
}
.context{
    text-align: center;
    font-size: 16px;
    width:100%;
    line-height: 100%;
    padding: 25px 0 0px;
    background: #fff;
}
  .bonsave{
      padding: 5px 5px 0;
  }
  .bonsave input{
      outline:none;border-width: 0;
      font-size: 14px; color: #000000;
      background: #fff;
  }
  .vitext{
      width: 100%;
      border-bottom: 1px solid #c1c1c1;
      font-size: 14px; color: #5d5d5d;
      padding: 13px 0;
  }
    .text_cn{
        background: #FBFBFB;
        padding: 8px;
    }
    .text_ne{
        font-size: 12px;
        margin-top: 5px;
        letter-spacing:1px;
    }
.sub{
  position: fixed;bottom: 0;left: 0;width: 100%;background-color: #ccc;font-size: 14px;text-align: center;line-height: 42px;color: #fff
}
.sub1{
  position: fixed;bottom: 0;left: 0;width: 100%;font-size: 14px;text-align: center;line-height: 42px;color: #fff;
  background: rgb(251,203,31);
}
</style>
