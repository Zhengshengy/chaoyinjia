<template>
    <div id="schedule">
        <div class="progress" @click="add">
            <img src="../assets/blank.png" alt="" style="width: 100%">
        </div>
        <div class="buttocon">
        <div class="bonsave">
            <div class="vitext">姓名：
                <input type="text" style="outline:none;" v-model="username" placeholder="请输入姓名">
            </div>
            <div class="vitext">身份证号：
                <input type="text" style="outline:none;" @on-blur="vadait" placeholder="请输入身份证号" v-model="idcard">
            </div>
            <div class="vitext">手机号：
                <input type="text" style="width: 60%;" v-model="userphone" placeholder="请输入手机号">
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
                <input type="text" style="outline:none;" v-model="checkCode" placeholder="请输入验证码"></div>
            <div class="vitext">图片验证码：
                <input type="text" style="outline:none;" v-model="piccode" placeholder="请输入验证码"></div>
        </div>
            <div @click="submit" :class="{ 'sub': sub2, 'sub1': sub3} ">
            <span>确认</span>
            </div>
            <div class="bots">
                <div class="ston">注意事项</div>
                <div class="text">
                    请输入与申请人提交的信用卡申请资料一致的身份证号码或手机号码，否则，无法查询到信用卡申请进度。
                </div>
            </div>
        </div>
      <div class="become" v-show="show1==true">
        <div class="dext">
          <img class="daili" src="../assets/kefu.png" alt="">
          <div class="tomut">
            <div class="ontom">
              <div class="font" style="font-size: 20px;text-align: center;font-weight: 600;margin: 10px 0;color: #000">芝麻银家官方客服</div>
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
      <Retu/>
    </div>
</template>
<script>
import { XButton, XInput,Box, GroupTitle, Group, Divider,Countdown  } from 'vux'
import Retu from '@/components/retu'
import Footer from '@/components/footer'

export default {
  name:'schCenter',
  components: {
    Countdown,
    Footer,
    XButton,
    XInput,
    Box,
    GroupTitle,
    Group,
    Divider,
    Retu
  },
  data(){
    return{
      show1:false,
      huocode:true,
      messages:'',
      show2:false,
      time: 60,
      value: '',
      start: false,
      sub2:true,
      sub3:false,
      username:'',
      idcard:'',
      userphone:'',
      checkCode:'',
      piccode:''
    }
  },
  created(){
    let pid = this.$route.query.pid
    this.$ajax('https://www.xiaofeishuwangluo.com/progressquery/selectProgressQueryByKey?creditcardId='+pid).then(e=>{
      console.log(e)
    })
  },
  methods:{
        add(){
        this.show1 = true
        },

        dis(){
        this.show1 = false
        },
    checkcode(){
      if (this.userphone){
        this.$ajax.get('https://www.xiaofeishuwangluo.com/sms/sendingSMS?userphone='+this.userphone).then(e=>{
          this.huocode = false
          this.start = true
      })
      }
    },
    finish (index) {
      this.huocode = true
      this.start = false
      this.time = 60
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
        },
    submit(){

    }

      }
}
</script>
<style scoped>
    html{
        background: #fff !important;
    }
    #schedule{
        width: 100%;
        height: 100%;
        /*background: #fff !important;*/
    }
    .progress{
        width:100%;
    }
    .buttocon{
        width:95%;
        margin: 0 auto;
    }
    .weui-cells__title{
        font-size: 15px !important;
        margin: 10px 0 10px;
        font-weight: 800;
    }
    .weui-cell__hd{
        margin-top: 5px;
    }
    .weui-cell__hd .weui-label{
        font-size: 14px !important;
    }
    .weui-btn.weui-btn_default{
        background: #F6C93C;
        margin: 20px 0 20px;
    }
    .bots{
        background: #fff;
      padding: 0 15px;
      margin-top: 20px;
    }
    .ston{
        text-align: center;
        font-size: 14px;
        padding-top: 10px;
        margin-bottom: 10px;
    }
    .text{
        font-size: 12px;
        padding-bottom: 20px;
        color:#BCBCBC;
        letter-spacing:1px;
    }

  .bonsave{
      padding: 5px 15px 0;
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
        .sub{
  position: fixed;bottom: 0;left: 0;width: 100%;background-color: #ccc;font-size: 14px;text-align: center;line-height: 42px;color: #fff
}
.sub1{
  position: fixed;bottom: 0;left: 0;width: 100%;font-size: 14px;text-align: center;line-height: 42px;color: #fff;
  background: rgb(251,203,31);
}
</style>
