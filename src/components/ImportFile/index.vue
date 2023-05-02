<template>
  <div class="upload ml10">
    <el-upload
      ref="upload"
      :action="getUrl + api"
      :limit="1"
      :headers="headers"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :on-error="onError"
    >
      <el-button :loading="loading">
        导入
      </el-button>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  name: 'ImportFile',
  props: {
    api: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: false,
      headers: {
        token: '',
      }
    };
  },
  computed: {
    getUrl() {
      if (this.api.indexOf('https') > -1) {
        return ''
      }
      return process.env.VUE_APP_BASE_API;
    },
  },
   mounted() {
    this.headers.token = getToken()
  },
  methods: {
    beforeUpload() {
      this.loading = true;
    },
    onSuccess(res) {
      this.loading = false;
      const {code, data, msg} = res
      if (code == 200 && Array.isArray(data) && !data.length) {
        this.msgSuccess('导入成功');
        this.$emit('onSuccess');
        this.$refs.upload.clearFiles();
        return
      }
      try {
        const error = data.error.filter(item => item)
        if (code == 200 && error && error.length) {
          this.$alert(String(error), '出错数据', {
            confirmButtonText: '确定',
            callback: () => {},
          });
        }
      } catch(e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }

      if (code != 200) {
        this.msgError(msg);
      } else {
        this.msgSuccess('导入成功');
      }
      this.$emit('onSuccess');
      this.$refs.upload.clearFiles();
    },

    onError() {
      this.$refs.upload.clearFiles();
      this.loading = false;
      this.$emit('onError');
      this.msgError('导入失败，请重试');
    },
  },
};
</script>
