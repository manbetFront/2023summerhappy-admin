import Service from '@/services/service-base'

import qs from 'qs'
// 预言球队记录
class ApiService extends Service {
  getList(param) {
    return this.http.get(`/api/forecast_log/list?${qs.stringify(param)}`, param)
  }


}

export default new ApiService()
