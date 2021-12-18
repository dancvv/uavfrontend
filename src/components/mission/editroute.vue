<template>
<div>
  <h3 class="breadcrumb">当前位置</h3>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item :to="{ path: '/welcomepage' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>任务执行</el-breadcrumb-item>
    <el-breadcrumb-item>路线</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="card-box">
    <h3>表格</h3>
    <el-divider></el-divider>
    <div id="main"></div>

  </el-card>
</div>
</template>

<script>
// import G2 from '@antv/g2';          //引入G2
import { Chart } from "@antv/g2";   //或者只引入需要用到的G2组件，我要用Chart
const DataSet = require('@antv/data-set'); //antV中用DataSet作为数据集，可以对原始数据进行操作，比如格式转换之类的，以供图表方法使用，当然也可以不用，不管什么方法只要把数据格式转变成它需要的格式就可以了
export default {
  name: "editroute",
  data(){
    return{
      chartDataDouble: [
        { time: "周一", vs: 1234, vk: 124 },
        { time: "周二", vs: 1245, vk: 364 },
        { time: "周三", vs: 1456, vk: 428 },
        { time: "周四", vs: 1526, vk: 523 },
        { time: "周五", vs: 1548, vk: 92 },
        { time: "周六", vs: 1798, vk: 242 },
        { time: "周日", vs: 1723, vk: 131 },
      ]
    }
  },
  methods:{
    echartDemo(){
      const chart = new Chart({       // 创建一个图表
        container: "main",      // 容器是上面那个div
        autoFit: true,              // 自适应
        height: 300                 // 高度
      });

      const ds = new DataSet();       // 声明数据集 附官方文档 https://g2.antv.vision/zh/docs/manual/dataset/dataset
      const dv = ds.createView().source(this.chartDataDouble);    // 使用上面的数据chartDataDouble创建数据视图dv
      // fold 方式完成了行列转换，如果不想使用 DataSet 直接手工转换数据即可 --官方注释
      dv.transform({                  // 附transform API https://g2.antv.vision/zh/docs/manual/dataset/transform
        type: 'fold',
        fields: ['vs', 'vk'],       // 展开字段集
        key: 'type',                // key字段
        value: 'count'              // value字段
      });
      // 以上的数据转换后一条转为两条，eg：
      // { time: "周一", vs: 1234, vk: 124 }, 转换后=>
      // { "time": "周一", "type": "vs", "count": 1234 },{ "time": "周一", "type": "vk", "count": 124 },

      chart.data(dv.rows);            // 现在可以将dv的rows作为数据源
      chart.scale({                   // 之前的chart.source()方法已经替换为chart.data()和chart.scale()
        time: {
          range: [0, 1]           // 输出数据的范围，默认[ 0, 1 ]，格式为 [ min, max ]，min 和 max 均为 0 至 1 范围的数据 --官方
        },                          // 简单来说就是 这个图标的多少用于显示数据[0,1]就是数据占满横坐标宽度,[0,0.5]就是还余下半个空的横坐标
        count: {
          min: 0,                 // 我的纵坐标count的最小值，不设置的话自动取数据中最小数的作为y=0的起始
          nice: true              // 默认为 true，用于优化数值范围，使绘制的坐标轴刻度线均匀分布。例如原始数据的范围为 [3, 97]，如果 nice 为 true，那么就会将数值范围调整为 [0, 100] --官方
        },
      });
      chart.tooltip({
        showCrosshairs: true,       // 展示 Tooltip 辅助线
        shared: true,
        crosshairs: {
          type: 'line'
        }
      });
      chart.axis('count', {           // 坐标轴
        label: {
          formatter: function formatter(val) {
            return val ;            // 这里可以改坐标刻度的形式
          }
        }
      });
      chart.line().position('time*count').color('type').shape('smooth');      //方法都在官方
      chart.point().position('time*count').color('type').size(4).shape('circle').style({
        stroke: '#fff',             // 描边
        lineWidth: 1                // 宽度
      });
      chart.render();
    }
  },
  mounted() {
    this.echartDemo()
  }
}
</script>

<style scoped>
.breadcrumb{
  margin: 20px;
}
.card-box{
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
}
#main{
  width: 600px;
  height: 600px;
  background: beige;
}
</style>
