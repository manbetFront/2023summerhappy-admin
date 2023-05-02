

import Service from '@/services/service-base'
import qs from 'qs'

class CommonService extends Service {

  getTeamList(param) {
    return this.http.get(`/api/match/tree?${qs.stringify(param)}`, param)
  }
}

export default new CommonService()

