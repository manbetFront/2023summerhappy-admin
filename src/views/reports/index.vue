<template>
  <div class="app-container">
    <FilerForm @submit="filterSubmit" @exportlist="exportlist" />

    <el-table
      v-loading="listLoading"
      :data="data"
      border
      highlight-current-row
      class="c-table"
    >
      <el-table-column label="序号" type="index" :index="index" width="120" />
      <el-table-column label="账号" prop="username" />
      <el-table-column label="自然周开始日期" prop="start_date" />
      <el-table-column label="自然周结束日期" prop="end_date" />
      <el-table-column label="游戏类型" prop="platform">
        <template slot-scope="{ row }">
          <span>{{
            row.platform == 1 ? "真人" : row.platform == 3 ? "电子" : "棋牌"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务平台名称" prop="platform_name" />
      <el-table-column label="有效投注金额" prop="effective_betting" />
    </el-table>

    <Pagination
      :total="total"
      :page.sync="listQuery.page"
      :size.sync="listQuery.page_size"
      @pagination="getList"
    />
  </div>
</template>
<script>
import FilerForm from "./component/filter-form";
import RecordService from "@service/record";
import { formatDate } from "@/utils";
import { getToken } from "@/utils/auth";

export default {
  components: {
    FilerForm
  },
  data() {
    return {
      listLoading: false,
      tableData: [],
      listQuery: {
        page: 1,
        page_size: 20
      },
      total: 0,
      form: {}
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    formatDate,
    filterSubmit(param) {
      this.form = {
        ...param
      };
      this.getList();
    },

    getList() {
      this.listLoading = true;
      RecordService.getReportList({
        ...this.form,
        ...this.listQuery
      })
        .then(res => {
          this.listLoading = false;
          const { data } = res;
          this.data = data.data || [];
          this.total = data.total || 0;
        })
        .catch(() => {
          this.data = [];
          this.total = 0;
        });
    },

    // 导出
    exportlist(list) {
      let {
        username,
        start_date,
        end_date,
        amount_type,
        receive_status
      } = list;
      let local = process.env.VUE_APP_BASE_API;
      start_date = start_date ? start_date : "";
      end_date = end_date ? end_date : "";
      window.location.href = `${local}report/export?username=${username}&start_date=${start_date}&end_date=${end_date}&amount_type=${amount_type}&receive_status=${receive_status}&token=${getToken()}`;
    },

    returnNum(val) {
      const num = Number(val);
      return num.toLocaleString() || "-";
    }
  }
};
</script>
