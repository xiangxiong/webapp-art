import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import {getCustomerUpdate, getDictList, dispatchMasterDetail} from './../store/actionCreators';
import PublicHeader from './../../../components/header';
import {List, InputItem, Toast, ActionSheet, DatePicker, TextareaItem} from 'antd-mobile';
import _ from 'lodash';
import  {pictureUrl} from '../../../utils/common';
import Space from '../../common/space';
import {formatDate} from '../../../utils/common';

class ModifyInfo extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            buttonIndex: -1,
            levelName: '',
        };
    }

    save = () => {
        const {ProviderId} = this.props.location.state;

        let {Keyid, date, Speciality, Motto, Description} = this.state;

        let dateStr = new Date(date).getTime();

        if (!date) {
            Toast.info('请输入出生日期', 1);
            return;
        }

        if (_.isEmpty(Speciality)) {
            Toast.info('请输入擅长描述', 1);
            return;
        }

        if (_.isEmpty(Motto)) {
            Toast.info('请输入座右铭', 1);
            return;
        }

        if (_.isEmpty(Description)) {
            Toast.info('请输入获奖经历', 1);
            return;
        }

        let storage = Storage.Base.getInstance();

        let params = {};

        params.Token = storage.get('userInfo').Token;
        params.CustomerId = storage.get('userInfo').CustomerId;
        params.ProviderId = ProviderId;
        params.Birthday = formatDate(dateStr, "yyyy-MM-dd");
        params.AuthorType = Keyid;
        params.Speciality = Speciality;
        params.Motto = Motto;
        params.Description = Description;

        this.props.getCustomerUpdate(params);
    };

    handleLevel = () => {
        const {userModifyDictList} = this.props;

        let BUTTONS = userModifyDictList.map(userModifyDict => {
            return userModifyDict.Value
        });

        const {buttonIndex} = this.state;

        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length,
                destructiveButtonIndex: buttonIndex,
                maskClosable: true,
                'data-seed': 'logId',
            },
            (buttonIndex) => {
                let levelName = BUTTONS[buttonIndex];
                if (!_.isEmpty(levelName)) {
                    this.setState({
                        levelName,
                        buttonIndex,
                        Keyid: userModifyDictList[buttonIndex].Keyid,
                    });
                }
            });
    };

    render() {
        let {levelName} = this.state;
        let {src, UserName} = this.props.location.state;

        return (
            <Fragment>
                <PublicHeader
                    title="个人信息"
                    rightContent={
                        <div onClick={() => {
                            this.save();
                        }}>
                            修改
                        </div>
                    }/>
                <div className="art-modifyInfo">

                    <div className="art-modifyInfo__head">
                        <div style={{
                            background: `url(${pictureUrl(src)}) 0% 0% / cover`
                        }}/>
                    </div>

                    <Space/>

                    <List>
                        <InputItem
                            value={UserName}
                            editable={false}
                            moneyKeyboardAlign="left">
                            昵称
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
                            clear
                            placeholder="请选择认证级别"
                            value={levelName}
                            editable={false}
                            onClick={() => this.handleLevel()}>
                            认证级别
                        </InputItem>

                        <Space/>

                        <TextareaItem
                            title="个人擅长："
                            autoHeight
                            labelNumber={5}
                            onChange={(v) => {
                                this.setState({Speciality: v})
                            }}
                            placeholder="请输入"/>

                        <TextareaItem
                            title="座右铭："
                            autoHeight
                            labelNumber={5}
                            onChange={(v) => {
                                this.setState({Motto: v})
                            }}
                            placeholder="请输入"/>

                        <TextareaItem
                            title="获奖经历"
                            autoHeight
                            labelNumber={5}
                            onChange={(v) => {
                                this.setState({Description: v})
                            }}
                            placeholder="如**年**月获得《***大奖》"/>
                    </List>
                </div>
            </Fragment>
        )
    }

    componentDidMount() {
        const {ProviderId} = this.props.location.state;
        let storage = Storage.Base.getInstance();
        let CustomerId = storage.get('userInfo').CustomerId;
        this.props.dispatchMasterDetail({CustomerId, ProviderId});

        this.props.getDictList({Key: 'AuthorType'});
    }
}

const mapStateToProps = ({user}) => {
    return {
        userMasterdetail: user.userMasterdetail,
        userModifyDictList: user.userModifyDictList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchMasterDetail: (data) => dispatch(dispatchMasterDetail(data)),
        getDictList: (params) => dispatch(getDictList(params)),
        getCustomerUpdate: (params) => dispatch(getCustomerUpdate(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifyInfo);
