<!--消息通知-->
<template>
    <div id="message"  style="position: relative;">
        <div class="hetoch">
            <flexbox :gutter="0">
              <flexbox-item><div class="flex-demo" style="text-align: center">
                  <div class="fontstext" @click="mess" :class="{active:isactiveA}">消息通知</div>
              </div></flexbox-item>
              <flexbox-item><div class="flex-demo" style="text-align: center">
                  <div class="fontstext" @click="ask" :class="{active:isactiveB}">常见问题</div>
              </div></flexbox-item>
            </flexbox>
        </div>
        <div class="inforne">
            <div class="bots" v-for="item in con" :key="item.mid" @click="check(item.mid)">
              <flexbox>
                <flexbox-item :span="2"><div class="flex-demo"><div class="left">
                  <div class="img" v-if="isactiveA==true">
                    <img src="../assets/message.png" alt="">
                  </div>
                  <div class="img" v-else-if="isactiveA==false">
                    <img src="../assets/quersion.png" alt="">
                  </div>
                </div>
                </div></flexbox-item>
                <flexbox-item :span="9">
                  <div class="flex-demo">
                    <div class="font">
                      <div class="title_left" v-text="item.mtitle"></div>
                      <div class="time_right">{{item.mtime}}</div>
                    </div>
                  </div>
                </flexbox-item>
                <flexbox-item ><div class="flex-demo">
                  <div class="bonts"><img src="../assets/jiantou.png" alt=""></div>
                </div></flexbox-item>
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
        <div style="height: 116px"></div>
        <div style="position: absolute;bottom:0;">
            <Footer></Footer>
        </div>
        <Retu/>
    </div>

</template>
<script>
import { Flexbox, FlexboxItem, Divider } from 'vux'
import Footer from '@/components/footer'
import Retu from '@/components/retu'

export default {
    name:'Message',
  components: {
    Flexbox,
    FlexboxItem,
    Divider,
    Footer,
    Retu
  },
    data(){
      return{
        pageCount:0,
        currentPage:1,
        con:[],
        mtype:1,
        isactiveA:true,
        isactiveB:false,
      }
    },
    mounted(){
      var mobileHeight=window.innerHeight+"px";
      document.getElementById('message').style.minHeight=mobileHeight;
      this.$ajax.get(`https://www.xiaofeishuwangluo.com/messagenotification/selectMessageNotificationByMtype?mtype=1&page=1`).then(e=>{
           this.con = e.data.data.content
          this.pageCount = e.data.data.pageTotal
          this.currentPage = e.data.data.currentPage
      })
    },
    methods:{
        prev(){
      this.currentPage=this.currentPage-1
      this.$ajax.get(`https://www.xiaofeishuwangluo.com/messagenotification/selectMessageNotificationByMtype?mtype=${this.mtype}&page=${this.currentPage}`).then(e=>{
        this.con = e.data.data.content
          this.pageCount = e.data.data.pageTotal
          this.currentPage = e.data.data.currentPage
      })
    },
    next(){
      this.currentPage=this.currentPage+1
      this.$ajax.get(`https://www.xiaofeishuwangluo.com/messagenotification/selectMessageNotificationByMtype?mtype=${this.mtype}&page=${this.currentPage}`).then(e=>{
        this.con = e.data.data.content
          this.pageCount = e.data.data.pageTotal
          this.currentPage = e.data.data.currentPage
      })
    },
     mess(){
        this.isactiveA=true;
        this.isactiveB=false;
        this.mtype = 1;
        this.$ajax.get(`https://www.xiaofeishuwangluo.com/messagenotification/selectMessageNotificationByMtype?mtype=${this.mtype}&page=${this.currentPage}`).then(e=>{
          this.con = e.data.data.content
          this.pageCount = e.data.data.pageTotal
          this.currentPage = e.data.data.currentPage
      })
     },
     ask(){
         this.isactiveA=false;
         this.isactiveB=true;
         this.$ajax.get(`https://www.xiaofeishuwangluo.com/messagenotification/selectMessageNotificationByMtype?mtype=${this.mtype}&page=${this.currentPage}`).then(e=>{
          this.con = e.data.data.content
          this.pageCount = e.data.data.pageTotal
          this.currentPage = e.data.data.currentPage
      })
     },
        check(index){
            this.$router.push({name:'Minute',params:{mid:index}})
        }
    }
}
</script>
<style scoped>
#message{
    position: absolute;
    width: 100%;
    top: 0;
    background: #f5f5f5;
    height: 100%;
}
.hetoch{
    background: #fff;
}
    .inforne{
        padding:0 5px;
    }
    .bots{
        padding: 10px;
        background: #fff;
        margin-top: 5px;
    }
    .left{
       width:100%;
    }
    img{
      width: 100%;
      display: block;
    }
     .font{
        width: 100%;
        margin-top: 8px;
    }
    .title_left{
        width:50%;
        padding-bottom: 5px;
        font-size: 14px;
        font-weight: 500;
        text-overflow : ellipsis;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        white-space:nowrap;
        float: left;
    }
    .time_right{
        font-size: 12px;
        text-overflow : ellipsis;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        white-space:nowrap;
        float: right;
        padding-top: 2px;
        padding-bottom: 5px;
       color:#9D9D9D;
    }
    .vux-flexbox .vux-flexbox-item {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      -webkit-flex: 1;
      min-width: 25px;
}
    .img{
      padding: 10px;width: 70%;
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
  .fontstext{
     font-size: 14px;color: #181617;width:auto;font-weight: 600;
     padding: 15px 1px 10px;
  }
  .active{
    color:#f6c93c;
    border-bottom:4px solid #f6c93c;
  }
</style>
