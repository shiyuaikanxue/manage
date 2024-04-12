<template>
  <div class="userList">
    <el-table
      :data="
        tableData.data.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )
      "
      style="width: 100%"
    >
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="title" label="楼盘名称" />
      <el-table-column prop="type" label="房源类型" />
      <el-table-column prop="num" label="门牌号" />
      <el-table-column prop="homeType" label="房源户型" />
      <el-table-column prop="name" label="户主" />
      <el-table-column>
        <template #header>
          <el-input
            size="small"
            placeholder="请输入查询内容:"
            v-model="search"
            @blur="searchLink"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[7, 10, 20, 30, 50]"
      :current-page="currentPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.data.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import Link from "@/api/Link";
import apiUrl from "@/api/url";
import { onMounted, reactive, ref } from "vue";
const search = ref("");
const currentPage = ref(1);
const pageSize = ref(7);
const tableData = reactive({
  data: [],
});
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
  pageSize.value = val;
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
  currentPage.value = val;
};
const getData = () => {
  Link(apiUrl.userList).then((success: any) => {
    console.log(success);
    tableData.data = success.data;
  });
};
const searchLink = () => {
  Link(apiUrl.userList, "get", {}, { name: search.value }).then(
    (success: any) => {
      console.log(success);
      tableData.data = success.data;
    }
  );
};
function init() {
  getData();
}
onMounted(() => {
  init();
});
</script>

<style lang="less" scoped></style>
