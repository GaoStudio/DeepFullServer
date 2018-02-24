/* eslint-disable react/react-in-jsx-scope */
import { Component } from 'react';
import { Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {connect} from "dva";

const columns = [{
    title: '时间',
    dataIndex: 'bblog_time',
    key: 'bblog_time',
},{
    title: '标题',
    dataIndex: 'bblog_title',
    key: 'bblog_title',
}, {
    title: '副标题',
    dataIndex: 'bblog_sub_title',
    key: 'bblog_sub_title',
}, {
    title: '封面',
    dataIndex: 'bblog_logo',
    key: 'bblog_logo',
}, {
    title: '分类',
    dataIndex: 'bCategory_name',
    key: 'bCategory_name',
}, {
    title: '浏览量',
    dataIndex: 'bblog_views',
    key: 'bblog_views',
}, {
    title: '状态',
    dataIndex: 'bblog_state',
    key: 'bblog_state',
}, {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
}];
@connect(({ blog }) => {
    console.log(blog.blogs)
    return (
        {
           blogs: blog.blogs,
        }
    );
})
export default class AllBlog extends Component {
  constructor(props){
      super(props)
  }
  componentDidMount() {
      this.props.dispatch({
          type: 'blog/allBlog',
          payload: {path:'Home'}
      });
  }
  render() {
    return (
      <PageHeaderLayout >
          <Table dataSource={this.props.blogs&&this.props.blogs.data} columns={columns} bordered/>
      </PageHeaderLayout>
    );
  }
}
