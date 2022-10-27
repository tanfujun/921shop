<template>
  <div class="container">
    <div v-show="goodList.length" class="good-container">
      <!-- {{$route.query.typeName}} -->
      <!-- <span v-for="good in goodList" :key="good.goods_id" style="margin-right:10px">{{good.goods_title}}</span> -->
      <a-card
        hoverable
        style="width: 260px; margin-top: 20px; margin-left: 10px"
        v-for="good in goodList"
        :key="good.goods_id"
        @click="gotoShow(good.goods_id)"
      >
        <img slot="cover" alt="example" :src="good.goods_cover" style="max-height:340px" />
        <a-card-meta :title="good.goods_title">
          <template slot="description">
            <div class="title">{{ good.goods_info }}</div>
            <div class="price">
              <p style="margin-right:5px;font-size: 14px;text-decoration:line-through">￥{{(good.goods_price+30).toFixed(2)}}</p>
              <p style="font-size:20px;color:crimson;font-weight: bold;">￥{{good.goods_price}}</p>
            </div>
            
          </template>
        </a-card-meta>
      </a-card>
      
      
    </div>
    <div class="pagination" v-show="goodList.length">

      <a-pagination 
      style="margin-top:20px"
      :pageSize="pageSize"
       show-quick-jumper
      :default-current="1" 
      @change="change"
      :total="total" 
      :show-total="total => `总共${total}条数据`" 
       />

    </div>

    <div class="empty">
      <a-empty v-show="!goodList.length" description="暂无数据" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Goods",
  data() {
    return {
      pageNum: 1, 
      pageSize: 8,
      total: 14,  
      goodList: [],
    };
  },
  watch: {
    $route: {
      deep: true,
      handler(newVal) {
        if(this.$route.query.typeName){
          this.getGoods(this.pageNum, this.pageSize, this.$route.query.typeName);
        }
        
      },
    },
  },
  methods: {
    async getGoods(pageNum = 1, pageSize = 5, type) {
      let result = await this.$API.goods.reqGetGoods({
        pageNum,
        pageSize,
        type,
      });
      console.log(result.data);
      this.goodList = result.data.data;
      this.total = result.data.total
    },
     changeList(udatedList){
        this.goodList = udatedList
     },
     change(page){
            this.getGoods(page,this.pageSize,this.$route.query.typeName)
     },
     gotoShow(goods_id){
          this.$router.push(`/goods/show?goods_id=${goods_id}`)
     }
  },

  mounted() {
    console.log(this.$route.query.typeName);
    if(this.$route.query.typeName){
      this.getGoods(this.pageNum, this.pageSize, this.$route.query.typeName);
    }
    
    this.$bus.$on('changeList',this.changeList)
  },
};
</script>

<style scoped lang="less"> 
.container {
  width: 100%;
  padding-left: 20px;
  padding-top: 20px;
  padding-right: 20px;
  .good-container {
    display: flex;
    flex-wrap: wrap;
    .price{
      display: flex;
      margin-top: 5px;
      justify-content: flex-end;
      align-items: baseline;
    }
    .title {
  //设置只显示两行，多出省略号
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -moz-box;
  -moz-line-clamp: 2;
  -moz-box-orient: vertical;
  overflow-wrap: break-word;
  word-break: break-all;
  white-space: normal;
  overflow: hidden;
}
  }
}
.empty {
  margin-top: 150px;
}

</style>