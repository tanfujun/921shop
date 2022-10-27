<template>
         <a-menu
      style="height: 700px;margin-top: 2px;margin-bottom: 2px;"
      v-model="selectedKeys"
      :mode="mode"
      @select="gotoDetail"
      :theme="theme"
    >
      <a-menu-item :key="item.id" v-for="item in typeList" style="margin-bottom:20px">
        <span style="font-size: 18px;">{{item.goods_type}}</span>
      </a-menu-item>
    </a-menu>

</template>

<script>
    export default {
    name:'SideBar',
    data() {
        return {
            mode: 'inline',
            selectedKeys:[1],
            theme: 'light',
            typeList: [], 
        };
    },
    watch:{
        $route:{deep:true,
            handler(newVal){
            if(newVal.path!='/goods/detail'){
                this.selectedKeys = []
            }
            if(newVal.query.typeName){
                let result = this.typeList.find(item => item.goods_type ===newVal.query.typeName).id;
            this.selectedKeys = [result]

            }
        }
        }
    },
    methods:{
           async getCategoryList(){
            let result = await this.$API.goods.reqGetCategoryList()
            this.typeList = result.data
            this.$router.push({path:'/goods/detail',query:{typeName:this.typeList[0].goods_type}})
        },
           gotoDetail({key}){
            let result = this.typeList.find(item => key === item.id)
            let typeName = result.goods_type
            console.log(typeName);
            this.$router.push({path:'/goods/detail',query:{typeName}})
           },
    },
    mounted(){
            this.getCategoryList()
    }
    
}
</script>

<style scoped lang="less">

    .sel-menu-vertical-demo{
        height: 800px;
        width: 100%;

    }

</style>