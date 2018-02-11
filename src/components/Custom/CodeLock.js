import React, {Component} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { agate } from 'react-syntax-highlighter/styles/hljs';
export default class CodeBlock extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <SyntaxHighlighter language={this.props.language} style={agate}>{this.props.value}</SyntaxHighlighter>;
    }
}
