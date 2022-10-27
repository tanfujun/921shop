<template>
  <div class="container">
    <a-list size="large" bordered :data-source="listData" :pagination="pagination">
      <a-list-item slot="renderItem" slot-scope="item, index">
          <div class="cart-item">
            <img :src="item.goods_cover" alt="" style="margin-right:20px">
              <p class="title">{{item.goods_title}}</p>
              <div class="right-bottom">
                <a-popconfirm
    title="确定要删除该商品吗?"
    placement="bottom"
    ok-text="是"
    cancel-text="否"
    @confirm="deleteGood(item.goods_id)"
  >
                <div class="icon-container" >
                <svg t="1663858604218" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2570" width="20" height="20"><path d="M607.897867 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L575.903242 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 351.94087C639.892491 753.593818 625.61532 768.043004 607.897867 768.043004z" p-id="2571"></path><path d="M415.930119 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L383.935495 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625 17.717453 0 31.994625 14.277171 31.994625 31.994625l0 351.94087C447.924744 753.593818 433.647573 768.043004 415.930119 768.043004z" p-id="2572"></path><path d="M928.016126 223.962372l-159.973123 0L768.043004 159.973123c0-52.980346-42.659499-95.983874-95.295817-95.983874L351.94087 63.989249c-52.980346 0-95.983874 43.003528-95.983874 95.983874l0 63.989249-159.973123 0c-17.717453 0-31.994625 14.277171-31.994625 31.994625s14.277171 31.994625 31.994625 31.994625l832.032253 0c17.717453 0 31.994625-14.277171 31.994625-31.994625S945.73358 223.962372 928.016126 223.962372zM319.946246 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625l320.806316 0c17.545439 0 31.306568 14.105157 31.306568 31.994625l0 63.989249L319.946246 223.962372 319.946246 159.973123 319.946246 159.973123z" p-id="2573"></path><path d="M736.048379 960.010751 288.123635 960.010751c-52.980346 0-95.983874-43.003528-95.983874-95.983874L192.139761 383.591466c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 480.435411c0 17.717453 14.449185 31.994625 31.994625 31.994625l448.096758 0c17.717453 0 31.994625-14.277171 31.994625-31.994625L768.215018 384.795565c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 479.231312C832.032253 916.835209 789.028725 960.010751 736.048379 960.010751z" p-id="2574"></path></svg>

                </div>
                </a-popconfirm>
                <div class="count">
                  <a-input-number id="inputNumber" v-model="item.amount" :min="1" :max="10" />
                  <p class="text">￥{{item.goods_price*item.amount.toFixed(2)}}</p>

                </div>
              </div>
          </div>
      </a-list-item>
      <div slot="header" style="text-align:left;font-size: 24px;">
        购物车
      </div>
      <div slot="footer" class="footer">
        <div class="totalprice">
          总价：<span>￥{{total.toFixed(2)}}</span>
        </div>
        <div class="button">
          <a-popconfirm
    title="确定要清空购物车吗？"
    placement="bottom"
    ok-text="是"
    cancel-text="否"
    @confirm="reset"
  >
          <a-button type="primary" size="large">
      清空购物车
    </a-button>
    </a-popconfirm>
    
    <a-button type="primary" size="large" style="margin-left:20px" @click="openModal">
      结算
    </a-button></div>
        
      </div>
    </a-list>
    <a-modal
      title="即将下单"
      :visible="visible"
      @ok="addOrder"
      @cancel="handleCancel"
      cancelText="取消"
      okText="现在下单"

    >
      <p>你的商品总价格为￥{{ total.toFixed(2) }}，确定下单吗？</p>
    </a-modal>
  </div>
</template>

<script>
  import lodash from 'lodash'
export default {
    name:"Cart",
    data() {
      return {
        pagination:{
        onChange: page => {
          console.log(page);
        },
        pageSize: 3,
      },
        visible:false,
        listData: []
      };
    },
    watch:{
      listData:{
        deep:true,
        handler(newVal){
              this.$store.commit('UPDATE_GOODS_LIST',newVal)
        }
      }
    },
    computed:{
      total(){
            let totalprice = 0;
            this.listData.forEach(item => {
                totalprice += item.amount *item.goods_price
            });
            return totalprice;
      },
    },
    methods:{
      onChange(value,id){console.log(value,id);},
      reset(){
        this.listData = []
      },
      deleteGood(id){
        this.$store.dispatch('deleteGood',id)
      },
      async addOrder(){
        let cart = this.$store.state.goods.cart
        let user_id = this.$store.state.user.userid
        cart.user_id = user_id
        let result = await this.$API.order.addOrder(cart)
        if(result.data.code == 200){
          this.$message.success("下单成功！")
          this.reset()
        }else{
          this.$message.error("下单失败！")
        }
        this.visible =false
      },
      handleCancel(){
        this.visible =false
      },
      openModal(){
        if(this.listData.length){
          this.visible = true
        }else{
          this.$message.error("购物车为空！")
        }
      }
    },
    mounted(){
        this.listData = lodash.cloneDeep(this.$store.state.goods.cart.goods_list)
    }
}
</script>

<style scoped lang="less">
    .container{
        padding-left:20px ;
        padding-top: 20px;
        padding-right: 20px;
        .cart-item{
          display: flex;
          width: 100%;
          img{
            height: auto;
            width: 150px;
          }

          .title{
            font-size: 20px;
            flex:1;
            text-align: left;
          }
          .right-bottom{
            // align-self: flex-end;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            height: 100%; 
            .count{
              margin-top: 90px;
              display: flex;
              .text{
              // float: right;
            // color: rgb(0, 0, 0);
            line-height: 30px;
            font-size: 30px;
            // margin-left: 10px;
            width: 100px;
            // margin-top: 100px;
            }
            }
           
            
          }
          
        }
        .footer{
            width: 100%;
            text-align: right;
            display: flex;
            justify-content: flex-end;
            display: flex;
            flex-direction: column;
            .totalprice{
              font-size: 25px;
              span{
                color: rgb(220, 20, 20);
            line-height: 35px;
            font-size: 35px;
              }
              margin-bottom: 20px;
            }
            .button{
              // margin-left: 20px;
            }
          }
    }


</style>