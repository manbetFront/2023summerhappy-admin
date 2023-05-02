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
      <el-table-column label="彩金金额" prop="lottery_amount" width="150" />
      <el-table-column label="彩金类型" prop="lottery_type" width="150">
        <template slot-scope="{ row }">
          <span>{{
            row.lottery_type == "theme_one" ? "主题一" : "主题二"
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="领取时间" prop="created_at" />

      <el-table-column label="发送状态" prop="is_receive">
        <template slot-scope="{ row }">
          <span>{{ row.is_receive == 0 ? "失败" : "成功" }}</span>
        </template>
      </el-table-column>
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
          this.data = data.list || [];
          this.total = data.meta.total || 0;
        })
        .catch(() => {
          this.data = [];
          this.total = 0;
        });
    },

    // 导出
    exportlist(list) {
      const { page, page_size } = this.listQuery;
      const { username, date_start, date_end, lottery_type, is_receive } = list;
      let local = process.env.VUE_APP_BASE_API;
      console.log(
        `${local}new_year/lottery_report/export?username=${username}&date_start=${date_start}&date_end=${date_end}&lottery_type=${lottery_type}&is_receive=${is_receive}`
      );
      window.location.href = `${local}new_year/lottery_report/export?username=${username}&date_start=${date_start}&date_end=${date_end}&lottery_type=${lottery_type}&is_receive=${is_receive}`;
    },

    returnNum(val) {
      const num = Number(val);
      return num.toLocaleString() || "-";
    }
  }
};
</script>
