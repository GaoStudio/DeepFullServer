/* eslint-disable react/react-in-jsx-scope */
import { Component } from 'react';
import { connect } from 'dva';
import { Table, Divider } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './BlogCategory.less';


@connect(({ blog, loading }) => {
  console.log(loading);
  return (
    {
      blogCategorys: blog.blogCategorys,
      loading: loading && loading.models.list,
    }
  );
})
export default class BlogCategory extends Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '分类',
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
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'blog/blogCategorys',
    });
  }
  _operationAction=(text, record) => {
    return (
      <span>
        <a href="#">修改</a>
        <Divider type="vertical" />
        <a href="#">禁用</a>
        <Divider type="vertical" />
        <a href="#">文章</a>
      </span>
    );
  }
  render() {
    return (
      <PageHeaderLayout >
        <div className={styles.standardList} >
          <Table loading={this.props.loading} columns={this.columns} pagination={false} dataSource={this.props.blogCategorys.data} bordered />
        </div>
      </PageHeaderLayout>);
  }
}
