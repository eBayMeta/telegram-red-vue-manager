import request from '@/utils/request'

// 投票轮次列表
export function getVoteRoundsList() {
  return request({
    url: '/admin/Alternately',
    method: 'get'
  })
}

// 添加投票轮次
export function addVoteRounds(data) {
  return request({
    url: '/admin/alternately/create',
    method: 'post',
    data
  })
}

// 编辑投票轮次
export function updateVoteRounds(data) {
  return request({
    url: '/admin/alternately/update',
    method: 'post',
    data
  })
}

// 参数获取
export function getConfig() {
  return request({
    url: '/admin/alternately/tabulation',
    method: 'get'
  })
}

// 参数编辑
export function updateConfig(data) {
  return request({
    url: '/admin/Alternately',
    method: 'post',
    data
  })
}

// 投票参数获取
export function getVoteConfig() {
  return request({
    url: '/admin/Alternately',
    method: 'get'
  })
}

// 投票参数编辑
export function updateVoteConfig(data) {
  return request({
    url: '/admin/Alternately',
    method: 'post',
    data
  })
}
// 排队列表
export function getVoteWaitList(data) {
  return request({
    url: '/admin/alternately/list',
    method: 'post',
    data
  })
}
// 已出局列表
export function getVoteOutList(data) {
  return request({
    url: '/admin/alternately/out',
    method: 'post',
    data
  })
}
// 未出局列表
export function getVoteInList(data) {
  return request({
    url: '/admin/alternately/not/out',
    method: 'post',
    data
  })
}
// 一键出局
export function changeAllOut(data) {
  return request({
    url: '/admin/alternately/click',
    method: 'post',
    data
  })
}

// 获取自动出局状态
export function getAutoOutStatus() {
  return request({
    url: '/admin/alternately/vote_out',
    method: 'get',
  })
}

// 自动出局
export function changeAutoOut(data) {
  return request({
    url: '/admin/alternately/is_out',
    method: 'post',
    data
  })
}
