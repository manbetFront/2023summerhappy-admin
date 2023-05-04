<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <h3 class="title">
        MX盛夏狂欢季活动
      </h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号"
        >
          <svg-icon
            slot="prefix"
            icon-class="user"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon
            slot="prefix"
            icon-class="password"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <!-- 二次修改  验证码 -->
      <!-- <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon
            slot="prefix"
            icon-class="valid-code"
            class="el-input__icon input-icon"
          />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" />
        </div>
      </el-form-item>-->
      <div class="clearfix">
        <el-checkbox
          v-model="loginForm.rememberMe"
          class="fl"
          style="margin: 0px 0px 25px 0px"
        >
          记住密码
        </el-checkbox>
        <el-popover
          class="fr"
          placement="top"
          width="200"
          trigger="click"
          content="请联系管理员重置密码"
        >
          <span slot="reference" class="pwd"> 忘记密码？ </span>
        </el-popover>
      </div>
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width: 100%"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>

    <ChangePwd ref="changePwd" />
  </div>
</template>

<script>
// 获取验证码接口
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      cookiePassword: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        pid: 1
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [{ required: true, trigger: "blur", message: "密码不能为空" }]
        // 二次修改  验证码的验证逻辑
        // code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
      },
      loading: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    // 二次修改 accessRoutes
    this.getCookie();
    // 替换测试环境
    this.loginForm.pid = process.env.VUE_APP_AID;
  },
  methods: {
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password:
          password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), {
              expires: 30
            });
            Cookies.set("rememberMe", this.loginForm.rememberMe, {
              expires: 30
            });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }
          this.login();
        }
      });
    },

    async login() {
      try {
        const { code, msg } = await this.$store.dispatch(
          "Login",
          this.loginForm
        );
        if (code == 0) {
          localStorage.setItem("name", this.loginForm.username);
          // localStorage.setItem("pwd", this.loginForm.password);
          this.jump();
        } else {
          this.loading = false;
          this.$message.error(msg);
        }
      } catch (e) {
        this.loading = false;
        this.$message.error("接口请求错误");
        throw e;
      }
    },

    async jump() {
      try {
        await this.$store.dispatch("GetInfo", this.loginForm);
        this.$message({
          message: "登录成功",
          type: "success",
          duration: 500
        });

        setTimeout(() => {
          this.loading = false;
          let url = "";
          let routerData = this.$router.resolve({
            path: url || "/"
          });
          window.open(routerData.href, "_self");
        }, 501);
      } catch (e) {
        throw e;
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-image: url("../../assets/image/bg.jpg");
  background-size: 100% 100%;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.pwd {
  cursor: pointer;
  font-size: 14px;
  color: #3b78dd;
  &:hover {
    color: #1760d7;
  }
}
</style>
