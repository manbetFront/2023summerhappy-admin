

import Service from '@/services/service-base'
import qs from 'qs'

class NationService extends Service {

  getTeamList(param) {
    return this.http.get(`/api/team/list?${qs.stringify(param)}`, param)
  }

  updateTeam(param) {
    return this.http.post(`/api/team/update?${qs.stringify(param)}`, param)
  }
}

export default new NationService()

