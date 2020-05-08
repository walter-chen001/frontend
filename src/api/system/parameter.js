import request from '@/utils/request'

export default {
	getData() {
	    return request({
	        url: 'system/PointSetting/getData',
	        method: 'post',
	    })
	},
	update(obj) {
	    return request({
	        url: 'system/PointSetting/update',
	        method: 'post',
	        data:obj
	    })
	},
}