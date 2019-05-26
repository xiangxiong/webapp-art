import React,{PureComponent,Fragment} from 'react';
import PublicHeader from './../../../components/header';
import './index.scss';
import {ImagePicker,Flex,List,InputItem,TextareaItem,Button,Picker,Toast} from 'antd-mobile'
import { createForm } from 'rc-form';
import {connect} from 'react-redux';
import axios from 'axios';
import history from './../../../utils/history';

import {createProduct,getProductType,getDicItem,getUploadVideoFile,getQueryCategoryList} from './../store/actionCreators';
const data = [];

const orders =  [
    {
        label: '现货',
        value: '10',
    },{
      label: '定制',
      value: '20',
    }
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
            sValue:[{
              label: '是',
              value: '1'
          }],
          categoryId:0,
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
      };
      this.bindEvent();
    }

    async init(){
       const list = await this.props.getProductType({OneCategoryId:Storage.Base.getInstance().get('CategoryId')});
       let listItem = [];

       list[0].Childs.map((item,index)=>{
          listItem.push({
            label: item.CategoryName,
            value: item.CategoryId
          })
       });

       this.setState({
        categoryList:listItem
       })
    }

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
              url: 'http://artapi.laoliwuyou.com/gateway?format=json',
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
              statusText:'文件开始上传...'
            })
            // statusText = '文件开始上传...'
            console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo) {
          console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
          that.setState({
            statusText:'文件上传成功...'
          })
          // statusText = '文件上传成功!'
        },
         // 文件上传失败
        onUploadFailed: function (uploadInfo, code, message) {
          console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
          that.setState({
            statusText:'文件上传失败...'
          })
          // statusText = '文件上传失败!'
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
      this.file = e.target.files[0];
      console.log('this.file.name',this.file.name);
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

    stsUpload () {
      // 然后调用 startUpload 方法, 开始上传
      if (this.uploader !== null){
        this.uploader.startUpload()
        this.uploadDisabled = true
        this.pauseDisabled = false
      }
    }

    onSubmit = () => {
      const {mainFiles} = this.state;

      if(mainFiles.length === 0){
        Toast.fail('请上传主图', 1);
        return;
      }

      var that = this;
      let ProviderId = Storage.Base.getInstance().get('ProviderId');
      let CustomerId = Storage.Base.getInstance().get('userInfo').CustomerId;
    
      this.props.form.validateFields({ force: true }, (error) => {
        if (error) {
          return;
        } 
        const data = this.props.form.getFieldsValue();
        const {categoryId,isOrder,videoId} = this.state;
        let base64String = "";
        if(mainFiles.length > 0){
            base64String = encodeURIComponent(mainFiles[0].url.split(',')[1]);
        }
        var product = {
          CustomerId:CustomerId,
          ProviderId:ProviderId,
          ProdName:data.workName,
          CategoryId:categoryId[0],
          MarketPrice:data.workMarketPrice,
          LimitPrice:data.LimitPrice,
          SaleType:isOrder[0],
          Length:data.workLong,
          Width:data.workWidth,
          Height:data.workHeight,
          Brief:data.workDesc,
          IsHaveVideo: videoId === 0  || "" ? 0 : 1,
          VideoId:videoId,
          StockCount:data.workStock,
          ImgModels:[{
            ImageNameData:base64String,
            ImageName:'pic/public/upload/paimai/2019-05-02/art_1ebd26c7-b6bb-4304-b71e-d13492a110c0.jpg',
            ImageType:'1',
            SortOrder:0
          }]
        };

          let params = {
            ParamList: [
                {
                    servicekey:'Art.Service.Product.Dto.Api.ProviderPublishProductRequest',
                    jsonobjparam: JSON.stringify(product)
                }
            ]
          };

          Toast.info("商品发布成功");
          history.push('/worklist');

          axios({
            method: 'post',
            url: 'http://artapi.laoliwuyou.com/gateway?format=json',
            data: params,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            timeout: 5000
         }).then((response)=>{
            if(response.data.DataObject.Data.Status === 200){
               
            }else{
               Toast.info("商品发布失败");
            }
         })
      });
    }
    componentWillMount(){
      this.props.getDicItem({
        key:'AliyunVod'
      });
    }

    componentDidMount(){
      this.init();
    }

    render(){
        const { mainFiles,detailFiles,videoFiles,categoryList,statusText } = this.state;
        const { getFieldProps,getFieldError } = this.props.form;


        return (
          <form>
                 <PublicHeader title="发布艺术家作品" jump="User" bgColor="#E87908"/>
                 <Flex>
                        <Flex.Item>
                              <ImagePicker
                                      files={mainFiles}
                                      onChange={this.handleMainPicker}
                                      onImageClick={(index, fs) => console.log(index, fs)}
                                      selectable={mainFiles.length < 7}
                                      multiple={this.state.multiple}
                              />
                        </Flex.Item>
                </Flex>
                <div className="art-user-work__upload-text">上传图片</div>

                <div className="art-user-work__uploadvideo">
                      <div className="art-user-work__wrapper">
                           {statusText}
                      </div>
                      <input type="file" className="art-user-work__uploadfile" id="fileUpload" onChange={this.fileChange}/>
                      {/* <div className="art-user-work__uploadsuccess">上传成功</div> */}
                </div>
                <div className="art-user-work__upload-text">上传视频</div>

                <div className="art-user-work__from">
                  <List>
                      <Picker data={orders} cols={1} 
                       value={this.state.isOrder}
                       onChange={v => this.setState({ isOrder: v })}
                       onOk={v => this.setState({ isOrder: v })}
                      {...getFieldProps('orders')}>
                        <List.Item arrow="horizontal">是否定制*</List.Item>
                      </Picker>
                      <Picker data={categoryList} cols={1} 
                             value={this.state.categoryId}
                             onChange={v => this.setState({ categoryId: v })}
                             onOk={v => this.setState({ categoryId: v })}
                      {...getFieldProps('category')}>
                        <List.Item arrow="horizontal">所属品类*</List.Item>
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
                      >商品名称*</InputItem>

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
                        error={!!getFieldError('LimitPrice')}
                        {...getFieldProps('LimitPrice',{
                            rules:[
                              { required: true, message: 'Please input account' },
                              { validator: this.validateAccount },
                            ]
                        })}
                        placeholder="输入销售价(元）"
                        ref={el => this.inputRef = el}
                      >销售价*</InputItem>

                      <InputItem
                        clear
                        error={!!getFieldError('workLong')}
                        {...getFieldProps('workLong',{
                            rules:[
                              { required: true, message: 'Please input account' },
                              { validator: this.validateAccount },
                            ]
                        })}
                        placeholder="尺寸-长"
                        ref={el => this.inputRef = el}
                      >长*</InputItem>


                    <InputItem
                        clear
                        error={!!getFieldError('workWidth')}
                        {...getFieldProps('workWidth',{
                            rules:[
                              { required: true, message: 'Please input account' },
                              { validator: this.validateAccount },
                            ]
                        })}
                        placeholder="尺寸-宽"
                        ref={el => this.inputRef = el}
                      >宽*</InputItem>

                    <InputItem
                        clear
                        error={!!getFieldError('workHeight')}
                        {...getFieldProps('workHeight',{
                            rules:[
                              { required: true, message: 'Please input account' },
                              { validator: this.validateAccount },
                            ]
                        })}
                        placeholder="尺寸-高"
                        ref={el => this.inputRef = el}
                      >高*</InputItem>

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
                  </List>
                 </div>
                 <div className="art-user-work__footer">
                    <Button type="primary" onClick={this.onSubmit}>确认并提交</Button>
                 </div>
            </form>
        )
    }
}

const mapStateToProps = (state) =>{
  return {
    publish:state.user.publishReponse,
    dicItem:state.user.userDicItem,
    fileItem:state.user.fileItem,
    userCategoryList:state.user.userCategoryList
  }
}

const mapDispatchToProps = dispatch => {
  return {
      createProduct:(params) => dispatch(createProduct(params)),
      getProductType:(data) => dispatch(getProductType(data))
      ,
      getDicItem:(params) =>{
          dispatch(getDicItem(params))
      },
      getVideoActionFile:(params) => {
          dispatch(getUploadVideoFile(params))
      },
      getQueryCategoryList:(params) => {
          dispatch(getQueryCategoryList(params))
      }
  }
};

const FormWrappedComponent = createForm()(Works);

export default connect(mapStateToProps,mapDispatchToProps)(FormWrappedComponent);