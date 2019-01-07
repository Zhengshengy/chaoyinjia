<!--消息通知-->
<template>
    <div id="message"  style="position: relative;">
        <div class="hetoch" >
            <flexbox :gutter="0">
              <flexbox-item><div class="flex-demo" style="text-align: center">
                  <div @click="mess" style="width: 12%;margin: 0 auto 5px"><img src="../assets/message.png" width="100%" alt="" ></div>
                  <span style="font-size: 12px;color: #181617">消息通知</span>
              </div></flexbox-item>
              <flexbox-item><div class="flex-demo" style="text-align: center">
                  <div @click="ask" style="width: 12%;margin: 0 auto 5px"><img src="../assets/quersion.png" width="100%" alt=""></div>
                  <span style="font-size: 12px;color: #181617">常见问题</span>
              </div></flexbox-item>
            </flexbox>
        </div>
        <div class="inforne">
            <v-touch class="bots" v-for="item in con" :key="item.mid" v-on:tap="check(item.mid)">
                <flexbox orient="vertical">
                  <flexbox-item>
                      <div class="flex-demo">
                      <span class="text">
                          {{item.mtitle}}
                      </span>
                      <div class="time">{{item.mtime}}</div>
                  </div></flexbox-item>
                </flexbox>
            </v-touch>
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
        mtype:1
      }
    },
    mounted(){
      var mobileHeight=window.innerHeight+"px";
      document.getElementById('message').style.minHeight=mobileHeight;
      this.$ajax.get(`https://www.xiaofeishuwangluo.com/messagenotification/selectMessageNotificationByMtype?mtype=1&page=1`).then(e=>{
          console.log(e)
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
          this.mtype = 1
        this.$ajax.get(`https://www.xiaofeishuwangluo.com/messagenotification/selectMessageNotificationByMtype?mtype=${this.mtype}&page=${this.currentPage}`).then(e=>{
          this.con = e.data.data.content
          this.pageCount = e.data.data.pageTotal
          this.currentPage = e.data.data.currentPage
      })
     },
     ask(){
            this.mtype = 2
         this.$ajax.get(`https://www.xiaofeishuwangluo.com/messagenotification/selectMessageNotificationByMtype?mtype=${this.mtype}&page=${this.currentPage}`).then(e=>{
          this.con = e.data.data.content
          this.pageCount = e.data.data.pageTotal
          this.currentPage = e.data.data.currentPage
      })
     },
        check(index){
            console.log(index)
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
    padding: 8px;
}
    .inforne{
        padding:0 5px;
    }
    .bots{
        padding: 10px;
        background: #fff;
        margin-top: 5px;
    }
    .text{
        font-size: 14px;
        font-weight: 500;
        text-overflow : ellipsis;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        white-space:nowrap;
        display: block;
    }
    .time{
        font-size: 12px;
        color:#A4A4A4;
        margin-top: 5px;
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
</style>