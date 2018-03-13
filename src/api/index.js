import axios from 'axios'

// const base = 'http://wx.blissr.cc'
const base = process.env.API_ROOT
const czjs = '/czjs'
const api = {
  action: {
    getGiftStatus: base + czjs + '/admin/v1/getGiftStatus',
    getUserList: base + czjs + '/admin/v1/getUserList',
    getLuckyList: base + czjs + '/admin/v1/getLuckyList',
    getDetailList: base + czjs + '/admin/v1/getDetailList',
    getCategoryList: base + czjs + '/admin/v1/getCategoryList'
  }
}

export default {
  getLuckyList (pageSize, current) {
    return axios.get(api.action.getLuckyList, {
      params: {
        pageSize: pageSize,
        current: current
      },
      headers: {
        'X-Admin': 'TUANJIENIUBI'
      }
    })
  },
  getDetailList (pageSize, current) {
    return axios.get(api.action.getDetailList, {
      params: {
        pageSize: pageSize,
        current: current
      },
      headers: {
        'X-Admin': 'TUANJIENIUBI'
      }
    })
  },
  getCategoryList (pageSize, current) {
    return axios.get(api.action.getCategoryList, {
      params: {
        pageSize: pageSize,
        current: current
      },
      headers: {
        'X-Admin': 'TUANJIENIUBI'
      }
    })
  },
  getUserList (pageSize, current) {
    return axios.get(api.action.getUserList, {
      params: {
        pageSize: pageSize,
        current: current
      },
      headers: {
        'X-Admin': 'TUANJIENIUBI'
      }
    })
  },

  getGiftStatus (code) {
    return axios.get(api.action.getGiftStatus, {
      params: {
        code: code
      },
      headers: {
        'X-Admin': 'TUANJIENIUBI'
      }
    })
  }
}
