/* eslint-disable react/react-in-jsx-scope */
import { Component } from 'react';
import { connect } from 'dva';
import { Table, Divider, Form, Modal, Input, message, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './BlogCategory.less';

const FormItem = Form.Item;

const CreateForm = Form.create()((props) => {
  const { modalVisible, form, handleOK, handleModalVisible, type, record } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleOK(fieldsValue);
    });
  };
  const CancelHandle = () => {
    form.resetFields();
    handleModalVisible();
  };
  return (
    <Modal
      title={type == 1 ? '新建' : '修改'}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={CancelHandle}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="分类名称"
      >
        {form.getFieldDecorator('bCategory_name', {
          initialValue: record ? record.bCategory_name : null,
          rules: [{ required: true, message: '请输入分类名称' }],
        })(
          <Input placeholder="请输入分类名称" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="路径"
      >
        {form.getFieldDecorator('bCategory_path', {
          initialValue: record ? record.bCategory_path : null,
          rules: [{ required: true, message: '请输入路径' }],
        })(
          <Input placeholder="请输入路径" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="Sort"
      >
        {form.getFieldDecorator('bCategory_sort', {
          initialValue: record ? record.bCategory_sort : 1000,
          rules: [{ required: true, message: 'Please input some...' }],
        })(
          <Input type="number" />
        )}
      </FormItem>
    </Modal>
  );
});

@connect(({ blog }) => {
  return (
    {
      blogCategorys: blog.blogCategorys,
    }
  );
})
export default class BlogCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.columns = [{
      title: '分类名称',
      dataIndex: 'bCategory_name',
      key: 'bCategory_name',
    }, {
      title: '路径',
      dataIndex: 'bCategory_path',
      key: 'bCategory_path',
    }, {
      title: '排序',
      dataIndex: 'bCategory_sort',
      key: 'bCategory_sort',
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: this._operationAction,
    }];
    this.type = 1;
    this.record = null;
  }

  componentDidMount() {
    this.props.dispatch({
        type: 'blog/blogCategorys',
    });
  }
  _operationAction=(text, record) => {
    return (
      <span>
        <a onClick={() => { this.type = 2, this.record = record, this.handleModalVisible(true); }}>修改</a>
        <Divider type="vertical" />
        <a href="#">禁用</a>
        <Divider type="vertical" />
        <a href="#">文章</a>
      </span>
    );
  }
  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }
  handleOK = (fields) => {
    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  }
  render() {
    const parentMethods = {
      handleOK: this.handleOK,
      handleModalVisible: this.handleModalVisible,
      type: this.type,
      record: this.record,
    };
    return (
      <PageHeaderLayout >
        <div className={styles.standardList} >
          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary" onClick={() => { this.type = 1; this.record = null; this.handleModalVisible(true); }}>
              新建
            </Button>
          </div>
          <Table rowKey="bCategory_id" columns={this.columns} pagination={false} dataSource={this.props.blogCategorys&&this.props.blogCategorys.data} bordered />
        </div>
        <CreateForm
          {...parentMethods}
          modalVisible={this.state.modalVisible}
        />
      </PageHeaderLayout>);
  }
}
