import request from "@/utils/request";
export const getData=(url)=>{
  return request({url:'/'+url,method:"get"})
}