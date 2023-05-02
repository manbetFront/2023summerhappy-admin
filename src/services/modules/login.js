import Service from '@/services/service-base'

// 登录
class LoginService extends Service {
  login(param) {
    return this.http.post('/oauth/login', param)
  }
  getInfo(param) {
    return this.http.get('/get_login_admin', param)
  }
}

export default new LoginService({
  baseURL: process.env.VUE_APP_BASE_API_LOGIN
})
