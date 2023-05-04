import Service from "@/services/service-base";
import qs from "qs";

class RecordService extends Service {
  // 存款列表
  getListOne(param) {
    return this.http.get(`/theme/deposit?${qs.stringify(param)}`, param);
  }

  // 投注列表
  getListTwo(param) {
    return this.http.get(`/theme/bet?${qs.stringify(param)}`, param);
  }

  // 报表列表
  getReportList(param) {
    return this.http.get(`/report/list?${qs.stringify(param)}`, param);
  }
  // 导出报表
  ExportList(param) {
    return this.http.get(`/report/export?${qs.stringify(param)}`, param);
  }
}

export default new RecordService();
