/* eslint-disable react/react-in-jsx-scope */
import { Component } from 'react';
import CodeMirror from 'react-codemirror';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Divider , Select,Form, Modal, Input, Upload,Icon,Spin,message, Button} from 'antd';
import Markdown from 'react-markdown'
const FormItem = Form.Item;
const Option = Select.Option;
import CodeBlock from '../../components/Custom/CodeLock'
require('codemirror/mode/markdown/markdown');
require('codemirror/lib/codemirror.css');
import styles from './AddBlog.less';
import { host } from '../../services/api';
import {connect} from "dva";
const initialSource = ``;
const AddBlogForm = Form.create()((props) => {
    const { modalVisible, data,title,form, handleOK, handleModalVisible} = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            handleModalVisible();
            form.resetFields();
            handleOK(fieldsValue);
        });
    };
    const CancelHandle = () => {
        handleModalVisible();
    };
    const onChangeHandle = (data) => {
        if(data&&data.file.response){
            form.setFieldsValue({
                bblog_logo: host+"/"+data.file.response.data,
            });
        }
    }
    const props2 = {
        action: host+'/api/blog/image',
        listType: 'picture',
        name:'image',
        className: 'upload-list-inline',
        onChange:onChangeHandle,
    };
    const children = [];
    if(data){
        for (let i = 0; i < data.length; i++) {
            children.push(<Option key={data[i].bCategory_id}>{data[i].bCategory_name}</Option>);
        }
    }
    return (
        <Modal
            title={title}
            visible={modalVisible}
            onOk={okHandle}
            onCancel={CancelHandle}
        >
            <Form>
            <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="分类名称"
            >
                {form.getFieldDecorator('bCategory_id', {
                    rules: [{ required: true, message: 'Please select a country' }],
                })(
                    <Select  placeholder="Please select a country">
                        {children}
                    </Select>
                )}
            </FormItem>
            <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="封面大图"
            >
                {form.getFieldDecorator('bblog_logo', {
                    rules: [{ required: true, message: '请输入路径' }],
                })(
                        <Input placeholder="请输入网络链接" />
                )}
                <Upload {...props2}>
                    <Button>
                        <Icon type="upload" /> upload
                    </Button>
                </Upload>
            </FormItem>
            <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="副标题"
            >
                {form.getFieldDecorator('bblog_sub_title', {
                    rules: [{ required: true, message: 'Please input some...' }],
                })(
                    <Input.TextArea placeholder="请输入副标题"/>
                )}
            </FormItem>
            </Form>
        </Modal>
    );
});

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
        }
    );
})
export default class AddBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
        blog:this.props.blog,
        blogTitle:'测试数据',
        blogData: initialSource,
        htmlMode: 'raw',
        fullScreen:false,
        addBlogVisible:false
    };
  }
  componentDidMount() {
     console.log(this.props.blogCategorys)
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
            <AddBlogForm
                title = {this.state.blogTitle}
                data = {this.props.blogCategorys&&this.props.blogCategorys.data}
                handleOK = {this._addBlogOK}
                handleModalVisible={this._handleBlogOKVisible}
                modalVisible={this.state.addBlogVisible}/>
          </PageHeaderLayout>
      );
  }
}
