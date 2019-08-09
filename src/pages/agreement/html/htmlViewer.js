import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import PublicHeader from './../../../components/header';
import ReactDOM from 'react-dom';

export default class HtmlViewer extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            iFrameHeight: '0px'
        }
    }

    render() {
        const {htmlFilePath, title} = this.props.location.state;

        return (
            <Fragment>
                <PublicHeader title={title}/>

                <iframe
                    style={{width: '100%'}}
                    onLoad={() => {
                        const obj = ReactDOM.findDOMNode(this.refs.iframe);
                        console.log(obj, obj.contentDocument.body, obj.contentDocument.body.scrollWidth, obj.contentDocument.body.scrollHeight)
                        this.setState({
                            "iFrameHeight": obj.contentDocument.body.scrollHeight + 'px'
                        });
                    }}
                    ref="iframe"
                    src={htmlFilePath}
                    width="100%"
                    height={this.state.iFrameHeight}
                    scrolling="no"
                    frameBorder="0"/>
            </Fragment>
        )
    }
}
