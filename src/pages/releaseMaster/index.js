import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import {getPublishTopicInfo} from './store/actionCreators';
import PublicHeader from './../../components/header';
import {TextareaItem, ImagePicker, List} from 'antd-mobile';
import Space from '../common/space';
import history from './../../utils/history';
import  {pictureUrl} from '../../utils/common';

const Item = List.Item;

class ReleaseMaster extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            files: [],
            TopicContent: '',
            work: {},
        }
    }

    submit = () => {
        let storage = Storage.Base.getInstance();
        let CustomerId = storage.get('userInfo').CustomerId;

        let params = {};

        let {TopicContent} = this.state;

        params.TopicId = '0';
        params.TopicContent = TopicContent;
        params.TopicMainImgData = '';
        params.TopicMainImg = '';
        params.CustomerId = CustomerId;
        params.TopicImgs = '';
        params.Type = '';
        params.ProductId = '';

        this.props.getPublishTopicInfo(params);
    };

    handleChange(files, type, index) {
        this.setState({
            files,
        });
    }

    setWork = (work) => {
        console.log('work setWork', work, this);
        this.setState({work});
    };

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    };

    showWork = (work) => {
        const {ImageName = '', ProdName = '', MarketPrice = ''} = work || {};

        if (work || true) {
            return (
                <div className="art-releaseMaster__work">
                    <div style={{
                        background: `url(${pictureUrl(ImageName)}) 0% 0% / cover`
                    }}/>
                    <div>
                        <h4>{ProdName}</h4>
                        <h6>作品尺寸&重量：30克</h6>
                        <h6>作品材质：紫砂</h6>
                        <h6>{`市场价：${MarketPrice}元`}</h6>
                        <h6>库 存：578件</h6>
                    </div>
                </div>
            )
        }
    };

    render() {
        const {files = [], work} = this.state;

        return (
            <Fragment>
                <div className="art-releaseMaster">
                    <PublicHeader title="发布实拍实测"/>

                    <TextareaItem
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
                        selectable={files.length < 10}
                        multiple={true}/>

                    <Space/>

                    <h4>上传视频</h4>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            history.push({
                                pathname: './worklist',
                                callback: this.setWork,
                                state: {type: 'releaseMaster'}
                            });
                        }}>
                        请选择作品
                    </Item>

                    {this.showWork(work)}

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

const mapStateToProps = () => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPublishTopicInfo: params => dispatch(getPublishTopicInfo(params)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseMaster);


