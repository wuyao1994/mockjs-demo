import request from '../utils/request'

export async function redirect(params) {
    return request('/api/redirect', {
        method: 'get',
        data: params,
    })
}

export async function create(params) {
    return request('/api/create', {
        method: 'post',
        data: params,
    })
}

export async function update(params) {
    return request('/api/update', {
        method: 'patch',
        data: params,
    })
}

export async function remove(params) {
    return request('/api/remove', {
        method: 'delete',
        data: params,
    })
}