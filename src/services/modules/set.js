import Service from "@/services/service-base";
import qs from "qs";

// 设置
class SetService extends Service {
  // 获取活动时间
  getInfo(id) {
    return this.http.get(`/setting/${id}`);
  }
  setInfo(id, params) {
    return this.http.put(`/setting/${id}`, params);
  }
}

export default new SetService();
