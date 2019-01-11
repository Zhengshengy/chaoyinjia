<template>
    <div id="banka">
        <div class="main">
          <grid :cols="3">
          <grid-item v-for="i in main" :key="i.cid" style="text-align: center;color: black;background: #fff;overflow: hidden" @on-item-click="toblankmain(i.cid)">
              <div class="box" v-show="i.text">
                    <div class="text1">{{i.text}}</div>
              </div>
            <div class="cimg">
                 <img :src="i.cimg" alt="">
            </div>
            <divider></divider>
            <div style="width: 100%;height: 2px;background: #F5F5F5;margin: 15px 0;position: relative">
              <div class="text" v-show="i.con">
                <span style="color: #fff;transform: scale(0.9);font-size: 12px">{{i.con}}</span>
              </div>
            </div>
            <span class="fitex">{{i.cname}}</span>
            <div class="fitexs">{{i.cremarks}}</div>
            <div class="nofont" @click.stop="moey(i.grade,i.reward)">
                <span class="doumt">奖金</span>
                <img src="../assets/down.png" width="10%" style="margin: 0 3px" alt="">
                <span style="color: #FF6666;font-size:15px">￥{{i.reward}}</span>
            </div>
          </grid-item>
        </grid>
        </div>
        <div class="become" v-show="show2==true">
        <div class="dext">
            <div class="bibox" @click="xiao">
                <div class="tect">
                    <img class="one" v-show="grade==3" src="../assets/qian.png" alt="">
                    <img class="two" v-show="grade==2"  src="../assets/qian.png" alt="">
                    <img class="three" v-show="grade==1"  src="../assets/qian.png" alt="">
                    <div class="fontfor">
                        <flexbox :gutter="0" wrap="wrap">
                          <flexbox-item :span="1/3"><div class="flex-demo">银行家</div></flexbox-item>
                          <flexbox-item :span="1/3"><div class="flex-demo">总监</div></flexbox-item>
                          <flexbox-item :span="1/3"><div class="flex-demo">经理</div></flexbox-item>
                          <flexbox-item :span="1/3"><div class="flex-demo stac">￥{{one}}</div></flexbox-item>
                          <flexbox-item :span="1/3"><div class="flex-demo stac">￥{{two}}</div></flexbox-item>
                            <flexbox-item :span="1/3"><div class="flex-demo stac">￥{{three}}</div></flexbox-item>
                        </flexbox>
                    </div>
                    <div class="botn">
                        <div class="frist" style="margin-bottom: 10px">
                            <span style="color:#424242;font-size: 16px;">结算周期：</span>
                            <span style="color:#939393;font-size: 14px;">3-5个工作日自动结算。如自助查询核卡通过的，及时结算。</span>
                        </div>
                        <div class="frist">
                            <span style="color:#424242;font-size: 16px;">结算规则：</span>
                            <span style="color:#939393;font-size: 14px;">首次申请该银行信用卡，资料审批通过，并搜到短信通知，算成功办理此业务，未审核通过的则不急奖励金。</span>
                        </div>
                    </div>
                    <div class="tects">
                        <div class="xian" style="border:1px dashed #9C9C9C;width: 100%;margin-bottom: 10px"></div>
                        <div class="boter" style="width: 85%;
        padding: 0.5% 7.5% 5%;">
                            <span style="color:#c9c9c9;font-size: 12px;">注：如以前申请过或有过该银行信用卡的，将不受奖励。</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import { Flexbox, FlexboxItem,Grid, GridItem,Divider} from 'vux'
    export default {
      name:'Banka',
      components: {
        Flexbox,
        FlexboxItem,
        Grid,
        GridItem,
        Divider,
      },
        data(){
          return{
              grade:'',
              one:'',
              two:'',
              three:'',
              show2:false
          }
        },
      props:{
          main:{
              type:Array,
              required:true
          },
      },
      methods:{
          toblankmain(cid){
              this.$router.push({path:'/blankmain',query:{cid:cid}})
          },
          moey(grade,rew){
              this.show2= true
              this.grade = grade
              this.one = rew*0.95
              this.two = rew*0.85
              this.three = rew*0.65
          },
          xiao(){
            this.show2 = false
            }
      }
}
</script>
<style scoped>
 .text{
    width: 50%;height: 17px;
    padding: 1px;background: #FF6666;font-size: 12px;
    position: absolute;top: 0;bottom: 0;left: 0;right: 0;margin: auto;
    transform: scale(0.8);
  }
  .nofont{
    font-size: 12px;transform: scale(0.8);margin-top: 8px;
  }
  .doumt{
    color: #fff;background: #FF6666;padding: 1px 5px;border-radius: 20px;
  }
  .fitex{
    font-size: 14px
  }
  .fitexs{
    font-size: 12px;color: #c1c1c1;text-overflow:ellipsis;
    transform: scale(0.9);margin-top:2px;
    overflow: hidden;
    white-space: nowrap;
  }
    .cimg{
        width: 50px;
        height: 50px;
        margin: 0 auto;
        position: relative;
    }
    .cimg img{
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      width: 100%;
      height: auto;
    }
    #banka{
        margin-bottom: 10px;
    }
    .box{
  width:50px;
  height:50px;color: #fff;
  transform:rotate(45deg);
  -ms-transform:rotate(45deg); /* Internet Explorer */
  -moz-transform:rotate(45deg); /* Firefox */
  -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
  -o-transform:rotate(45deg); /* Opera */

  position: absolute;
  right: -25px;
  top: -25px;
  background: #FF6666;
}

.text1 {
  font-size: 12px;
    position: absolute;bottom: 0;right: 0;left: 0;
    transform: scale(0.8);
}
.become{
        width:100%;
        position: fixed;
        top:0;bottom:0;left:0;
        right: 0;margin: auto;
        background: rgba(0,0,0,.5);
        background-repeat:no-repeat;
    }
    .dext{
        position: fixed;
        width: 100%;height: 100%;
        left: 0;bottom:0;top: 0px;
        right: 0;margin: auto;
    }
    .become .bibox{
        position: absolute;
        left: 0;bottom:0;top: 0px;
        right: 0;margin: auto;
        width: 78%;
    }
    .tect{
        position: absolute;
        width: 100%;
        height: auto;
        top:130px;border-radius: 10px;
        background:#EBD0A7 ;z-index: 10;
    }
    .three{
      position: absolute;
        width: 5%;
        left: 81%;
    }
    .one{
        position: absolute;
        width: 5%;
        left: 14%;
    }
    .two{
      position: absolute;
        width: 5%;
        left: 47%;
    }
    .fontfor{
        text-align: center;
      margin-top: 50px;
    }
    .vux-flexbox-item{
        text-align: center;
        width: 95%;
        color: #3F4248;
        font-size: 16px;
    }
    .stac{
        color:#AE5A17;
        font-size: 15px;
        margin-top: 15px;
        margin-bottom: 15px;
    }
    .botn{
        width: 85%;
        padding: 6.5% 7.5%;
        background: #fff;
    }
    .tects{
        width: 100%;
        border-radius: 0 0 10px 10px;
        background: #fff;
    }
</style>
