const state ={
    cart:{
        "user_id": '',
        "goods_list": []
  
}
}

const mutations = {
    ADD_GOOD(state,good){
        state.cart.goods_list.push(good)
    },
    UPDATE_AMOUNT(state,index){
        state.cart.goods_list[index].amount = ++state.cart.goods_list[index].amount
    },
    RESET_CART(state){
        state.cart.goods_list = []
    },
    UPDATE_GOODS_LIST(state,list){
        state.cart.goods_list = list
    },
    DELETE_GOOD(state,index){
        state.cart.goods_list.splice(index,1)
    }
    
}

const actions = {
    add_good({commit,state},good){
        let result =  state.cart.goods_list.every(item => good.goods_id != item.goods_id)
        if(result){
            commit('ADD_GOOD',good);
        }else{
           let index =  state.cart.goods_list.findIndex( item => item.goods_id ==good.goods_id);
           commit('UPDATE_AMOUNT',index)
        }
    },
    add_amount({commit},num){
            commit('ADD_AMOUNT',num)
    },
    deleteGood({commit,state},id){
        let index = state.cart.goods_list.findIndex(item => id == item.goods_id)
        commit('DELETE_GOOD',index)
    }

}

export default {state,mutations,actions}