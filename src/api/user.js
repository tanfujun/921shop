import request from "@/utils/request";

export default {

        //检测用户名是否正确
        login(user) {
                return request({
                        url: '/user/login',
                        method: "post",
                        data: user
                })
        },
        //通过用户名查询用户信息
        getUserinfo(username) {
                return request(
                        {
                                url: 'user/getUserList',
                                method: 'get',
                                params:{name:username}
                                
                        }
                )
        },
        //注册用户
        register(user){
                console.log(user);
                return request({
                        url:'/user/addUser',
                        method:'post',
                        data:user
                })
        }

}