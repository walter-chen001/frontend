import request from '@/utils/request'

export function getCountryAreData() {
  return request({
    url: '/common/countryAreData',
    method: 'post',
  })
}

/**
 * 获取页面的初始数据  导航  流程等
 * @return object
 */
export function getBaseData() {
  return request({
    url: '/common/baseData',
    method: 'post'
  })
}

export function getFormTaskCount() {
  return request({
    url: '/common/formTaskCount',
    method: 'post'
  })
}

export function getData3() {
  return request({
      url: '/common/getData3',
      method: 'post',
  })
}

export function updateColumnSet(obj) {
  return request({
      url: '/common/updateColumnSet',
      method: 'post',
      data:obj
  })
}

export function getColumnOption(obj) {
  return request({
      url: '/common/getColumnOption',
      method: 'post',
      data:obj
  })
}

export function getTableData(obj) {
  return request({
      url: '/common/getTableData',
      method: 'post',
      data:obj
  })
}

export function getColumnSetInfo(obj) {
  return request({
      url: '/common/getColumnSetInfo',
      method: 'post',
      data:obj,
	async:false
  })
}

export function upload() {
  return request({
      url: '/common/upload',
      method: 'post',
  async:false
  })
}

export function uploadImg(obj) {
  return request({
      url: '/common/uploadImg',
      method: 'post',
      data:obj
  })
}

//上传附件
export function attachSave(obj) {
  return request({
    url: '/exchangeProduct/attachSave',
    method: 'post',
    data:obj
  })
}

//上传验证身份证
export function idCardExcelReport(obj) {
  return request({
    url: '/shopWeb/idCardExcelReport',
    method: 'post',
    data:obj
  })
}

//IM选择图片
export function getImages(obj) {
  return request({
    url: '/instantMessenger/getImages',
    method: 'post',
    data:obj
  })
}

export function getAttachmentInfo(obj) {
  return request({
    url: '/attachment/getAttachmentInfo',
    method: 'post',
    data:obj
  })
}

export function attachDel(obj) {
  return request({
    url: '/exchangeProduct/attachDel',
    method: 'post',
    data:obj
  })
}


// 客户收款账目总表 列印
export function printAccount(obj) {
  return request({
    url: '/isorder/printAccount',
    method: 'post',
    data: obj
  })
}

// 客户收款账目总表 导出
export function excelAccount(obj) {
  return request({
    url: '/isorder/excelAccount',
    method: 'post',
    data: obj
  })
}

export function getInitData(type) {
  return request({
    url: '/common/index',
    method: 'post',
    data:{tableType:type}
  })
}

export function getCountryOptions() {
  return request({
    url: '/country/getData',
    method: 'post',
  })
}

export function getCompanyIndustryOptions() {
  return request({
    url: '/companyIndustry/getData',
    method: 'post',
  })
}

export function getAreaCode() {
  return request({
    url: '/country/getAreaCode',
    method: 'post',
  })
}


//获取表头设置
export function getTableTitle(tableType) {
    return request({
        url: '/system/tableColumnSettings/getTableTitle',
        method: 'post',
        data:{table_sign:tableType}
    })
}
//保存列设置
export function updateTableTitle(obj) {
    return request({
        url: '/system/tableColumnSettings/update',
        method: 'post',
        data:obj
    })
}
//恢复表头设置
export function recoverTableTitle(obj) {
    return request({
        url: '/system/tableColumnSettings/restoreDefault',
        method: 'post',
        data:obj
    })
}



