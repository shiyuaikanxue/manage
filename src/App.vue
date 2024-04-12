<template>
  <!-- 路由出口 -->
  <router-view />
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { provide } from "vue";
provide("echarts", echarts);
</script>
<style lang="scss"></style>
