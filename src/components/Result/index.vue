<template>
  <div class="edit">
    <el-dialog
      title="【选择】 赛果"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="cancel"
    >
      <div>
        <el-form
          ref="form"
          :model="form"
          label-width="120px"
          :inline="true"
          class="text-center"
        >
          <div>
            <el-form-item label="晋级球队：">
              <el-select
                v-model="form.result_team_id"
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
          </div>
        </el-form>
      </div>
      <span class="dialog-footer text-center">
        <el-button
          type="primary"
          class="mr20"
          @click="editSubmit"
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
    // teamList: {
    //   type: Array,
    //   default: () => [],
    // },
    routeType: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      dialogVisible: false,
      form: {},
      teamList: [],
    };
  },
  created() {},
  methods: {
    open(row) {
      this.teamList = [];

      this.form = {
        ...row,
      result_team_id: row.result_team_id == 0 ? null : row.result_team_id
      };

      this.teamList.push(row.team1);
      this.teamList.push(row.team2);

      this.dialogVisible = true;
    },

    cancel() {
      this.form = {};
      this.teamList = [];
      this.dialogVisible = false;
    },

    editSubmit() {
      if (!this.form.result_team_id) {
        return this.$message.error('请选择赛果')
      }
      SetService.setMatchResult({
        id: this.form.id,
        result_team_id: this.form.result_team_id,
      }).then((res) => {
        const { code , message} = res;
        if (!code) {
          this.$message.success('设置成功');
          this.$parent.getList();
          this.cancel()
        } else {
          this.$message.error(message);
        }
        this.cancel();
      });
    },
  },
};
</script>
<style rel="scss" lang="scss">
.content {
  padding: 40px;
}
.dialog-footer {
  display: inline-block;
  margin: auto;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
