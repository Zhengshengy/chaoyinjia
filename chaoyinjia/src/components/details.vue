<template>
  <div id="details">
      <div class="topban">
          <div>以上记录为用户所申请的信用卡订单，但仅供参考，实际申请以受到银行短信为准。</div>
      </div>
      <div class="iconban">
          <x-input placeholder="输入手机号" name="mobile" keyboard="number" :show-clear="false" v-model="phone">
          <icon type="search" slot="label" style="margin-right: 10px">
          </icon>
            <span  slot="right" style="color:#D4A75D;" @click="query">搜索</span>
          </x-input>
      </div>
      <tab :scroll-threshold="5" active-color='rgb(239, 192, 26)'>
      <tab-item v-for="(i,n) in list1" :key="n" :selected='n===0' @on-item-click="check(n)">{{i}}</tab-item>
    </tab>
      <div style="background: #fff" v-for="item in con">
          <div class="box" style="padding: 15px;margin-top: 10px">
              <div class="forTime" style="font-size: 16px"> {{item.blankname}}</div>
              <div class="xian"></div>
              <div class="shenqing">申请人：<span>{{item.applicationName}}</span></div>
               <div class="shenqing">申请手机号：<span>{{item.applicationPhone}}</span></div>
               <div class="shenqing">申请时间：<span>{{item.createtime}}</span></div>
              <flexbox style="margin-top: 10px" v-show="index==0 || index==1 || index==4">
                  <flexbox-item v-show="index!=4"><div class="flex-demo chckjin" @click="chaxun(item.creditcardId,item.applicationIdcard,item.applicationName,item.applicationPhone)">查询进度</div></flexbox-item>

                  <flexbox-item v-show="index==1 || index==4"><div @click="confirm(item.applicationId)" class="flex-demo">移至待确认</div></flexbox-item>
                <flexbox-item v-show="index!=1"><div @click="remove(item.applicationId)" class="flex-demo">移至待再查</div></flexbox-item>
                <flexbox-item v-show="index!=4"><div class="flex-demo" @click="del(item.applicationId)">移至回收站</div></flexbox-item>
              </flexbox>
          </div>
        </div>
      <div style="width: 70%;margin: 20px auto">
        <flexbox v-show="pageCount>1 && con.length>0">
          <flexbox-item v-if="currentPage==1"><div class="flex-demo page2">上一页</div></flexbox-item>
      <flexbox-item v-else><div class="flex-demo page" @click="prev"><div>
        上一页
      </div>
      </div></flexbox-item>

      <flexbox-item ><div class="flex-demo page1">第{{currentPage}}/{{pageCount}}页</div></flexbox-item>
      <flexbox-item v-if="currentPage<pageCount"><div class="flex-demo page" @click="next">
        <div>下一页</div>
      </div></flexbox-item>
       <flexbox-item v-else><div class="flex-demo page2">
        <div>下一页</div>
      </div></flexbox-item>
    </flexbox>
      </div>

      <div class="zhe" v-show="show1==true">
        <div class="bottom">
          <div class="one">
            <span>您确定要把订单移至</span><span>{{text}}</span>吗
          </div>
          <div class="one two" @click="cance">取消</div>
          <div class="one three" @click="sure">确定</div>
        </div>
      </div>

        <toast v-model="showSuccess">成功</toast>
    <Retu/>
  </div>
</template>
<script>
import { Toast,Actionsheet,Tab, TabItem,XInput,Icon,Flexbox, FlexboxItem } from 'vux'
import Retu from '@/components/retu'

const list = () => ['待确认', '待再查', '申请成功', '申请失败', '回收站']
export default {
  components: {
    Tab,
    Icon ,
    TabItem,
    XInput,
    Flexbox,
    FlexboxItem,
    Actionsheet,
    Toast,
    Retu
  },
  data () {
    return {
      list1:list(),
      uid:null,
      con:[],
      pageCount:0,
      index:0,
      currentPage:1,
      showSuccess:false,
      state:1,
      phone:'',
      id:null,
      show1:false,
      text:'',
      stu:0,
    }
  },
  mounted(){
    this.uid = localStorage.getItem('userid')

    this.$ajax.get(`https://www.xiaofeishuwangluo.com/applicationdetails/selectApplicationDetailsByUserid?userid=${this.uid}&page=1&state=1`).then(e=>{
        console.log(e)
        if (e.data.data){
            this.con= e.data.data.content
            this.pageCount = e.data.data.pageTotal
            this.currentPage = e.data.data.currentPage
          } else {
            this.con = []
          }
      })
    // this.$ajax.get('api/applicationdetails/selectApplicationDetailsByUserid?userid=33&page=1&state=1').then(e=>{
    //     console.log(e)
    //     this.con= e.data.data.content
    //     this.pageCount = e.data.data.pageTotal
    //     this.currentPage = e.data.data.currentPage
    //   })
  },
  methods: {
    check(index){
      this.con = []
      this.state = index+1
      this.$ajax.get(`https://www.xiaofeishuwangluo.com/applicationdetails/selectApplicationDetailsByUserid?userid=${this.uid}&page=1&state=${this.state}`).then(e=>{
        console.log(e)
       this.con= e.data.data.content
       this.index = index
      })
      // console.log(index)
      // this.$ajax.get('api/applicationdetails/selectApplicationDetailsByUserid?userid=33&page=1&state='+this.state).then(e=>{
      //   console.log(e)
      //   this.con= e.data.data.content
      //  this.index = index
      // })
    },
    prev(){
      this.currentPage=this.currentPage-1
      this.$ajax.get(`https://www.xiaofeishuwangluo.com/applicationdetails/selectApplicationDetailsByUserid?userid=${this.uid}&state=${this.state}&page=${this.currentPage}`).then(e=>{
        console.log(e)
        this.con= e.data.data.content
        this.pageCount = e.data.data.pageTotal
        this.currentPage = e.data.data.currentPage
      })
    },
    next(){
      this.currentPage=this.currentPage+1
      this.$ajax.get(`https://www.xiaofeishuwangluo.com/applicationdetails/selectApplicationDetailsByUserid?userid=${this.uid}&state=${this.state}&page=${this.currentPage}`).then(e=>{
        console.log(e)
        this.con= e.data.data.content
        this.pageCount = e.data.data.pageTotal
        this.currentPage = e.data.data.currentPage
      })
    },
    query(){
        this.$ajax.get(`https://www.xiaofeishuwangluo.com/applicationdetails/selectApplicationDetailsByPhone
?userid=${this.uid}&state=${this.state}&page=${this.currentPage}&phone=${this.phone}`).then(e=>{
        console.log(e)
          if (e.data.data){
            this.con= e.data.data.content
            this.pageCount = e.data.data.pageTotal
            this.currentPage = e.data.data.currentPage
          } else {
            this.con=[]
          }

        })

    },

    del(id){
      this.id = id
      this.show1 = true
      this.text = '回收站'
      this.stu = 5
    },
    remove(id){
      this.id = id
      this.show1 = true
      this.text = '待再查'
      this.stu = 2
    },
    confirm(id){
      this.show1 = true
      this.id = id
      this.text = '待确认'
      this.stu = 1
    },
    cance(){
      this.show1 = false
      this.stu = 0
    },
    sure(){
      if(this.stu == 1){
        this.$ajax.get(`https://www.xiaofeishuwangluo.com/applicationdetails/updateStateByKey?applicationState=1&applicationId=${this.id}`).then(e=>{
          this.show1 = false
        this.$ajax.get(`https://www.xiaofeishuwangluo.com/applicationdetails/selectApplicationDetailsByUserid?userid=${this.uid}&state=${this.state}&page=${this.currentPage}`).then(e=>{
        console.log(e)
        if (e.data.data){
            this.con= e.data.data.content
            this.pageCount = e.data.data.pageTotal
            this.currentPage = e.data.data.currentPage
            this.showSuccess = true
          } else {
            this.con = []
          }
      })

      })
      }else if (this.stu== 2){
        this.$ajax.get(`https://www.xiaofeishuwangluo.com/applicationdetails/updateStateByKey?applicationState=2&applicationId=${this.id}`).then(e=>{
          console.log(e)
          this.show1 = false
        this.$ajax.get(`https://www.xiaofeishuwangluo.com/applicationdetails/selectApplicationDetailsByUserid?userid=${this.uid}&state=${this.state}&page=${this.currentPage}`).then(e=>{
        if (e.data.data){
            this.con= e.data.data.content
            this.pageCount = e.data.data.pageTotal
            this.currentPage = e.data.data.currentPage
            this.showSuccess = true
          } else {
            this.con = []
          }
      })

      })
      } else if (this.stu==5){
        this.show1 = false
        this.$ajax.get(`https://www.xiaofeishuwangluo.com/applicationdetails/updateStateByKey?applicationState=5&applicationId=${this.id}`).then(e=>{
        this.$ajax.get(`https://www.xiaofeishuwangluo.com/applicationdetails/selectApplicationDetailsByUserid?userid=${this.uid}&state=${this.state}&page=${this.currentPage}`).then(e=>{
        console.log(e)
        if (e.data.data){
            this.con= e.data.data.content
            this.pageCount = e.data.data.pageTotal
            this.currentPage = e.data.data.currentPage
            this.showSuccess = true
          } else {
            this.con = []
          }
      })

      })
      }
    },
    chaxun(cid,idcard,userphone,username){
      this.$ajax.get(`https://www.xiaofeishuwangluo.com/progressquery/selectProgressQueryByKey?creditcardId=${cid}`).then(e=>{
        // console.log(e)
        let pid = e.data.data
        this.$router.push({name:'SchCenter',params:{pid:pid,username:username,userphone:userphone,idcard:idcard}})
      })
    }
  }
}
</script>

<style scoped>
  #details::before{
    content:" ";
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    background-color:#F5F5F5;
    z-index:-100;
  }
    #details{
    width:100%;
    height: 100%;
      background-color:#F5F5F5;
    }
    .topban{
        background: #FCEDD6;
        padding: 5px 15px 2px 20px;
        color:#D4A75D;
        letter-spacing:2px;
    }
    .iconban{
        width: 90%;
        margin: 5px auto;
        background: #fff;
        border-radius: 5px;
    }
    .xian{
        width: 99%;
        height: 1px;
        background: #EEEEEE;
        margin: 10px 0;
    }
    .shenqing{
        width:100%;
        color:#a29b9b;
        font-size: 14px;
        margin-top: 5px;
    }
    .shenqing span{
        color:#000;
    }
    .flex-demo{
        width: 70%;
        border:1px solid #a29b9b;
        color:#a29b9b;
        padding: 3px 0;
        text-align: center;
    }
    .vux-flexbox{
        width:95%;
        margin: 0 auto;
    }
  .chckjin{
    border:1px solid #F6C93C;
    color:#F6C93C;
  }
   .page{
    width: 100%;
    border:1px solid #F6C93C;
    background:#F6C93C ;
    color: rgb(0,0,0);
    text-align: center;
    padding: 5px 0;
  }
  .page1{
    border:1px solid #fff;
    background: #fff;
    width: 90%;
    margin: 0 auto;
    text-align: center;
    padding: 5px 0;
  }
  .page2{
    width: 100%;
    border:1px solid #ccc;
    color: rgb(0,0,0);
    text-align: center;
    background: #ccc;
    padding: 5px 0;
  }
  .zhe{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    position: fixed;
    top: 0;
  }
  .bottom{
    width: 97%;
    position: fixed;
    bottom: 0;
    text-align: center;
    left: 5px;
  }
  .one{
    width: 100%;
    font-size: 15px;
    padding: 15px 0;
    border-radius: 5px 5px 0 0;
    background: rgba(255,255,255,.7);
  }
  .two{
    margin-bottom: 10px;
    border-radius: 0 0 5px 5px ;
    color: red;
  }
  .three{
    margin-bottom: 10px;
    border-radius: 5px;
    color: #0c98e0;
  }
</style>
