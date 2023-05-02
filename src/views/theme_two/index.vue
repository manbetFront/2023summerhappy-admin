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
      <el-table-column label="账号" width="120" prop="username" />
      <el-table-column label="存款金额" prop="deposit_amount" width="150" />

      <el-table-column label="可解锁人物" prop="unlock_count" />
      <el-table-column label="已解锁人物" prop="delock_count" />
      <el-table-column label="完成任务" prop="task_count" />
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
      RecordService.getListTwo({
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
