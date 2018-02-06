import { isUrl } from '../utils/utils';

const menuData = [{
  name: '博客',
  icon: 'book',
  path: 'blog',
  children: [{
    name: '博客分类',
    path: 'BlogCategory',
  }, {
    name: '所有博客',
    path: 'AllBlog',
  }, {
    name: '写博客',
    path: 'AddBlog',
  }],
}, {
  name: '拓展管理',
  icon: 'coffee',
  path: 'life',
  children: [{
    name: '时光轴',
    path: 'TimeLine',
  }, {
    name: '音乐库',
    path: 'MusicBox',
  }, {
    name: '图书库',
    path: 'BookBox',
  }],
}, {
  name: '日常工具',
  icon: 'tool',
  path: 'tools',
  children: [{
    name: '日程计划',
    path: 'Plan',
  }],
}, {
  name: '基础配置',
  icon: 'setting',
  path: 'setting',
  children: [{
    name: '个人资料',
    path: 'AboutMe',
  }],
}];

function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
