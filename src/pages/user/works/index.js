import React,{PureComponent,Fragment} from 'react';
import PublicHeader from './../../../components/header';
import './index.scss';
import {ImagePicker,Flex,List,InputItem,TextareaItem,Button,WhiteSpace,Picker,Toast} from 'antd-mobile'
import { createForm } from 'rc-form';
import {connect} from 'react-redux';
import {createProduct,getProductType} from './../store/actionCreators';
import { stringify } from 'postcss';

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
          }]
      };

      this.init();
    }

    init(){
       this.props.getProductType({OneCategoryId:1});
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