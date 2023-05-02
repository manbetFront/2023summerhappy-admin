<template>
  <div v-if="dialogVisible">
    <el-dialog
      :title="title"
      width="1000px"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      @close="closeMadel"
    >
      <div class="form">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column
            :label="KEYWORDS.SN"
            type="index"
            width="50"
          />
          <el-table-column
            align="center"
            :label="KEYWORDS.EditItem"
            prop="attendance_date"
          />
          <el-table-column
            align="center"
            :label="KEYWORDS.BeforeEditing"
            prop="attendance_date"
          />
          <el-table-column
            align="center"
            :label="KEYWORDS.AfterEditing"
            prop="attendance_date"
          />
          <el-table-column
            align="center"
            :label="KEYWORDS.SubmissionTime"
            prop="attendance_date"
          />
          <el-table-column
            align="center"
            :label="KEYWORDS.Editor"
            prop="attendance_date"
          />
        </el-table>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="closeMadel">关闭</el-button>
      
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { KEYWORDS } from '@/common/keyword'

export default {
  name: 'EditLogDialog',
  props: {
    department: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dialogVisible: false,
      title: KEYWORDS.OperationLog,
      type: 1,
      form: {},
      archive: {},
      rules: {},
      KEYWORDS,
      tableData:[]
    }
  },
  computed:{
    
  },
  created() {},  
  mounted() {
    this.$emit('load', this)
    this.tableData = [
      {attendance_date:0},
      {attendance_date:1},
      {attendance_date:2},
      {attendance_date:3}
    ]
  },
  methods: {
    open() {
      this.dialogVisible = true
    },
    closeMadel() {
      // this.$refs.ruleForm.resetFields()
      this.dialogVisible = false
      this.$emit('unload', this)
    },

    confirm() {
      if (this.type == 3 && this.closeMadel()) return
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.handleSubmit()
        }
      })
    },
    handleSubmit() {
    },
  },
}
</script>

<style lang="scss" scoped>
.form-row {
  display: flex;
  .el-form-item {
    width: 33.33%;
    margin-right: 10px;
    .el-input {
      width: 100%;
    }
    &.full {
      width: 100%;
      input {
        width: 100%;
      }
    }
  }
}
</style>
