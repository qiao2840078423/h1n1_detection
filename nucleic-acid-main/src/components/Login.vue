<template>
  <el-card class="box-card login-card" header="管理员登录">
    <el-form @submit.prevent="login" :model="userinfo" :rules="rules">
      <el-form-item label="用户名" prop="username" required label-width="18%">
        <el-input v-model="userinfo.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" required label-width="18%">
        <el-input v-model="userinfo.password" type="password" minlength="3"></el-input>
      </el-form-item>
      <el-form-item class="el-form-buttons">
        <el-button type="primary" native-type="submit"> 登录 </el-button>
        <el-button type="primary" @click="toRegister"> 新用户注册 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref, inject, reactive } from "vue";
import { useRouter } from "vue-router";
import { vaildateName, vaildatePass } from "../utils/vaildateRules";

const $http = inject("$http");
const $message = inject("$message");
const router = useRouter();

let userinfo = ref({
  username: "admin123",
  password: "123",
});

let rules = reactive({
  username: [{ validator: vaildateName, trigger: "blur" }],
  password: [{ validator: vaildatePass, trigger: "blur" }],
});

const login = () => {
  $http.post("/login", userinfo.value).then((res) => {
    console.log(res.data);
    localStorage.token = res.data.token;
    localStorage.username = userinfo.value.username;
    router.push("/home");
    $message({
      type: "success",
      message: "登陆成功",
    });
  });
};

const toRegister = () => {
  router.push("/register");
};
</script>

<style scope>
.box-card {
  width: 25rem;
  text-align: center;
}

.login-card {
  position: absolute;
  top: 50%;
  left: 50%;
  /* margin: 0 auto; */
  transform: translate(-50%, -50%);
}

.el-form-item {
  height: 2.2rem;
}

.el-form-buttons .el-form-item__content {
  justify-content: center;
}
</style>
