import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import {getPublishTopicInfo, setValue} from './store/actionCreators';
import PublicHeader from './../../components/header';
import {TextareaItem, ImagePicker, List, Toast} from 'antd-mobile';
import Space from '../common/space';
import history from './../../utils/history';
import  {pictureUrl} from '../../utils/common';
import _ from 'lodash';

const Item = List.Item;

class ReleaseMaster extends PureComponent {

    constructor(props) {
        super(props);
        const {files, TopicContent} = props.releaseMasterInfo;

        this.state = {
            files: files,
            TopicContent: TopicContent,
        }
    }

    submit = () => {
        let storage = Storage.Base.getInstance();
        let CustomerId = storage.get('userInfo').CustomerId;

        let params = {};

        let {TopicContent, files} = this.state;

        let {setWork} = this.props;

        if (_.isEmpty(TopicContent)) {
            Toast.info('请输入分享的内容', 1);
            return;
        }

        if (files.length < 2) {
            Toast.info('请选择需要分享的图片', 1);
            return;
        }

        if (_.isEmpty(setWork)) {
            Toast.info('请选择商品', 1);
            return;
        }

        let TopicImgs = [];
        for (let i = 1; i < files.length; i++) {
            let topicImg = {};
            topicImg.ImageNameData = encodeURIComponent(files[i].url.split(',')[1]);
            topicImg.ImageType = 2;
            TopicImgs.push(topicImg);
        }

        params.TopicId = '0';
        params.TopicContent = TopicContent;
        params.TopicMainImgData = encodeURIComponent(files[0].url.split(',')[1]);
        params.TopicMainImg = '';
        params.CustomerId = CustomerId;
        params.TopicImgs = TopicImgs;

        params.VideoId = '';    //上传视频
        params.IsHaveVideo = '';    //上传视频

        const {customerDetail} = this.props.location.state;
        params.Type = customerDetail.CustomerType;
        params.ProductId = setWork.ProdId;

        this.props.getPublishTopicInfo(params);
    };

    handleChange = (files, type, index) => {
        this.setState({
            files,
        });
    };

    showWork = () => {
        const {setWork} = this.props;
        const {ImageName = '', ProdName = '', MarketPrice = ''} = setWork;

        if (!_.isEmpty(setWork)) {
            return (
                <div className="art-releaseMaster__work">
                    <div style={{
                        background: `url(${pictureUrl(ImageName)}) 0% 0% / cover`
                    }}/>
                    <div>
                        <h4>{ProdName}</h4>
                        <h6>{`市场价：${MarketPrice}元`}</h6>
                    </div>
                </div>
            )
        }
    };

    render() {
        const {TopicContent, files = []} = this.state;
        const {customerDetail} = this.props.location.state;

        let title = '';
        if (customerDetail.CustomerType == '1') {
            //艺术家
            title = '发布大师印象';
        } else if (customerDetail.CustomerType == '2') {
            //商户
            title = '发布实拍实测';
        }

        return (
            <Fragment>
                <div className="art-releaseMaster">
                    <PublicHeader title={title}/>

                    <TextareaItem
                        value={TopicContent}
                        onChange={(v) => {
                            this.setState({TopicContent: v})
                        }}
                        rows={3}
                        placeholder="输入你想分享的内容"/>

                    <Space/>

                    <h4>上传图片1-9张</h4>

                    <ImagePicker
                        files={files}
                        onChange={this.handleChange}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={files.length < 9}
                        multiple={true}/>

                    <Space/>

                    <h4>上传视频</h4>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.props.setValue({
                                TopicContent,
                                files
                            });
                            history.push({
                                pathname: './worklist',
                                state: {type: 'releaseMaster'}
                            });
                        }}>
                        请选择作品
                    </Item>

                    {this.showWork()}

                    <div
                        className="art-releaseMaster__submit"
                        onClick={() => {
                            this.submit();
                        }}>
                        确认并提交
                    </div>

                </div>
            </Fragment>
        )
    }

    componentDidMount() {

    }
}

const mapStateToProps = ({user, releaseMaster}) => {
    return {
        setWork: user.setWork,
        releaseMasterInfo: releaseMaster.releaseMasterInfo
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPublishTopicInfo: params => dispatch(getPublishTopicInfo(params)),
        setValue: params => dispatch(setValue(params)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseMaster);


