<template>
  <div class="">
    <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      highlight-current-row
      class="c-table"
    >
      <el-table-column
        label="序号"
        type="index"
        width="80"
      />
      <el-table-column
        label="前端左边球队"
        prop="id"
      >
        <template slot-scope="{ row }">
          {{ row.team1 && row.team1.name }}
        </template>
      </el-table-column>
      <el-table-column
        label="前端右边球队"
        prop="id"
      >
        <template slot-scope="{ row }">
          {{ row.team2 && row.team2.name }}
        </template>
      </el-table-column>


      <el-table-column
        label="开启预测时间"
        prop="forecast_open_time"
        width="140px"
      >
        <template slot-scope="{ row }">
          {{ row.forecast_open_time || '-' }}
        </template>
      </el-table-column>
      <el-table-column
        label="比赛开始时间"
        width="140px"
      >
        <template slot-scope="{ row }">
          {{ row.match_open_time || '-' }}
        </template>
      </el-table-column>
      <el-table-column
        label="晋级球队"
        prop=""
      >
        <template slot-scope="{ row }">
          {{ row.result_team && row.result_team.name || '-' }}
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        prop=""
      >
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            @click="handleEdit(row)"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        label="赛果选择"
      >
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            @click="handleResultSelect(row)"
          >
            赛果选择
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        label=""
        prop=""
      >
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            @click="clearResult(row)"
          >
            清除赛果
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import SetService from '@service/set';

export default {
  props: {
    tableData: {
      default: () => [],
      type: Array,
    },
    listLoading: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      loading: false,
      form: {},
      data: [],
    };
  },
  created() {},
  methods: {
    handleEdit(row) {
      this.$emit('handleEdit', row)
    },

    handleResultSelect(row) {
      this.$emit('handleResultSelect', row)
    },

    clearResult(row) {
      SetService.clearResult({
        id: row.id,
        code: 'european'
      }).then(res => {
       const {code, message} = res;
        if (!code) {
          this.$message.success('设置成功')
          this.$parent.getList()
        } else {
          this.$message.error(message)
        }
      });
    },

  },
};
</script>

