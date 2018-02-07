
import { selectBlogCategory } from '../services/api';

export default {
  namespace: 'blog',

  state: {
    blogCategorys: {},
    status: undefined,
  },

  effects: {
    *blogCategorys(_, { call, put }) {
      const response = yield call(selectBlogCategory);
      yield put({
        type: 'selectBlogCategory',
        payload: response,
      });
    },
  },

  reducers: {
    selectBlogCategory(state, action) {
      return {
        ...state,
        blogCategorys: action.payload,
      };
    },
  },
};
