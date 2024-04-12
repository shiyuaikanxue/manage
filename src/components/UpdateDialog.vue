<template>
  <el-dialog
    v-model="$store.state.HomeModule.dialogFormVisible"
    title="请输入修改信息"
    width="500"
  >
    <el-form :model="form">
      <el-form-item label="楼盘名称" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="房源类型" :label-width="formLabelWidth">
        <el-input v-model="form.type" autocomplete="off" />
      </el-form-item>
      <el-form-item label="门牌号" :label-width="formLabelWidth">
        <el-input v-model="form.num" autocomplete="off" />
      </el-form-item>
      <el-form-item label="房源户型" :label-width="formLabelWidth">
        <el-input v-model="form.homeType" autocomplete="off" />
      </el-form-item>
      <el-form-item label="户主" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog(false)">取消</el-button>
        <el-button type="primary" @click="closeDialog(true)"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import Link from "@/api/Link";
import apiUrl from "@/api/url";
import { reactive, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const formLabelWidth = "140px";
const closeDialog = (value: boolean) => {
  if (value) {
    const data = {
      title: form.title,
      name: form.name,
      type: form.type,
      num: form.num,
      homeType: form.homeType,
    };
    fetch(
      "http://localhost:8888/userList/" + store.state.HomeModule.updateData.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
    store.dispatch("UserUpdate_List");
  }
  clear();
  store.commit("handleShow");
};
function clear() {
  form.title = "";
  form.num = "";
  form.homeType = "";
  form.name = "";
  form.type = "";
}
const form = reactive({
  title: "",
  num: "",
  homeType: "",
  name: "",
  type: "",
});
</script>

<style lang="less" scoped></style>
