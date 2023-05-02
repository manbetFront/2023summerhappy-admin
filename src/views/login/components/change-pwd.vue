<template>
  <el-dialog
    :title="title"
    width="450px"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    @close="closeMadel"
  >
    <!-- <div v-if="loading" v-loading="loading" class="loadingBox" /> -->
    <div>
      <el-form
        :label-position="labelPosition"
        label-width="70px"
      >
        <el-form-item label="新密码">
          <el-input
            v-model.trim="form.password"
            :type="flag.password ? 'password' : 'text'"
            :maxlength="12"
          >
            <svg-icon
              slot="suffix"
              :icon-class="flag.password ? 'close-eyes' : 'open-eyes'"
              class="cp"
              :class="flag.password ? 'close-eyes' : 'open-eyes'"
              @click="changePwdFlag('password')"
            />
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input
            v-model.trim="form.password2"
            :type="flag.password2 ? 'password' : 'text'"
            :maxlength="12"
          >
            <svg-icon
              slot="suffix"
              :icon-class="flag.password2 ? 'close-eyes' : 'open-eyes'"
              class="cp"
              :class="flag.password2 ? 'close-eyes' : 'open-eyes'"
              @click="changePwdFlag('password2')"
            />
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <span class="warn-tip">密码只能输入数字以及字母，长度6到12位</span>
        </el-form-item>
      </el-form>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="primary"
        @click="confirm"
      >确定</el-button>
      <el-button @click="closeMadel">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import LoginService from '@service/login';

export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        password: '',
        password2: '',
      },
      flag: {
        password: true,
        password2: true,
      },
    };
  },
  methods: {
    open() {
      this.dialogVisible = true;
    },

    closeMadel() {
      this.form = {};
      this.dialogVisible = false;
    },

    changePwdFlag(val) {
      this.flag[val] = !this.flag[val];
    },

    confirm() {
      if (!this.form.password || !this.form.password2) {
        return this.$message.error('请输入密码');
      }

      if (this.form.password != this.form.password2) {
        return this.$message.error('两次密码输入不一致');
      }

      if (!this.checkPassWord(this.form.password))
        return this.$message.error('请输入正确的密码格式');

      this.handleSubmit();
    },

    checkPassWord(password) {
      var str = password;
      if (str == null || str.length < 6) {
        return false;
      }
      var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
      if (!reg1.test(str)) {
        return false;
      }
      var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
      if (reg.test(str)) {
        return true;
      } else {
        return false;
      }
    },

    handleSubmit() {
      LoginService.changePwd({
        name: this.$parent.loginForm.username,
        repassword: this.form.password,
      }).then((res) => {
        const { code,  msg } = res;
        if (code == 200) {
          this.$message.success('修改成功');
          this.closeMadel();
        } else {
          this.$message.error(msg);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ {
  .el-form-item--small.el-form-item {
    margin-bottom: 10px;
  }
}
.warn-tip {
  color: #e6a23c;
}

.cp {
  cursor: pointer;
  font-size: 32px;
}
.open-eyes {
  font-size: 26px;
  margin: 3px 4px 0 0;
}
</style>
