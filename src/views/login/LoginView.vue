<template>
  <div class="login">
    <div class="login-con">
      <ul class="menu-tab">
        <li
          v-for="value in MenuData"
          :key="value.type"
          :class="{ current: value.current }"
          @click="clickMenu(value)"
        >
          {{ value.txt }}
        </li>
      </ul>
      <!-- 表单部分 -->
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item prop="userName">
          <label>邮箱</label>
          <el-input
            v-model="ruleForm.userName"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item prop="password">
          <label>密码</label>
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
            minlength="6"
            maxlength="15"
          />
        </el-form-item>
        <el-form-item prop="passwords" v-show="model == 'register'">
          <label>重复密码</label>
          <el-input
            type="password"
            autocomplete="off"
            v-model="ruleForm.passwords"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :disabled="btnBool"
            type="primary"
            @click="submitForm(ruleFormRef)"
            class="login-btn block"
          >
            {{ model == "login" ? "登录" : "注册" }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
//创建复杂数据类型
import { CheckEmail, CheckPassword } from "@/utils/verfifcation";
import link from "@/api/Link";
import apiUrl from "@/api/url";
import { onMounted, reactive, ref, watch } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import useMd5 from '@/hook/index.js'
import {useRouter} from 'vue-router'
interface MenuItem {
  txt: string;
  current: boolean;
  type: string;
}
onMounted(() => {
  console.log(process.env.VUE_APP_API);
});
const MenuData: MenuItem[] = reactive([
  {
    txt: "登录",
    current: true,
    type: "login",
  },
  {
    txt: "注册",
    current: false,
    type: "register",
  },
]);
const router = useRouter()
const model = ref<string>("login");
const btnBool = ref<boolean>(true);

function clickMenu(value: MenuItem) {
  MenuData.forEach((item) => {
    item.current = false;
  });
  value.current = true;
  model.value = value.type;
}

//element-Plus表单部分

const ruleFormRef = ref<FormInstance>();

const checkUser = (rule: any, value: any, callback: any) => {
  setTimeout(() => {
    if (!value) {
      return callback(new Error("邮箱不能为空！"));
    } else if (CheckEmail(value)) {
      return callback(new Error("请输入正确的邮箱！"));
    } else {
      callback();
    }
  }, 1000);
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("请输入密码:"));
  } else if (CheckPassword(value)) {
    callback(new Error("请输入正确的密码!"));
  } else {
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  //登录的时候没有重复密码校验
  if (model.value == "login") {
    callback();
  }
  if (value === "") {
    callback(new Error("重复密码不能为空"));
  } else if (value != ruleForm.password) {
    callback(new Error("两次密码必须相同!"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  userName: "",
  password: "",
  passwords: "",
});
watch(ruleForm, (newVal, oldVal) => {
  if (model.value === "login") {
    if (newVal.userName !== "" && newVal.password !== "") {
      btnBool.value = false;
    } else {
      btnBool.value = true;
    }
  } else {
    if (
      newVal.userName !== "" &&
      newVal.password !== "" &&
      newVal.passwords !== ""
    ) {
      btnBool.value = false;
    } else {
      btnBool.value = true;
    }
  }
});
//这里就是设置以那种方式触发表单验证  失去焦点验证
const rules = reactive<FormRules<typeof ruleForm>>({
  password: [{ validator: validatePass, trigger: "blur" }],
  passwords: [{ validator: validatePass2, trigger: "blur" }],
  userName: [{ validator: checkUser, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (model.value === "login") {
        console.log("登录!");
        let info = {
          name: ruleForm.userName,
          pwd: useMd5(ruleForm.password),
        };
        link(apiUrl.register, "GET",{},info).then((success: any) => {
          console.log(success);
          if(success.data.length!=0){
            ElMessage({
              message: "登录成功",
              type: "success",
              plain: true,
            });
            router.push('./home')
          }else{
            ElMessage({
              message: "账号或密码有误",
              type: "error",
              plain: true,
            });
          }
        });
      } else {
        let data = {
          name: ruleForm.userName,
          pwd: useMd5(ruleForm.password),
        };
        link(apiUrl.register, "POST", data,{}).then((success: any) => {
          console.log(success);
          if (Object.keys(success.data).length !== 0) {
            ElMessage({
              message: "注册成功",
              type: "success",
              plain: true,
            });
            model.value = "login";
            MenuData.forEach((item) => {
              item.current = false;
            });
            MenuData[0].current = true;
          } else {
            ElMessage({
              message: "注册失败",
              type: "error",
              plain: true,
            });
          }
        });
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
//element-Plus表单部分
</script>

<style lang="scss">
.login {
  background-color: aqua;
  height: 100%;
}
html,
body,
#app {
  height: 100%;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: white;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(255, 255, 255, 0.5);
  }
}
.demo-ruleForm {
  width: 30%;
  margin: 50px auto;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: white;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 20px;
  }
}
</style>
