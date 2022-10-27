<template>
  <div class="container">
    <!-- <router-link class="image-link"> -->
    <router-link to="/goods/detail?typeName=图书音像" class="image-link">
      <img class="logo" src="../../assets/images/logo.png" alt="" />

      <img class="logo-title" src="../../assets/images/921shop.png" alt="" />
    </router-link>

    <!-- </router-link> -->
    <div class="search-container">
      <div class="line">&nbsp;</div>
      <div class="search">
        <a-input-search
          placeholder="输入搜索的商品"
          enter-button="搜索"
          size="large"
          @search="onSearch"
          :loading="isloading"
        />
      </div>
    </div>
    <div class="right">
      <router-link to="/goods/detail?typeName=图书音像"> 首页 </router-link>
      <router-link v-show="!user_name" to="/user/login" > 登录 </router-link>
      <a-popconfirm placement="bottom" ok-text="是" cancel-text="否" @confirm="confirm">
        <template #title>
          <p>你确定要退出登录吗？</p>
        </template>
          <router-link v-show="user_name" to=""> 退出登录 </router-link>
      </a-popconfirm>
      <router-link to="" @click.native="clickOrder"> 我的订单 </router-link>
      <router-link to="/goods/cart"> 购物车 </router-link>
      <span v-show="user_name">你好，{{user_name}}</span>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
export default {
  name: "Header",
  data() {
    return {
      islogin: false,
      isloading: false,
      activeKey: "/goods/detail?typeName=图书音像",
    };
  },
  watch:{

  },
  computed:{...mapState({user_name: state => state.user.username})},
  methods: {
    async onSearch(value) {
      if (value) {
        this.isloading = true;
        let result = await this.$API.goods.reqGetAllGoods();
        let allGoodsList = result.data;
        // console.log(allGoodsList);
        //正则匹配搜索内容
        var reg = RegExp(value);
        let changeList = allGoodsList.filter((item) => {
          return reg.test(item.goods_title);
        });
        if(this.$route.path==='/goods/detail'){
        this.$bus.$emit("changeList", changeList);
        this.$route.query.typeName = "";
        this.$router.push("/goods/detail");
        }else{
          this.$router.push("/goods/detail")
          setTimeout(()=>{
            this.$bus.$emit("changeList", changeList);
          },1000)
          
          // this.$route.query.typeName = "";
          // this.onSearch() 
        }
        this.isloading = false;
      } else {
        this.$message.error("请输入内容", 1);
      }
    },
    callback(activeKey) {
      console.log(activeKey);
      if (activeKey != "logout") {
        this.$router.push(activeKey);
        if (activeKey === "/user/login") {
          this.islogin = true;
          this.$message.success("登录成功！");
        }
        this.activeKey = activeKey;
      } else {
        console.log(123);
        this.activeKey = "/goods/detail?typeName=图书音像";
        this.$message.success("退出登录成功！");
        this.islogin = false;
        this.$router.push(this.activeKey);
      }
    },
    confirm(){
      // 退出登录
      localStorage.removeItem('user_name')
      localStorage.removeItem('user_id')
      location.reload()
    },
    clickOrder(){
    let username = localStorage.getItem('user_name')
    if(username){
      this.$router.push('/goods/order')
    }else{
      this.$message.error("请先登录！")
    }
  },
  },
  
  mounted(){

  }

};
</script>

<style scoped lang="less">
.container {
  box-shadow: 0 2px 8px #f0f1f2;
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  .image-link {
    height: 100%;
    display: flex;
  }
  .logo {
    height: 80%;
    width: auto;
    margin-left: 40px;
    // margin-top: 5px;
  }
  .logo-title {
    width: 90;
    height: 100%;
  }
  .line {
    height: 50px;
    width: 1px;
    margin-left: 200px;
    background-color: rgb(235, 237, 240);
  }
  .search-container {
    display: flex;
    flex: 1;
    align-items: center;
    .search {
      width: 450px;
      height: 40px;
      margin-left: 10px;
    }
  }

  .right {
    display: flex;
    align-items: center;
    height: 100%;
    margin-right: 20px;
    a {
      height: 100%;
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .tabs {
      align-self: flex-start;
      margin-top: -16px;
      margin-right: 10px;
    }
  }
}
</style>