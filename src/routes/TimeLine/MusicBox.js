/* eslint-disable react/react-in-jsx-scope */
import React,{ Component } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {host} from "../../services/api";
import { Table ,Divider,Button} from 'antd';
import {routerRedux} from "dva/router";
import styles from './MusicBox.less';
import AddMusic from "./Dialog/AddMusic";
export default class MusicBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
        };
        this.columns = [{
            title: '音乐',
            dataIndex: 'bblog_time',
            key: 'bblog_time',
        },{
            title: '歌手',
            dataIndex: 'bblog_title',
            key: 'bblog_title',
        }, {
            title: '资源',
            dataIndex: 'bblog_sub_title',
            key: 'bblog_sub_title',
        }, {
            title: '封面',
            dataIndex: 'bblog_logo',
            key: 'bblog_logo',
            render: val => <img style={{maxWidth:100,height:'auto'}} src={host+'/'+val}></img>
        }, {
            title: '操作',
            render:this._operationAction,
        }];
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
    handleModalVisible = (flag) => {
        this.setState({
            modalVisible: !!flag,
        });
    }
    _addTimelineOK=(fields)=>{
        this.props.dispatch({
            type: 'blog/addBlog',
            payload:fields
        });
    }
    render() {
        return (
            <PageHeaderLayout >
                <div className={styles.tableListOperator}>
                    <Button icon="plus" type="primary" onClick={() => { this.type = 1; this.record = null; this.handleModalVisible(true); }}>
                        新建
                    </Button>
                </div>
                <Table dataSource={this.props.blogs&&this.props.blogs.data} columns={this.columns} bordered/>
                <AddMusic
                    title = '音乐'
                    handleOK = {this._addTimelineOK}
                    handleModalVisible={this.handleModalVisible}
                    modalVisible={this.state.modalVisible}
                />
            </PageHeaderLayout>
        )
    }
}
