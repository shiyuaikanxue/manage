<template>
  <div class="homeIndex">
    <el-container>
      <el-aside width="auto">
        <Menu></Menu>
      </el-aside>
      <el-container>
        <el-header>
          <RightTop></RightTop>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Menu from "@/components/LeftMenu.vue";
import RightTop from "@/components/RightTop.vue";
</script>

<style lang="scss">
.homeIndex {
  width: 100vw;
  height: 100vh;
  .el-container {
    width: 100%;
    height: 100%;
    .el-aside {
      background-color: #545c64;
      height: 100%;
    }
    .el-header {
      line-height: 80px;
    }
    .el-main {
      background-color: gainsboro;
    }
  }
}
</style>
