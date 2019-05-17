import React, {PureComponent, Fragment, useState} from 'react';
import {List, InputItem, Radio, Button, ActionSheet} from 'antd-mobile';
import './index.scss';
import PublicHeader from './../../../components/header'
import {ImagePicker} from 'antd-mobile';
import classNames from 'classnames';
import history from './../../../utils/history';
import {getCreateIntertionalPartener, getQueryCategoryList} from "../store/actionCreators";
import connect from "react-redux/es/connect/connect";

const data = [];

const handleUpload = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
        files,
    });
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

    handleCategory = () => {
        let {userCategoryList} = this.props;

        let BUTTONS = userCategoryList.map(userCategory => {
            return userCategory.CategoryName
        });

        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                destructiveButtonIndex: BUTTONS.length - 2,
                message: '从事品类',
                maskClosable: true,
                'data-seed': 'logId',
            },
            (buttonIndex) => {
                let userCategory = userCategoryList[buttonIndex];
                this.setState({CategoryId: userCategory.CategoryId, CategoryName: userCategory.CategoryName});
            });
    };

    handleChange(files, type, index) {
        this.setState({
            files,
        });
    }

    handleSubmit() {
        history.push('/pend');
        const {type, Provider, Phone, isAgreement, CategoryId, files} = this.state;
        const {ShippingAddress = "huhu", ShippingContactWith = "sdf"} = this.props;

        if (!isAgreement) {
            return
        }

        let params = {};

        params.Token = '1180036515879212';
        params.CustomerId = '124';

        if (type === "art") {
            params.CooperationWay = '1';
        } else {
            params.CooperationWay = '2';
        }

        params.CategoryId = CategoryId;
        params.Phone = Phone;
        params.Provider = Provider;
        params.AddDetail = ShippingAddress;
        params.Linkman = ShippingContactWith;
        params.BussinesImage = files[0].url;
        params.IdentityImage1 = files[0].url;
        params.IdentityImage2 = files[0].url;
        params.LogoImage = files[0].url;

        this.props.getCreateIntertionalPartener(params);
    }

    UploadImage = (files, pickers, type) => {
        let itemClass = classNames({
            'art-application__upload-item': type !== 'art',
            'art-application__upload-art-item': type === 'art'
        });

        return (
            pickers.map(picker => (
                <div className={itemClass} key={picker.title}>
                    <ImagePicker
                        files={files}
                        onChange={this.handleChange}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={files.length < 7}
                        multiple={true}
                    />
                    <h4 className="art-application__upload-desc"> {picker.title}  </h4>
                </div>
            ))
        )
    };

    RenderShopForm = (props) => {
        let {CategoryName} = this.state;

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
                    value={CategoryName}
                    editable={false}
                    onClick={() => this.handleCategory()}
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
                    editable={false}
                    extra=">"
                    onClick={() => history.push('')}
                >联系地址</InputItem>
            </List>
        )
    }

    RenderArtForm = (props) => {
        let {CategoryName} = this.state;

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
                    value={CategoryName}
                    editable={false}
                    onClick={() => this.handleCategory()}
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
                    extra=">"
                    editable={false}
                    onClick={() => history.push('')}
                >联系地址</InputItem>
            </List>
        )
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

                <ImagePicker
                    files={files}
                    onChange={this.handleChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 7}
                    multiple={false}
                />

                <div className={uploadPanel}>
                    {
                        //this.UploadImage(files, pickers, type)
                    }
                </div>
                <div className="art-application__form">
                    {
                        type === "art" ? this.RenderArtForm() : this.RenderShopForm()
                    }
                    <div className="art-application__form-agree">
                        <Radio className="my-radio"
                               onChange={e => {
                                   this.setState({isAgreement: e.target.checked})
                               }}
                        >我已同意并同意遵守合作条款</Radio>
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


    componentDidMount() {
        this.props.getQueryCategoryList({IsOnlyOneCategory: 1});
    }
}

const mapStateToProps = ({user}) => {
    return {
        userCategoryList: user.userCategoryList,
    }
};

const mapDispatchToProps = dispatch => ({
    getCreateIntertionalPartener: (params) => {
        dispatch(getCreateIntertionalPartener(params))
    },

    getQueryCategoryList: (params) => {
        dispatch(getQueryCategoryList(params))
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(Application);