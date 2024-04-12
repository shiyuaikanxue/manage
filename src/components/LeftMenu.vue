<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
    :collapse="!$store.state.HomeModule.isFold"
    @open="handleOpen"
    @close="handleClose"
    router
  >
    <template
      v-for="value in router.options.routes[2].children"
      :key="value.path"
    >
      <!-- 带下拉菜单的导航 -->
      <el-sub-menu :index="value.path" v-if="value.children">
        <template #title>
          <el-icon>
            <component :is="value.meta.icon"></component>
          </el-icon>
          <span>{{ value.meta.title }}</span>
        </template>
        <el-menu-item-group v-for="item in value.children" :key="item.path">
          <el-menu-item :index="item.path">{{ item.meta.title }}</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <!-- 不带下拉菜单的导航 -->
      <el-menu-item :index="value.path" v-else>
        <el-icon><component :is="value.meta.icon"></component></el-icon>
        <span>{{ value.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
onMounted(() => {
  console.log(router.options.routes[2].children);
});
</script>

<style lang="scss" scoped></style>
