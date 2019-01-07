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
                <span style="color: #fff;">自动结算</span>
              </div>
            </div>
            <span>交通银行</span><br>
            <span style="font-size: 13px">超长免息</span><br>
            <div style="margin-top: 5px;font-size: 12px">
                <span style="color: #fff;background: #ef6519;padding: 1px 5px;border-radius: 20px">奖金</span><img src="../assets/down.png" width="10%" style="margin: 0 3px" alt=""><span style="color: #ef6519;">￥100</span>
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
    padding: 1px;background: #ef6519;font-size: 12px;
    position: absolute;top: 0;bottom: 0;left: 0;right: 0;margin: auto
  }
</style>