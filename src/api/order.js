import request from '@/utils/request'

export default {
    //查询用户的所有订单    
    getOrderList(userid){
            return request({
                url:`/order/user_order?user_id=${userid}`,
                method:'get'
            })
        },
    //添加商品订单
    addOrder(cart){
        return request({
            url:"/order/add_order",
            method:"post",
            data:cart
        })
    },
    //删除商品订单
    deleteOrder(order_num){
        return request({
            url:`/order/delOrder?order_num=${order_num}`,
            method:"get"
        })
    },
    //通过订单号获取订单详情
    getOrderDetail(order_num){
        return request({
            url:`/order/getOrder?order_num=${order_num}`,
            method:'get'
        })
    }

}