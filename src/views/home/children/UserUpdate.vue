<template>
  <div class="userUpdate">
    <el-table
      :data="
        $store.state.HomeModule.listData.slice(
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
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
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
      :total="$store.state.HomeModule.listData.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <UpdateDialog></UpdateDialog>
  </div>
</template>

<script setup lang="ts">
import UpdateDialog from "@/components/UpdateDialog.vue";
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const currentPage = ref(1);
const pageSize = ref(7);
const tableData = reactive({
  data: [],
});
interface User {
  id: number;
  name: string;
  type: string;
  homeType: string;
  num: string;
  title: string;
}
const handleSizeChange = (val: number) => {
  pageSize.value = val;
};
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
};
const handleEdit = (index: number, row: User) => {
  store.commit("handleShow");
  store.commit("updateUpdateData", row);
};
const deleteData = (value: User) => {
  fetch("http://localhost:8888/userList/" + value.id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};
const handleDelete = (index: number, row: User) => {
  deleteData(row);
  store.dispatch("UserUpdate_List");
};
const getData = () => {
  store.dispatch("UserUpdate_List");
};
function init() {
  getData();
}
onMounted(() => {
  init();
});
</script>

<style lang="less" scoped></style>
