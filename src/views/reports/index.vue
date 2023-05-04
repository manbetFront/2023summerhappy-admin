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
      <el-table-column label="账号" width="120" prop="username" />
      <el-table-column label="自然周开始日期" prop="receive_date" />
      <el-table-column label="自然周结束日期" prop="receive_date" />
      <el-table-column label="游戏类型" prop="receive_date" />
      <el-table-column label="任务平台名称" prop="receive_date" />
      <el-table-column label="有效投注金额" prop="amount" width="150" />

      <!-- <el-table-column label="彩金类型" prop="amount_type" width="150">
        <template slot-scope="{ row }">
          <span>{{
            row.amount_type == 1
              ? "新年红包"
              : row.amount_type == 2
              ? "红包雨"
              : "额外红包"
          }}</span>
        </template>
      </el-table-column> -->

      <!-- <el-table-column label="领取时间" prop="receive_date" />
      <el-table-column label="发送状态" prop="receive_status">
        <template slot-scope="{ row }">
          <span>{{
            row.receive_status == 0
              ? "未发放"
              : row.receive_status == 1
              ? "成功"
              : "失败"
          }}</span>
        </template>
      </el-table-column> -->
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
      money: "",
      tableData: [],
      listQuery: {
        page: 1,
        page_size: 10
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
      console.log("list", list);
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
