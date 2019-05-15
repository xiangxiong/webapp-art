import React, {PureComponent,Fragment} from 'react';
import {List} from 'antd-mobile'
import './index.scss';
import PublicHeader from '@/components/header'

const Item = List.Item;

export default class Entering extends PureComponent {
    render() {
        return (
            <Fragment>
                <PublicHeader title="合作入住"/>
                <List>
                    <Item arrow="horizontal"  onClick={() => {}}>入住成为合作艺术家</Item>
                    <Item arrow="horizontal" className="art-entering__arts" onClick={() => {}}>入住成为艺术商户商城</Item>
                </List>
            </Fragment>
        )
    }
}