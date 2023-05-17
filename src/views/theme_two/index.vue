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
      <el-table-column label="序号" type="index" :index="index" width="120" />
      <el-table-column label="账号" prop="username" />
      <el-table-column label="派发时间" prop="created_at" />
      <el-table-column label="彩金" prop="amount" />

      <el-table-column label="领取时间" prop="draw_time">
        <template slot-scope="{ row }">
          <span>{{ row.draw_time ? row.draw_time : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领取状态" prop="status">
        <template slot-scope="{ row }">
          <span>{{
            row.status == 1 ? "待领取" : row.status == 2 ? "已领取" : "已过期"
          }}</span>
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
        page_size: 20
      },
      total: 0,
      form: {}
    };
  },
  mounted() {
    // this.getList();
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
      RecordService.getListTwo({
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

    returnNum(val) {
      const num = Number(val);
      return num.toLocaleString() || "-";
    }
  }
};
</script>
