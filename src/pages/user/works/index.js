import React,{PureComponent,Fragment} from 'react';
import PublicHeader from './../../../components/header';
import './index.scss';
import {ImagePicker,Flex,List,InputItem,TextareaItem,Button,WhiteSpace,Picker,Toast} from 'antd-mobile'
import { createForm } from 'rc-form';
import {connect} from 'react-redux';
import axios from 'axios';

import {createProduct,getProductType} from './../store/actionCreators';
const data = [];

const orders =  [
    {
        label: '是',
        value: '1',
    },{
      label: '否',
      value: '0',
    }
];

const seasons = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
  [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
  ],
];


class Works extends PureComponent{

    constructor(props){
      super(props);
        this.state = {
            files: data,
            mainFiles: data,
            detailFiles:data,
            videoFiles:data,
            multiple: true,
            sSenson: ['2013', '春'],
            sValue:[{
              label: '是',
              value: '1'
          }],
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
          statusText: '',
          uploader: null
      };
      this.init();
      this.bindEvent();
    }

    init(){
       this.props.getProductType({OneCategoryId:1});
    }

    createUploader () {
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
          resumeDisabled = false
          statusText = '添加文件成功, 等待上传...'
          console.log("addFileSuccess: " + uploadInfo.file.name)
        },
        onUploadstarted:function(uploadInfo){
                 // 如果是 STSToken 上传方式, 需要调用 uploader.setUploadAuthAndAddress 方法
            // 用户需要自己获取 accessKeyId, accessKeySecret,secretToken
            // 下面的 URL 只是测试接口, 用于获取 测试的 accessKeyId, accessKeySecret,secretToken
            let stsUrl = 'http://demo-vod.cn-shanghai.aliyuncs.com/voddemo/CreateSecurityToken?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=67999yyuuuy&AppVersion=1.0.0'
            axios.get(stsUrl).then(({data}) => {
              let info = data.SecurityTokenInfo
              let accessKeyId = info.AccessKeyId
              let accessKeySecret = info.AccessKeySecret
              let secretToken = info.SecurityToken
              uploader.setSTSToken(uploadInfo, accessKeyId, accessKeySecret, secretToken)
            })
            statusText = '文件开始上传...'
            console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo) {
          console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
          statusText = '文件上传成功!'
        },
         // 文件上传失败
        onUploadFailed: function (uploadInfo, code, message) {
          console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
          statusText = '文件上传失败!'
        },
        // 取消文件上传
        onUploadCanceled: function (uploadInfo, code, message) {
          console.log("Canceled file: " + uploadInfo.file.name + ", code: " + code + ", message:" + message)
          statusText = '文件已暂停上传'
        },
        // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
        onUploadProgress: function (uploadInfo, totalSize, progress) {
          console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(progress * 100) + "%")
          let progressPercent = Math.ceil(progress * 100)
          stsProgress = progressPercent
          statusText = '文件上传中...'
        },
         // 上传凭证超时
         onUploadTokenExpired: function (uploadInfo) {
          // 如果是上传方式二即根据 STSToken 实现时，从新获取STS临时账号用于恢复上传
          // 上传文件过大时可能在上传过程中 sts token 就会失效, 所以需要在 token 过期的回调中调用 resumeUploadWithSTSToken 方法
          // 这里是测试接口, 所以我直接获取了 STSToken
          let stsUrl = 'http://demo-vod.cn-shanghai.aliyuncs.com/voddemo/CreateSecurityToken?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=67999yyuuuy&AppVersion=1.0.0'
          axios.get(stsUrl).then(({data})=>{
            let info = data.SecurityTokenInfo
            let accessKeyId = info.AccessKeyId
            let accessKeySecret = info.AccessKeySecret
            let secretToken = info.SecurityToken
            let expiration = info.Expiration
            uploader.resumeUploadWithSTSToken(accessKeyId, accessKeySecret, secretToken, expiration)
          })
          statusText = '文件超时...'
        },
        // 全部文件上传结束
        onUploadEnd: function (uploadInfo) {
          console.log("onUploadEnd: uploaded all the files")
          statusText = '文件上传完毕'
        }
      });
      console.log('upload',upload);
      return upload
    }

    bindEvent(){
       this.handleUploadVideo = this.handleUploadVideo.bind(this);
       this.fileChange = this.fileChange.bind(this);
       this.stsUpload = this.stsUpload.bind(this);
    }

    handleUploadVideo(){
      this.createUploader();
    }

    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
          files,
        });
    }

    handleMainPicker = (mainFiles,type,index) => {
      this.setState({
        mainFiles
      })
      console.log('files',mainFiles);
    }

    handleDetailPicker = (detailFiles,type,index) => {
      this.setState({
        detailFiles
      })
    }

    handleVideoPicker = (videoFiles,type,index) => {
      this.setState({
        videoFiles
      })
    }

    fileChange (e) {

    

      this.file = e.target.files[0]
      if (!this.file) {
        alert("请先选择需要上传的文件!")
        return
      }
      var Title = this.file.name
      var userData = '{"Vod":{}}'
      if (this.uploader) {
        this.uploader.stopUpload()
        this.authProgress = 0
        this.statusText = ""
      }
      this.uploader = this.createUploader()
      // 首先调用 uploader.addFile(event.target.files[i], null, null, null, userData)
      console.log(userData)
      this.uploader.addFile(this.file, null, null, null, userData)
      this.uploadDisabled = false
      this.pauseDisabled = true
      this.resumeDisabled = false
    }

    stsUpload () {
      // 然后调用 startUpload 方法, 开始上传
      if (this.uploader !== null) {
        this.uploader.startUpload()
        this.uploadDisabled = true
        this.pauseDisabled = false
      }
    }

    onSubmit = () => {
      const {mainFiles,detailFiles,videoFiles} = this.state;
      console.log('mainFiles',mainFiles);
      
      if(mainFiles.length === 0){
        Toast.fail('请上传主图', 1);
        return;
      }

      if(detailFiles.length === 0){
        Toast.fail('请上传细节图', 1);
        return;
      }

      this.props.form.validateFields({ force: true }, (error) => {
        // this.props.createProduct(this.props.form.getFieldsValue());
        console.log('createProduct',this.props.form.getFieldsValue());
        const data = this.props.form.getFieldsValue();

        let Base64 = {
          encode(str) {
              // first we use encodeURIComponent to get percent-encoded UTF-8,
              // then we convert the percent encodings into raw bytes which
              // can be fed into btoa.
              return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
                  function toSolidBytes(match, p1) {
                      return String.fromCharCode('0x' + p1);
                  }));
          },
          decode(str) {
              // Going backwards: from bytestream, to percent-encoding, to original string.
              return decodeURIComponent(atob(str).split('').map(function (c) {
                  return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
              }).join(''));
          }
      };

        var product = {
          CustomerId:11,
          ProviderId:11,
          ProdName:data.workName,
          CategoryId:1,
          MarketPrice:data.workMarketPrice,
          LimitPrice:data.workMarketPrice,
          SaleType:1,
          Length:1,
          Width:data.workSize,
          Height:1,
          Brief:data.workDesc,
          IsHaveVideo:0,
          AuthorId:11,
          VideoId:0,
          ImgModels:[{
            ImageNameData: '',
            ImageName:'pic/public/upload/paimai/2019-05-02/art_1ebd26c7-b6bb-4304-b71e-d13492a110c0.jpg',
            ImageType:'1',
            SortOrder:0
          }]
        };

        this.props.createProduct(product);

        return;
        if (!error) {
          console.log(this.props.form.getFieldsValue());
          // todo: 提交表单.
        } else {
          Toast.fail('请填写必填项', 1);
        }
      });
    }

    render(){
        const { mainFiles,detailFiles,videoFiles } = this.state;
        const { getFieldProps,getFieldError } = this.props.form;

        return (
          <form>
                 <PublicHeader title="发布艺术家作品" bgColor="#E87908"/>
                 <Flex>
                        <Flex.Item>
                              <ImagePicker
                                      files={mainFiles}
                                      onChange={this.handleMainPicker}
                                      onImageClick={(index, fs) => console.log(index, fs)}
                                      selectable={mainFiles.length < 7}
                                      multiple={this.state.multiple}
                              />
                              <div className="art-user-work__upload-text">长: 375px <br/> 宽: 375px  <br/>大小: ＜500kb</div>
                        </Flex.Item>
                        <Flex.Item>
                            <ImagePicker
                                    files={detailFiles}
                                    onChange={this.handleDetailPicker}
                                    onImageClick={(index, fs) => console.log(index, fs)}
                                    selectable={detailFiles.length < 7}
                                    multiple={this.state.multiple}
                            />
                              <div className="art-user-work__upload-text"> 大小: ＜2M</div>
                        </Flex.Item>
                    <Flex.Item>
                          <ImagePicker
                                    files={videoFiles}
                                    onChange={this.handleVideoPicker}
                                    onImageClick={(index, fs) => console.log(index, fs)}
                                    selectable={videoFiles.length < 7}
                                    multiple={this.state.multiple}
                          />
                            <div className="art-user-work__upload-text"> 长: 375px <br/>  宽: 375px <br/> 大小: ＜500kb</div>
                    </Flex.Item>
                </Flex>

                <div className="art-user-work__uploadvideo">
                     <input type="file" id="fileUpload" onChange={this.fileChange}/>
                     <label>上传状态: <span></span></label>
                     <div onClick={this.stsUpload}>上传文件</div>
                </div>

                <div className="art-user-work__from">
                  <List>
                      <Picker data={orders} cols={1} {...getFieldProps('orders')}>
                        <List.Item arrow="horizontal">是否定制*</List.Item>
                      </Picker>
                      <InputItem
                        clear
                        placeholder="输入作品名称"
                        error={!!getFieldError('workName')}
                        {...getFieldProps('workName',{
                            rules:[
                              { required: true, message: 'Please input account' },
                              { validator: this.validateAccount },
                            ]
                        })}
                      >作品名称*</InputItem>
                      <InputItem
                       {...getFieldProps('workAuthor',{
                            rules: [
                              { required: true, message: 'Please input account' },
                              { validator: this.validateAccount },
                            ]
                       })}
                        error={!!getFieldError('workAuthor')}
                        clear
                        placeholder="默认为入驻艺术家名，不可修改"
                        ref={el => this.inputRef = el}
                      >作者*</InputItem>
                      <InputItem
                        {...getFieldProps('workSize',{
                          rules: [
                            { required: true, message: 'Please input workSize' },
                            { validator: this.validateAccount },
                          ]
                        })}
                        clear
                        placeholder="输入作品的尺寸或重量"
                        ref={el => this.inputRef = el}
                      >作品尺寸</InputItem>
                      <InputItem
                        error={!!getFieldError('workMaterial')}
                        {...getFieldProps('workMaterial',{
                            rules:[
                              { required: true, message: 'Please input account' },
                              { validator: this.validateAccount },
                            ]
                        })}
                        clear
                        placeholder="输入作品的材质"
                        ref={el => this.inputRef = el}
                      >
                      作品材质*
                      </InputItem>
                      <TextareaItem
                        title="作品描述*"
                        error={!!getFieldError('workDesc')}
                        {...getFieldProps('workDesc',{
                            rules:[
                              { required: true, message: 'Please input account' },
                              { validator: this.validateAccount },
                            ]
                        })}
                        placeholder="输入作品的描述（200字内）"
                        data-seed="logId"
                        autoHeight
                        ref={el => this.customFocusInst = el}
                      />
                  </List>
                 </div>

                 <WhiteSpace/>

                 <div className="art-user-work__from">
                  <List>
                      <InputItem
                        clear
                        error={!!getFieldError('workMarketPrice')}
                        {...getFieldProps('workMarketPrice',{
                            rules:[
                              { required: true, message: 'Please input account' },
                              { validator: this.validateAccount },
                            ]
                        })}
                        placeholder="输入市场价(元）"
                        ref={el => this.autoFocusInst = el}
                      >市场价*</InputItem>

                      <InputItem
                        clear
                        error={!!getFieldError('workMarketDiscount')}
                        {...getFieldProps('workMarketDiscount',{
                            rules:[
                              { required: true, message: 'Please input account' },
                              { validator: this.validateAccount },
                            ]
                        })}
                        placeholder="输入折扣价(元）"
                        ref={el => this.inputRef = el}
                      >折扣价*</InputItem>

                      <InputItem
                        clear
                        error={!!getFieldError('workFree')}
                        {...getFieldProps('workFree',{
                            rules:[
                              { required: true, message: 'Please input account' },
                              { validator: this.validateAccount },
                            ]
                        })}
                        placeholder="输入运费(元）"
                      >运费*</InputItem>
                         <InputItem
                        clear
                        error={!!getFieldError('workDeliver')}
                        {...getFieldProps('workDeliver',{
                            rules:[
                              { required: true, message: 'Please input account' },
                              { validator: this.validateAccount },
                            ]
                        })}
                        placeholder="输入发货地(省、市）"
                      >发货地*</InputItem>
                      <InputItem
                        clear
                        error={!!getFieldError('workStock')}
                        {...getFieldProps('workStock',{
                            rules:[
                              { required: true, message: 'Please input account' },
                              { validator: this.validateAccount },
                            ]
                        })}
                        placeholder="输入库存数"
                      >库存*</InputItem>
                      {/* <TextareaItem
                        clear
                        error={!!getFieldError('workCategory')}
                        {...getFieldProps('workCategory',{
                            rules:[
                              { required: true, message: 'Please input account' },
                              { validator: this.validateAccount },
                            ]
                        })}
                        title="所属品类*"
                        placeholder="请选择所属品类"
                        data-seed="logId"
                        autoHeight
                        ref={el => this.customFocusInst = el}
                      /> */}

                    <Picker
                      data={seasons}
                      title="所属品类*"
                      cascade={false}
                      extra="请选择(可选)"
                      value={this.state.sSenson}
                      onChange={v => this.setState({ sSenson: v })}
                      onOk={v => this.setState({ sSenson: v })}
                    >
                      <List.Item arrow="horizontal">Multiple</List.Item>
                    </Picker>

                  </List>
                 </div>
                 <div className="art-user-work__footer">
                    <Button onClick={this.onSubmit}>确认并提交</Button>
                 </div>
            </form>
        )
    }
}

const mapStateToProps = (state) =>{
  console.log('state',state.user);
  return {
    publish:state.user.publishReponse
  }
}

const mapDispatchToProps = dispatch => ({
  createProduct:(params) => {
      dispatch(createProduct(params))
  },
  getProductType:(params) => {
      dispatch(getProductType(params))
  }
});

const FormWrappedComponent = createForm()(Works);

export default connect(mapStateToProps,mapDispatchToProps)(FormWrappedComponent);