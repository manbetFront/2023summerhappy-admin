<template>
  <div class="c-filter">
    <el-form ref="form" :inline="true" :model="form">
      <el-form-item label="账号">
        <el-input v-model="form.username" clearable placeholder="请输入账号" />
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
        username: ""
      }
    };
  },
  created() {},
  methods: {
    onSubmit() {
      let _data = {
        ...this.form
      };
      // if (!this.form.username) {
      //   return this.$message.error("请输入账号或者注单号");
      // }
      this.$emit("submit", _data);
    }
  }
};
</script>
