<template>
    <div id="schedule">
        <div class="progress" @click="add">
            <img src="../assets/blank.png" alt="" style="width: 100%" >
        </div>
        <div class="buttocon">
        <div class="bonsave">
            <div class="vitext" v-show="nameState==1">姓名：
                <input type="text" style="outline:none;" v-model="username" :placeholder="placename">
            </div>
            <div class="vitext" v-show='idcardState==1'>身份证号：
                <input type="text" style="outline:none;" @on-blur="vadait" :placeholder="placeidcard" v-model="idcard">

            </div>
          <div class="vitext" v-show="validateState==1" style="position: relative">图片验证码：
                <input type="text" style="outline:none;" v-model="piccode" placeholder="请输入验证码">
            <spinner v-if="jiazai==true"  :size="0 === 3 ? '10px' : ''" style="position: absolute;right: 0"></spinner>
              <img  v-else :src="src" alt="" class="checktu" @click="huoqu(pid)">
            </div>
            <div class="vitext" v-show="phoneState==1" style="position: relative">手机号：
                <input type="text" style="width: 60%;" v-model="userphone" :placeholder="placephone">
                <div @click="checkcode" v-if="huocode==true" style="color: #f9c63c;position: absolute;right: 25%;right: 0" >
                获取验证码
                </div>
                <div  v-else-if="huocode==false" style="float: right">
                <countdown  v-model="time" :start="start" @on-finish="finish">
                </countdown>
                <span>s</span>

            </div>
            </div>
            <div class="vitext" v-show="checkcodeState==1">验证码：
                <input type="text" style="outline:none;position: relative" v-model="checkCode" placeholder="请输入验证码" ></div>

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
          <div style="height: 300px"></div>
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
      <div class="chaxun" v-show="chaxun==true">
        <div class="box">
          <div style="font-weight: 600;font-size: 18px;line-height: 20px;margin: 30px 0">查询结果</div>
          <flexbox>
            <flexbox-item><div class="flex-demo" style="font-weight: 600">申请卡种</div></flexbox-item>
            <flexbox-item><div class="flex-demo" style="font-weight: 600">审批日期</div></flexbox-item>
            <flexbox-item><div class="flex-demo" style="font-weight: 600">申请状态</div></flexbox-item>
            <flexbox-item><div class="flex-demo" style="font-weight: 600">其他说明</div></flexbox-item>
          </flexbox>
          <flexbox style="margin: 20px 0 0">
            <flexbox-item><div class="flex-demo" style="text-align: center">{{type}}</div></flexbox-item>
            <flexbox-item><div class="flex-demo" style="color: #808080;">{{endTime}}</div></flexbox-item>
            <flexbox-item><div class="flex-demo" style="color: #808080;">{{state}}</div></flexbox-item>
            <flexbox-item><div class="flex-demo" style="color: #808080;">无</div></flexbox-item>
          </flexbox>
          <div style="border-bottom: 1px dashed;margin: 20px auto"></div>
          <div style="font-size: 18px;margin: 20px 10px;text-align: left">状态说明</div>
          <div style="text-align: left;margin-left: 10px;color: #808080;">审核中：银行还没有给出具体审核结果。</div>
           <div style="text-align: left;margin: 5px 10px;color: #808080;">已通过：信用卡申请通过，进入系统审核阶段，系统审核通过之后即可获得佣金和红包。</div>
           <div style="text-align: left;margin: 5px 10px;color: #808080;">未通过：被银行拒绝或不满足平台条件。</div>
        </div>
      </div>
      <Retu/>
      <div v-transfer-dom>
      <confirm v-model="show2"
      :title="tit" :show-cancel-button="false"
      @on-confirm="onConfirm">
        <p style="text-align:center;">{{messages}}</p>
      </confirm>
    </div>
    </div>
</template>
<script>
import {  Confirm,XInput,Box, GroupTitle, Group, Divider,Countdown , Flexbox, FlexboxItem,TransferDomDirective as TransferDom,Spinner } from 'vux'
import Retu from '@/components/retu'
import Footer from '@/components/footer'
export default {
  name:'schCenter',
  directives: {
    TransferDom
  },
  components: {
    Countdown,
    Footer,
    XInput,
    Box,
    GroupTitle,
    Group,
    Divider,
    Retu,
     Flexbox, FlexboxItem,Confirm,Spinner
  },
  data(){
    return{
      chaxun:false,
      show1:false,
      huocode:true,
      messages:'',
      show2:false,
      time: 180,
      value: '',
      start: false,
      sub2:false,
      sub3:true,
      username:'',
      idcard:'',
      userphone:'',
      checkCode:'',
      piccode:'',
      nameState:'',
      phoneState:'',
      pstate:'',
      validateState:'',
      checkcodeState:'',
      idcardState:'',
      src:'',
      pid:'',
      token:'',
      endTime:"",
      type:'',
      state:'',
      placename:'请输入姓名',
      placephone:'请输入手机号',
      placeidcard:'请输入身份证号',
      subphone:'',
      subidcard:'',
      tit:'提示',
      jiazai:true
    }
  },
  created(){
    this.pid = this.$route.params.pid
    this.username = this.$route.params.username
    this.idcard = this.$route.params.idcard?this.substring(this.$route.params.idcard):''
    this.userphone = this.$route.params.userphone?this.$route.params.userphone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'):''


    this.$ajax('https://www.xiaofeishuwangluo.com/progressquery/selectProgressQueryPidByKey?pid='+this.pid).then(e=>{
      console.log(e)
      this.nameState = e.data.data.nameState
      this.phoneState = e.data.data.phoneState
      this.pstate = e.data.data.pstate
      this.validateState = e.data.data.validateState
      this.checkcodeState = e.data.data.checkcodeState
      this.idcardState = e.data.data.idcardState
    })
    switch (this.pid){
      case '1':
        this.$ajax('https://www.xiaofeishuwangluo.com/applicationdetails/selectBlackCodeByPuFa').then(e=>{
            console.log(e)
          this.jiazai = false
        this.src =  'data:image/jpeg;base64,'+e.data.data.imgs
          this.token = e.data.data.token
        });
        break;
       case '9':
        this.$ajax('https://www.xiaofeishuwangluo.com/applicationdetails/selectBlackCodeByGuangDa').then(e=>{
            console.log(e)
          this.jiazai = false
          this.src =  'data:image/jpeg;base64,'+e.data.data.imgs
          this.token = e.data.data.token
        })
    }

  },
  methods:{
    //脱敏
    substring(str){
   if(typeof str == 'string'){ //参数为字符串类型
        let ruten = str.substring(3,8); //提取字符串下标之间的字符。
        return str.replace(ruten,'*****'); //字符串中用字符替换另外字符，或替换一个与正则表达式匹配的子串。
    }
    },
        add(){
        this.show1 = true
        },
        dis(){
        this.show1 = false
        },
    //获取验证码
        checkcode(){
      this.subphone = this.$route.params.userphone ?this.$route.params.userphone:this.userphone
      this.subidcard = this.$route.params.idcard?this.$route.params.idcard:this.idcard
          this.start = true
          switch (this.pid) {
            case '9':
              if (this.piccode && this.idcard){
                this.$ajax.get(`https://www.xiaofeishuwangluo.com/applicationdetails/selectBlackDetailsGuangdaCode?code=${this.piccode}&idcard=${this.subidcard}`).then(e=>{
                  console.log(e)
                this.huocode = false
              })
            }
            break;
            case '7':
              if (this.idcard && this.userphone){
                 this.$ajax.get(`https://www.xiaofeishuwangluo.com/applicationdetails/selectBlackCodeByZhongXin?mobile=${this.subphone}&idcard=${this.subidcard}`).then(e=>{
                  console.log(e)
                this.huocode = false
              })
              }
             break ;
       }

    },
    finish (index) {
      this.huocode = true
      this.start = false
      this.time = 180
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
      this.sub2 = true
      this.sub3 = false
      this.subphone = this.$route.params.userphone ?this.$route.params.userphone:this.userphone
      this.subidcard = this.$route.params.idcard?this.$route.params.idcard:this.idcard
      switch (this.pid) {
        case '1':
          if (this.idcard && this.piccode){
            this.$ajax.get(`https://www.xiaofeishuwangluo.com/applicationdetails/selectBlackDetailsByPuFa?token=${this.token}&idcard=${this.subidcard}&code=${this.piccode}`).then(e=>{
              console.log(e)
              this.sub2 = false
              this.sub3 = true
              if (e.data.status == 200){
                this.endTime = e.data.data.endtime
                this.type = e.data.data.type
                this.state = e.data.data.state
                this.chaxun = true
              } else if (e.data.status==500){
                this.show2 = true
                this.messages = e.data.msg;
              }

            })
          }
          break;
        case '9':
          if (this.idcard && this.piccode && this.username && this.checkCode && this.userphone){
            this.$ajax.get(`https://www.xiaofeishuwangluo.com/applicationdetails/selectBlackDetailsGuangda?code=${this.piccode}&idcard=${this.subidcard}&name=${this.username}&mobCode=${this.checkCode}`).then(e=>{
              console.log(e)
              this.sub2 = false
              this.sub3 = true
              if (e.data.status == 200){
                this.endTime = e.data.data.endtime
                this.type = e.data.data.type
                this.state = e.data.data.state
                this.chaxun = true
              } else if (e.data.status==500){
                this.show2 = true
                this.messages = e.data.msg;
              }
            })
          }
          break;
        case '13':
          if (this.idcard){
            this.$ajax.get(`https://www.xiaofeishuwangluo.com/applicationdetails/selectBlackDetailsByShangHai?idcard=${this.subidcard}`).then(e=>{
              console.log(e)
              this.sub2 = false
              this.sub3 = true
              if (e.data.status == 200){
                this.endTime = e.data.data.endtime
                this.type = e.data.data.type
                this.state = e.data.data.state
                this.chaxun = true
              } else if (e.data.status==500){
                this.show2 = true
                this.messages = e.data.msg;
              }
            })
          }
          break;
        case '7':
          if (this.idcard && this.checkCode && this.userphone){
            this.$ajax.get(`https://www.xiaofeishuwangluo.com/applicationdetails/selectBlackDetailsZhongXin?idcard=${this.subidcard}&code=${this.checkCode}`).then(e=>{
              console.log(e)
              this.sub2 = false
              this.sub3 = true
              if (e.data.status == 200){
                this.endTime = e.data.data.endtime
                this.type = e.data.data.type
                this.state = e.data.data.state
                this.chaxun = true
              } else if (e.data.status==500){
                this.show2 = true
                this.messages = e.data.msg;
              }
            })
          }
      }
    },
    huoqu(val){
      switch (val){
        case '1':
          this.$ajax('https://www.xiaofeishuwangluo.com/applicationdetails/selectBlackCodeByPuFa').then(e=> {
            this.src = 'data:image/jpeg;base64,' + e.data.data.imgs
          })
              break;
        case '9':
          this.$ajax('https://www.xiaofeishuwangluo.com/applicationdetails/selectBlackCodeByGuangDa').then(e=>{
          this.src =  'data:image/jpeg;base64,'+e.data.data.imgs
        })
           break;
      }
    },
    onConfirm(){

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
        height: 667px;
        /*background: #fff !important;*/
    }
    #schedule::before{
      content: " ";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: #fff;
      z-index: -100;
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
  .checktu{
    width: 80px;
    height: 44px;
    position: absolute;
    right: 0;
    top: 0;
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
  .cimg{
    width: 50px;
    height: 50px;
    margin: 0 auto;
    position: relative;
  }
  .cimg img{
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
  }
  .chaxun{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background: rgba(0,0,0,.2);
  }
  .box{
    width: 90%;
    height: 55%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    background: #ffffff;
    text-align: center;
  }
  .flex-demo{
    text-align: center;
  }
</style>
