import { routerRedux } from 'dva/router';
import {
    addBlog, addMusic, addTimeMusic, fakeAccountLogin, selectBlogCategory, selectTimeline,
    selectTimeMusic
} from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import {message} from "antd/lib/index";

export default {
  namespace: 'timeline',

  state: {
    timelines:[],
    timeMusic:[],
    addMusicStats:false
  },

  effects: {
      *selectTimeline(_, { call, put }) {
          const response = yield call(selectTimeline);
          if(response&&response.status==0){
              yield put({
                  type: 'selectTimelineReduce',
                  payload: response.data,
              });
          }else {
              message.success(response.message);
          }

      },
      *selectTimeMusic(_, { call, put }) {
          const response = yield call(selectTimeMusic);
          if(response&&response.status==0){
              yield put({
                  type: 'selectTimeMusicReduce',
                  payload: response.data,
              });
          }else {
              message.success(response.message);
          }
      },
      *addTimeMusic({ payload }, { call, put }) {
          yield put({
              type: 'changeTimeMusicStatus',
              payload: true,
          });
          const response = yield call(addMusic, payload);
          if(response.status==0){
              message.success('添加成功');
          }else {
              message.success('添加异常');
          }
          yield put({
              type: 'changeTimeMusicStatus',
              payload: false,
          });
      },
  },

  reducers: {
      selectTimelineReduce(state, action) {
          return {
              ...state,
              timelines: action.payload,
          };
      },
      selectTimeMusicReduce(state, action) {
          return {
              ...state,
              timeMusic: action.payload,
          };
      },
      changeTimeMusicStatus(state, action){
          return {
              ...state,
              addMusicStats: action.payload,
          };
      },
  },
};
