import React,{Fragment,PureComponent} from 'react';
import './index.scss';
import PublicHeader from './../../../components/header';
import {connect} from 'react-redux';
import {getUserWorkActionDispatch,offLineProduct,setWork} from '../store/actionCreators';
import {pictureUrl} from '../../../utils/common';
import { Modal,Toast,List,NavBar,Icon,Drawer } from 'antd-mobile';
import history from './../../../utils/history';
const alert = Modal.alert;

class WorkList extends PureComponent{

    constructor(props){
        super(props);
        this.init();
        this.bindEvent();
    }
    
    init(){
    }

    bindEvent(){
        this.handleEditProduct = this.handleEditProduct.bind(this);
        this.handleEditProduct = this.handleEditProduct.bind(this);
    }

    componentDidMount(){
        let ProviderId = Storage.Base.getInstance().get('ProviderId');
        this.props.getWorkList({
            ProviderId:ProviderId,
            Type:1,
            OrderBy:1,
            PageIndex:1,
            PageSize:20
        });
    }

    handleEditProduct= () =>{

    }

    async handleDelProduct(ProdId){
        alert('下架', '确定下架吗?',[
            { 
                text: '取消', onPress: () => {
                } 
            },
                {
                  text: '确认', onPress: () => {
                    this.offLine(ProdId);
                }
            },
          ]);
    }

    async offLine(ProdId){ 
        let ProviderId = Storage.Base.getInstance().get('ProviderId');
        const data = {
            ProductId:ProdId,
            ProviderId:ProviderId,
            ProductStatus:2
        };
        const result = await this.props.offLineProduct(data);
        console.log("result",result);
        if(result && result.Status === 200 ){
            Toast.info('该商品已下架');
            this.forceUpdate();
        }
        else{
            Toast.info("下架失败");
            this.forceUpdate();
        }
    }

    getWorkItem = (item) => {
        const {callback, state} = this.props.location;
        return item.map((item,index)=>{
            return (
                <div className="art-worklist__item" key={index} onClick={()=>{
                    if (state.type === 'releaseMaster') {
                        this.props.setWork(item);
                        history.goBack();
                    }
                }}>
                    <div className="art-worklist__item-img">
                        <div style={{background: `url(${pictureUrl(item.ImageName)}) 0% 0% / cover`}}>
                        </div>
                    </div>
                    <div className="art-worklist__item-content">
                        <h3>{item.ProdName}</h3>
                        <div>{`销售价：${item.LimitPrice}元`}</div>
                        <div>{`市场价：${item.MarketPrice}元`}</div>
                        {state.type !== 'releaseMaster'?(
                            <div>
                                <span className="art-worklist__item-action" onClick={this.handleEditProduct}>编辑</span>
                                <span className="art-worklist__item-action" onClick={this.handleDelProduct.bind(this,item.ProdId)}>下架</span>
                            </div>
                        ):''}
                    </div>
                </div>
            )
        })
    };

    render(){
          const sidebar = (<List>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
              if (index === 0) {
                return (<List.Item key={index}
                  thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                  multipleLine
                >Category</List.Item>);
              }
              return (<List.Item key={index}
                thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
              >Category{index}</List.Item>);
            })}
          </List>);
      
          return (<div style={{ height: '100%' }}>
            <NavBar icon={<Icon type="ellipsis" />} onLeftClick={() => this.onDock('docked')}>
              Docked in document
            </NavBar>
            <Drawer
              className="my-drawer"
              style={{ minHeight: document.documentElement.clientHeight }}
              contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
              sidebarStyle={{ border: '1px solid #ddd' }}
              sidebar={sidebar}
              docked={this.state.docked}
            >
              Click upper-left corner
            </Drawer>
          </div>);
    }
};

const mapStateToProps = (state) => {
    return {
        workList:state.user.workList
    }
};

const mapDispatchToProps = (dispatch) =>{
    return {
        setWork: (data) => dispatch(setWork(data)),
        getWorkList: (data) => dispatch(getUserWorkActionDispatch(data)),
        offLineProduct: (data) => dispatch(offLineProduct(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WorkList);