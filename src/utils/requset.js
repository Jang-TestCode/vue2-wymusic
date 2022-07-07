import axios from 'axios'

const api = axios.create({ // 自定义对象
  baseURL: 'http://localhost:3000', // 请求服务器的根路径
})

export default api
