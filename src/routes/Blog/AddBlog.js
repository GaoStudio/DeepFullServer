/* eslint-disable react/react-in-jsx-scope */
import { Component } from 'react';
import CodeMirror from 'react-codemirror';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Icon,Spin,message} from 'antd';
import Markdown from 'react-markdown'
import UploadImage from './Dialog/UploadImage'

import CodeBlock from '../../components/Custom/CodeLock'
require('codemirror/mode/markdown/markdown');
require('codemirror/lib/codemirror.css');
import styles from './AddBlog.less';
import {connect} from "dva";
import SaveBlog from "./Dialog/SaveBlog";
import React from "react";
const initialSource = ``;
const fullScreenStyle={
    position:'absolute',
    top:0,
    right:0,
    left:0,
    bottom:0,
    height: '100%',
}
const antIcon = <Icon type="loading" style={{ fontSize: 12 ,marginRight:5,paddingBottom:5,color:'#595959'}} spin />;
@connect(({ blog }) => {
    return (
        {
            blogCategorys: blog.blogCategorys,
            saveBlogStats: blog.saveBlogStats,
            blogDetail:blog.blogDetail,
        }
    );
})
export default class AddBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
        blogBasic:this.props.location.state&&this.props.location.state.data,
        blogDetail:null,
        blogTitle:this.props.location.state?this.props.location.state.data.bblog_title:'测试数据',
        blogData: initialSource,
        htmlMode: 'raw',
        fullScreen:false,
        addBlogVisible:false,
        uploadImageVisible:false
    };
  }
  componentWillReceiveProps(nextProps){
      console.log(nextProps)
      if (nextProps.blogDetail!=this.props.blogDetail) {
          this.setState({
              blogDetail: nextProps.blogDetail,
              blogData:nextProps.blogDetail.blog_content
          });
      }
  }
  componentDidMount() {
      if(this.props.location.state){
          this.props.dispatch({
              type: 'blog/selectBlog',
              payload:{blogid:this.props.location.state.data.bblog_id},
          });
      }
      if(this.props.blogCategorys){
          this.props.dispatch({
              type: 'blog/blogCategorys',
          });
      }
  }
  updateState=(newData) => {
      this.setState({
          blogData: newData,
      });
  }
  updateTitle=()=>{
      this.setState({
          blogTitle:this.refs.blogTitle.value
      })
  }
  _insertPageImage=()=>{
      this._handleUpImageVisible(true)
  }
  _savePageContent=()=>{
    if(!this.state.blogTitle){
        message.warn('请输入标题')
        return
    }
    if(this.state.blog){

    }else {
        this._handleBlogOKVisible(true)
    }
  }
  _addBlogOK=(fields)=>{
      console.log(fields)
      fields.blog_content = this.state.blogData;
      fields.bblog_title = this.state.blogTitle;
      this.props.dispatch({
          type: 'blog/addBlog',
          payload:fields
      });
  }
  _addImageOK = (fields) =>{
      let image = '<img src="'+fields.image_url+'" width = "'+fields.image_width+'" height = "'+fields.image_height+'" alt="'+fields.image_alt+'" />'
      //image = image+'{:height='+'"'+fields.image_height+'px"'+' width='+'"'+fields.image_width+'px"}'
      this.updateState(this.state.blogData+image);
  }
  _handleUpImageVisible = (flag)=>{
      this.setState({
          uploadImageVisible: !!flag,
      });
  }
  _handleBlogOKVisible = (flag) => {
      this.setState({
          addBlogVisible: !!flag,
      });
  }
  _publicPageContent=()=>{

  }
  _openFullscreen=()=>{
      this.setState({
          fullScreen:!this.state.fullScreen
      })
  }

  render() {
      return (
          <PageHeaderLayout>
            <div className={styles.container} style={this.state.fullScreen?fullScreenStyle:null}>
              <div className={styles.content}>
                  <div className={styles.pagename}>
                      <input type='text' ref="blogTitle" value={this.state.blogTitle} onChange={this.updateTitle}/>
                  </div>
                  <ul className={styles.controller}>
                      <li onClick={this._insertPageImage} ><a><span className={styles.c1}></span></a></li>
                      <li><a><span className={styles.c5}></span></a></li>
                      <li><a><span className={styles.c6}></span></a></li>
                      <li onClick={this._publicPageContent} className={styles.floatRight}><a><span className={styles.c3}></span><text>发布更新</text></a></li>
                      <li onClick={this._savePageContent} className={styles.floatRight}><a className={styles}>{this.state.saveBlogStats?<Spin indicator={antIcon} />:null}<span className={styles.c2}></span></a></li>
                      <li onClick={this._openFullscreen}  className={styles.floatRight}><a className={styles}><span className={styles.c4}></span></a></li>
                  </ul>
                  <div className={styles.editor}>
                      <CodeMirror className={styles.CodeMirror}  options={{ mode: 'markdown' }} onChange={this.updateState} autoFocus value={this.state.blogData} />
                  </div>
              </div>
              <div className={styles.spliter} style={this.state.fullScreen?{height:'100%'}:null}/>
              <div style={{width: '50%', height: '100%',overflow:scroll}}>
                  <Markdown
                      className={styles.result}
                      source={this.state.blogData}
                      skipHtml={this.state.htmlMode === 'skip'}
                      escapeHtml={this.state.htmlMode === 'escape'}
                      renderers={{code: CodeBlock}}
                  />
              </div>
            </div>
            <SaveBlog
                title = {this.state.blogTitle}
                data = {this.props.blogCategorys&&this.props.blogCategorys.data}
                handleOK = {this._addBlogOK}
                handleModalVisible={this._handleBlogOKVisible}
                modalVisible={this.state.addBlogVisible}/>
            <UploadImage
                title = '插入图片'
                handleModalVisible={this._handleUpImageVisible}
                handleOK = {this._addImageOK}
                modalVisible={this.state.uploadImageVisible}/>
          </PageHeaderLayout>
      );
  }
}
