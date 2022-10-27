<template>
  <div class="container">
    <div class="image-title">
      <a-card title="" style="width: 350px">
        <template #cover>
          <img
            style="max-height: 400px"
            alt="example"
            :src="goods_detail.goods_cover"
          />
        </template>
      </a-card>
      <div class="right">
        <a-card title="" class="detail">
          <h1>{{goods_detail.goods_title}}</h1>
          <p>商品价格：<span class="price">￥{{goods_detail.goods_price.toFixed(2)}}</span></p>
          <p>定价：<span class="oldprice">￥{{(goods_detail.goods_price+30).toFixed(2)}}</span></p>
          <p>库存：<span>{{goods_detail.goods_save}}</span></p>
          <p>销量：<span>{{goods_detail.goods_sales}}</span></p>
          <!-- <p>出版社： <span>清华大学出版社</span></p> -->
          <p>商品类型：<span>{{goods_detail.goods_type}}</span></p>
          <p>商品折扣：<span>{{goods_detail.goods_discount*10}}%</span></p>
          
          <div class="button">
            <a-button type="primary" size="large" class="icon" @click="addCart">
               <svg t="1663741829793" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2823" width="20" height="20"><path d="M933.282882 260.09476c-15.21247-22.399149-40.325427-35.772738-67.178005-35.772738L279.771915 224.322022l-50.179866-0.061398-4.52813-25.161053L218.838124 154.742317c-2.003634-14.264888-14.31196-25.018813-28.628014-25.018813l-84.399225 0c-15.947204 0-28.91761 13.047154-28.91761 29.087479 0 16.041348 12.971429 29.088502 28.91761 29.088502l59.276035 0 2.794649 19.902282c0.052189 0.373507 0.113587 0.738827 0.181125 1.104147l8.257058 45.915749c0.128937 2.482541 0.568958 4.932336 1.316995 7.30129l12.232602 68.001767c0.076748 0.431835 0.165776 0.862647 0.275269 1.364067l62.193481 271.895527c0.13303 0.582261 0.280386 1.151219 0.450255 1.74269 13.582343 46.020126 38.804794 76.647681 71.171969 87.729064-43.196825 11.782348-75.075883 51.67287-75.075883 98.942453 0 56.504922 45.551452 102.476953 101.539604 102.476953 55.992245 0 101.544721-45.967938 101.544721-102.476953 0-42.291199-25.51614-78.68099-61.830207-94.314039l287.727097 0c-36.31202 15.633049-61.828161 52.021817-61.828161 94.314039 0 56.504922 45.551452 102.476953 101.544721 102.476953 55.992245 0 101.542674-45.967938 101.542674-102.476953 0-47.241954-31.845289-87.11815-75.009368-98.92301 30.396287-10.266831 56.054667-37.824467 77.875648-83.48439 0.143263-0.302899 0.285502-0.610914 0.388856-0.86674l118.494765-271.861758c0.189312-0.426719 0.360204-0.857531 0.524956-1.284249C951.223486 309.592081 948.267155 282.152125 933.282882 260.09476L933.282882 260.09476zM673.866574 791.799544c0-24.426319 19.608593-44.299949 43.708478-44.299949 24.103978 0 43.713594 19.869536 43.713594 44.299949 0 11.834536-4.572132 22.968108-12.868075 31.353079-8.266267 8.351202-19.219737 12.950963-30.845519 12.950963C693.475168 836.099493 673.866574 816.225863 673.866574 791.799544L673.866574 791.799544zM350.423021 747.499595c24.103978 0 43.712571 19.869536 43.712571 44.299949 0 24.427342-19.608593 44.299949-43.712571 44.299949-24.099884 0-43.708478-19.872606-43.708478-44.299949C306.714544 767.373225 326.323137 747.499595 350.423021 747.499595L350.423021 747.499595zM887.599424 314.007647 769.626545 584.685439c-17.642822 36.757159-35.314297 54.623062-54.026474 54.623062L352.237343 639.308501c-10.739599 0-30.688953-6.485715-43.760666-49.910737l-61.818951-270.298146-6.595208-36.648688 39.671535 0.047072 586.370825 0c7.618515 0 15.065114 3.993964 19.433608 10.417257C889.674689 299.003931 890.384863 306.290895 887.599424 314.007647L887.599424 314.007647zM887.599424 314.007647M730.513736 329.836147c-5.457292 0-10.659781 1.729387-15.051811 4.997827L485.768569 506.027985l-68.983117-81.219813c-4.813632-5.665023-11.82942-8.92016-19.243273-8.92016-6.053879 0-11.919471 2.193968-16.511046 6.173606-10.516518 9.123798-11.734252 25.188682-2.713808 35.8106l84.309174 99.275028c4.813632 5.666046 11.82942 8.92016 19.24839 8.92016 5.457292 0 10.663874-1.729387 15.050788-5.002944l248.657266-185.325869c11.166317-8.319479 13.558807-24.252357 5.335519-35.517935C746.170321 333.720617 738.543619 329.836147 730.513736 329.836147L730.513736 329.836147zM730.513736 329.836147" p-id="2824" fill="#f4fbf1"></path></svg>
              <p>加入购物车</p>
            </a-button>
          </div>
        </a-card>
      </div>
    </div>
    <div class="description">
      <a-divider orientation="left" style="font-size: 20px">内容简介</a-divider>
      <p class="content">{{goods_detail.goods_info}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Show",
  data() {
    return {
        goods_detail: {},
        good:{
            "goods_id": 1000,
            "goods_title": "《习近平与大学生朋友们》",
            "amount": 3,
            "goods_price": 58.0,
            "goods_cover": "https://gw.alicdn.com/imgextra/i4/1049653664/O1CN01KFFBoe1cw9p7avEbu_!!1049653664.jpg_Q75.jpg_.webp"
        }
    };
  },
  methods:{
        async getGoodsDetail(id){
            let result = await this.$API.goods.reqGetGoodsDetail(id)
            this.goods_detail = result.data
        },
        addCart(){
            let username = localStorage.getItem('user_name')
            if(username){
                const {goods_id,goods_title,amount,goods_price,goods_cover} = this.goods_detail
            this.$store.dispatch('add_good',{goods_id,goods_title,amount:1,goods_price,goods_cover})
            this.$message.success('加入购物车成功!')
            }else{
                this.$message.error('请先登录！')
            }
            
        }
  },
  mounted(){
        this.getGoodsDetail(this.$route.query.goods_id)
  }
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  text-align: center;
  padding-top: 20px;
  padding-left: 20px;
}
.image-title {
  display: flex;
  // justify-content: space-between;
  .right {
    margin-left: 20px;
    .detail {
      width: 800px;
      text-align: left;
      h1 {
        font-size: 25px;
      }
      p {
        font-size: 18px;
        margin-top: 20px;
        .price {
          font-size: 24px;
          color: crimson;
        }
        .oldprice {
          text-decoration: line-through;
        }
      }
      .button {
        margin-top: 10px;
        float: right;
        .icon{
            display: flex;
            align-items: center;
            // justify-content: space-between;
            p{
                font-size: 16px;
                margin-bottom: 18px;
                margin-left: 2px;
            }
            
        }
      }
    }
  }
}
.description {
  margin-top: 100px;
  margin-bottom: 100px;
  .content{
    width: 800px;
    text-align: left;
    margin-left: 70px;
    font-size: 20px;
    text-indent: 2em;
    line-height: 22pt;
  }
}
</style>