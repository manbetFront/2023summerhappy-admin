

import CommonService from "@service/common";
import {Message} from 'element-ui'

const organizeList = {
  state: {
    department: [],
    groups: {}
  },
  getters: {
    department(state) {
      return state.department
    },
  },
  mutations: {
    SET_DEPARTMENT: (state, department) => {
      state.department = department
    },
  },
  actions: {
    // 获取组织结构
    GetOrganizeList({ state }) {
      return new Promise(resolve => {
        CommonService.getOrganizeList({
          page: 1,
          size: 999,
        }).then(res => {
          const {code, data} = res
          if (code == 200 && data.content && data.content.length) {
            const department = []
            const groups = {}
            data.content.forEach((item) => {
              department.push({
                department_name: item.department_name,
                department_id: item.department_id,
              });
              groups[item.department_id] = item.group || [];
            });
            sessionStorage.setItem(
              "department",
              JSON.stringify(department)
            );
            sessionStorage.setItem("groups", JSON.stringify(groups));
          } else {
            Message.error("获取组织结构数据出错");
          }
          resolve(res)
        }).catch(e => {
          Message.error("获取组织结构数据出错");
        })
      })
    },
  }
}

export default organizeList
