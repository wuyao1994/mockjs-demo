import request from '../utils/request'

export async function redirect(params) {
    return request('/api/redirect', {
        method: 'get',
        data: params,
    })
}