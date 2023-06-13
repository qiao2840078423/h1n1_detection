<template>
  <Table-list
    :propsList="propsList"
    :addInfo="addInfo"
    :model="model"
    :sTar="sTar"
    @refresh="refreshAddInfo"
  >
    <el-form :model="addInfo">
      <el-form-item label="编号" required>
        <el-input v-model="addInfo.identification"></el-input>
      </el-form-item>
      <el-form-item label="姓名" required>
        <el-input v-model="addInfo.r_name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="addInfo.sex" label="男">男</el-radio>
        <el-radio v-model="addInfo.sex" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
          v-model="addInfo.birthday"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="住址" required>
        <!-- <el-input v-model="addInfo.streetname"></el-input> -->
        <el-select v-model="addInfo.streetname" placeholder="所在地址">
          <el-option
            v-for="item in streetList"
            :key="item._id"
            :value="item.streetname"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </Table-list>
</template>
<script setup>
import TableList from "../../components/utils/TableList.vue";
import { ref, onMounted, inject } from "vue";
const propsList = ref({
  identification: "编号",
  r_name: "姓名",
  sex: "性别",
  birthday: "出生日期",
  age: "年龄",
  streetname: "住址",
});
const $http = inject("$http");
let addInfo = ref({});
let streetList = ref([]);
const model = ref("resident");
// 搜索目标字段
const sTar = ref("编号");
const refreshAddInfo = (newAddInfo) => {
  addInfo.value = newAddInfo;
};
onMounted(() => {
  // 获取街道列表
  $http.get("/resident/streetList").then((res) => {
    if (res.data.status == 200) {
      streetList.value = res.data.data;
    }
  });
});
</script>
