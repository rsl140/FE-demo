import request from '@/utils/request'

export function addAccount (addInfo) {
  return request({
    url: '/account',
    method: 'post',
    data: addInfo
  })
}

export function getShop () {
  return request({
    url: '/account/shop',
    method: 'get'
  })
}

export function getAcountList () {
  return request({
    url: '/account',
    method: 'get'
  })
}

export function searchAcountList (id) {
  return request({
    url: '/account/search',
    method: 'get',
    params: { id }
  })
}

export function delAccount (id) {
  return request({
    url: '/account',
    method: 'delete',
    data: { id }
  })
}
