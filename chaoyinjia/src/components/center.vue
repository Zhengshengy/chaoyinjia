<template>
  <div class="bigbox">
    <div class="pic">
      <img src="../assets/pic.png" alt="">
    </div>
    <div style="background: #F5F5F5">
      <group label-width="5em" style="background: #ffffff;padding: 10px">
      <x-input title="姓名"  placeholder="请输入名称" v-model="username"></x-input>
      <x-input title="身份证号" @on-blur="vadait" placeholder="请输入申请人身份证号" v-model="idcard"></x-input>
      <x-input title="手机号码" name="mobile" placeholder="请输入申请人手机号" keyboard="number" is-type="china-mobile" v-model="userphone"></x-input>
      <x-input title="验证码" :show-clear='false'   placeholder="请输入名称" v-model="checkCode">
      <div slot="right" v-show="huocode==true">
         <div @click="checkcode"    style="color: rgb(251,203,31);border: 1px solid;padding: 5px;font-size: 12px" >获取验证码
  </div>
      </div>
        <div slot="right" v-show="huocode==false">
          <countdown  v-model="time" :start="start" @on-finish="finish"></countdown>
        <span>s</span>
        </div>
      </x-input>
      <x-input title="微信号" placeholder="请输入微信号（选填）" v-model="wechatno"></x-input>
    </group>
      <div style="margin-top: 5px;background: #fff;padding: 10px 20px">
        <flexbox>
        <flexbox-item :span="1"><div class="flex-demo">
          <div>
            <img src="../assets/agree.png" style="width: 60%;height: auto;float: right" alt="">
          </div>
        </div></flexbox-item>
          <flexbox-item><div class="flex-demo"><div style="color: #5D5D5D">我已认真阅读并完全同意《芝麻银家服务条款》的所有条款</div></div></flexbox-item>
    </flexbox>

    </div>
      <div style="margin-top: 5px;background: #fff;padding: 10px 25px;color: rgba(0,0,0,.5)">
        <div style="text-align: center;color: #5D5D5D;font-size: 14px;margin: 5px 0 9px">注意事项</div>
        <div style="margin-bottom: 1px">1、必须填写真实的个人信息，否则无法在平台办理任何业务。</div>
        <div style="margin-bottom: 1px">2、办卡申请提交之后，可关注芝麻公众号随时查询办卡进度。</div>
        <div style="margin-bottom: 1px">3、在芝麻银家申请信用卡不收取任何费用，凡是索取均为欺诈，请不要相信！</div>
        <div style="margin-bottom: 1px">4、会员资料与银行无关，芝麻银家对此资料提供隐私保存。</div>
        <div>5、平台监督举报电话：02989523244，举报属实者均有现金奖励。</div>
    </div>
      <div style="height: 35px">
    </div>
      <div @click="submit" :class="{ 'sub': sub2, 'sub1': sub3} ">
        <span>确认信息</span>
    </div>
    </div>
    <toast v-model="show2" type="text" >{{messages}}</toast>
    <div style="display:none" >{{ exitsVal }}</div>
  </div>
</template>

<script>
import {XButton, Box,Flexbox, FlexboxItem,  Group, XInput,CheckIcon,Countdown ,Toast} from 'vux'

export default {
  name:'Center',
  components: {
    Group,
    XInput,
    CheckIcon,
    XButton,
    Box,
    Countdown,
    Toast,
    Flexbox, FlexboxItem,
  },
  data () {
    return {
      show2:false,
      huocode:true,
      time: 60,
      value: '',
      start: false,
      sub2:true,
      sub3:false,
      username: '',
      uid:null,
      superior_uid: null,
      idcard: '',
      wechatno: '',
      userphone: '',
      checkCode:"",
      demo1:true,
      ifExist:null,
      messages:''
    }
  },
  computed:{
    exitsVal:function(){
        this.ifExist=Number(Boolean(this.username))+Number(Boolean(this.idcard))+Number(Boolean(this.wechatno))+Number(Boolean(this.userphone))+Number(Boolean(this.checkCode))
    }
  },
  watch:{
      ifExist(newVal,oldVal){
      if(Number(newVal) === 5){
        this.sub2 = false
        this.sub3 = true
      }else{
        this.sub3 = false
        this.sub2 = true
      }
    }
},
    created(){
      console.log(this.superior_uid)
    if (localStorage.getItem('openid')) {
        this.superior_uid = getUrlKey("userid") ? getUrlKey("userid") :1
        this.uid = localStorage.getItem("userid")
    }else {
      let openid=getUrlKey("openid");
      let uid=getUrlKey("userid");
      if (!openid)  {
        if (uid){
          window.location.href = 'https://www.xiaofeishuwangluo.com/wxpublic/open?state=6'+uid
        } else {
          window.location.href = 'https://www.xiaofeishuwangluo.com/wxpublic/open?state=6'
        }

      }else {
        this.$ajax.get('https://www.xiaofeishuwangluo.com/wxpublic/selectUserByOpenid?openid='+openid)
      .then(response => {
        console.log(response)
        localStorage.setItem('openid', response.data.data.openid)
        this.uid = response.data.data.userid
        localStorage.setItem('username', response.data.data.nickname)
        localStorage.setItem('headImgUrl', response.data.data.headImgUrl)
        localStorage.setItem('userid', response.data.data.userid)
        localStorage.setItem('userphone', response.data.data.userphone)
        localStorage.setItem('ustatus', response.data.data.ustatus)
        localStorage.setItem('openid', response.data.data.openid)
        let that = this
        this.userId = response.data.data.userid
         if (response.data.data.ustatus == '2'){
          this.$ajax.post('https://www.xiaofeishuwangluo.com/agentdetails/selectAgentDetailsByUid?uid='+this.userId)
      .then(e => {
        if (e.data.data.grade == '1'){
          that.grade = "经理"
        }else if (e.data.data.grade == '2'){
          that.grade = "总监"
        }else if (e.data.data.grade == '3'){
          that.grade = "银行家"
        }
        localStorage.setItem('grade', that.grade)
      }).catch((error)=>{
        console.log(error)
          })
        }
      })
      // })
      }
    }

    function getUrlKey(name){//获取url 参数
   return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;}

  },
  methods:{
    submit(){
      if (this.sub3==true){
      this.$ajax.get(`https://www.xiaofeishuwangluo.com/agentdetails/saveAgetDetails?uid=${this.uid}&superior_uid=${this.superior_uid}&username=${this.username}&idcard=${this.idcard}&wechatno=${this.wechatno}&userphone=${this.userphone}&checkCode=${this.checkCode}`).then(e=>{
        if (e.data.status==200){
          this.$router.push('/been')
        } else if (e.data.status==500)
          this.show2 = true
          this.messages = e.data.msg
      })
      }

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
    }
  }
}
</script>

<style>
.vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before {
  color: rgb(251,203,31)!important;
}
.center {
  text-align: center;
  padding-top: 20px;
  color: #fff;
  font-size: 18px;
}
.center img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #ececec;
}
.sub{
  position: fixed;bottom: 0;left: 0;width: 100%;background-color: #ccc;font-size: 14px;text-align: center;line-height: 42px;color: #fff
}
.sub1{
  position: fixed;bottom: 0;left: 0;width: 100%;font-size: 14px;text-align: center;line-height: 42px;color: #fff;
  background: rgb(251,203,31);
}
.pic{
  width: 100%;
  background: #F5F5F5;
  margin-bottom: 2px;
}
  .pic img{
    width: 100%;
    height: auto;
  }
.weui-label{
  color: #5D5D5D;
  font-size: 14px;
}
.weui-cells::before  {
  display: none;
}
.weui-cell{
  padding: 10px 10px!important;
}
  .weui-cells{
    margin-top: 0!important;
    padding: 0 10px;
  }
.bigbox::before{
    content:" ";
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    background-color:#F5F5F5;
    z-index:-100;
  }
.weui-input{
  font-size: 14px!important;
}
</style>
