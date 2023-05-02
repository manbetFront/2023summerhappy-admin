import qs from 'qs'

export default {
  data() {
    return {
      // 不转换空数据的字段
      whiteListFiled: ['full_attendance', 'regular', 'enjoy'],
      // 要处理千分位的字段
      thousandsFiled: [
        'basic_salary', 'technical_subsidy', 'seniority_wage', 'accomodation_allowance', 'meal_allowance', 'night_shift_allowance', 'attendance_bonus', 'special_subsidy', 'home_communication_allowance', 'reissue_last_fees', 'work_visa_fee', 'others_fee', 'rest_day_overtime', 'lunch_allowance', 'dinner_allowance', 'chinese_holiday', 'overtime_hour', 'home_allowance', 'exchange_bonus', 'late_tardiness', 'fine_tardiness', 'agent_fee', 'water_bill', 'total_amount',
        'monthly_benchmark', 'actual_amount',
        'deduction_total', 'has_paid', 'monthly_paid',
        'amount_php','amount_cny',
        'house_php','meal_php',
      ]
    }
  },
  methods: {
    // 接口导出文件
    apiExport(api, params) {
      const _url = process.env.VUE_APP_BASE_API + api + `?${qs.stringify(params)}`
      window.location.href = _url
    },
    // 自定义序号，分页累加
    indexMethod(index) {
      return index + 1 + ((this.listQuery.page - 1) * this.listQuery.size)
    },
    // 数组内对象字符处理空数据，用'-'填充
    handlingEmptyData(arr, child) {
      if(!arr || !arr.length) return []
      return arr.map(item => {
        return this.filedEmptyToObj(item, child)
      })
    },
    // 对象字符处理空数据，用'-'填充
    filedEmptyToObj(obj, child) {
      if(!obj || typeof obj !== 'object') return {}
      let newObj = {}
      if(child) {
        const _newChild = this.filedEmptyToObj(obj[child])
        newObj[child] = _newChild
        obj[child] = _newChild
      }
      Object.keys(obj).forEach(filed => {
        if(this.whiteListFiled.indexOf(filed) !== -1) {
          newObj[filed] = obj[filed]
        } else {
          // 处理空
          newObj[filed] = (!obj[filed] || obj[filed] === '0.0' || obj[filed] === '0' ) ? '-' : obj[filed]
          // 处理千分位
          if(this.thousandsFiled.indexOf(filed) !== -1) {
            newObj[filed] = this.numFormat(obj[filed])
          }
        }
      })
      return newObj
    },
    // 价格千分位
    numFormat(value) {
      if (!value || value === '0.0' || value === '0') return '-'
      // 获取整数部分
      var intPart = Number(value).toFixed(0)
      // 将整数部分逢三一断
      var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      return intPartFormat
    },

    returnGroupName(val) {
      return ['-','A','B','C','D','E','F'][val]
    },

  }
}
