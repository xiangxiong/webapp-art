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
import axios from 'axios';
import {APIURL}   from './../../utils/api';

const Item = List.Item;

class ReleaseMaster extends PureComponent {

    static INTERVAL = 1000;

    constructor(props) {
        super(props);
        const {files, TopicContent} = props.releaseMasterInfo;

        this.state = {
            files:files,
            TopicContent: TopicContent,
            isOrder:0,
            timeout: '',
            partSize: '',
            parallel: '',
            retryCount: '',
            retryDuration: '',
            region: 'cn-shanghai',
            userId: '1303984639806000',        
            file: null,
            stsProgress: 0,
            uploadDisabled: true,
            resumeDisabled: true,
            pauseDisabled: true,
            statusText: '选择视频',
            videoId:0,
            uploader: null,
            categoryList:[],
            selectVideo:'选择文件'
        }
        this.bindEvent();
    }

    submit = () => {
        let storage = Storage.Base.getInstance();
        let CustomerId = storage.get('userInfo').CustomerId;

        let params = {};

        let {TopicContent, files,videoId} = this.state;

        let {setWork} = this.props;

        if (_.isEmpty(TopicContent)) {
            Toast.info('请输入分享的内容', 1);
            return;
        }

        if (files.length < 1) {
            Toast.info('请选择需要分享的图片', 1);
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
        params.VideoId = videoId;    //上传视频
        params.IsHaveVideo = videoId === 0  || "" ? 0 : 1;
        const {customerDetail} = this.props.location.state;
        params.Type = customerDetail.CustomerType;
        params.ProductId = setWork.ProdId;

        this.props.getPublishTopicInfo(params);

    };

    createUploader () {
        var that = this;
        var {timeout,partSize,parallel,retryCount,retryDuration,region,userId,file,stsProgress,uploadDisabled,resumeDisabled,pauseDisabled,statusText,uploader} = this.state;
        // eslint-disable-next-line no-undef
        var upload = new AliyunUpload.Vod({
          timeout: timeout || 60000,
          partSize: partSize || 1048576,
          parallel: parallel || 5,
          retryCount: retryCount || 3,
          retryDuration: retryDuration|| 2,
          region: region,
          userId: userId,
          addFileSuccess:function(uploadInfo){
            uploadDisabled = false
            resumeDisabled = false;
            that.setState({
              statusText:'添加文件成功, 等待上传...'
            })
            // statusText = '添加文件成功, 等待上传...'
            console.log("addFileSuccess: " + uploadInfo.file.name)
          },
          onUploadstarted:function(uploadInfo){
              let params = {
                ParamList: [
                    {
                        servicekey:'Art.Service.Product.Dto.Request.Vod.VodUploadRequest',
                        jsonobjparam: JSON.stringify({
                          Title:uploadInfo.file.name,
                          FileName:uploadInfo.file.name,
                          FileSize:uploadInfo.file.size,
                          IpAddress:'192.168.2.12'
                        })
                    }
                ]
            };
            axios({
                method: 'post',
                url: APIURL,
                data: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                timeout: 3000
             }).then((response)=>{
                let data = response.data.DataObject.Data;
                console.log('response',data);
                // console.log(upload);

                that.setState({
                  videoId:data.VideoId
                });

                upload.setUploadAuthAndAddress(uploadInfo, data.UploadAuth, data.UploadAddress,data.VideoId);
             });
              //  axios.get(stsUrl).then(({data})=>{
              //   let info = data.SecurityTokenInfo
              //   let accessKeyId = info.AccessKeyId
              //   let accessKeySecret = info.AccessKeySecret
              //   let secretToken = info.SecurityToken
              //   uploader.setSTSToken(uploadInfo, accessKeyId, accessKeySecret, secretToken)
              // });
              // that.props.getVideoActionFile({
              //   Title:uploadInfo.file.name,
              //   FileName:uploadInfo.file.name,
              //   FileSize:uploadInfo.file.size,
              //   IpAddress:'192.168.2.12'
              // })
              // uploader.setSTSToken(uploadInfo, accessKeyId, accessKeySecret, secretToken)
              // 如果是 STSToken 上传方式, 需要调用 uploader.setUploadAuthAndAddress 方法
              // 用户需要自己获取 accessKeyId, accessKeySecret,secretToken
              // 下面的 URL 只是测试接口, 用于获取 测试的 accessKeyId, accessKeySecret,secretToken
              // let stsUrl = 'http://demo-vod.cn-shanghai.aliyuncs.com/voddemo/CreateSecurityToken?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=67999yyuuuy&AppVersion=1.0.0'
              // axios.get(stsUrl).then(({data})=>{
              //   let info = data.SecurityTokenInfo
              //   let accessKeyId = info.AccessKeyId
              //   let accessKeySecret = info.AccessKeySecret
              //   let secretToken = info.SecurityToken
              //   uploader.setSTSToken(uploadInfo, accessKeyId, accessKeySecret, secretToken)
              // });
              that.setState({
                statusText:'开始上传...'
              })
              // statusText = '文件开始上传...'
              console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
          },
          // 文件上传成功
          onUploadSucceed: function (uploadInfo) {
            console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
            that.setState({
              statusText:'上传成功...'
            })
            // statusText = '文件上传成功!'
          },
           // 文件上传失败
          onUploadFailed: function (uploadInfo, code, message) {
            console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
            that.setState({
              statusText:'上传失败...'
            })
            // statusText = '文件上传失败!'
          },
          // 取消文件上传
          onUploadCanceled: function (uploadInfo, code, message) {
            console.log("Canceled file: " + uploadInfo.file.name + ", code: " + code + ", message:" + message)
            statusText = '已暂停上传'
          },
          // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
          onUploadProgress: function (uploadInfo, totalSize, progress) {
            console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(progress * 100) + "%")
            let progressPercent = Math.ceil(progress * 100)
            stsProgress = progressPercent
            // statusText = '文件上传中...'
            that.setState({
              statusText:'上传中'+ Math.ceil(progress * 100)+ "%"
            })
          },
           // 上传凭证超时
           onUploadTokenExpired:function(uploadInfo){
            that.setState({
              statusText:'文件超时...'
            })
            // statusText = '文件超时...'
          },
          // 全部文件上传结束
          onUploadEnd: function (uploadInfo) {
            that.setState({
              statusText:'上传成功'
            })
            console.log("onUploadEnd: uploaded all the files");
            // statusText = '文件上传完毕'
          }
        });
        return upload
    
    }

    bindEvent(){
        this.handleUploadVideo = this.handleUploadVideo.bind(this);
        this.fileChange = this.fileChange.bind(this);
        this.stsUpload = this.stsUpload.bind(this);
        const wait = ReleaseMaster.INTERVAL;
        this.onElementClicked = _.debounce(this.onClickDebounced,wait,{
            maxWait:wait,
            leading:true,
            trailing:false
        });
    }
     
    handleUploadVideo(){
       this.createUploader();
    }

    handleChange = (files, type, index) => {
        this.setState({
            files,
        });
    };

    fileChange (e) {
        console.log('target',e.target.files[0]);
        this.file = e.target.files[0];
        console.log('this.file.name',this.file);
        if (!this.file) {
          alert("请先选择需要上传的文件!")
          return
        };
        var userData = '{"Vod":{}}'
        if (this.uploader) {
          this.uploader.stopUpload()
          this.authProgress = 0
          this.statusText = ""
        };
        this.uploader = this.createUploader();
        // 首先调用 uploader.addFile(event.target.files[i], null, null, null, userData)
        // console.log(userData)
        this.uploader.addFile(this.file, null, null, null, userData)
        this.uploadDisabled = false;
        this.pauseDisabled = true;
        this.resumeDisabled = false;
        this.stsUpload();
    }

    stsUpload(){
        // 然后调用 startUpload 方法, 开始上传
        if (this.uploader !== null){
          this.uploader.startUpload()
          this.uploadDisabled = true
          this.pauseDisabled = false
        }
    }

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

    onClickDebounced(e){
        this.submit();
    }

    render() {
        const {TopicContent, files = [],statusText} = this.state;
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

                    <div className="art-user-work__uploadvideo" style={{marginTop:'30px'}}>
                       {
                        statusText === "选择视频" ? "" :( statusText === "上传成功" ? (
                                <Fragment>
                                    <div className="art-user-work__wrapper" >
                                        <div className="art-icon art-icon-video-show">
                                        <div style={{width:'50px',height:'50px',marginLeft:'189px',marginTop:'-390px'}} 
                                        className="art-icon art-icon-video-close" onClick={()=>{
                                            this.setState({
                                                statusText:"选择视频"
                                            })
                                        }}>
                                        </div>
                                        </div>
                                    </div>
                                </Fragment>
                            ):(
                                <div className="art-user-work__wrapper">{statusText}</div>
                            )
                        )
                      }
                      {
                        statusText==="选择视频" ? 
                            <div className="art-user-work__uploadfile-mask">
                            <div className="art-icon art-icon-video-add"></div>
                            </div> : 
                           ""
                      }
                      {
                        statusText==="选择视频" ? <input type="file" className="art-user-work__uploadfile" id="fileUpload" onChange={this.fileChange}/>
                           : ""
                      }
                </div>
                
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
                        ref="btnSubmit"
                        className="art-releaseMaster__submit"
                        onClick={e=>this.onElementClicked(e)}>
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


