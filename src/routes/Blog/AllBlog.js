/* eslint-disable react/react-in-jsx-scope */
import React ,{ Component } from 'react';
import { Table ,Divider} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {connect} from "dva";
import {host} from "../../services/api";

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
    render: val => <img style={{maxWidth:100,height:'auto'}} src={host+'/'+val}></img>
}, {
    title: '分类',
    dataIndex: 'blogCategory',
    key: 'blogCategory',
    render: val => <span>{val.bCategory_name}</span>
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
    render: () => (
        <div>
            <a href="">编辑</a>
            <Divider type="vertical" />
            <a href="">发布</a>
        </div>
    ),
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
