//简单写个request,定个时,其他的拦截什么的没有时间弄了,在调用的时候被我手动抛出了.
import axios from "axios"
const request = axios.create({
  timeout: 3000,
})
export default request