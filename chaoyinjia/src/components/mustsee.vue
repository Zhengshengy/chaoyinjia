<template>
   <div class="mustsee">
      <div class="img">
        <img src="https://www.xiaofeishuwangluo.com/logo/mustsee1.png" alt="" v-if="stackic==1">
        <img src="https://www.xiaofeishuwangluo.com/logo/mustsee2.png" alt="" v-else-if="stackic==2">
        <img src="https://www.xiaofeishuwangluo.com/logo/mustsee3.png" alt="" v-else-if="stackic==3">
        <img src="https://www.xiaofeishuwangluo.com/logo/mustsee4.png" alt="" v-else-if="stackic==4">
      </div>
      <div style="width: 70%;margin: 20px auto">
        <flexbox >
          <flexbox-item v-if="currentPage==1">
            <div class="flex-demo page2">上一页</div></flexbox-item>
      <flexbox-item v-else><div class="flex-demo page" @click="prev()"><div>
        上一页
      </div>
      </div></flexbox-item>

      <flexbox-item ><div class="flex-demo page1">第{{currentPage}}/4页</div></flexbox-item>
      <flexbox-item v-if="currentPage<4"><div class="flex-demo page" @click="next()">
        <div>下一页</div>
      </div></flexbox-item>
       <flexbox-item v-else><div class="flex-demo page2">
        <div>下一页</div>
      </div></flexbox-item>
    </flexbox>
      </div>
   </div>
</template>
<script>
import { Flexbox, FlexboxItem,Toast } from 'vux'
import Retu from '@/components/retu'
export default {
  name: 'Mustsee',
  components: {
    Retu,
    Toast,
    Flexbox,
    FlexboxItem,
  },
  data(){
    return{
        currentPage:1,
        stackic:1,
    }
  },
  mounted(){
  },
  methods:{
    prev(){
      this.currentPage=this.currentPage-1
      if (this.currentPage==3){
        this.stackic=3
      } else if(this.currentPage==2){
        this.stackic=2
      }else if(this.currentPage==1){
          this.stackic=1
      }
    },
    next(){
      this.currentPage=this.currentPage+1
      if (this.currentPage==3){
        this.stackic=3
      } else if(this.currentPage==2){
        this.stackic=2
      }else if(this.currentPage==4){
        this.stackic=4
        this.showSuccess=true
        this.text='这是最后一张了，谢谢阅读'
      }
    },
  }
}
</script>
<style scoped>
.mustsee{
  width: 100%;height: 100%;
  background: #f5f5f5;
}
.mustsee .img{
  width: 100%;
  height: 100%;
}
.img img{
  width: 100%;
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
  .weui-icon-success-no-circle.weui-icon_toast{
    display: none;
  }
</style>
