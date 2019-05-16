import React, {PureComponent, Fragment, useState} from 'react';
import {List, InputItem, Radio, Button} from 'antd-mobile';
import './index.scss';
import PublicHeader from '@/components/header'
import {ImagePicker} from 'antd-mobile';
import classNames from 'classnames';
import history from '@/utils/history';
import {getCreateIntertionalPartener} from "../store/actionCreators";
import connect from "react-redux/es/connect/connect";

const data = [];

const handleUpload = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
        files,
    });
}

const UploadImage = (files, pickers, type) => {

    let itemClass = classNames({
        'art-application__upload-item': type !== 'art',
        'art-application__upload-art-item': type === 'art'
    })

    return (
        pickers.map(picker => (
            <div className={itemClass} key={picker.title}>
                <ImagePicker
                    files={files}
                    onChange={this.handleChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 7}
                    multiple={false}
                />
                <h4 className="art-application__upload-desc"> {picker.title}  </h4>
            </div>
        ))
    )
}

const RenderShopForm = (props) => {
    return (
        <List>
            <InputItem
                clear
                placeholder="请输入真实姓名"
                onChange={(v) => {
                    this.setState({Provider: v})
                }}
            >商户名称</InputItem>
            <InputItem
                clear
                placeholder="请输入从事品类"
                ref={el => this.inputRef = el}
            >从事品类</InputItem>

            <InputItem
                clear
                placeholder="请输入联系电话"
                onChange={(v) => {
                    this.setState({Phone: v})
                }}
            >联系电话</InputItem>

            <InputItem
                clear
                placeholder="请选择联系地址"
                ref={el => this.inputRef = el}
            >联系地址</InputItem>

            <InputItem
                clear
                placeholder="请输入(0-30字)"
                ref={el => this.inputRef = el}
            >商户简介</InputItem>
        </List>
    )
}

const RenderArtForm = (props) => {
    return (
        <List>
            <InputItem
                clear
                placeholder="请输入真实姓名"
                onChange={(v) => {
                    this.setState({Provider: v})
                }}
            >姓名</InputItem>
            <InputItem
                clear
                placeholder="请输入从事品类"
                ref={el => this.inputRef = el}
            >从事品类</InputItem>

            <InputItem
                clear
                placeholder="请输入联系电话"
                onChange={(v) => {
                    this.setState({Phone: v})
                }}
            >联系电话</InputItem>

            <InputItem
                clear
                placeholder="请选择联系地址"
                ref={el => this.inputRef = el}
            >联系地址</InputItem>

            <InputItem
                clear
                placeholder="请输入(0-30字)"
                ref={el => this.inputRef = el}
            >个人简介</InputItem>
        </List>
    )
}

const shopsTitle = [
    {title: '上传商户logo'},
    {title: '上传营业执照'},
    {title: '上传身份证正面照'},
    {title: '上传身份证反面照'}
];

const artsTitle = [
    {title: '上传头像照'},
    {title: '上传身份证正面照'},
    {title: '上传身份证反面照'}
]


class Application extends PureComponent {
    constructor(props) {
        super(props);
        console.log('this.shop', this.props.location.state.type);
        this.init();
    }

    init() {
        this.initState();
        this.initEvent();
    }

    initState() {
        this.state = {
            type: this.props.location.state.type,
            files: data
        };
    }

    initEvent() {
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange() {
    }

    handleSubmit() {
        const {type, Provider, Phone} = this.state;

        let params = {};

        params.Token = '';
        params.CustomerId = '';

        if (type === "art") {
            params.CooperationWay = '1';
        } else {
            params.CooperationWay = '2';
        }

        params.CategoryId = '';
        params.Phone = Phone;
        params.Provider = Provider;
        params.AddDetail = '';
        params.Linkman = '';
        params.BussinesImage = '';
        params.IdentityImage1 = '';
        params.IdentityImage2 = '';
        params.LogoImage = '';

        this.props.getCreateIntertionalPartener(params);
    }

    render() {
        const {type, files} = this.state;
        const title = type === "art" ? "入住成为合作艺术家" : "入住成为艺术商城商户",
            pickers = type === "art" ? artsTitle : shopsTitle;
        let uploadPanel = classNames('art-application__upload', {
            'art-application__art-panel': type === "art"
        });

        return (
            <div className="art-application">
                <PublicHeader title={title}/>
                <div className={uploadPanel}>
                    {
                        UploadImage(files, pickers, type)
                    }
                </div>
                <div className="art-application__form">
                    {
                        type === "art" ? RenderArtForm() : RenderShopForm()
                    }
                    <div className="art-application__form-agree">
                        <Radio className="my-radio" onChange={e => console.log('checkbox', e)}>我已同意并同意遵守合作条款</Radio>
                    </div>
                    <div className="art-application__action">
                        <Button onClick={this.handleSubmit}>提交</Button>
                    </div>
                    <div className="art-application__form-rule">
                        <h3>温馨提示:</h3>
                        <p>
                            1. 请正确填写联系人和手机号，便于及时沟通； <br/>
                            2. 申请认证审核周期一般为2-3个工作日； <br/>
                            3. 通过认证后，可在合作入驻页面查看确认信息。
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = dispatch => ({
    getCreateIntertionalPartener: (params) => {
        dispatch(getCreateIntertionalPartener(params))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);