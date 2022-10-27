const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    open:true,
    proxy:{
      '/dev-api':{
        target:'http://localhost:8884',
        changeOrigin:true,
        pathRewrite:{'^/dev-api':''}
      },
  
    }
  },
  
})
