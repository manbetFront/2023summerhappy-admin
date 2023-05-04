import Service from "@/services/service-base";
import qs from "qs";

// 设置
class SetService extends Service {
  // 获取活动时间
  getInfo() {
    return this.http.get(`/activity/get`);
  }
  // 设置活动时间
  setInfo(param) {
    return this.http.post("/activity/set", param);
  }
}

export default new SetService();
