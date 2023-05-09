import Service from "@/services/service-base";
import qs from "qs";

class RecordService extends Service {
  // 主题一
  getListOne(param) {
    return this.http.get(`/week_data/list/draw?${qs.stringify(param)}`, param);
  }

  // 主题二
  getListTwo(param) {
    return this.http.get(`/activity_reward/list?${qs.stringify(param)}`, param);
  }

  // 报表列表
  getReportList(param) {
    return this.http.get(`/week_data/list?${qs.stringify(param)}`, param);
  }
  // 导出报表
  ExportList(param) {
    return this.http.get(`/report/export?${qs.stringify(param)}`, param);
  }
}

export default new RecordService();
