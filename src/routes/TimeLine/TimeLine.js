/* eslint-disable react/react-in-jsx-scope */
import React,{ Component } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {host} from "../../services/api";
import { Table ,Divider,Menu,Dropdown,Button} from 'antd';
import {routerRedux} from "dva/router";
import styles from './TimeLine.less';
import {connect} from "dva";
import MusicPlayer from "../../components/Custom/MusicPlayer";
import AddTimeline from "./Dialog/AddTimeline";
@connect(({ timeline }) => {
    console.log(timeline)
    return (
        {
            timelines: timeline.timelines,
        }
    );
})
export default class TimeLine extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
        };
        this.columns = [{
            title: '时间',
            dataIndex: 'timeline_time',
            key: 'timeline_time',
        },{
            title: '内容',
            dataIndex: 'timeline_content',
            key: 'timeline_content',
        }, {
            title: '图片',
            dataIndex: 'timeline_images',
            key: 'timeline_images',
            render: val => <img style={{maxWidth:100,height:'auto'}} src={host+'/'+val}></img>
        }, {
            title: '视频',
            dataIndex: 'timeline_video',
            key: 'timeline_video',
        }, {
            title: '音乐',
            dataIndex: 'timeMusic',
            key: 'timeMusic',
            render: val =>{
                let menu = this._operationMusic(val);
                return(
                    <Dropdown overlay={menu} placement="topCenter">
                        <span>{val.music_name}</span>
                    </Dropdown>)
                }
        }, {
            title: '地点',
            dataIndex: 'timeline_address',
            key: 'timeline_address',
        }, {
            title: '操作',
            render:this._operationAction,
        }];
    }
    componentDidMount() {
        //if(!this.props.timelines){
            this.props.dispatch({
                type: 'timeline/selectTimeline',
            });
        //}
    }
    _operationMusic = (music)=>{
        console.log(music)
        return(
            <div style={{width:300,backgroundColor:'#fff',padding:10}}>
                <MusicPlayer data={music}/>
            </div>
        )
    }
    _operationAction=(text, record) => {
        return (
            <span>
              <a onClick={() => { this.type = 2, this.record = record, this._handleEditBlogVisible(true); }}>修改</a>
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
                <Table dataSource={this.props.timelines} columns={this.columns} bordered/>
                <AddTimeline
                    title = '新增timeline'
                    handleOK = {this._addTimelineOK}
                    handleModalVisible={this.handleModalVisible}
                    modalVisible={this.state.modalVisible}
                />
            </PageHeaderLayout>
        )
    }
}
