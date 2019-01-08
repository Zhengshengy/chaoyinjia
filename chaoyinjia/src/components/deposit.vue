<!--收入明细-->
<template>
    <div id="deposit">
        <div class="tzong">
            <div class="clatop">
                <div class="vtext">
                    收入总额(元)
                </div>
                <div class="yuan">{{total}}</div>
            </div>
            <div class="clatops">
                <flexbox>
                  <flexbox-item><div class="flex-demo">
                      <div class="vtexts">已结算(元)</div>
                      <div class="yuans">{{complete}}</div>
                  </div></flexbox-item>
                  <flexbox-item><div class="flex-demo">
                      <div class="vtexts">余额(元)</div>
                      <div class="yuans">{{notcomplete}}</div>
                  </div></flexbox-item>
                </flexbox>
            </div>
        </div>
        <div class="fudoa" style="margin: 8px 0 0">
            <grid :cols="1" >
              <grid-item v-for="(item,index) in con" :key="index">
                  <flexbox orient="vertical" :gutter="0">
                      <flexbox-item><div class="flex-demo">
                          <flexbox :gutter="0">
                              <flexbox-item><div class="flex-demo">
                                  <flexbox :gutter="0">
                                      <flexbox-item><div class="flex-demo stacvtex"><span class="text">{{item.blankname}}</span></div></flexbox-item>
                                      <flexbox-item><div class="flex-demo stacvtex"><span class="recommend">{{item.text}}</span></div></flexbox-item>
                                  </flexbox>
                              </div></flexbox-item>
                              <flexbox-item><div class="flex-demo stacvtex">
                                  <span class="number_time">{{item.createtime}}</span>
                              </div></flexbox-item>
                            </flexbox>
                      </div></flexbox-item>
                      <flexbox-item><div class="flex-demo stacvtexs">
                          <flexbox :gutter="0">
                              <flexbox-item><div class="flex-demo stacvtex">
                                  <span class="order">订单金额：</span>
                                  <span class="money">{{item.orderMoney}}元</span>
                              </div></flexbox-item>
                              <flexbox-item><div class="flex-demo  stacvtex">
                                  <span class="order  push_money">提成金额：</span>
                                  <span class="money">+{{item.rewardMoney}}元</span>
                              </div></flexbox-item>
                            </flexbox>
                      </div></flexbox-item>
                    </flexbox>
              </grid-item>
            </grid>
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
      <div style="height: 40px"></div>
        <v-touch v-on:tap="submit" class= 'sub1'>
        <span>结算</span>
      </v-touch>
      <Retu/>
    </div>
</template>
<script>
import { Flexbox, FlexboxItem, Divider, Grid, GridItem,XButton } from 'vux'
import Retu from '@/components/retu'

export default {
  name:'Deposit',
  components: {
    Flexbox,
    FlexboxItem,
    Divider,
    Grid,
    GridItem,
    XButton,
    Retu
  },
  data(){
    return{
      con:[],
      total:'',
      complete:"",
      notcomplete:"",
      pageCount:0,
      currentPage:1,
      uid:null,
    }
  },
  mounted(){
    this.uid = localStorage.getItem('userid')
    this.$ajax.get('https://www.xiaofeishuwangluo.com/agentdetails/selectMoney?userid='+this.uid).then(e=>{
      console.log(e)
        this.total = this.outputmoney(e.data.data.totalIncome)
        this.complete = this.outputmoney(e.data.data.completeSettlement)
        this.notcomplete = this.outputmoney(e.data.data.notcompleteSettlement)
    })

    this.$ajax.get(`https://www.xiaofeishuwangluo.com/accountsdetails/selectAccountsDetailsByUserid?userid=${this.uid}&page=1`).then(e=>{
      console.log(e)
      let obj = {}
      e.data.data.content.forEach((v,k)=>{
        obj.blankname = v.blankname
        obj.createtime = v.createtime
        obj.orderMoney = this.outputmoney(v.orderMoney)
        obj.rewardMoney = this.outputmoney(v.rewardMoney)
        if (v.accauntsType==1){
          obj.text = '下级奖励'
        } else if (v.accauntsType==2){
          obj.text = '推卡奖励'
        }
        this.con.push(obj)
      })
      this.pageCount = e.data.data.pageTotal
      this.currentPage = e.data.data.currentPage
    })
  },
  methods:{
    outputmoney(val) {
      var str = (val / 100).toFixed(2) + '';
      var intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ',');//取到整数部分
      var dot = str.substring(str.length, str.indexOf("."))//取到小数部分
      var ret = intSum + dot;
      return ret
    },
    prev(){
      this.currentPage=this.currentPage-1
      this.$ajax.get(`https://www.xiaofeishuwangluo.com/accountsdetails/selectAccountsDetailsByUserid
?userid=${this.uid}&page=${this.currentPage}`).then(e=>{
        let obj = {}
      e.data.data.content.forEach((v,k)=>{
        obj.blankname = v.blankname
        obj.createtime = v.createtime
        obj.orderMoney = this.outputmoney(v.orderMoney)
        obj.rewardMoney = this.outputmoney(v.rewardMoney)
        this.con.push(obj)
      })
      this.pageCount = e.data.data.pageTotal
      this.currentPage = e.data.data.currentPage
      })
    },
    next(){
      this.currentPage=this.currentPage+1
      this.$ajax.get(`https://www.xiaofeishuwangluo.com/accountsdetails/selectAccountsDetailsByUserid
?userid=${this.uid}&page=${this.currentPage}`).then(e=>{
        let obj = {}
      e.data.data.content.forEach((v,k)=>{
        obj.blankname = v.blankname
        obj.createtime = v.createtime
        obj.orderMoney = this.outputmoney(v.orderMoney)
        obj.rewardMoney = this.outputmoney(v.rewardMoney)
        this.con.push(obj)
      })
      this.pageCount = e.data.data.pageTotal
      this.currentPage = e.data.data.currentPage
      })
    },
    submit(){
      this.$router.push('/closing')
    }
  }
}
</script>
<style scoped>
    #deposit{
        width:100%;
        background: #f5f5f5;
    }
    #deposit::before{
    content:" ";
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    background-color:#F5F5F5;
    z-index:-100;
  }
    .tzong{
       padding: 30px 20px 15px;
       background: #525252;
    }
    .clatop{
        text-align: center;
        margin-top: 5px;
    }
    .vtext{
        font-size: 14px;
        color: #EDEDED;
    }
     .vtexts{
        font-size: 12px;
        color: #EDEDED;
    }
    .yuan{
        font-size: 18px;
        color: #f6c93c;
        margin-top: 10px;
    }
    .clatops{
        text-align: center;
        margin-top: 20px;
    }
    .vux-flexbox{
        text-align: center;
    }
    .yuans{
        font-size: 14px;
        color: #f6c93c;
        margin-top: 10px;
    }
    a{
        text-decoration: none;
        display: block;
  }
    .weui-grid{
        background: #fff;
        margin-top: 6px;
        padding: 20px;
    }
    .weui-grid:nth-child(1){
        margin-top: 0;
    }
    .stacvtex{
        text-align: left;
    }
    .stacvtexs{
        margin-top: 28px;
    }
    .text{
        color:#3D3D3D;
        font-size: 16px;
        font-weight: 600;
    }
    .recommend{
        border-radius: 8px;
        background: #FF6060;
        padding: 2px 5px;
        color: #fff;
        font-size: 8px;
    }
    .number_time{
        color:#a2a2a2;font-size: 12px; margin-left: 20%;
    }
    .push_money{
        margin-left: 20%;
    }
    .order{
        font-size: 12px;color:#767676;
    }
    .money{
        font-size: 12px;color:#FF7D7D;
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
  .sub1{
  position: fixed;bottom: 0;left: 0;width: 100%;font-size: 14px;text-align: center;line-height: 42px;color: #fff;
  background: rgb(251,203,31);
}
</style>
