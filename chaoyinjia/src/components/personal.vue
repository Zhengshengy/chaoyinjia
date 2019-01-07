<template>
  <div class="bigbox">
    <div class="top" style="background: rgb(54,54,54);padding: 20px 30px 20px;font-size: 14px;color: #EFEFEF;">
      <flexbox :gutter="0" wrap="wrap">
      <flexbox-item :span="1/3"><div class="flex-demo" style="border-right: 1px solid #ccc;padding-bottom: 10px">
        <div class="userimg">
          <img :src="headImgUrl" alt="">
        </div>
        <div class="flex-demo" style="color: #EFEFEF;font-size: 14px">
          <div style="width: 100%;margin-top: 5px"><span style="color: #f6c93c;font-size: 18px;" v-text="username"></span></div>
          <div style="margin-top: 5px">职务:<span v-text="grade"></span></div>
          <div style="margin-top: 2px">ID:<span  style="font-size: 12px" v-text="userId"></span></div>
        </div>
      </div></flexbox-item>
      <flexbox-item><div class="flex-demo">
          <flexbox orient="vertical" :gutter="0">
            <flexbox-item><div class="flex-demo" style="padding: 20px">
                <span style="color:#EFEFEF">总收入</span> <br>
              <div style="margin-top: 10px"><span class="zi">￥</span><span class="zi" v-text="totalIncome"></span></div>
            </div></flexbox-item>
            <flexbox-item><div class="flex-demo" style="padding:0 0 20px 20px">
               <flexbox :gutter="0">
                <flexbox-item><div class="flex-demo">
                  <span style="color: #EFEFEF;font-size: 12px">已结算</span><br><span style="color: #f6c93c">￥</span><span style="color:#f6c93c" v-text="completeSettlement"></span>
                </div></flexbox-item>
                <flexbox-item><div class="flex-demo">
                  <span style="color: #EFEFEF;font-size: 12px;">余额</span><br><span style="color: #f6c93c">￥</span><span style="color: #f6c93c" v-text="notcompleteSettlement" ></span>
                </div></flexbox-item>
              </flexbox>
            </div></flexbox-item>
          </flexbox>
      </div></flexbox-item>
    </flexbox>
    </div>
    <div class="con">
       <grid :show-vertical-dividers="false" :show-lr-borders="false" :cols="4">
      <grid-item link="/details" @on-item-click="">
        <img slot="icon" src="../assets/img.png">
        <span slot="label" class="bantext">订单明细</span>
      </grid-item>
      <grid-item  @on-item-click="todeposit">
        <img slot="icon" src="../assets/img1.png">
        <span slot="label" class="bantext">收入明细</span>
      </grid-item>
      <grid-item link="/group" @on-item-click="">
        <img slot="icon" src="../assets/img2.png">
        <span slot="label" class="bantext">我的团队</span>
      </grid-item>
      <grid-item link="/invited" @on-item-click="">
        <img slot="icon" src="../assets/hezuo.png">
        <span slot="label" class="bantext">邀请队员</span>
      </grid-item>
      <grid-item  @on-item-click="kefu1">
        <img slot="icon" src="../assets/img4.png">
        <span slot="label" class="bantext">专属客服</span>
      </grid-item>
      <grid-item link="/promote" @on-item-click="">
        <img slot="icon" src="../assets/img5.png">
        <span slot="label" class="bantext">专属海报</span>
      </grid-item>
      <grid-item link="/component/cell" @on-item-click="">
        <img slot="icon" src="../assets/img6.png">
        <span slot="label" class="bantext">必看课程</span>
      </grid-item>
      <grid-item link="/message" @on-item-click="">
        <img slot="icon" src="../assets/img7.png">
        <span slot="label" class="bantext">系统通知</span>
      </grid-item>
      <grid-item @on-item-click="updat">
        <img slot="icon" src="../assets/img8.png">
        <span slot="label" class="bantext">更新账户</span>
      </grid-item>
    </grid>
    </div>
    <alert v-model="show" hide-on-blur button-text="关闭" @on-show="onShow" @on-hide="onHide"> 账户已被冻结</alert>
    <!--<div class="foot" style="height: 87px"></div>-->
    <div :class="active">
            <Footer></Footer>
        </div>
    <Become v-show="dis==true"></Become>
    <Service :kefu="kefu" v-on:onshow="onshow"></Service>
  </div>
</template>

<script>
  import {Alert, Divider, Flexbox, FlexboxItem, Grid, GridItem,XDialog,TransferDomDirective as TransferDom} from 'vux'
  import Footer from '@/components/footer'
  import Become from '@/components/become'
  import Service from '@/components/service'
  export default {
  name:'Personal',
    directives: {
    TransferDom
  },
  components: {
    Flexbox,
    FlexboxItem,
    Divider,
    Grid,
    GridItem,
    Footer,
    Become,
    Alert,
    Service,
    XDialog
  },
  data () {
    return {
      dis:false,
      username:"",
      headImgUrl:"",
      userId:'',
      grade:'',
      totalIncome:'',
      completeSettlement:"",
      notcompleteSettlement:"",
      show:false,
      openid:'',
      total:'',
      complete:'',
      notcomplete:'',
      active:'shu',
      kefu:false
    }
  },
    mounted(){
      var mobileHeight=window.innerHeight+"px";
      document.querySelector('.bigbox').style.minHeight=mobileHeight;

    },
    created(){
    if (localStorage.getItem('openid')) {
       let openid = localStorage.getItem("openid")
        this.username = localStorage.getItem("username")
        this.headImgUrl = localStorage.getItem("headImgUrl")
        this.userId = localStorage.getItem("userid")
       let that = this

        this.$ajax.get('https://www.xiaofeishuwangluo.com/user/selectUserByOpenid?openid='+openid)
      .then(response => {
        localStorage.setItem('ustatus', response.data.data)
        if (response.data.data == '1'){
          this.dis = true
        }else if (response.data.data == '2'){
          this.$ajax.post('https://www.xiaofeishuwangluo.com/agentdetails/selectAgentDetailsByUid?uid='+this.userId)
      .then(e => {
        if (e.data.data.grade == '1'){
          that.grade = "经理"
        }else if (e.data.data.grade == '2'){
          that.grade = "总监"
        }else if (e.data.data.grade == '3'){
          that.grade = "银行家"
        }
        that.total = e.data.data.totalIncome
        that.complete = e.data.data.completeSettlement
        that.notcomplete = e.data.data.notcompleteSettlement
        that.totalIncome = that.outputmoney(e.data.data.totalIncome)
        that.completeSettlement = that.outputmoney(e.data.data.completeSettlement)
        that.notcompleteSettlement = that.outputmoney(e.data.data.notcompleteSettlement)
        localStorage.setItem('grade', that.grade)
      }).catch((error)=>{
        console.log(error)
          })
        }else if (response.data.data == '3'){
          this.show = true
        }
      })
      .catch(error => {
        console.log(error)
      })
    }else {
      let openid=getUrlKey("openid");
      if (!openid)  {
        window.location.href = 'https://www.xiaofeishuwangluo.com/wxpublic/open?state=5'
      }else {
        this.$ajax.get('https://www.xiaofeishuwangluo.com/wxpublic/selectUserByOpenid?openid='+openid)
      .then(response => {
        localStorage.setItem('username', response.data.data.nickname)
        localStorage.setItem('headImgUrl', response.data.data.headImgUrl)
        localStorage.setItem('userid', response.data.data.userid)
        localStorage.setItem('userphone', response.data.data.userphone)
        localStorage.setItem('ustatus', response.data.data.ustatus)
        localStorage.setItem('openid', response.data.data.openid)
        let openid = localStorage.getItem("openid")
        let that = this
        this.username = response.data.data.nickname
        this.headImgUrl = response.data.data.headImgUrl
        this.userId = response.data.data.userid
        if (response.data.data.ustatus == '1'){
          this.dis = true
        }else if (response.data.data.ustatus == '2'){
          this.$ajax.post('https://www.xiaofeishuwangluo.com/agentdetails/selectAgentDetailsByUid?uid='+this.userId)
      .then(e => {
        if (e.data.data.grade == '1'){
          that.grade = "经理"
        }else if (e.data.data.grade == '2'){
          that.grade = "总监"
        }else if (e.data.data.grade == '3'){
          that.grade = "银行家"
        }
        that.total = e.data.data.totalIncome
        that.complete = e.data.data.completeSettlement
        that.notcomplete = e.data.data.notcompleteSettlement
        that.totalIncome = that.outputmoney(e.data.data.totalIncome)
        that.completeSettlement = that.outputmoney(e.data.data.completeSettlement)
        that.notcompleteSettlement = that.outputmoney(e.data.data.notcompleteSettlement)
        localStorage.setItem('grade', that.grade)
      }).catch((error)=>{
        console.log(error)
          })
        }else if (response.data.data.ustatus == '3'){
          this.show = true
        }
      })
      }
    }

    function getUrlKey(name){//获取url 参数
   return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;}

  },
  methods:{
      onHide () {
      this.show = true
    },
    onShow () {
      console.log('on show')
    },
    outputmoney(val) {
      var str = (val / 100).toFixed(2) + '';
      var intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ',');//取到整数部分
      var dot = str.substring(str.length, str.indexOf("."))//取到小数部分
      var ret = intSum + dot;
      return ret
    },
    updat(){
        localStorage.clear();
    if (localStorage.getItem('openid')) {
        let openid = localStorage.getItem("openid")
        this.username = localStorage.getItem("username")
        this.headImgUrl = localStorage.getItem("headImgUrl")
        this.userId = localStorage.getItem("userid")
        let that = this

        this.$ajax.get('https://www.xiaofeishuwangluo.com/user/selectUserByOpenid?openid='+openid)
      .then(response => {
        localStorage.setItem('ustatus', response.data.data)
        if (response.data.data == '1'){
          this.dis = true
        }else if (response.data.data == '2'){
          this.$ajax.post('https://www.xiaofeishuwangluo.com/agentdetails/selectAgentDetailsByUid?uid='+this.userId)
      .then(e => {
        if (e.data.data.grade == '1'){
          that.grade = "经理"
        }else if (e.data.data.grade == '2'){
          that.grade = "总监"
        }else if (e.data.data.grade == '3'){
          that.grade = "银行家"
        }
        that.total = e.data.data.totalIncome
        that.complete = e.data.data.completeSettlement
        that.notcomplete = e.data.data.notcompleteSettlement
        that.totalIncome = that.outputmoney(e.data.data.totalIncome)
        that.completeSettlement = that.outputmoney(e.data.data.completeSettlement)
        that.notcompleteSettlement = that.outputmoney(e.data.data.notcompleteSettlement)
        localStorage.setItem('grade', that.grade)
      }).catch((error)=>{
        console.log(error)
          })
        }else if (response.data.data == '3'){
          this.show = true
        }
      })
      .catch(error => {
        console.log(error)
      })
    }else {
      let openid=getUrlKey("openid");
      if (!openid)  {
        window.location.href = 'https://www.xiaofeishuwangluo.com/wxpublic/open?state=5'
      }else {
        this.$ajax.get('https://www.xiaofeishuwangluo.com/wxpublic/selectUserByOpenid?openid='+openid)
      .then(response => {
        localStorage.setItem('username', response.data.data.nickname)
        localStorage.setItem('headImgUrl', response.data.data.headImgUrl)
        localStorage.setItem('userid', response.data.data.userid)
        localStorage.setItem('userphone', response.data.data.userphone)
        localStorage.setItem('ustatus', response.data.data.ustatus)
        localStorage.setItem('openid', response.data.data.openid)
        let openid = localStorage.getItem("openid")
        let that = this
        this.username = response.data.data.nickname
        this.headImgUrl = response.data.data.headImgUrl
        this.userId = response.data.data.userid
        if (response.data.data.ustatus == '1'){
          this.dis = true
        }else if (response.data.data.ustatus == '2'){
          this.$ajax.post('https://www.xiaofeishuwangluo.com/agentdetails/selectAgentDetailsByUid?uid='+this.userId)
      .then(e => {
        if (e.data.data.grade == '1'){
          that.grade = "经理"
        }else if (e.data.data.grade == '2'){
          that.grade = "总监"
        }else if (e.data.data.grade == '3'){
          that.grade = "银行家"
        }
        that.total = e.data.data.totalIncome
        that.complete = e.data.data.completeSettlement
        that.notcomplete = e.data.data.notcompleteSettlement
        that.totalIncome = that.outputmoney(e.data.data.totalIncome)
        that.completeSettlement = that.outputmoney(e.data.data.completeSettlement)
        that.notcompleteSettlement = that.outputmoney(e.data.data.notcompleteSettlement)
        localStorage.setItem('grade', that.grade)
        alert("更新成功")
      }).catch((error)=>{
        console.log(error)
          })
        }else if (response.data.data.ustatus == '3'){
          this.show = true
        }
      })
      }
    }

    function getUrlKey(name){//获取url 参数
   return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;}



    },
    todeposit(){
        this.$router.push({path:'/deposit',query:{total:this.total,complete:this.complete,notcomplete:this.notcomplete}})
    },
    kefu1(){
        this.kefu = true
    },
    onshow(show){
        this.kefu = show
    }
  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
  }
  .grid-center {
  display: block;
  text-align: center;
  color: #666;

}
.weui-grids {
  margin-top: 15px;
  background-color: #fff;
}
.weui-grid:after{
  border-bottom: 0;
}
.bottom{
  width: 100%;
  position: fixed;
  bottom: 0;
  background: #fff;
}
.box{
  width: 90%;
  margin: 20px auto;
}
.bigbox{
  position: relative;
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
  .userimg{
    width: 60px;
    height: 60px;
    border-radius:100% ;
  }
  .userimg img{
    width: 100%;
    height: 100%;
    border-radius:100% ;
  }
  .con img{
    width: auto;
    height: 100% !important;
  }
  .zi{
    color:#f6c93c;font-weight: 600;font-size: 18px
  }
  .bantext{
    font-size: 12px;
    color:#5D5D5D;
  }
  .shu{
    position: absolute;
    bottom: 0;
  }
  .heng{
    position: fixed;
    bottom: 0;
  }
</style>
