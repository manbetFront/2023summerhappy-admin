import Service from '@/services/service-base'

// 抽奖记录
class ApiService extends Service {
  getList(param) {
    return this.http.post('/oauth/login', param)
  }

}

export default new ApiService()
