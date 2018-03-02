/* eslint-disable react/react-in-jsx-scope */
import React ,{ Component } from 'react';
import { Table ,Divider} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {connect} from "dva";
import { routerRedux } from 'dva/router';
import {host} from "../../services/api";
import EditBlog from "./Dialog/EditBlog";

@connect(({ blog }) => {
    return (
        {
           blogs: blog.blogs,
           blogCategorys: blog.blogCategorys,
        }
    );
})
export default class AllBlog extends Component {
  constructor(props){
      super(props)
      this.state={
          editBlogVisible:false
      }
      this.columns = [{
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
          render:this._operationAction,
      }];
      this.record =  null;
  }
  _operationAction=(text, record) => {
      return (
          <span>
              <a onClick={() => { this.type = 2, this.record = record, this._handleEditBlogVisible(true); }}>修改</a>
              <Divider type="vertical" />
              <a onClick={() => {   this.props.dispatch(routerRedux.push({pathname:'/blog/AddBlog', state: {data:record}}))}}>编辑</a>
              <Divider type="vertical" />
              <a href="#">发布</a>
          </span>
      );
  }
  componentDidMount() {
      if(this.props.blogCategorys){
          this.props.dispatch({
              type: 'blog/blogCategorys',
          });
      }
      this.props.dispatch({
          type: 'blog/allBlog',
          payload: {path:'Home'}
      });
  }
  _handleEditBlogVisible=(flag)=>{
      this.setState({
          editBlogVisible: !!flag,
      });
  }
  _editBlogOK=()=>{

  }
  render() {
    return (
      <PageHeaderLayout >
          <Table dataSource={this.props.blogs&&this.props.blogs.data} columns={this.columns} bordered/>
          <EditBlog
              title = '编辑'
              data = {this.props.blogCategorys&&this.props.blogCategorys.data}
              record = {this.record}
              handleModalVisible={this._handleEditBlogVisible}
              handleOK = {this._editBlogOK}
              modalVisible={this.state.editBlogVisible}/>
      </PageHeaderLayout>
    );
  }
}
