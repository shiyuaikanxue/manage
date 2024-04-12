<template>
  <div class="className">
    <h2>车位统计</h2>
    <div class="four" id="four"></div>
  </div>
</template>

<script setup>
import Link from "@/api/Link";
import apiUrl from "@/api/url";
import { inject, onMounted, reactive, ref } from "vue";
const echarts = inject("echarts");
onMounted(() => {
  const myChart = echarts.init(document.getElementById("four"));

  Link(apiUrl.chartDataFour).then((success) => {
    console.log(success);
    const { data } = success;
    // 设置图表选项，确保在数据加载完成后执行
    myChart.setOption({
      xAxis: {
        type: "category", // 类别数据应放在 x 轴上
        data: data.day,
        axisLine: {
          lineStyle: {
            color: "#fff",
          },
        },
      },
      yAxis: {
        type: "value", // 数值数据应放在 y 轴上
        axisLine: {
          lineStyle: {
            color: "#fff",
          },
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        top: "3%",
        left: "1%",
        bottom: "3%",
        right: "6%",
        containLabel: true,
      },
      series: [
        {
          type: "bar",
          data: data.num["一般用户"],
          stack: "total",
        },
        {
          type: "bar",
          data: data.num["月租用户"],
          stack: "total",
        },
        {
          type: "bar",
          data: data.num["特殊车辆"],
          stack: "total",
        },
      ],
    });
  });
});
</script>

<style lang="scss" scoped>
h2 {
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  font-size: 0.25rem;
  color: white;
}
.four {
  height: 4.5rem;
}
</style>
