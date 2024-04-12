<template>
  <div class="content">
    <div class="inputDom">
      <el-input
        v-model="input"
        style="width: 240px"
        placeholder="请输入缴费金额:"
      />
      <el-button type="success" @click="handleCode" class="btn">支付</el-button>
    </div>
    <div class="qrCode" ref="qrCode"></div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import QRcode from "qrcodejs2";
const input = ref("");
const qrCode = ref(null);
const handleCode = () => {
  qrCode.value.innerHTML = "";
  nextTick(() => {
    new QRcode(qrCode.value, {
      text: input.value, //生成的二维码内容
      colorDark: "#000", //二维码颜色
      colorLight: "#fff", //二维码背景色
      // correctLevel:QRcode.correctLevel.H,
    });
  });
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  position: relative;
}
.inputDom {
  width: 500px;
  height: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .btn {
    margin: 20px;
  }
}
.qrCode {
  width: 300px;
  height: 300px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
