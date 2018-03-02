import { routerRedux } from 'dva/router';
import {fakeAccountLogin, selectBlogCategory, selectTimeline} from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import {message} from "antd/lib/index";

export default {
  namespace: 'timeline',

  state: {
    timelines:[],
    status: undefined,
  },

  effects: {
      *selectTimeline(_, { call, put }) {
          const response = yield call(selectTimeline);
          if(response.status==0){
              yield put({
                  type: 'selectTimelineReduce',
                  payload: response.data,
              });
          }else {
              message.success(response.message);
          }

      },
  },

  reducers: {
      selectTimelineReduce(state, action) {
          return {
              ...state,
              timelines: action.payload,
          };
      },
  },
};
