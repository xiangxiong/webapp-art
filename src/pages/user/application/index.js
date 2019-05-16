import React, {PureComponent,Fragment} from 'react';
import {List} from 'antd-mobile'
import './index.scss';
import PublicHeader from '@/components/header'
import { ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile';

const Item = List.Item;

const data = [
];

export default class Application extends PureComponent {
    constructor(props){
        super(props);
        console.log('this.shop',this.props.location.state.type);
        this.state = {
            type:this.props.location.state.type,
            files: data
        }
    }

    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
          files,
        });
    }
    
    render(){
        const {type,files} = this.state;
        const title = type === "art" ? "入住成为合作艺术家" : "入住成为艺术商城商户";

        return (
            <Fragment>
                <PublicHeader title={title}/>
                <ImagePicker
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length <= 1}
                    accept="image/gif,image/jpeg,image/jpg,image/png"
                />
            </Fragment>
        )
    }
}