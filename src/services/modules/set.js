import Service from "@/services/service-base";
import qs from "qs";

// 设置
class SetService extends Service {
  // 获取活动时间
  getInfo() {
    return this.http.get(`/new_year/activity/list`);
  }

  setInfo(param) {
    return this.http.post("/new_year/activity/create", param);
  }
}

export default new SetService();
