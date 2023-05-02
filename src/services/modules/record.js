import Service from "@/services/service-base";
import qs from "qs";

class RecordService extends Service {
  getListOne(param) {
    return this.http.get(
      `/new_year/theme_one/list?${qs.stringify(param)}`,
      param
    );
  }

  getListTwo(param) {
    return this.http.get(
      `/new_year/theme_two/list?${qs.stringify(param)}`,
      param
    );
  }

  // 报表列表
  getReportList(param) {
    return this.http.get(
      `/new_year/lottery_report/list?${qs.stringify(param)}`,
      param
    );
  }
  // 导出报表
  ExportList(param) {
    return this.http.get(
      `/new_year/lottery_report/export?${qs.stringify(param)}`,
      param
    );
  }
}

export default new RecordService();
