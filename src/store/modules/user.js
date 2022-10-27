import userAPI from '@/api/user'

const state = {
    username:localStorage.getItem('user_name'),
    userid:localStorage.getItem('user_id')
}

const mutations = {
    SET_USERNAME(state,username){
        state.username = username
    },
    SET_USERID(state,userid){
        state.userid = userid
    }
}

const actions = {
        async Login({commit,dispatch},user){
                let result = await userAPI.login(user)
                if(result.data.code===200){
                    // console.log(user.user_name);
                    await dispatch('getUserInfo',user.user_name)
                    return "success!"
                }else{
                    return Promise.reject(new Error('failed'))
                }
        },
        async getUserInfo({commit},username){
                let result = await userAPI.getUserinfo(username)
                commit('SET_USERNAME',result.data[0].user_name)   
                localStorage.setItem('user_name',result.data[0].user_name)
                localStorage.setItem('user_id',result.data[0].user_id)
                commit('SET_USERID',result.data[0].user_id)
        },
        async register({commit},user){
            let result = await userAPI.register(user)
            if(result.status ===200){
                console.log(result);
            }
        },
        async Logout({commit}){


        }


}

export default {state,mutations,actions}