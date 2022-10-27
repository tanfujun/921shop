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
        <a-form-item label="" style="display:flex;justify-content: flex-start;">
      <a-radio-group v-decorator="['radio-group',{rules:[{required: true, message: 'Please select your Sex!'}]}]">
        <a-radio value="男">
          男
        </a-radio>
        <a-radio value="女">
          女
        </a-radio>
      </a-radio-group>
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
        <a-form-item>
          <a-input
            v-decorator="[
              'repeatpassword',
              {
                rules: [
                  { required: true, message: 'Please input your Password again!' },
                ],
              },
            ]"
            type="password"
            placeholder="repeatPassword"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item><a-button type="primary" html-type="submit" class="login-form-button">
            注册
          </a-button></a-form-item>
      </a-form>
    </div>
  </template>
    
    <script>
  export default {
    name:"Register",
    beforeCreate() {
      this.form = this.$form.createForm(this, { name: "normal_login" });
    },
    methods: {
    handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields(async (err, values) => {
          if (!err) {
            console.log(values);
            let user_name = values.userName
            let user_password = values.password
            let sex = values['radio-group']
            if(values.password!=values.repeatpassword){
                this.$message.error('两次密码输入不一致，请重新输入！')
            }else{
                try {
                    let result = await this.$API.user.register({user_name,user_password,sex})
                    console.log(result);
                    if(result.status ===200){
                        this.$message.success("注册成功！")
                        this.$router.push('/goods/detail?typeName=图书音像')
                    }else{
                        this.$message.error("注册失败！")
                    }
                } catch (error) {
                    this.$message.error(error)
                }
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
  