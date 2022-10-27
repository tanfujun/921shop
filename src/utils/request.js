import axios from "axios";

import NProgress from 'nprogress' 

// axios.defaults.withCredentials = true

const request = axios.create({
    baseURL:'http://43.139.105.65:8884',
    timeout:5000
})

// request.defaults.withCredentials=true

request.interceptors.request.use(
    config => {
      NProgress.start()
      return config
    },
    error => {
      console.log(error)
      return Promise.reject(error)
    }
  )

request.interceptors.response.use(

    response => {
    NProgress.done()
    return response
    },
    error => {

      return Promise.reject(error)
    }
  )

  export default request