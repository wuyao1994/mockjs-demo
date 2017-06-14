import redirect from '../services/app'
import { parse } from 'qs'
import config  from '../utils/config'
const { prefix } = config

export default {
    namespace: 'app',
    state: {
        list: {},
    },
    subscriptions: {
        setup ({ dispatch }) {
            dispatch({ type: 'query' })
        },
    },

    effects: {
        *query ({payload,}, { call, put }) {
            const data = yield call(redirect)
            console.log('data:',data)
            if (data !== null) {
                yield put({
                    type: 'querySuccess',
                    payload: data,
                })
            } else {
            }
         },
    },
    reducers: {
        querySuccess (state, { payload: list }) {
            return {
                ...state,
                list,
            }
        },
    },
}
