import {redirect, create, update, remove} from '../services/app'
import { parse } from 'qs'
import config  from '../utils/config'
const { prefix } = config

export default {
    namespace: 'app',
    state: {
        currentItem:{},
        list: [],
        modalVisible: false,
        modalType: 'create',
    },
    subscriptions: {
        setup ({ dispatch }) {
            dispatch({ type: 'query' })
        },
    },

    effects: {
        *query ({payload,}, { call, put }) {
            const data = yield call(redirect,payload)
            if (data !== null) {
                yield put({
                    type: 'querySuccess',
                    payload:  {
                        list:data,
                    },
                })
            } else {
            }
         },

        *create ({ payload }, { call, put }) {
            const data = yield call(create, payload)
            if (data.success) {
                yield put({ type: 'hideModal' })
                yield put({ type: 'query' })
            } else {
                throw data
            }
        },

        *'delete' ({ payload }, { call, put, select }) {
            const data = yield call(remove, { id: payload })
            if (data.success) {
                yield put({ type: 'query' })
            } else {
                throw data
            }
        },

        *update ({ payload }, { select, call, put }) {
            const id = yield select(({ app }) => app.currentItem.id)
            const newUser = { ...payload, id }
            const data = yield call(update, newUser)
            if (data.success) {
                yield put({ type: 'hideModal' })
                yield put({ type: 'query' })
            } else {
                throw data
            }
        },
    },
    reducers: {
        querySuccess (state, action) {
            const { list } = action.payload
            return {
                ...state,
                list,
            }
        },
        showModal (state, action) {
            const {modalType, currentItem} = action.payload;
            return { ...state, modalType, currentItem, modalVisible: true }
        },
        hideModal (state) {
            return { ...state, modalVisible: false }
        },
    },
}
