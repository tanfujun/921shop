<template>
  <div class="container">
    <img src="../../assets/images/head_logo.png" alt="" srcset="">
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
            'userName',
            {
              rules: [
                { required: true, message: 'Please input your username!' },
              ],
            },
          ]"
          placeholder="Username"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            },
          ]"
          type="password"
          placeholder="Password"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item >
        <a-checkbox
        class="login-form-remember"
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true,
            },
          ]"
        >
          Remember me
        </a-checkbox>
        <router-link to="/user/register" class="login-form-register"> register now! </router-link></a-form-item>
      <a-form-item><a-button type="primary" html-type="submit" class="login-form-button">
          登录
        </a-button></a-form-item>
    </a-form>
  </div>
</template>
  
  <script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
    console.log(this.form);
  },
  data() {
    return {
        property: 'value',
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
            //表单验证通过后
            const {userName,password} = values
            try {
                await this.$store.dispatch('Login',{user_name:userName,user_password:password})
                this.$message.success("登录成功！") 
                setTimeout(()=>{
                    location.reload();  
                },200)
                     
            } catch (error) {
                this.$message.error("登录失败，请检查用户名或者密码！")
            }
            
          
        }
      });
    },
  },
};
</script>
  <style scoped lang="less">
.container {
  padding-top: 20px;
    text-align: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        width: 600px;
        height: auto;
        margin-bottom: 30px;
    }
}
#components-form-demo-normal-login{
    margin-bottom: 100px;
    &.login-form{
        width: 500px;
    }
  
}
#components-form-demo-normal-login  {
    .login-form-remember{
        float: left;
    }
    .login-form-register{
        float: right;
    }
  
}
#components-form-demo-normal-login {
    .login-form-button{
        width: 100%;
    }
  
}
</style>
