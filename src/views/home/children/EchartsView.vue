<template>
  <div class="container">
    <div class="itemLeft">
      <ItemPageVue>
        <template #main>
          <One></One>
        </template>
      </ItemPageVue>
      <ItemPageVue>
        <template #main>
          <Two></Two>
        </template>
      </ItemPageVue>
    </div>
    <div class="itemRight">
      <ItemPageVue>
        <template #main>
          <Three></Three>
        </template>
      </ItemPageVue>
      <ItemPageVue>
        <template #main>
          <Four></Four>
        </template>
      </ItemPageVue>
    </div>
  </div>
</template>

<script setup lang="ts">
import Four from "@/components/charts/Four.vue";
import One from "@/components/charts/One.vue";
import Three from "@/components/charts/Three.vue";
import Two from "@/components/charts/Two.vue";
import ItemPageVue from "@/components/ItemPage.vue";
</script>

<style lang="scss">
.container {
  width: 100%;
  margin: 0 auto;
  display: flex;
  overflow: hidden;
  .itemLeft,
  .itemRight {
    flex: 1;
  }
}
</style>
