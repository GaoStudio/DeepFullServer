import React, { PureComponent } from 'react';
import {
    Modal,Form, Input, Upload, Button, Icon,Row,Col
} from 'antd';
import {host} from "../../../services/api";
const FormItem = Form.Item;
@Form.create()
export default class UploadImage extends PureComponent {
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
        console.log(modalVisible)
        return (
            <Modal
                title={title}
                onOk={this.okHandle}
                onCancel={this.CancelHandle}
                visible={modalVisible}>
                <FormItem
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 15 }}
                    label="图片地址">
                    {form.getFieldDecorator('image_url', {
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
                    label="替代文本ALT">
                    {form.getFieldDecorator('image_alt', {rules: [{required: false,}],})(
                        <Input placeholder="替代文本" />
                    )}
                </FormItem>
                <FormItem
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 15 }}
                    label="宽高">
                    <Row gutter={8}>
                        <Col span={12}>
                            {form.getFieldDecorator('image_width', {
                                rules: [{ required: false}],
                            })(
                                <Input placeholder="宽度" />
                            )}
                        </Col>
                        <Col span={12}>
                            {form.getFieldDecorator('image_height', {
                                rules: [{ required: false}],
                            })(
                                <Input placeholder="高度" />
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 15 }}
                    label="点击链接">
                    {form.getFieldDecorator('image_link', {
                        rules: [{
                            required: false,
                        }],
                    })(
                        <Input placeholder="链接" />
                    )}
                </FormItem>
            </Modal>
        );
    }
}