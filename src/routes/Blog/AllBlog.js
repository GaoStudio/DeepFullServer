/* eslint-disable react/react-in-jsx-scope */
import { Component } from 'react';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const initialSource = `
# Live demo
Changes are automatically rendered as you type.
* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!
## HTML block below
`
export default class AllBlog extends Component {
  render() {
    return (
      <PageHeaderLayout >
        <div>
        </div>
      </PageHeaderLayout>);
  }
}
