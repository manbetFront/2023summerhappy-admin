<template>
  <div>
    <el-form
      ref="ruleForm"
      :inline="true"
      label-width="110px"
      :model="form"
      :rules="rules"
      class="form"
      label-position="right"
    >
      <el-form-item label="开始日期时间：">
        {{ form.leave_start_date }}
        {{ form.leave_tart_time }}
      </el-form-item>
      <el-form-item label="假期天数：">
        {{ submitData.leave_days }} D
      </el-form-item>

      <el-form-item
        v-if="form.leave_unit == 2 && [2,6].includes(Number(form.leave_type))"
        label="OFF天数："
      >
        {{ submitData.off_days || "0" }} D
      </el-form-item>
      <el-form-item label="截止日期时间：">
        {{ submitData.leave_end_date }}
        {{ submitData.leave_end_time }}
      </el-form-item>
      <el-form-item label="时间总计：">
        {{ submitData.leave_time }} D
      </el-form-item>
      <div>
        <el-form-item label="备注：">
          <el-tooltip
            effect="dark"
            :content="submitData.remarks"
            placement="top"
          >
            <div
              class="ellipsis"
              style="width: 130px"
            >
              {{ submitData.remarks || '-' }}
            </div>
          </el-tooltip>
        </el-form-item>
      </div>
      <div class="img-list clearfix">
        <div
          v-for="(item, key) in submitData.file"
          :key="key"
          class="img-item fl"
        >
          <img
            :src="item"
            alt
          >
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      default: () => {},
      type: Object,
    },
    submitData: {
      default: () => {},
      type: Object,
    }
  },
};
</script>

