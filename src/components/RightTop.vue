<template>
  <div class="rightTop">
    <el-icon @click="handleFold()"><CaretRight v-if="$store.state.HomeModule.isFold"/><CaretLeft  v-else/></el-icon>
  </div>
</template>

<script setup lang="ts">
import {} from "@element-plus/icons-vue";
import { ref } from "vue";
import {useStore} from 'vuex'
const store = useStore()
// const isFold = ref(true)
const handleFold = () => {
    // isFold.value = !isFold.value
    store.commit("handleFold")
};
</script>

<style lang="scss">
.el-icon {
  font-size: 30px;
}
</style>
