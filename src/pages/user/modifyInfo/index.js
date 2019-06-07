import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import {getCustomerUpdate} from './../store/actionCreators';
import PublicHeader from './../../../components/header';
import {List, InputItem, Toast, ActionSheet, DatePicker, ImagePicker} from 'antd-mobile';
import _ from 'lodash';

let BUTTONS = ['保密', '男', '女'];

class ModifyInfo extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            buttonIndex: -1,
            genderName: '',
            avatarFiles: [],
            backgroundFiles: [],
        };
    }

    onChangeAvatar = (files, type, index) => {
        this.setState({
            avatarFiles: files,
        });
    };

    onChangeBackground = (files, type, index) => {
        this.setState({
            backgroundFiles: files,
        });
    };

    save = () => {
        let {NickName, RealName, buttonIndex, genderName, date, Email, avatarFiles, backgroundFiles} = this.state;

        let dateStr = new Date(date).getTime();

        if (_.isEmpty(NickName)) {
            Toast.info('请输入昵称', 1);
            return;
        }

        if (_.isEmpty(RealName)) {
            Toast.info('请输入真实姓名', 1);
            return;
        }

        if (_.isEmpty(genderName)) {
            Toast.info('请选择性别', 1);
            return;
        }

        if (!date) {
            Toast.info('请输入出生日期', 1);
            return;
        }

        if (_.isEmpty(Email)) {
            Toast.info('请输入邮箱', 1);
            return;
        }

        if (avatarFiles.length < 1) {
            Toast.info('请选择头像', 1);
            return;
        }

        if (backgroundFiles.length < 1) {
            Toast.info('请输入背景图片', 1);
            return;
        }

        let params = {};

        params.NickName = NickName;
        params.RealName = RealName;
        params.Gender = buttonIndex;
        params.Birthday = dateStr;
        params.Email = Email;
        params.ImageName = '';
        params.ImageData = encodeURIComponent(avatarFiles[0].url.split(',')[1]);
        params.BackgroundImg = '';
        params.BackgroundImgData = encodeURIComponent(backgroundFiles[0].url.split(',')[1]);

        this.props.getCustomerUpdate(params);
    };


    handleCategory = () => {
        const {buttonIndex} = this.state;

        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length,
                destructiveButtonIndex: buttonIndex,
                maskClosable: true,
                'data-seed': 'logId',
            },
            (buttonIndex) => {
                let genderName = BUTTONS[buttonIndex];
                if (!_.isEmpty(genderName)) {
                    this.setState({
                        genderName,
                        buttonIndex
                    });
                }
            });
    };

    render() {
        const {genderName, avatarFiles = [], backgroundFiles = []} = this.state;

        return (
            <Fragment>
                <PublicHeader
                    title="个人信息"
                    rightContent={
                        <div onClick={() => {
                            this.save();
                        }}>
                            保存
                        </div>
                    }/>
                <div className="art-modifyInfo">

                    <div className="art-modifyInfo__avatar"
                         style={{borderBottom: '1px solid #E7E7E7'}}>
                        <h6>点击修改头像</h6>
                        <ImagePicker
                            files={avatarFiles}
                            onChange={this.onChangeAvatar}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={avatarFiles.length < 1}/>
                    </div>

                    <div className="art-modifyInfo__avatar">
                        <h6>点击修改背景图片</h6>
                        <ImagePicker
                            files={backgroundFiles}
                            onChange={this.onChangeBackground}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={backgroundFiles.length < 1}/>
                    </div>

                    <List>
                        <InputItem
                            placeholder="请输入昵称"
                            clear
                            onChange={(v) => {
                                this.setState({NickName: v})
                            }}
                            moneyKeyboardAlign="left">
                            昵称
                        </InputItem>

                        <InputItem
                            placeholder="请输入真实姓名"
                            clear
                            onChange={(v) => {
                                this.setState({RealName: v})
                            }}
                            moneyKeyboardAlign="left">
                            真实姓名
                        </InputItem>

                        <InputItem
                            clear
                            placeholder="请选择性别"
                            value={genderName}
                            editable={false}
                            onClick={() => this.handleCategory()}>
                            性别
                        </InputItem>

                        <DatePicker
                            minDate={new Date(1900, 1, 1)}
                            mode="date"
                            title=""
                            extra="请选择出生日期"
                            value={this.state.date}
                            onChange={date => this.setState({date})}>
                            <List.Item arrow="horizontal">出生日期</List.Item>
                        </DatePicker>


                        <InputItem
                            placeholder="请输入邮箱"
                            clear
                            onChange={(v) => {
                                this.setState({Email: v})
                            }}
                            moneyKeyboardAlign="left">
                            邮箱
                        </InputItem>

                    </List>
                </div>
            </Fragment>
        )
    }

    componentDidMount() {
    }
}

const mapStateToProps = () => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCustomerUpdate: (params) => dispatch(getCustomerUpdate(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifyInfo);
