import React, { PureComponent } from 'react';
import {
    Modal,Form, Input, Upload, Button, Icon
} from 'antd';
import {host} from "../../../services/api";
import {Select} from "antd/lib/index";
const FormItem = Form.Item;
const Option = Select.Option;
const initialSource = ``;
@Form.create()
export default class EditBlog extends PureComponent {
    okHandle = () => {
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) return;
            this.props.handleModalVisible();
            this.props.form.resetFields();
            this.props.handleOK(fieldsValue);
        });
    };
    CancelHandle = () => {
        this.props.handleModalVisible();
    };
    onChangeHandle = (data) => {
        if(data&&data.file.response){
            this.props.form.setFieldsValue({
                bblog_logo: host+"/"+data.file.response.data.image_url,
            });
        }
    }
    render(){
        const { modalVisible, data,title,form ,record} = this.props;
        const props2 = {
            action: host+'/api/blog/image',
            listType: 'picture',
            name:'image',
            defaultFileList: record?[{
                    uid: 1,
                    name: record.bblog_logo,
                    status: 'done',
                    url: host+'/'+record.bblog_logo,
                }]: [],
            className: 'upload-list-inline',
            onChange:this.onChangeHandle,
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
                onOk={this.okHandle}
                onCancel={this.CancelHandle}
            >
                <Form>
                    <FormItem
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                        label="标题"
                    >
                        {form.getFieldDecorator('bblog_title', {
                            initialValue: record ? record.bblog_title : null,
                            rules: [{ required: true, message: 'Please select a country' }],
                        })(
                            <Input placeholder="请输入标题"/>
                        )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 15 }}
                        label="分类名称"
                    >
                        {form.getFieldDecorator('bCategory_id', {
                            initialValue:record ? record.blogCategory.bCategory_name : null,
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
                            initialValue: record ? host+'/'+record.bblog_logo : null,
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
                            initialValue: record ? record.bblog_sub_title : null,
                            rules: [{ required: true, message: 'Please input some...' }],
                        })(
                            <Input.TextArea placeholder="请输入副标题"/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}