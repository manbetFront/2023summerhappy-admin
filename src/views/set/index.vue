<template>
  <div class="app-container">
    <div class="content">
      <el-form ref="form" :model="form" label-width="130px">
        <el-form-item label="活动状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="1" :value="1">
              开启
            </el-radio>
            <el-radio :label="0" :value="0">
              关闭
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动总时间">
          <el-date-picker
            v-model="totalTime"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="活动条件满足时间">
          <el-date-picker
            v-model="meetTime"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit()">
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import ApiService from "@service/set";

export default {
  data() {
    return {
      loading: false,
      form: {
        status: 1,
        total_start_time: "",
        total_end_time: "",
        condition_start_time: "",
        condition_end_time: ""
      },
      set: {},
      totalTime: [],
      meetTime: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      ApiService.getInfo()
        .then(res => {
          const { data } = res;
          if (res.code == 200) {
            let form = {
              status: data.status,
              total_start_time: data.total_start_time,
              total_end_time: data.total_end_time,
              condition_start_time: data.condition_start_time,
              condition_end_time: data.condition_end_time
            };
            this.form = form;
            this.totalTime = [data.total_start_time, data.total_end_time];
            this.meetTime = [
              data.condition_start_time,
              data.condition_end_time
            ];
          } else {
            this.$message.error("获取失败");
          }
        })
        .catch();
    },

    onSubmit() {
      let { totalTime, meetTime } = this;
      let tip = "";
      if (totalTime.length == 0) {
        tip = "请设置活动总时间";
      }
      if (meetTime.length == 0) {
        tip = "请设置活动条件满足时间";
      }

      if (tip) {
        return this.$message.error(tip);
      }

      this.form.total_start_time = totalTime[0];
      this.form.total_end_time = totalTime[1];

      this.form.condition_start_time = meetTime[0];
      this.form.condition_end_time = meetTime[1];

      ApiService.setInfo({
        ...this.form
      })
        .then(res => {
          const { code, message } = res;
          if (code == 200) {
            this.$message.success("设置成功");
          } else {
            this.$message.error(message);
          }
        })
        .catch();
    }
  }
};
</script>
<style rel="scss" lang="scss">
.content {
  padding: 40px;
}
.txt {
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 10px;
}
</style>
