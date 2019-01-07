<template>
  <div class="bigbox" >
    <div class="progress">
            <a href="">
                <img src="" alt="">
            </a>
        </div>
      <div class="reding">
        <div class="xuan" >选择银行</div>
        <grid :cols="3" :show-lr-borders="false">
          <grid-item v-for="i in 12" :key="i" >
              <img src="" alt="" >
            <span class="grid-center">建设银行</span>
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
    Divider
  },
  data () {
    return {

    }
  },
  methods:{

  }
}
</script>

<style scoped>
    .progress{
        width:100%;
        height: 100px;
        background: green;
    }
    .reding{
        width:90%;
        margin: 10px auto 0;
    }
    .xuan{
        font-weight: 600;padding: 10px 0 10px;font-size: 14px;
        margin-left: 5px;
    }
    .weui-grids.vux-grid-no-lr-borders{
        text-align: center;
        background: #fff;
    }
    .grid-center{
        color:#2b2b2b;
    }
  .bigbox::before{
    content:" ";
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    background-color:#F5F5F5;
    z-index:-100;
  }
</style>
