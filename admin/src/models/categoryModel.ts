import { message } from 'antd';
import CategoryController from '@/services/category/CategoryController';

export default {
  namespace: 'category',
  state: {
    list: [],
  },
  reducers: {
    _initCategoryList(state: any, action: any) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
  effects: {
    * initCategoryList(action: any, { call, put }: any) {
      try {
        const { data } = yield call(CategoryController.getCategoryListApi);
        yield put({
          type: '_initCategoryList',
          payload: data,
        });

        // 如果存在回调函数，执行回调
        if (typeof action.callback === 'function') {
          action.callback();
        }
      } catch (error) {
        message.error('获取分类列表失败');
      }
    },
  },
};
