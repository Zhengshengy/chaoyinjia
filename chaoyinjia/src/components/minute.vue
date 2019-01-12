<template>
    <div id="minute">
        <div id="fonfor">
            <div id="header">
                <div class="headli" style="font-size: 16px;font-weight: 600;color:#000">
                    {{title}}
                </div>
                <div class="time_list" style="font-size: 12px;margin: 10px 0">
                    <span style="color:#A9A9A9">{{time}}</span>
                    <span style="color:#2B4469;margin-left: 20px">芝麻银家</span>
                </div>
                <div id="heidh_fonst" v-html="con">
                </div>
            </div>
        </div>
      <div style="padding-top:32%"></div>
        <div style="position: fixed;bottom:0;">
            <Footer></Footer>
        </div>
        <Retu/>
    </div>
</template>
<script>
import Footer from '@/components/footer'
import Retu from '@/components/retu'

    export default {
    name:"Minute",
    components: {
      Footer,
      Retu
   },
        data(){
            return{
                con:'',
                title:'',
                time:''
            }
        },
        mounted(){
            var mobileHeight=window.innerHeight+"px";
            document.getElementById('minute').style.minHeight=mobileHeight;
            let mid = this.$route.params.mid
            this.$ajax.get('https://www.xiaofeishuwangluo.com/messagenotification/selectMessageNotificationByMid?mid='+mid).then(e=>{
                console.log(e)
                this.con = e.data.data.mdetails
                this.title = e.data.data.mtitle
                this.time = e.data.data.mtime
            })
        }
}
</script>
<style>
  #minute{
    width: 100%;height: 100%;background: #fff;
  }
  #minute::before {
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    z-index: -100;
}
#fonfor{
    padding: 10px;

}
  #heidh_fonst{
    background: #fff;
    width: 100%;
  }
  #heidh_fonst img{
    width: 100%;height:auto ;
  }
</style>
