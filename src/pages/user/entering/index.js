import React, {PureComponent,Fragment} from 'react';
import {List} from 'antd-mobile'
import './index.scss';
import PublicHeader from '@/components/header'
import history from '@/utils/history';

const Item = List.Item;

export default class Entering extends PureComponent {
    constructor(props){
        super(props);
        this.handleCreateArt = this.handleCreateArt.bind(this);
        this.handleCreateShop = this.handleCreateShop.bind(this);
    }
    
    handleCreateArt(){
        history.push('/application',{ type:'art'});
    }

    handleCreateShop(){
        history.push('/application',{ type:'shop'});
    }

    render() {
        return (
            <Fragment>
                <PublicHeader title="合作入住"/>
                <List>
                    <Item arrow="horizontal" extra="审核中"  onClick={this.handleCreateArt}>入住成为合作艺术家</Item>
                    <Item arrow="horizontal" extra="审核中"  className="art-entering__arts" onClick={this.handleCreateShop}>入住成为艺术商户商城</Item>
                </List>
            </Fragment>
        )
    }
}