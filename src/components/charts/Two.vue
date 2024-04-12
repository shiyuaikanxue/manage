<template>
  <div class="className">
    <h2>每日访客统计</h2>
    <div class="two" id="two"></div>
  </div>
</template>

<script setup>
import Link from "@/api/Link";
import apiUrl from "@/api/url";
import { inject, onMounted, reactive, ref } from "vue";
const echarts = inject("echarts");

onMounted(() => {
  const myChart = echarts.init(document.getElementById("two"));
  Link(apiUrl.chartDataTwo).then((success) => {
    console.log(success);
    myChart.setOption({
      xAxis: {
        type: "category",
        data: success.data.day,
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: "#fff",
          },
        },
      },
      tooltip: {},
      yAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#fff",
          },
        },
      },
      grid: {
        left: "1%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      series: [
        {
          type: "line",
          name: "外卖",
          data: success.data.num["外卖"],
          stack: "Total",
          smooth: true,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(128,255,165)",
              },
              {
                offset: 1,
                color: "rgb(1,191,236)",
              },
            ]),
          },
          lineStyle: {
            width: 0,
          },
        },
        {
          type: "line",
          name: "快递",
          data: success.data.num["快递"],
          stack: "Total",
          smooth: true,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(0,221,255)",
              },
              {
                offset: 1,
                color: "rgb(77,119,255)",
              },
            ]),
          },
          lineStyle: {
            width: 0,
          },
        },
        {
          type: "line",
          name: "一般访客",
          data: success.data.num["一般访客"],
          stack: "Total",
          smooth: true,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(55,126,255)",
              },
              {
                offset: 1,
                color: "rgb(116,21,96)",
              },
            ]),
          },
          lineStyle: {
            width: 0,
          },
        },
        {
          type: "line",
          name: "授权访客",
          data: success.data.num["授权访客"],
          stack: "Total",
          smooth: true,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(255,0,134)",
              },
              {
                offset: 1,
                color: "rgb(87,36,243)",
              },
            ]),
          },
          lineStyle: {
            width: 0,
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
.two {
  height: 4.5rem;
}
</style>
