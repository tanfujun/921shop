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
            <p class="title">订单编号：{{ item.order_num }}</p>
            <div class="goods_image">
              <img
                :src="image.goods_cover"
                v-for="image in item.goods_list"
                :key="image.id"
                alt=""
              />
            </div>
          </div>
          <div class="right">
            <div class="icon-container">
              <div class="detail" @click="gotoDetail(item.order_num)">
                <svg
                  t="1663902275783"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2378"
                  width="20"
                  height="20"
                >
                  <path
                    d="M512 958.016C266.08 958.016 65.984 757.952 65.984 512 65.984 266.08 266.08 65.984 512 65.984c245.952 0 446.016 200.064 446.016 446.016C958.016 757.952 757.952 958.016 512 958.016zM512 129.984C301.344 129.984 129.984 301.344 129.984 512c0 210.624 171.36 382.016 382.016 382.016 210.624 0 382.016-171.36 382.016-382.016C894.016 301.344 722.624 129.984 512 129.984z"
                    p-id="2379"
                  ></path>
                  <path
                    d="M512 304m-48 0a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0Z"
                    p-id="2380"
                  ></path>
                  <path
                    d="M512 768c-17.664 0-32-14.304-32-32l0-288c0-17.664 14.336-32 32-32s32 14.336 32 32l0 288C544 753.696 529.664 768 512 768z"
                    p-id="2381"
                  ></path>
                </svg>
              </div>
               
              <a-popconfirm
                title="确定要删除该订单吗?"
                placement="bottom"
                ok-text="是"
                cancel-text="否"
                @confirm="deleteOrder(item.order_num)"
              >
              <svg
                t="1663902997770"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3301"
                width="20"
                height="20"
              >
                <path
                  d="M608 768c-17.696 0-32-14.304-32-32L576 384c0-17.696 14.304-32 32-32s32 14.304 32 32l0 352C640 753.696 625.696 768 608 768z"
                  p-id="3302"
                ></path>
                <path
                  d="M416 768c-17.696 0-32-14.304-32-32L384 384c0-17.696 14.304-32 32-32s32 14.304 32 32l0 352C448 753.696 433.696 768 416 768z"
                  p-id="3303"
                ></path>
                <path
                  d="M928 224l-160 0L768 160c0-52.928-42.72-96-95.264-96L352 64C299.072 64 256 107.072 256 160l0 64L96 224C78.304 224 64 238.304 64 256s14.304 32 32 32l832 0c17.696 0 32-14.304 32-32S945.696 224 928 224zM320 160c0-17.632 14.368-32 32-32l320.736 0C690.272 128 704 142.048 704 160l0 64L320 224 320 160z"
                  p-id="3304"
                ></path>
                <path
                  d="M736.128 960 288.064 960c-52.928 0-96-43.072-96-96L192.064 383.52c0-17.664 14.336-32 32-32s32 14.336 32 32L256.064 864c0 17.664 14.368 32 32 32l448.064 0c17.664 0 32-14.336 32-32L768.128 384.832c0-17.664 14.304-32 32-32s32 14.336 32 32L832.128 864C832.128 916.928 789.056 960 736.128 960z"
                  p-id="3305"
                ></path>
              </svg>
            </a-popconfirm>
            </div>

            <p>
              总价:<span class="totalPrice">￥{{ item.total_price }}</span>
            </p>
          </div>
        </div>
      </a-list-item>
      <div slot="header" style="text-align: left; font-size: 24px">
        我的订单
      </div>
      <div slot="footer" class="footer"></div>
    </a-list>
  </div>
</template>
  
  <script>
import { mapState } from "vuex";
export default {
  name: "Order",
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
    async getOrderList() {
      let user_id = this.$store.state.user.userid;
      let result = await this.$API.order.getOrderList(user_id);
      this.listData = result.data.data.reverse();
    },
    async deleteOrder(order_num){
        try {
        await this.$API.order.deleteOrder(order_num)
            this.$message.success("删除成功！")
            this.getOrderList()
        } catch (error) {
            this.$message.error("删除失败！")
        }
    },
    gotoDetail(order_num){
      this.$router.push(`/goods/order/detail?order_num=${order_num}`)
    }
  },
  mounted() {
    this.getOrderList();
  },
};
</script>
  
  <style scoped lang="less">
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
      }
    }
    .right {
      flex: 1;
      width: 100%;
      height: 150px;
      display: flex;
      // background-color: #f2f;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;
      .icon-container {
        display: flex;
        .icon {
          margin-left: 20px;
        }
      }
      p {
        font-size: 24px;
        span {
          color: rgb(255, 0, 0);
          font-size: 28px;
        }
      }
    }
  }
}
</style>