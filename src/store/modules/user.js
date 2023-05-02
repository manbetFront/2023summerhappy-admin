import { getToken, setToken, removeToken } from '@/utils/auth'
import LoginService from '@service/login'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ID: (state, expires_in) => {
      state.expires_in = expires_in
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {

      return new Promise((resolve, reject) => {

        const {password, username, pid} =  userInfo
        LoginService.login({password, username, pid}).then(res => {
          if (res.code === 0) {
            const token = res.data.access_token
            localStorage.setItem('token', token)
            setToken(token)
            commit('SET_TOKEN', token)
            resolve(res)
          } else {
            resolve(res)
          }

        }).catch(e => {
          reject(e)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // 二次修改 抛出用户信息，不进行请求
        const res = {
          code: 0,
          data: {
            username: '',
            role_id: 0,
          }
        }
        let _res = {
          'msg': '操作成功',
          'code': 200,
          'permissions': [
            '*:*:*'
          ],
          'roles': [
            'admin'
          ],
          'user': {
            'searchValue': null,
            'createBy': 'admin',
            'createTime': '2018-03-16 11:33:00',
            'updateBy': null,
            'updateTime': null,
            'remark': '管理员',
            'dataScope': null,
            'params': {},
            'userId': 1,
            'deptId': 103,
            'userName': 'admin',
            'nickName': 'dancen',
            'email': 'dancen@ecoph.com',
            'phonenumber': '15888888888',
            'sex': '1',
            'avatar': '',
            'password': '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2',
            'salt': null,
            'status': '0',
            'delFlag': '0',
            'loginIp': '127.0.0.1',
            'loginDate': '2018-03-16T11:33:00.000+0800',
            'dept': {
              'searchValue': null,
              'createBy': null,
              'createTime': null,
              'updateBy': null,
              'updateTime': null,
              'remark': null,
              'dataScope': null,
              'params': {},
              'deptId': 103,
              'parentId': 101,
              'ancestors': null,
              'deptName': '研发部门',
              'orderNum': '1',
              'leader': 'dancen',
              'phone': null,
              'email': null,
              'status': '0',
              'delFlag': null,
              'parentName': null,
              'children': []
            },
            'roles': [
              {
                'searchValue': null,
                'createBy': null,
                'createTime': null,
                'updateBy': null,
                'updateTime': null,
                'remark': null,
                'dataScope': '1',
                'params': {},
                'roleId': 1,
                'roleName': '管理员',
                'roleKey': 'admin',
                'roleSort': '1',
                'status': '0',
                'delFlag': null,
                'flag': false,
                'menuIds': null,
                'deptIds': null,
                'admin': true
              }
            ],
            'roleIds': null,
            'postIds': null,
            'admin': true
          }
        }
        const user = _res.user
        if (_res.roles && _res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          commit('SET_ROLES', [res.data.role_id])
          commit('SET_PERMISSIONS', _res.permissions)
        } else {
          commit('SET_ROLES', ['ROLE_DEFAULT'])
        }
        commit('SET_NAME', res.data.username)
        const avatar = require('@/assets/image/male.png')
        commit('SET_AVATAR', avatar)
        resolve(res)

      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('token')
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_PERMISSIONS', [])
        removeToken()
        resolve()
        return
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
