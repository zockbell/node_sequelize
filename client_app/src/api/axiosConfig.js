import axios from "axios";

// 接口前缀
console.log(process.env.NODE_ENV, '环境')
let dev_pro  = process.env.NODE_ENV;
if(dev_pro == 'production'){
    axios.defaults.baseURL = '/';          // 生产环境配置 
}else{
    axios.defaults.baseURL = '/api/';      // 开发环境配置    
}

axios.defaults.timeout = 20000;