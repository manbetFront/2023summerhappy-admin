<template>
  <div class="edit">
    <el-dialog
      :title="titile"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
    >
      <div class="form">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item
            label="前端左边球队："
            prop="team1Id"
          >
            <el-select
              v-model="form.team1Id"
              placeholder="请选择球队"
            >
              <el-option
                v-for="(item, key) in teamList"
                :key="key"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            label="前端右边球队："
            prop="team2Id"
          >
            <el-select
              v-model="form.team2Id"
              placeholder="请选择球队"
            >
              <el-option
                v-for="(item, key) in teamList"
                :key="key"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            label="开启预测时间："
            prop="forecast_open_time"
          >
            <el-date-picker
              v-model="form.forecast_open_time"
              type="datetime"
              placeholder="请选择时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>

          <el-form-item
            label="比赛开始时间："
            prop="match_open_time"
          >
            <el-date-picker
              v-model="form.match_open_time"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="请选择时间"
            />
          </el-form-item>
        </el-form>
      </div>
      <span class="dialog-footer text-center">
        <el-button
          type="primary"
          class="mr20"
          @click="submitForm"
        >确 定</el-button>

        <el-button @click="cancel">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import SetService from '@service/set';

export default {
  props: {
    teamList: {
      type: Array,
      default: () => [],
    },
    stage: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      dialogVisible: false,
      titile: '',
      form: {},
      teamData: [],
      type: 1,
      rules: {
        team1Id: [
          {
            required: true,
            trigger: 'change',
            message: '前端左边球队不能为空',
          },
        ],
        team2Id: [
          {
            required: true,
            trigger: 'change',
            message: '前端右边球队不能为空',
          },
        ],
        forecast_open_time: [
          { required: true, trigger: 'change', message: '开启预测时间必选' },
        ],
        match_open_time: [
          { required: true, trigger: 'change', message: '比赛开始时间必选' },
        ],
      },
    };
  },
  created() {},
  methods: {
    open(type, row) {
      this.type = type;
      this.titile = '添加';
      // 1 新增  2 编辑
      if (this.type == 2) {
        this.titile = '编辑';
        this.form = {
          ...row,
          team1Id: row.team1.id,
          team2Id: row.team2.id,
        };
      }

      this.dialogVisible = true;
    },

    async getTeamData() {
      try {
        const { data } = await SetService.getTeamData();
        this.teamData = data || [];
      } catch (e) {
        this.teamData = [];
        throw e;
      }
    },

    handleClose() {
      this.cancel();
    },

    cancel() {
      this.dialogVisible = false;
      this.form = {};
    },

    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.editSubmit();
        } else {
          return false;
        }
      });
    },

    editSubmit() {
      // 查找team1  team2

      const time1 = new Date(this.form.forecast_open_time).getTime();
      const time2 = new Date(this.form.match_open_time).getTime();
      if (time1 > time2) {
        return this.$message.error('比赛开始时间要大于预测时间');
      }

      let method = '',
        tip = '',
        obj = {
          forecast_open_time: this.form.forecast_open_time,
          match_open_time: this.form.match_open_time,
          team1: this.form.team1Id,
          team2: this.form.team2Id,
        };

      // 新增
      if (this.type == 1) {
        method = 'addMatchTime';
        tip = '新增成功';
        obj.stage = this.stage;
      } else {
        method = 'setMatchTime';
        obj.id = this.form.id;
        tip = '编辑成功';
        obj.stage = this.form.stage;
      }
      SetService[method]({
        ...obj,
      }).then((res) => {
        const { code, message } = res;
        if (!code) {
          this.$message.success(tip);
          this.$parent.getList();
          this.cancel();
        } else {
          this.$message.error(message);
        }
      });
    },
  },
};
</script>
<style rel="scss" lang="scss">
.dialog-footer {
  display: inline-block;
  margin: auto;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
}
.form {
  margin-left: 100px;
}
</style>
