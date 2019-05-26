import React, {PureComponent, Fragment, useState} from 'react';
import {List, InputItem, Checkbox, Button, ActionSheet, Toast} from 'antd-mobile';
import './index.scss';
import PublicHeader from './../../../components/header'
import {ImagePicker} from 'antd-mobile';
import classNames from 'classnames';
import history from './../../../utils/history';
import {getCreateIntertionalPartener, getQueryCategoryList} from "../store/actionCreators";
import connect from "react-redux/es/connect/connect";
import _ from 'lodash';
import Space from '../../common/space';

const AgreeItem = Checkbox.AgreeItem;
const data = [];

const handleUpload = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
        files,
    });
}

const shopsTitle = [
    {title: '上传商户logo'},
    {title: '上传身份证正面照'},
    {title: '上传身份证反面照'},
];

const artsTitle = [
    {title: '上传头像照'},
    {title: '上传身份证正面照'},
    {title: '上传身份证反面照'}
];

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
        const {buttonIndex} = this.state;

        let BUTTONS = userCategoryList.map(userCategory => {
            return userCategory.CategoryName
        });

        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length,
                destructiveButtonIndex: buttonIndex,
                message: '从事品类',
                maskClosable: true,
                'data-seed': 'logId',
            },
            (buttonIndex) => {
                let userCategory = userCategoryList[buttonIndex];
                if (!_.isEmpty(userCategory)) {
                    this.setState({
                        CategoryId: userCategory.CategoryId,
                        CategoryName: userCategory.CategoryName,
                        buttonIndex
                    });
                }
            });
    };

    handleChange(files, type, index) {
        this.setState({
            files,
        });
    }

    handleSubmit() {
        const {type, Provider, Phone, isAgreement, CategoryId, CategoryName, files=[], AddDetail} = this.state;

        if (!isAgreement) {
            Toast.info('请同意协议', 1);
            return
        }
        if (_.isEmpty(Provider)) {
            Toast.info('请输入真实姓名', 1);
            return;
        }
        if (_.isEmpty(CategoryName)) {
            Toast.info('请选择从事品类', 1);
            return;
        }
        if (_.isEmpty(Phone)) {
            Toast.info('请输入联系电话', 1);
            return;
        }
        if (_.isEmpty(AddDetail)) {
            Toast.info('请输入联系地址', 1);
            return;
        }

        if (type === "art") {
            if (files.length < 3) {
                Toast.info('请上传图片', 1);
                return;
            }
        } else {
            if (files.length < 4) {
                Toast.info('请上传图片', 1);
                return;
            }
        }

        let params = {};

        let storage = Storage.Base.getInstance();
        params.Token = storage.get('userInfo').Token;
        params.CustomerId = storage.get('userInfo').CustomerId;

        if (type === "art") {
            params.CooperationWay = '1';
        } else {
            params.CooperationWay = '2';
        }

        params.CategoryId = CategoryId;
        params.Phone = Phone;
        params.Provider = Provider;
        params.AddDetail = AddDetail;
        params.Linkman = Provider;
        if (type === "art") {
            params.BussinesImageData = 0;
        } else {
            params.BussinesImageData = encodeURIComponent(files[3][0].url.split(',')[1]);
        }
        params.IdentityImage1Data = encodeURIComponent(files[1][0].url.split(',')[1]);
        params.IdentityImage2Data = encodeURIComponent(files[2][0].url.split(',')[1]);
        params.LogoImageData = encodeURIComponent(files[0][0].url.split(',')[1]);

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
        let {Provider = '', Phone = '', AddDetail = '', CategoryName = ''} = this.state;

        return (
            <List>
                <InputItem
                    clear
                    placeholder="请输入真实姓名"
                    onChange={(v) => {
                        this.setState({Provider: v})
                    }}
                    value={Provider}
                >商户名称</InputItem>
                <InputItem
                    clear
                    placeholder="请选择从事品类"
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
                    value={Phone}
                >联系电话</InputItem>

                <InputItem
                    clear
                    placeholder="请选择联系地址"
                    onChange={(v) => {
                        this.setState({AddDetail: v})
                    }}
                    value={AddDetail}
                >联系地址</InputItem>
            </List>
        )
    }

    RenderArtForm = (props) => {
        let {Provider = '', Phone = '', AddDetail = '', CategoryName = ''} = this.state;

        return (
            <List>
                <InputItem
                    clear
                    placeholder="请输入真实姓名"
                    onChange={(v) => {
                        this.setState({Provider: v})
                    }}
                    value={Provider}
                >姓名</InputItem>
                <InputItem
                    clear
                    placeholder="请选择从事品类"
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
                    value={Phone}
                >联系电话</InputItem>

                <InputItem
                    clear
                    placeholder="请输入联系地址"
                    onChange={(v) => {
                        this.setState({AddDetail: v})
                    }}
                    value={AddDetail}
                >联系地址</InputItem>
            </List>
        )
    }

    render() {
        const {type, Provider, Phone, isAgreement, CategoryName, files = [], AddDetail} = this.state;
        const title = type === "art" ? "入住成为合作艺术家" : "入住成为艺术商城商户",
            pickers = type === "art" ? artsTitle : shopsTitle;
        let uploadPanel = classNames('art-application__upload', {
            'art-application__art-panel': type === "art"
        });

        let disabled = true;

        let pictureComplete = false;
        if (type === "art" && files.length >= 3) {
            pictureComplete = true;
        } else {
            if (files.length >= 4) {
                pictureComplete = true;
            }
        }

        if (!_.isEmpty(Provider) &&
            !_.isEmpty(Phone) &&
            !_.isEmpty(CategoryName) &&
            !_.isEmpty(AddDetail) &&
            isAgreement &&
            pictureComplete
        ) {
            disabled = false;
        }

        return (
            <div className="art-application">
                <PublicHeader title={title}/>

                <div style={{flexDirection: 'row', display: 'flex', marginBottom: '40px'}}>
                    {pickers.map((picker, index) => {
                        return (
                            <div key={index.toString()}
                                 style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <ImagePicker
                                    length={1}
                                    files={files[index]}
                                    onChange={(filesValue) => {
                                        let originalFiles = _.clone(files);
                                        originalFiles[index] = filesValue;
                                        this.setState({files: originalFiles});
                                    }}
                                    onImageClick={(index, fs) => console.log(index, fs)}
                                    selectable={files[index] && files[index].length < 1}
                                    multiple={false}/>
                                <h4>{picker.title}</h4>
                            </div>
                        )
                    })}
                </div>
                {type !== "art"?(
                    <div style={{flexDirection: 'row', display: 'flex', marginBottom: '40px'}}>
                        <div
                            style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <ImagePicker
                                length={1}
                                files={files[3]}
                                onChange={(filesValue) => {
                                    let originalFiles = _.clone(files);
                                    originalFiles[3] = filesValue;
                                    this.setState({files: originalFiles});
                                }}
                                onImageClick={(index, fs) => console.log(index, fs)}
                                selectable={files[3] && files[3].length < 1}
                                multiple={false}/>
                            <h4>上传营业执照</h4>
                        </div>
                    </div>
                ):null}

               {/* <div className={uploadPanel}>
                    {
                        //this.UploadImage(files, pickers, type)
                    }
                </div>*/}
                <Space/>
                <div className="art-application__form">
                    {
                        type === "art" ? this.RenderArtForm() : this.RenderShopForm()
                    }
                    <div className="art-application__form-agree">
                        <AgreeItem
                            data-seed="logId"
                            className="my-radio"
                            onChange={e => {
                                this.setState({isAgreement: e.target.checked})
                            }}>
                            我已同意并遵守合作条款
                        </AgreeItem>
                    </div>
                    <div className="art-application__action">
                        <Button onClick={this.handleSubmit}
                                style={{
                                    backgroundColor: disabled ? '#CCCCCC' : '#E87908',
                                    color: '#FFFFFF',
                                    marginTop: '10px'
                                }}
                                disabled={disabled}>提交</Button>
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
        let {data} = this.props.location.state;
        if (_.isEmpty(data)) {
            data = {}
        }
        const {Provider = '', Phone = '', AddDetail = '', CategoryName = '', CategoryId = ''} = data;

        this.setState({
            Provider,
            Phone,
            AddDetail,
            CategoryName,
            CategoryId,
            buttonIndex: _.isEmpty(CategoryId) ? CategoryId - 1 : CategoryId,
        });

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