<template>
  <div class="container">
    <a-list
      size="large"
      bordered
      :data-source="listData"
      :pagination="pagination"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <div class="cart-item">
          <div class="left">
            <!-- <p class="title">订单编号：{{ item.order_num }}</p> -->
            <div class="goods_image">
              <img
                :src="item.goods_cover"
                alt=""
              />
              <p>{{item.goods_title}}</p>
            </div>
          </div>
          <div class="right">
            <div class="info">
                <p>
              商品价格:<span class="totalPrice" style="color: rgb(255, 0, 0);">￥{{ item.goods_price }}</span>
            </p>
            <p>
                商品数量:<span>{{item.amount}}</span>
            </p>
            </div>
          </div>
        </div>
      </a-list-item>
      <div slot="header" style="text-align: left; font-size: 24px">
        订单详情
      </div>
      <div slot="footer" class="footer"></div>
    </a-list>
  </div>
</template>

<script>
export default {
    name:"OrderDetail",
    data() {
        return {
            pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      },
      listData: [],
        };
    },
    methods: {
    async getOrderDetail(order_num) {
      let result = await this.$API.order.getOrderDetail(order_num);
    //   console.log(result);
      this.listData = result.data
    },
  },
    mounted(){
        // console.log(this.$route.query.order_num);
        let order_num = this.$route.query.order_num
        this.getOrderDetail(order_num);
    }

}
</script>

<style lang="less" scoped>
    .container {
  padding-left: 20px;
  padding-top: 20px;
  padding-right: 20px;
  .cart-item {
    display: flex;
    width: 100%;
    .left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .goods_image {
        display: flex;
        width: 600px;
        overflow: hidden;
        margin-top: 20px;
        img {
          height: 100px;
          width: 100px;
          margin-right: 20px;
          border-radius: 5px;
        }
        p{
            font-size: 24px;
        }
      }
    }
    .right {
      flex: 1;
      width: 100%;
      height: 140px;
      display: flex;
      // background-color: #f2f;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-end;
      .info{
        display: flex;
        height: 100%;
        align-items: flex-end;
      }
      p {
        font-size: 22px;
        display: flex;
        align-items: baseline;
        margin-right: 10px;
        span {
          margin-top: 4px;
          font-size: 26px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>