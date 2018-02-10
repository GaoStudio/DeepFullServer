/* eslint-disable react/react-in-jsx-scope */
import { Component } from 'react';
import CodeMirror from 'react-codemirror';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Divider } from 'antd';
import styles from './AddBlog.less';

require('codemirror/mode/markdown/markdown');
require('codemirror/lib/codemirror.css');

const initialSource = `# Live demo
Changes are automatically rendered as you type.
* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!
## HTML block below
`;
export default class AddBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: initialSource,
    };
  }
  updateCode=(newData) => {
    this.setState({
      data: newData,
    });
  }
  render() {
    return (
      <PageHeaderLayout>
        <div className={styles.container}>
          <div className={styles.content}>
              <div className={styles.pagename}>
                  <input type='text' />
              </div>
              <ul className={styles.controller}>
                  <li><a> <img src={require('../../assets/cimage.png')} alt="not found" /></a></li>
                  <li><a>图片</a></li>
              </ul>
              <CodeMirror options={{ mode: 'markdown' }} onChange={this.updateCode} autoFocus value={this.state.data} />
          </div>
          <div className={styles.spliter} />
          <div className={styles.spliter} />
          <div style={{ flex: 1 }}>
             view
          </div>
        </div>
      </PageHeaderLayout>
    );
  }
}
