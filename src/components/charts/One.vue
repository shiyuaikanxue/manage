<template>
  <div class="className">
    <h2>人数统计</h2>
    <div class="one" id="one"></div>
  </div>
</template>

<script setup>
import Link from "@/api/Link";
import apiUrl from "@/api/url";
import { inject, onMounted, reactive, ref } from "vue";
const one = ref(null);
const echarts = inject("echarts");
const DataMap = reactive({
  xData: [],
  yData: [],
});
onMounted(() => {
  const myChart = echarts.init(document.getElementById("one"));

  Link(apiUrl.chartDataOne).then((success) => {
    const { data } = success;
    const xData = data.map((item) => item.title); // 假设 item.title 是 x 轴上的类别数据
    const yData = data.map((item) => item.num); // 确保将 num 转换为数值类型

    // 设置图表选项，确保在数据加载完成后执行
    myChart.setOption({
      xAxis: {
        type: "value", // 类别数据应放在 x 轴上
        axisLine: {
          lineStyle: {
            color: "#fff",
          },
        },
      },
      yAxis: {
        type: "category", // 数值数据应放在 y 轴上
        data: xData,
        axisLine: {
          lineStyle: {
            color: "#fff",
          },
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
          data: yData,
          itemStyle: {
            normal: {
              barBorderRadius: [0, 20, 20, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "#005eaa",
                },
                {
                  offset: 0.5,
                  color: "#339ca8",
                },
                {
                  offset: 1,
                  color: "#cda819",
                },
              ]),
            },
          },
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
.one {
  height: 4.5rem;
}
</style>
