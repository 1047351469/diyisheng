import  request  from '@/utils/request';

export function getCategoryList(){
    return request({
       url:'category/list',
       method:'get'
    })
}

export function getCategoryPageList(params){
    return request({
       url:'category/page',
       method:'get',
       params
    })
}