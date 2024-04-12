<template>
  <div class="className">
    <h2>保修统计</h2>
    <div class="three" id="three"></div>
  </div>
</template>

<script setup>
import Link from "@/api/Link";
import apiUrl from "@/api/url";
import { inject, onMounted, reactive, ref } from "vue";
const echarts = inject("echarts");
onMounted(() => {
  const myChart = echarts.init(document.getElementById("three"));

  Link(apiUrl.chartDataThree).then((success) => {
    console.log(success);
    myChart.setOption({
      legend: {
        top: "bottom",
      },
      tooltip: {},
      series: [
        {
          type: "pie",
          data: success.data,
          radius: [10, 100],
          center: ["50%", "45%"],
          roseType: "area",
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
.three {
  height: 4.5rem;
}
</style>
