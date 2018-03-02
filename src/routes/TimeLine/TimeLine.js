/* eslint-disable react/react-in-jsx-scope */
import React,{ Component } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {host} from "../../services/api";
import { Table ,Divider,Menu,Dropdown} from 'antd';
import {routerRedux} from "dva/router";

import {connect} from "dva";
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
        }, {
            title: '视频',
            dataIndex: 'timeline_video',
            key: 'timeline_video',
            render: val => <img style={{maxWidth:100,height:'auto'}} src={host+'/'+val}></img>
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
        return(
            <div>
                {music.music_name}
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
    render() {
        return (
            <PageHeaderLayout >
                <Table dataSource={this.props.timelines} columns={this.columns} bordered/>
            </PageHeaderLayout>
        )
    }
}
