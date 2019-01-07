<template>
  <div style="background: #F5F5F5">
    <div class="top">
      <img src="" alt="">
    </div>
    <div class="card" style="margin:15px auto 0;padding: 10px;background: #fff">
      <flexbox>
      <flexbox-item><div class="flex-demo">1</div></flexbox-item>
      <flexbox-item><div class="flex-demo">
        <span style="font-weight: 600">平安曼联红魔...</span><br>
        <span style="color: #a7a4a4">绯红模印花纹...</span>
        <span style="color: #a7a4a4">刷卡免年费</span>
      </div></flexbox-item>
      <flexbox-item><div class="flex-demo">
        <div style="text-align: center;border: 2px solid #ff008d9c;padding: 5px 10px;color: #ff008d9c;border-radius: 5px">立即申请</div>
      </div></flexbox-item>
    </flexbox>
    </div>
    <div class="main" style="padding: 10px">
      <span style="font-weight: 600;">推荐银行</span>
      <grid :cols="3">
      <grid-item v-for="i in 10" :key="i" style="text-align: center;color: black;background: #fff">
        <img src="" alt="">
        <divider>
        </divider>
        <div style="width: 100%;height: 2px;background: #F5F5F5;margin: 15px 0;position: relative">
          <div class="text">
            <span style="color: #fff;">自动结算</span>
          </div>
        </div>
        <span>交通银行</span><br>
        <span style="font-size: 13px">超长免息</span>
      </grid-item>
    </grid>
    </div>
    <Footer />
  </div>
</template>

<script>
import { Flexbox, FlexboxItem,Grid, GridItem,Divider} from 'vux'
import Footer from '@/components/footer'

  export default {
  name:'Card',
  components: {
    Flexbox,
    FlexboxItem,
    Grid,
    GridItem,
    Divider,
    Footer
  },

  data () {
    return {

    }
  },
  beforeCreate() {
    // if (!localStorage.getItem("user")) {
    //   window.location.href = 'https://www.xiaofeishuwangluo.com/wxpublic/open?state=1'
    // }
  },
  methods:{

  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
  }
  .weui-grids{
    margin-top:5px;
  }
  .weui-grid{
    padding-bottom: 40px;
  }
  .vux-divider:before{
    background-position:right 0 top 50%
  }
  .vux-divider:after{
    background-position:left 0 top 50%
  }

  .text{
    width: 50%;height: 17px;
    padding: 1px;background: #ef6519;font-size: 12px;
    position: absolute;top: 0;bottom: 0;left: 0;right: 0;margin: auto
  }
</style>
