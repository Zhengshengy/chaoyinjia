<template>
    <div class="ntom">
        <div class="boif">
            <div class="img">
                <div class="for">
                    <img src="../assets/dream3.png" alt="">
                </div>
                <div class="right_bontb">
                    <flexbox :gutter="0">
                      <flexbox-item ><div class="flex-demo">
                        <flexbox :gutter="0">
                          <flexbox-item :span="4"><div class="flex-demo">
                              <div class="fontinmg">
                                  <img :src="heardImg" width="100%" alt="">
                              </div>
                          </div></flexbox-item>
                          <flexbox-item ><div class="flex-demo">
                              <div class="fontinmgs">
                              <div style="color: #000;font-size: 12px">芝麻银行</div>
                                  <div style="color: #5F5A50">
                                      <span style="font-size: 12px">职务:</span>
                                      <span style="font-size: 12px">{{grade}}</span><br>
                                      <span style="font-size: 12px">ID:</span>
                                      <span style="margin-right: 5px;font-size: 12px">{{id}}</span>
                                  </div>
                              </div>
                          </div></flexbox-item>
                        </flexbox>
                      </div></flexbox-item>
                      <flexbox-item :span="4"><div class="flex-demo">
                            <div class="fontimges">
                               <img :src="qrcode" width="15%" alt="">
                             </div>
                      </div></flexbox-item>
                    </flexbox>
                </div>
            </div>
            <div class="bottm">
                <div class="texe">
                    <div class="font" style="margin-top: 18%"></div>
                </div>
                <div class="rout" style="width: 40%;margin: 10px auto 0">
                    <img src="../assets/yaoqin.png" alt="">
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
    </div>
</template>
<script>
    import { Flexbox, FlexboxItem, Divider } from 'vux'
    export default {
    name:'Registercard',
        components: {
           Flexbox,
           FlexboxItem,
        },
        data(){
          return{
            heardImg:'',
            grade:'',
            id:'',
            qrcode:''
          }
        },
        mounted(){
            let url = encodeURI(window.location.href)
              this.$ajax.get('www.xiaofeishuwangluo.com/user/getQrcode?url='+url).then(e=>{
            this.qrcode = e.data.data
        })
            this.grade = localStorage.getItem('grade')
            this.heardImg = localStorage.getItem('headImgUrl')
            this.id = localStorage.getItem('userid')
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
    padding: 30px 0 0px;
    background: #363636;
}
 .img{
     width: 80%;
     margin: 0 auto;
     position: relative;
     bottom: 0;
}
 img{
    width: 100%;
    height: auto;
  }
 .right_bontb{
    position: absolute;
    bottom:35%;
    right: 0;
    width: 60%;
    font-size: 12px;
}
 .fontinmg{
    position: absolute;
    width: 14%;
    left: 7%;
    bottom: -70px;
    height:26px ;
}
.fontinmgs{
    position: absolute;
    font-size:12px;
    transform:scale(0.8);
    left: 23%;
    bottom: -70px;
}
.fontimges{
    position: absolute;
    width: 20%;
    right: 24%;
    top:32px;
}
.bottm{
    padding-top: 10%;
    text-align: center;
    font-size: 14px;
    color: #fff;
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
</style>
