<template>
  <div class="c-filter">
    <el-form ref="form" :inline="true" :model="form">
      <el-form-item label="账号">
        <el-input v-model="form.username" clearable placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="领取状态">
        <el-select v-model="form.status" clearable placeholder="请选择">
          <el-option
            v-for="item in sendlist"
            :key="item.index"
            :label="item.name"
            :value="item.index"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          搜索
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        status: ""
      },
      sendlist: [
        { name: "待领取", index: 1 },
        { name: "已领取", index: 2 },
        { name: "已过期", index: 3 }
      ]
    };
  },
  created() {},
  methods: {
    onSubmit() {
      let _data = {
        ...this.form
      };
      this.$emit("submit", _data);
    }
  }
};
</script>
