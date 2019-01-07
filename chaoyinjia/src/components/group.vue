<template>
    <div class="top">
        <div class="iconban">
            <x-input placeholder="请输入手机号" name="mobile" keyboard="number" :show-clear="false" v-model="phone">
              <icon type="search" slot="label" style="margin-right: 10px">
              </icon>
                <span  slot="right" style="color:#F6CA44;" v-on:click="query">搜索</span>
              </x-input>
        </div>
        <div class="herder">
            <div class="vontfor" v-for="(i,n) in con" :key="n" @click="cell(i.userphone)">
                <flexbox :gutter="0" wrap="wrap" >
                  <flexbox-item :span="2/3"><div class="flex-demo">
                      <flexbox>
                          <flexbox-item :span="4"><div class="flex-demo">
                              <div style="width:94%;border-radius: 50%;margin-left: 10%;">
                                 <img :src="i.headimgurl" alt="" width="82%">
                              </div>

                          </div></flexbox-item>
                          <flexbox-item><div class="flex-demo" style="font-size: 14px;color: #5D5D5D">
                              <flexbox orient="vertical" :gutter="0">
                                  <flexbox-item><div class="flex-demo" >
                                      昵称：<span>{{i.nickname}}</span>
                                  </div></flexbox-item>
                                  <flexbox-item><div class="flex-demo">工号：<span>{{i.userid}}</span></div></flexbox-item>
                                  <flexbox-item><div class="flex-demo">手机号：<span>{{i.phone1}}</span></div></flexbox-item>
                                   <flexbox-item><div class="flex-demo" ><span style="font-size: 14px;">{{i.createtime}}</span></div></flexbox-item>

                                </flexbox>
                          </div></flexbox-item>

                        </flexbox>
                  </div></flexbox-item>
                  <flexbox-item :span="1/3"><div class="flex-demo">
                      <flexbox orient="vertical" :gutter="0">
                        <flexbox-item><div class="flex-demo" style="text-align: center;margin-bottom: 6px;color: #5D5D5D;font-size: 14px">推荐办卡数</div></flexbox-item>
                        <flexbox-item><div class="flex-demo"  style="text-align: center;margin-bottom: 6px"><span style="font-size: 14px;color: #FF5050;">{{i.recommendNum}}张</span></div></flexbox-item>
                          <flexbox-item><div class="flex-demo" style="text-align: center;color: #5D5D5D;font-size: 14px">职务：<span>{{i.text}}</span></div></flexbox-item>

                    </flexbox>
                  </div></flexbox-item>
                </flexbox>
                <div class="xian"></div>
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
        <div style="height: 1px"></div>
        <Retu/>
    </div>
</template>
<script>
import { XInput,Icon,Flexbox, FlexboxItem,  } from 'vux'
import Retu from '@/components/retu'

    export default {
    name:'Group',
    components: {
        Retu,
      XInput,
      Icon,
      Flexbox,
      FlexboxItem,
   },
    data () {
        return {
            pageCount:0,
            currentPage:1,
            con:[],
            phone:'',
            uid:null,
        }
    },
    mounted(){
        this.uid = localStorage.getItem('userid')
        this.$ajax.get(`https://www.xiaofeishuwangluo.com/agentdetails/selectCustomerBySuperiorUid?superiorUid=${this.uid}&page=1`).then(e=>{
            console.log(e)

            this.pageCount = e.data.data.pageTotal
            this.currentPage = e.data.data.currentPage
            let obj = {}
            e.data.data.content.forEach(v=>{
                obj.createtime = v.createtime
                obj.headimgurl = v.headimgurl
                obj.nickname = v.nickname
                obj.recommendNum = v.recommendNum?v.recommendNum:0
                obj.userphone = v.userphone
                obj.phone1 = v.userphone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                obj.wechatno = v.wechatno
                if(v.grade == 1){
                    obj.text = "经理"
                }else if (v.grade == 2) {
                    obj.text = "总监"
                }else if (v.grade == 3){
                    obj.text = "银行家"
                }
                this.con.push(obj)
            })
        })
        console.log(this.con)
    },
    methods:{
        query(){
           this.$ajax.get(`https://www.xiaofeishuwangluo.com/agentdetails/selectCustomerByPhone?superiorUid=${this.uid}&page=${this.currentPage}&phone=${this.userphone}`).then(e=>{
               console.log(e)
               if (e.data.status==200) {
                   this.pageCount = e.data.data.pageTotal
            this.currentPage = e.data.data.currentPage
            let obj = {}
            e.data.data.content.forEach(v=>{
                obj.createtime = v.createtime
                obj.headimgurl = v.headimgurl
                obj.nickname = v.nickname
                obj.recommendNum = v.recommendNum?v.recommendNum:0
                obj.userphone = v.userphone
                obj.phone1 = v.userphone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                obj.wechatno = v.wechatno
                if(v.grade == 1){
                    obj.text = "经理"
                }else if (v.grade == 2) {
                    obj.text = "总监"
                }else if (v.grade == 3){
                    obj.text = "银行家"
                }
                this.con.push(obj)
                })
               }else {
                   this.con = []
               }

        })
        },
        prev(){
      this.currentPage=this.currentPage-1
      this.$ajax.get(`https://www.xiaofeishuwangluo.com/agentdetails/selectCustomerBySuperiorUid?superiorUid=${this.uid}&page=${this.currentPage}`).then(e=>{
        this.pageCount = e.data.data.pageTotal
            this.currentPage = e.data.data.currentPage
            let obj = {}
            e.data.data.content.forEach(v=>{
                obj.createtime = v.createtime
                obj.headimgurl = v.headimgurl
                obj.nickname = v.nickname
                obj.recommendNum = v.recommendNum?v.recommendNum:0
                obj.userphone = v.userphone
                obj.phone1 = v.userphone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                obj.wechatno = v.wechatno
                if(v.grade == 1){
                    obj.text = "经理"
                }else if (v.grade == 2) {
                    obj.text = "总监"
                }else if (v.grade == 3){
                    obj.text = "银行家"
                }
                this.con.push(obj)
            })
      })
    },
    next(){
      this.currentPage=this.currentPage+1
      this.$ajax.get(`https://www.xiaofeishuwangluo.com/agentdetails/selectCustomerBySuperiorUid?superiorUid=${this.uid}&page=${this.currentPage}`).then(e=>{
           this.pageCount = e.data.data.pageTotal
            this.currentPage = e.data.data.currentPage
            let obj = {}
            e.data.data.content.forEach(v=>{
                obj.createtime = v.createtime
                obj.headimgurl = v.headimgurl
                obj.nickname = v.nickname
                obj.recommendNum = v.recommendNum?v.recommendNum:0
                obj.userphone = v.userphone
                obj.phone1 = v.userphone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                obj.wechatno = v.wechatno
                if(v.grade == 1){
                    obj.text = "经理"
                }else if (v.grade == 2) {
                    obj.text = "总监"
                }else if (v.grade == 3){
                    obj.text = "银行家"
                }
                this.con.push(obj)
            })
      })
    },
     cell(phone){
         window.location.href = 'tel://' + phone
     }
    }
}
</script>
<style scoped>
    .top{
        background: #f5f5f5;
        padding: 8px 0 0;
    }
    .top::before{
    content:" ";
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    background-color:#F5F5F5;
    z-index:-100;
  }
    .iconban{
        width: 90%;
        margin:0 auto 8px;
        background: #fff;
        border-radius: 5px;
    }
    .herder{
        background: #fff;
        padding:0 10px 0;
    }
    .xian{
        border-bottom: 1px solid #EEEEEE;
        margin-top: 15px;
    }
    .vontfor{
        padding-top: 15px;
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