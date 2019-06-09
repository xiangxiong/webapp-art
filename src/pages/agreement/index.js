import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import PublicHeader from './../../components/header';
import {artist, store} from './data';

export default class Agreement extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const {CustomerType} = this.props.location.state;

        let code = '';
        if (CustomerType == 1) {
            //艺术家
            code = artist;
        } else if (CustomerType == 2) {
            // 商家
            code = store
        }
        
        return (
            <Fragment>
                <PublicHeader jump="User" title="协议规则"/>
                <div dangerouslySetInnerHTML={{__html: code}}></div>
            </Fragment>
        )
    }
}
