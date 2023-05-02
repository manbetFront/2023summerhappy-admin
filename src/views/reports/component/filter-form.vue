<template>
  <div class="c-filter">
    <el-form ref="form" :inline="true" :model="form">
      <el-form-item label="账号">
        <el-input v-model="form.username" clearable placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="活动时间">
        <el-date-picker
          v-model="taskTime"
          style="width: 464px"
          type="datetimerange"
          range-separator="至"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="彩金类型">
        <el-select v-model="form.lottery_type" clearable placeholder="请选择">
          <el-option
            v-for="item in handsel"
            :key="item.index"
            :label="item.name"
            :value="item.index"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="发送状态">
        <el-select v-model="form.is_receive" clearable placeholder="请选择">
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
        <el-button type="warning" @click="exportlist">
          导出
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
        lottery_type: "",
        is_receive: ""
      },
      taskTime: [],
      handsel: [
        { name: "主题一", index: "theme_one" },
        { name: "主题二", index: "theme_two" }
      ],
      sendlist: [{ name: "成功", index: 1 }, { name: "失败", index: 0 }]
    };
  },
  created() {},
  methods: {
    onSubmit() {
      if (this.taskTime.length > 0) {
        this.form.date_start = this.taskTime[0];
        this.form.date_end = this.taskTime[1];
      }
      let _data = {
        ...this.form
      };
      // if (!this.form.username) {
      //   return this.$message.error("请输入账号或者注单号");
      // }
      this.$emit("submit", _data);
    },

    exportlist() {
      this.form.date_start = this.taskTime[0];
      this.form.date_end = this.taskTime[1];
      let _data = {
        ...this.form
      };
      this.$emit("exportlist", _data);
    }
  }
};
</script>
