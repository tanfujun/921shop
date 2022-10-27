import request from '@/utils/request'



export default {
    //获取所有分类列表
    reqGetCategoryList(){
        return request({
            url:'/goods/type1',
            method:'get'
        })
    },
    //获取对应商品分类的所有商品(包含分页)
    reqGetGoods({pageNum,pageSize,type}){
        return request({
            url:'/goods/goods_list',
            method:'get',
            params:{pageNum,pageSize,type}
        })
    },
    //获取所有商品
    reqGetAllGoods(){
        return request({
            url:'/goods/all',
            method:'get'
        })
    },
    // 通过商品id获取详细信息
    reqGetGoodsDetail(goods_id){
        return request({
            url:`/goods/getGoods?id=${goods_id}`,
            method:"get",
        })
    }

}