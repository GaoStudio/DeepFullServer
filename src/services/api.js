import { stringify } from 'qs';
import request from '../utils/request';

export const host = 'http://localhost:8080';
export async function selectBlogCategory() {
  return request(host+'/api/blog/category');
}
export async function addBlog(params) {
    return request(host+'/api/blog/addblog', {
        method: 'POST',
        body: params,
    });
}
export async function saveBlog(params) {
    return request(host+'/api/blog/saveblog', {
        method: 'POST',
        body: params,
    });
}
export async function allBlog(params) {
    return request(host+`/api/blog/blogs?${stringify(params)}`);
}
export async function selectBlog(params) {
    return request(host+`/api/blog/blog?${stringify(params)}`);
}
export async function selectTimeline(params) {
    return request(host+`/api/blog/timeline?${stringify(params)}`);
}
export async function selectTimeMusic() {
    return request(host+'/api/blog/musicbox');
}
export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
