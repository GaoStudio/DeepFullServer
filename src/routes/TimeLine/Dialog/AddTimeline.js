import React, { PureComponent } from 'react';
import {
    Modal,Form, Input, Upload, Button, Icon,Row,Col
} from 'antd';
import {host} from "../../../services/api";
const FormItem = Form.Item;
@Form.create()
export default class AddTimeline extends PureComponent {
    onChangeHandle = (data) => {
        if(data&&data.file.response){
            console.log(data.file.response)
            this.props.form.setFieldsValue({
                image_url: host+"/"+data.file.response.data.image_url,
                image_width:data.file.response.data.width,
                image_height:data.file.response.data.height,
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
        const props2 = {
            action: host+'/api/blog/image',
            listType: 'picture',
            name:'image',
            className: 'upload-list-inline',
            onChange:this.onChangeHandle,
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
                    label="内容">
                    {form.getFieldDecorator('timeline_content', {rules: [{required: false,}],})(
                        <Input placeholder="内容" />
                    )}
                </FormItem>
                <FormItem
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 15 }}
                    label="图片">
                    <Upload {...props2}>
                        <Button>
                            <Icon type="upload" /> upload
                        </Button>
                    </Upload>
                </FormItem>

                <FormItem
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 15 }}
                    label="地址 ">
                    {form.getFieldDecorator('timeline_address', {rules: [{required: false,}],})(
                        <Input placeholder="地址" />
                    )}
                </FormItem>
            </Modal>
        );
    }
}