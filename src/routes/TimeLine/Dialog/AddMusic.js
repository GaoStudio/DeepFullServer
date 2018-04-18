import React, { PureComponent } from 'react';
import {
    Modal,Form, Input, Upload, Button, Icon,Row,Col
} from 'antd';
import {host} from "../../../services/api";
const FormItem = Form.Item;
@Form.create()
export default class AddMusic extends PureComponent {
    onImageChangeHandle = (data) => {
        if(data&&data.file.response){
            console.log(data.file.response)
            this.props.form.setFieldsValue({
                music_logo: host+"/"+data.file.response.data,
            });
        }
    }
    onMusicChangeHandle = (data) => {
        if(data&&data.file.response){
            console.log(data.file.response)
            this.props.form.setFieldsValue({
                music_src: host+"/"+data.file.response.data,
            });
        }
    }
    CancelHandle = () => {
        this.props.handleModalVisible();
    };
    okHandle = () => {
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) return;
            this.props.handleModalVisible();
            this.props.form.resetFields();
            this.props.handleOK(fieldsValue);
        });
    };
    render(){
        const imageProps = {
            action: host+'/api/time/image',
            listType: 'picture',
            name:'image',
            className: 'upload-list-inline',
            onChange:this.onImageChangeHandle,
        };
        const musicProps = {
            action: host+'/api/time/music',
            listType: 'text',
            name:'music',
            className: 'upload-list-inline',
            onChange:this.onMusicChangeHandle,
        };
        const {form,title,modalVisible} = this.props;
        return (
            <Modal
                title={title}
                onOk={this.okHandle}
                onCancel={this.CancelHandle}
                visible={modalVisible}>
                <FormItem
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 15 }}
                    label="歌名">
                    {form.getFieldDecorator('music_name', {rules: [{required: false,}],})(
                        <Input placeholder="歌名" />
                    )}
                </FormItem>
                <FormItem
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 15 }}
                    label="歌手">
                    {form.getFieldDecorator('music_star', {rules: [{required: false,}],})(
                        <Input placeholder="歌手" />
                    )}
                </FormItem>
                <FormItem
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 15 }}
                    label="图片">
                    {form.getFieldDecorator('music_logo', {
                        rules: [{ required: true, message: '请输入路径' }],
                    })(
                        <Input placeholder="请输入网络链接" />
                    )}
                    <Upload {...imageProps}>
                        <Button>
                            <Icon type="upload" /> upload
                        </Button>
                    </Upload>
                </FormItem>
                <FormItem
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 15 }}
                    label="歌曲">
                    {form.getFieldDecorator('music_src', {
                        rules: [{ required: true, message: '请输入路径' }],
                    })(
                        <Input placeholder="请输入网络链接" />
                    )}
                    <Upload {...musicProps}>
                        <Button>
                            <Icon type="upload" /> upload
                        </Button>
                    </Upload>
                </FormItem>
            </Modal>
        );
    }
}