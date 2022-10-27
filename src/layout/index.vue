<template>
  <div class="container">
    <!-- 头部 -->
        <div class="head">
            <Header/>
        </div>
        <!-- 主体内容 -->
        <div class="context">
            <el-row>
              <el-col :span="4" v-show="showSideBar" class="aside"><SideBar/></el-col>
              <el-col :span="showSideBar===true?20:24" class="detail"><router-view></router-view></el-col>
            </el-row>

        </div>
        <div class="foot">
            <Bottom></Bottom>
        </div>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue';
import Header from './components/Header.vue';
import Bottom from './components/Bottom.vue';
export default {
    name: "layout",
    components: { SideBar, Header, Bottom },
    data() {
        return {
            showSideBar:true
        };
    },
    watch:{
        $route:{
            deep:true,
            handler(newVal){
                if(newVal.meta.showSideBar===false){
                    this.showSideBar = newVal.meta.showSideBar
                }else{
                    this.showSideBar = true
                }
            }
        }
    }
}
</script>

<style scoped lang="less">
    .container{
        margin: 0 auto;
        width: 100%;
        
        .head{
            width: 100%;
            // background-color: #f2f;
        }
        .context{
            width: 100%;
            .aside{
                // background-color: #ff2;
            }
            .detail{
            }

        }
        .foot{
            width: 100%;
            // background-color: #a2a;
        }

    }

</style>