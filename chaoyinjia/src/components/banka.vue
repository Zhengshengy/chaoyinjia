<template>
    <div id="banka">
        <div class="main">
          <grid :cols="3">
          <grid-item v-for="i in 10" :key="i" style="text-align: center;color: black;background: #fff">
            <img src="" alt="">
            <divider>
            </divider>
            <div style="width: 100%;height: 2px;background: #F5F5F5;margin: 15px 0;position: relative">
              <div class="text">
                <span style="color: #fff;transform: scale(0.9);font-size: 12px">自动结算</span>
              </div>
            </div>
            <span class="fitex">交通银行</span>
            <span class="fitexs">超长免息</span>
            <div class="nofont">
                <span class="doumt">奖金</span>
                <img src="../assets/down.png" width="10%" style="margin: 0 3px" alt="">
                <span style="color: #FF6666;font-size:15px">￥100</span>
            </div>
          </grid-item>
        </grid>
        </div>
    </div>
</template>
<script>
import { Flexbox, FlexboxItem,Grid, GridItem,Divider} from 'vux'
    export default {
      name:'Card',
      components: {
        Flexbox,
        FlexboxItem,
        Grid,
        GridItem,
        Divider,
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
    font-size: 12px;color: #c1c1c1;
    display: block;transform: scale(0.9);margin-top:2px;
  }
</style>
