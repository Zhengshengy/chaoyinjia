<template>
    <div id="banka">
        <div class="main">
          <grid :cols="3">
          <grid-item v-for="i in main" :key="i.cid" style="text-align: center;color: black;background: #fff;overflow: hidden" @on-item-click="toblankmain(i.cid)">
              <div class="box" v-show="i.text">
                    <div class="text1">{{i.text}}</div>
              </div>
            <div class="cimg">
               <img :src="i.cimg" alt="" >
            </div>
            <divider></divider>
            <div style="width: 100%;height: 2px;background: #F5F5F5;margin: 15px 0;position: relative">
              <div class="text" v-show="i.con">
                <span style="color: #fff;transform: scale(0.9);font-size: 12px">{{i.con}}</span>
              </div>
            </div>
            <span class="fitex">{{i.cname}}</span>
            <div class="fitexs">{{i.cremarks}}</div>
          </grid-item>
        </grid>
        </div>
    </div>
</template>
<script>
import { Flexbox, FlexboxItem,Grid, GridItem,Divider} from 'vux'
    export default {
      name:'Tobankas',
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
        sid:{
              type:String,
              required:true
          },
      },
      methods:{
          toblankmain(cid){
              this.$router.push({path:'/recommain',query:{cid:cid,sid:this.sid}})
          },
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
        position: absolute;
        top:0;bottom:0;left:0;
        right: 0;margin: auto;
        background-image:url("../assets/touming.png") ;
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
        width: 5%;
        margin-left: 27%;
    }
    .one{
        width: 5%;
        margin-left: 14%;
    }
    .two{
        width: 5%;
        margin-left: 27%;
    }
    .fontfor{
        text-align: center;
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
