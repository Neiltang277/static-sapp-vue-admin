import axios from 'axios'

// const base = 'http://wx.blissr.cc'
const base = process.env.API_ROOT
const godsServer = 'http://a-daily.qinshou.me'
const api = {
  action: {
    getGiftStatus: base + '/czjs/admin/v1/getGiftStatus',
    getUserList: base + '/czjs/admin/v1/getUserList',
    getLuckyList: base + '/czjs/admin/v1/getLuckyList',
    getDetailList: base + '/czjs/admin/v1/getDetailList',
    getCategoryList: base + '/czjs/admin/v1/getCategoryList'
  },
  ohmygod: {
    getAttributeList: godsServer + '/gods/destroyGodConfig'
  }
}

const headers = {
  czjs: {
    'X-Admin': 'TUANJIENIUBI'
  }
}

export default {
  getLuckyList (pageSize, current) {
    return axios.get(api.action.getLuckyList, {
      params: {
        pageSize: pageSize,
        current: current
      },
      headers: headers.czjs
    })
  },
  getDetailList (pageSize, current) {
    return axios.get(api.action.getDetailList, {
      params: {
        pageSize: pageSize,
        current: current
      },
      headers: headers.czjs
    })
  },
  getCategoryList (pageSize, current) {
    return axios.get(api.action.getCategoryList, {
      params: {
        pageSize: pageSize,
        current: current
      },
      headers: headers.czjs
    })
  },
  getUserList (pageSize, current) {
    return axios.get(api.action.getUserList, {
      params: {
        pageSize: pageSize,
        current: current
      },
      headers: headers.czjs
    })
  },

  getGiftStatus (code) {
    return axios.get(api.action.getGiftStatus, {
      params: {
        code: code
      },
      headers: headers.czjs
    })
  },
  // GODS
  getAttributeList (pageSize, current) {
    return axios.get(api.ohmygod.getAttributeList, {
      debug: 1
    })
  }
}
