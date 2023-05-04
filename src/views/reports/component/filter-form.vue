<template>
  <div class="c-filter">
    <el-form ref="form" :inline="true" :model="form">
      <el-form-item label="账号">
        <el-input v-model="form.username" clearable placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="时间">
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
        <el-select v-model="form.amount_type" clearable placeholder="请选择">
          <el-option
            v-for="item in handsel"
            :key="item.index"
            :label="item.name"
            :value="item.index"
          />
        </el-select>
      </el-form-item>

      <!-- <el-form-item label="发送状态">
        <el-select v-model="form.receive_status" clearable placeholder="请选择">
          <el-option
            v-for="item in sendlist"
            :key="item.index"
            :label="item.name"
            :value="item.index"
          />
        </el-select>
      </el-form-item> -->

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
        amount_type: "",
        receive_status: ""
      },
      taskTime: [],
      handsel: [
        { name: "新年红包", index: 1 },
        { name: "红包雨", index: 2 },
        { name: "额外红包", index: 3 }
      ],
      sendlist: [
        { name: "未发放", index: 0 },
        { name: "成功", index: 1 },
        { name: "失败", index: 2 }
      ]
    };
  },
  created() {},
  methods: {
    onSubmit() {
      if (this.taskTime.length > 0) {
        this.form.start_date = this.taskTime[0];
        this.form.end_date = this.taskTime[1];
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
      if (this.taskTime.length > 0) {
        this.form.start_date = this.taskTime[0];
        this.form.end_date = this.taskTime[1];
      }
      let _data = {
        ...this.form
      };
      this.$emit("exportlist", _data);
    }
  }
};
</script>
