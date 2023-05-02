import axios from "axios";
import _merge from "lodash/merge";
import store from "@/store";
import { getToken } from "@/utils/auth";
import { Message } from "element-ui";

let pendingQueue = new Map();
let CancelToken = axios.CancelToken;

const judgePendingFunc = function(config) {
  if (pendingQueue.has(`${config.method}->${config.url}`)) {
    pendingQueue.get(`${config.method}->${config.url}`)();
  }
};

// 删除队列中对应已执行的请求
const removeResolvedFunc = function(config) {
  if (pendingQueue.has(`${config.method}->${config.url}`)) {
    pendingQueue.delete(`${config.method}->${config.url}`);
  }
};

/**
 * @constructor Service
 * @description common service class for axios ajax
 * @param {Object} axios options
 * @example Class YourService extends Service
 */
export default class Service {
  constructor(options) {
    options = options || {};

    const baseURL = process.env.VUE_APP_BASE_API;
    this.options = _merge(
      {
        baseURL,
        timeout: 0,
        headers: {}
      },
      options
    );

    this.http = this.createInstance(this.options);
    this.setRequestInterceptor();
    this.setResponseInterceptor();
  }

  /**
   * @description create axios instance
   * @param {Object} options axios instance options
   * @return {Object} axios instance
   */
  createInstance(options) {
    const opt =
      Object.prototype.toString
        .call(options)
        .slice(8, -1)
        .toLowerCase() === "object"
        ? options
        : {};

    return axios.create(opt);
  }

  /**
   * @description set request interceptor, only the last interceptor will be reserved
   * @param {Function} success request success callback handler
   * @param {Function} error request error callbach handler
   * @return {Object} xmlHttpRequest config / config error
   */
  setRequestInterceptor(success, error) {
    // if request interceptor setted then eject it
    if (typeof this._requestInterceptor !== "undefined") {
      this.http.interceptors.request.eject(this._requestInterceptor);
    }
    this._requestInterceptor = this.http.interceptors.request.use(
      config => {
        judgePendingFunc(config);

        config.cancelToken = new CancelToken(cb => {
          // cb就是取消该请求的方法，调用它就能cancel掉当前请求
          pendingQueue.set(`${config.method}->${config.url}`, cb);
        });

        let requestConfig;
        const token = getToken();
        const Authorization = token;
        requestConfig = {
          ...config,
          headers: {
            ...(config.headers || {}),
            token: token,
            authorization: "Bearer " + token
          }
        };
        if (config.url != "/login" && Authorization) {
          // requestConfig.headers['Authorization'] =   Authorization
        }
        if (typeof success === "function") {
          success(requestConfig);
        }
        return requestConfig;
      },
      err => {
        if (typeof error === "function") {
          error(err);
        }
        return Promise.reject(err);
      }
    );
  }

  /**
   * @description set response interceptor, only the last interceptor will be reserved
   * @param {Function} success response success callback handler
   * @param {Function} error response error callbach handler
   * @return {Object} xmlHttpRequest response / xmlHttpRequest error
   */
  setResponseInterceptor(success, error) {
    // if response interceptor setted then eject it
    if (typeof this._responseInterceptor !== "undefined") {
      this.http.interceptors.response.eject(this._responseInterceptor);
    }

    this._responseInterceptor = this.http.interceptors.response.use(
      response => {
        removeResolvedFunc(response.config);
        if (typeof success === "function") {
          return success(response.data);
        } else if (Number(response.status) !== 200) {
          // const message =
          //   response && response.message ? response.message : '接口请求报错'
          // Message.error(message)
        } else if (Number(response.status) === 200) {
          return response.data;
        }
        return response.data;
      },
      err => {
        console.log(err);
        if (err.response.status == 401) {
          store.dispatch("LogOut").then(() => {
            Message({
              message: "登录已过期，请重新登录",
              duration: 500,
              type: "error"
            });
            setTimeout(() => {
              location.reload();
            }, 1001);
          });
        }
        if (typeof error === "function") {
          error(err);
        } else {
          // Message.error('请求超时, 请重试!')
        }
        return Promise.reject(err);
      }
    );
  }
}
