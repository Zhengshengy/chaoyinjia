<template>
    <div class="ntom" id="ntom">
        <div class="boif">
            <div class="img">
                <div class="for">
                    <img :src="posterBlank" alt="">
                </div>
            </div>
            <div class="bottm">

                <div class="rout" >
                    <span>分享链接邀请好友</span>
                </div>
                <div class="boncom">
                    <div class="fonbomone">
                        <flexbox >
                          <flexbox-item><div class="flex-demo">
                              <div class="yaoqing" style="border:1px solid #f6c93c;color:#f6c93c" v-on:click="dabcake(0)">邀请代理</div>
                          </div></flexbox-item>
                          <flexbox-item><div class="flex-demo">
                              <div class="clastom" style="border:1px solid #10aeff;color:#10aeff">推荐办卡</div>
                          </div></flexbox-item>
                        </flexbox>
                    </div>
                </div>
            </div>
        </div>
      <toast v-model="show2" type="text">长按保存图片</toast>
    </div>
</template>
<script>
    import { Flexbox, FlexboxItem, Toast, } from 'vux'
    export default {
    name:'Registercard',
        components: {
           Flexbox,
           FlexboxItem,
            Toast
        },
        data(){
          return{
            heardImg:'',
            posterBlank:'',
            id:'',
            show2:false
          }
        },
        mounted(){
          this.id = localStorage.getItem('userid')
            var mobileHeight=window.innerHeight+"px";
            document.getElementById('ntom').style.minHeight=mobileHeight;
              this.$ajax.get('https://www.xiaofeishuwangluo.com/userposter/selectPoster?userid='+this.id).then(e=>{
              this.posterBlank = e.data.data.posterBlank
        })

        },
        methods:{
            dabcake() {
                this.$router.push({path: "/promote"});
            }
        }
    }
</script>
<style scoped>
 .ntom{
   width:100%;height: 100%;
   position: relative;background: #363636;
 }
 .boif{
   padding-top: 30px;
 }
 .for{
   width: 100%;
   height: 100%;
 }
 .img{
     width: 80%;
     margin: 0 auto;
     position: relative;
     bottom: 0;
}
 .for img{
    width: 80%;display: block;
    height: auto;
    margin: 0 auto;
  }
.bottm{
    padding-top: 10%;
    text-align: center;
    font-size: 14px;
    color: #fff;
}
.yaoqing{
  border:1px solid #f6c93c;color:#f6c93c;
}
    .boncom{
        background: #E6E6E6;
        margin-top: 15px;
        padding: 8px 20px;
    }
    .fonbomone{
        width: 100%;
    }
    .yaoqing,.clastom{
        text-align: center;
        font-size: 14px;
        padding: 8px 0;
        width: 90%;
    }
  .bottm{
     position: fixed;bottom: 0;width: 100%;
  }
  .rout{
    width: 40%;margin: 0 auto 10%;
    border: 1px solid #f6c93c;
    color: #f6c93c;
    padding: 5px;
  }

</style>
