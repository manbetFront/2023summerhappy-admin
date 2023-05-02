<template>
  <div class="app-container">
    <FilerForm @submit="filterSubmit" />

    <el-table
      v-loading="listLoading"
      :data="data"
      border
      highlight-current-row
      class="c-table"
    >
      <el-table-column
        label="序号"
        type="index"
        :index="indexMethod"
        width="120"
      />
      <el-table-column label="日期" width="120" prop="date" />
      <el-table-column label="账号" width="120" prop="username" />
      <el-table-column label="游戏平台" prop="game_slug" width="120" />

      <el-table-column
        label="有效投注金额"
        prop="valid_bet_amount"
        width="150"
      />
      <el-table-column label="已完成次数" prop="total_count" />
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
      RecordService.getListOne({
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

    returnNum(val) {
      const num = Number(val);
      return num.toLocaleString() || "-";
    }
  }
};
</script>
