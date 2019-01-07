<template>
    <div id="schedule">
        <div class="progress">
            <a href="">
                <img src="" alt="">
            </a>
        </div>
        <div class="buttocon">
        <group>
            <group-title slot="title">填写有效信息</group-title>
            <x-input title="手机号" mask="999 9999 9999" v-model="maskValue" :max="13" is-type="china-mobile" placeholder="请输入申请人手机号"></x-input>
            <x-input title="身份证号" placeholder="请输入申请人身份证号"></x-input>
            <x-input title="验证码" placeholder="请输入验证码"></x-input>
        </group>
            <x-button link=""> 查询</x-button>
            <div class="bots">
                <div class="ston">注意事项</div>
                <div class="text">
                    请输入与申请人提交的信用卡申请资料一致的身份证号码或手机号码，否则，无法查询到信用卡申请进度，也不能领取最高188元的幸运红包。
                </div>
            </div>
        </div>
      <Retu/>
    </div>
</template>
<script>
import { XButton, XInput,Box, GroupTitle, Group, Divider } from 'vux'
import Retu from '@/components/retu'

export default {
  components: {
    Retu,
    XButton,
    XInput,
    Box,
    GroupTitle,
    Group,
    Divider,
    Retu
  },
  data(){
    return{
      maskValue:''
    }
  }
}
</script>
<style scoped>
    html{
        background: #fff !important;
    }
    #schedule{
        width: 100%;
        height: 100%;
        /*background: #fff !important;*/
    }
    .progress{
        width:100%;
        height: 100px;
        background: green;
    }
    .buttocon{
        width:95%;
        margin: 0 auto;
    }
    .weui-cells__title{
        font-size: 15px !important;
        margin: 10px 0 10px;
        font-weight: 800;
    }
    .weui-cell__hd{
        margin-top: 5px;
    }
    .weui-cell__hd .weui-label{
        font-size: 14px !important;
    }
    .weui-btn.weui-btn_default{
        background: #F6C93C;
        margin: 20px 0px 20px;
    }
    .bots{
        background: #fff;
    }
    .ston{
        font-size: 14px;
        padding-top: 10px;
        margin-bottom: 10px;
        margin-left: 10px;
    }
    .text{
        font-size: 12px;
        padding-bottom: 20px;
        margin-left: 10px;
        color:#BCBCBC;
        letter-spacing:2px;
    }
</style>
