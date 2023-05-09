<template>
  <div class="c-filter">
    <el-form ref="form" :inline="true" :model="form">
      <el-form-item label="账号">
        <el-input v-model="form.username" clearable placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="时间">
        <!-- <el-date-picker
          v-model="taskTime"
          style="width: 464px"
          type="datetimerange"
          range-separator="至"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        /> -->
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="彩金类型">
        <el-select v-model="form.platform" clearable placeholder="请选择">
          <el-option
            v-for="item in handsel"
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
        <!-- <el-button type="warning" @click="exportlist">
          导出
        </el-button> -->
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
        date: "",
        platform: ""
      },
      taskTime: [],
      handsel: [
        { name: "真人", index: 1 },
        { name: "电子", index: 3 },
        { name: "棋牌", index: 5 }
      ]
    };
  },
  created() {},
  methods: {
    onSubmit() {
      this.$emit("submit", this.form);
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
