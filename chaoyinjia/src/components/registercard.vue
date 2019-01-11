<template>
    <div class="ntom" id="ntom">
        <div class="boif">
            <div class="img">
                <div class="for">
                    <img :src="posterBlank" alt="">
                </div>
                <div class="texe">
                  <div class="font">长按海报保存到本地分享给好友</div>
                </div>
                <div class="rout" >
                    <span v-clipboard:copy="copyurl"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError">分享链接邀请好友</span>
                </div>
            </div>
            <div class="bottm">
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
      <toast v-model="showSuccess" type="text">{{text}}</toast>
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
            show2:false,
            showSuccess:false,
            text:'',
            copyurl:'',
          }
        },
        mounted(){
          this.id = localStorage.getItem('userid')
            var mobileHeight=window.innerHeight+"px";
            document.getElementById('ntom').style.minHeight=mobileHeight;
              this.$ajax.get('https://www.xiaofeishuwangluo.com/userposter/selectPoster?userid='+this.id).then(e=>{
              this.posterBlank = e.data.data.posterBlank
        })
          this.copyurl = "https://www.xiaofeishuwangluo.com/blank/#/recommend?userid="+this.id
        },
        methods:{
            dabcake() {
                this.$router.push({path: "/promote"});
            },
          onCopy(e){
          this.text = "复制成功"
          this.showSuccess = true
        },
        onError(e){
          this.text = "复制失败"
          this.showSuccess = true
       },
        }
    }
</script>
<style scoped>
 .ntom{
   width:100%;height: 100%;
   position: relative;background: #363636;
 }
.boif{
  width: 100%;
  height: 100%;
 }
 .for{
   position: relative;top:5%;
   width: 62%;margin: 0 auto;
 }
 .img{
     width: 100%;height: 100%;top:0;
     position: absolute;
}
 .for img{
    width: 90%;display: block;
    height: auto;
    margin: 0 auto;
  }
 .texe{
   position: absolute;top:75%;width: 100%;text-align: center;color:#fff;font-size: 14px;
 }
 .font{
   margin-bottom: 4%;letter-spacing:2px;
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
    position: absolute;top:80%;left: 0;right: 0;
    width: 40%;margin:auto;background: #f6c93c;
    text-align: center;font-size: 14px;
    color: #fff;
    padding: 2% 0;
  }

</style>
