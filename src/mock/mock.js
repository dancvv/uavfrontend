import Mock from "mockjs"

// // 设置拦截ajax请求的相应时间
// Mock.setup({
//     timeout: '200-600'
// });

// let configArray = [];

// // 使用webpack的require.context()遍历所有mock文件
// const files = require.context('.', true, /\.js$/);
// files.keys().forEach((key) => {
//     if (key === './index.js') return;
//     configArray = configArray.concat(files(key).default);
// });

// // 注册所有的mock服务
// configArray.forEach((item) => {
//     for (let [path, target] of Object.entries(item)) {
//         let protocol = path.split('|');
//         Mock.mock(new RegExp('^' + protocol[1]), protocol[0], target);
//     }
// });


const chartData = () => {
    // mock随机数据
     const Random = Mock.Random;
     let data= [];
     for (let i = 0; i < 10; i++) {
         let newData = {
             title: Random.csentence(10, 25), // 随机生成长度为10-25的标题
             region: Random.region(), // 随机生成地区
             author: Random.cname(), // 随机生成名字
             date: Random.date() + ' ' + Random.time() // 随机生成年月日 + 时间
         }
         data.push(newData)
     }
     return data
 }
 // Mock.mock(url,method,chartData) 三个参数对应 api地址、请求方式、数据源
 Mock.mock("/getData",'get',chartData) 
 // 上面这句代码的作用是拦截要请求的地址，从而使用本地的数据
 // 要模拟多个接口的话，写多个数据源。每个调用一次Mock.mock()就可以了
 