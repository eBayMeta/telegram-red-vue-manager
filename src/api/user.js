import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/login',
    method: 'get',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

// 获取用户列表
export function getUserList(data) {
  return request({
    url: "/userList",
    method: 'get',
    data
  })
}
// 删除用户
export function deleteUser(data) {
  return request({
    url: "/deleteUser",
    method: 'get',
    data
  })
}


// 获取用户全局流水列表
export function getUserFlowList(data) {
  return request({
    url: "/userFlowList",
    method: 'get',
    data
  })
}

//自动抢包列表
export function autoGetUserList(data) {
  return request({
    url: "/autoGetUserList",
    method: 'get',
    data
  })
}

//自动抢包列表 添加
export function autoGetUserAdd(data) {
  return request({
    url: "/autoGetUserAdd",
    method: 'get',
    data
  })
}

//自动抢包列表 删除
export function autoGetUserDel(data) {
  return request({
    url: "/autoGetUserDel",
    method: 'get',
    data
  })
}


// 用户线性账户详情
export function getUserNodeAccountDes(data) {
  return request({
    url: "/userNodeAccountDes",
    method: 'get',
    data
  })
}
// 修改线性资产
export function updateUserNodeAccount(data) {
  return request({
    url: "/updateUserNodeAccount",
    method: 'get',
    data
  })
}
//雇佣机器人订单列表
export function getAiOrderList(data) {
  return request({
    url: "/rechargeFlowList",
    method: 'get',
    data
  })
}
//申请节点订单列表
export function getNodeOrderList(data) {
  return request({
    url: "/orderList",
    method: 'get',
    data
  })
}
//打金游戏收益配置
export function getShowList(data) {
  return request({
    url: "/withdrawFlowList",
    method: 'get',
    data
  })
}
//打金游戏收益配置添加编辑
export function setShowList(data) {
  return request({
    url: "/saveOrUpdateShow",
    method: 'post',
    data
  })
}
// 修改用户信息
export function changeUserInfor(data) {
  return request({
    url: '/updateUser',
    method: 'post',
    data
  })
}
// 机器人打金列表
export function getOutList(data) {
  return request({
    url: '/topOrderFlowList',
    method: 'get',
    data
  })
}
// 审核
export function changeOutApply(data) {
  return request({
    url: '/outApply',
    method: 'post',
    data
  })
}
// 获取配置
export function getConfig(data) {
  return request({
    url: '/configList',
    method: 'get',
    data
  })
}
// 修改配置
export function updateConfig(data) {
  return request({
    url: '/updateConfig',
    method: 'post',
    data
  })
}


// 获取授权
export function getGroup(data) {
  return request({
    url: '/groupList',
    method: 'get',
    data
  })
}

// 添加授权
export function addGroup(data) {
  return request({
    url: '/addGroup',
    method: 'post',
    data
  })
}


// 删除授权
export function deleteGroup(data) {
  return request({
    url: '/deleteGroup',
    method: 'post',
    data
  })
}



// 获取
export function getBobmUserList(data) {
  return request({
    url: '/bobmUserList',
    method: 'get',
    data
  })
}

// 添加
export function addBobmUser(data) {
  return request({
    url: '/addBobmUser',
    method: 'post',
    data
  })
}


// 删除
export function deleteBobmUser(data) {
  return request({
    url: '/deleteBobmUser',
    method: 'post',
    data
  })
}


// 订单详情
export function getOrderDetails(data) {
  return request({
    url: '/orderInfo',
    method: 'get',
    data
  })
}
// 充值地址
export function getUserRechargeAddressList(data) {
  return request({
    url: '/userRechargeAddressList',
    method: 'get',
    data
  })
}
// 订单详情
export function getUserWithdrawAddressList(data) {
  return request({
    url: '/userWithdrawAddressList',
    method: 'get',
    data
  })
}

// 查看私钥
export function getUserRechargeAddressKeyInfo(data) {
  return request({
    url: '/userRechargeAddressKeyInfo',
    method: 'get',
    data
  })
}
// 添加充值记录
export function addRecharge(data) {
  return request({
    url: '/addRecharge',
    method: 'post',
    data
  })
}

// 添加提笔记录
export function addWithdraw(data) {
  return request({
    url: '/addWithdraw',
    method: 'post',
    data
  })
}
// 管理员
export function getRoleList(data) {
  return request({
    url: '/adminList',
    method: 'get',
    data
  })
}
// 菜单
export function getMenuList(data) {
  return request({
    url: '/menuList',
    method: 'get',
    data
  })
}

// 添加管理员
export function addOrUpdateAdmin(data) {
  return request({
    url: '/addOrUpdateAdmin',
    method: 'post',
    data
  })
}
//审核体现
export function shenheWithdraw(data) {
  return request({
    url: '/shenheWithdraw',
    method: 'post',
    data
  })
}

//推广详情
export function userPushList(data) {
  return request({
    url: '/userPushList',
    method: 'get',
    data
  })
}
