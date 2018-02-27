
import {addBlog,allBlog, selectBlogCategory} from '../services/api';
import {routerRedux} from "dva/router";
import {reloadAuthorized} from "../utils/Authorized";
import {message} from "antd/lib/index";

export default {
  namespace: 'blog',

  state: {
    blogCategorys: {},
    blogs: {},
    saveBlogStats:false,
    status: undefined,
  },

  effects: {
    *blogCategorys(_, { call, put }) {
      console.log("models")
      const response = yield call(selectBlogCategory);
      yield put({
        type: 'selectBlogCategory',
        payload: response,
      });
    },
    *allBlog({ payload }, { call, put }) {
        console.log(payload)
        const response = yield call(allBlog, payload);
        yield put({
            type: 'selectAllBlog',
            payload: response,
        });
    },
    *addBlog({ payload }, { call, put }) {
      yield put({
          type: 'changeSaveBlogStatus',
          payload: true,
      });
      const response = yield call(addBlog, payload);
      if(response.status==0){
          message.success('添加成功');
      }else {
          message.success('添加异常');
      }
      yield put({
          type: 'changeSaveBlogStatus',
          payload: false,
      });
    },
  },

  reducers: {
    changeSaveBlogStatus(state, action){
      return {
        ...state,
        saveBlogStats: action.payload,
      };
    },
    selectBlogCategory(state, action) {
      console.log(action.payload)
      return {
        ...state,
        blogCategorys: action.payload,
      };
    },
    selectAllBlog(state, action) {
      return {
        ...state,
        blogs: action.payload,
      };
    },
  },
};
