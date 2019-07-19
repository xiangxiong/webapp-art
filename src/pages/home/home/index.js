import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {PICTUREURL} from '../../../utils/api';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {getAdvertList, getNewsPagerList, getUserLikeProducts} from '../store/actionCreators';
import CarouselBanner from '../../common/carousel';
import Column from '../../common/column';
import Advert from '../../common/advert';
import Letters from '../../common/letters/index';
import Space from '../../common/space';
import Product from './../../common/product';
import Title from './../../common/title';
import eventProxy from 'react-eventproxy';
import history from './../../../utils/history';
import { Toast,ListView } from 'antd-mobile';
import {IMGURL} from './../../../utils/api';

const Data = [];
let NEWDATAINDEX = 1;
for(let i=0;i<10;i++){
    Data.push(i)
};
var pushList=[];
const cloumnData = [
    {title:'「 好货推荐 」', name: '上千件好物等你来选',url:'./shopCategroy'},
    {title:'「 超值团购 」', name: '邀请好友一起拼团',url:'./group'}
];


const data = [
    {
      img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
      title: 'Meet hotel',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      title: 'McDonald\'s invites you',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
      title: 'Eat the week',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
  ];
  const NUM_ROWS = 2;
  let pageIndex = 0;
  
  function genData(pIndex = 0) {
    const dataBlob = {};
    for (let i = 0; i < NUM_ROWS; i++) {
      const ii = (pIndex * NUM_ROWS) + i;
      dataBlob[`${ii}`] = `row - ${ii}`;
    }
    return dataBlob;
  }

  
class Main extends PureComponent{
    
    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          });

        this.navDataList = [
            {imageUrl: `${IMGURL}/icon/master.svg`, name: '大师云集',url:'/category'},
            {imageUrl: `${IMGURL}/icon/atshop.svg`, name: '线下活动',url:'/shiji'},
            {imageUrl: `${IMGURL}/icon/shop.svg`, name: '艺商城',url:'/shop'},
            {imageUrl: `${IMGURL}/icon/community.svg`, name: '艺社区',url:'/community'},
        ];

        this.state = {
            imgHeight: 176,
            scrollCss:classNames(
                'art-main__search',
                {
                    'art-main__search-bg':false
                }
            ),
            searchCss:classNames('art-main__search-input',{
                'art-main__search-input-bg':false
            }),
            address:classNames('art-main__search-address',{
                'art-main__search-address-bg':false
            }),
            hasMoreItems: true,
            current:'visible',
            listData: Data,
            show:false,
            dataSource,
            isLoading: true
        };
        this.currentPage=1;//为你推荐 当前页 hidden
        // this.handleScroll = this.handleScroll.bind(this);
        // this.HandleBackTop = this.HandleBackTop.bind(this);
    }

    componentDidMount(){
            // simulate initial Ajax
    setTimeout(() => {
        this.rData = genData();
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.rData),
          isLoading: false,
        });
      }, 600);

        eventProxy.on('recomandItem',(object)=>{
          if(pushList.length>0){
            if(object.DataList[0]){
                 var result = pushList[0].DataList.filter(item => item.ProviderId ===  object.DataList[0].ProviderId);
                 if(result.length===0){
                    pushList.push(object);
                 }
                 console.log('object',object.DataList[0].ProviderId);
            }
          }
          else{
            pushList.push(object);
          }
          this.forceUpdate();
        });
        this.props.getAdvertList(1);
        this.props.getNewsPagerList();
        this.props.getAdvertList(11);
        let storage = Storage.Base.getInstance();
        let CustomerId = storage.get('userInfo') == null ? 0 : storage.get('userInfo').CustomerId;
        this.props.getUserLikeProducts(CustomerId, this.currentPage);

    }

    componentWillMount(){
        NEWDATAINDEX = 1;
    }

    HandleJumpUrl(url){
        if(url==="/shiji"){
            Toast.success("正在开发中",1);
            return;
        }
        else if(url === "/shop"){
            history.push('/home?tab=Shop');
            eventProxy.trigger('selectedTab','redTab')
            return;
        }else{
            if(url === "/category"){
                eventProxy.trigger('navitem','大师云集');
            }
            history.push(url);
        }
    }

    showRecomandItem() {
        var items = [];
        if(pushList.length<=0){
            return;
        }
        pushList.map((item,key)=>{
            for (var i = 0; i < item.DataList.length; i++) {
                items.push(<Product {...item.DataList[i]} key={Math.random()}/>);
            }
        });
        return items;
    }

    loadMoreItem(){
        const {DataList = [], TotalRecords} = this.props.userLikeProducts;

        if (DataList.length >= TotalRecords) {
            this.setState({hasMoreItems:false});
        }else{
            setTimeout(() => {
                this.setState({hasMoreItems: false}, () => {
                    this.currentPage = ++this.currentPage;
                    let storage = Storage.Base.getInstance();
                    let CustomerId = storage.get('userInfo') === null ? 0 :storage.get('userInfo').CustomerId ;
                    this.props.getUserLikeProducts(CustomerId, this.currentPage).then(() => {
                        this.setState({hasMoreItems: true});
                    });
                });
            },200);
        }
    }

    onEndReached = (event) => {
        console.log('event',event);
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
          return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
          this.rData = { ...this.rData, ...genData(++pageIndex) };
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
          });
        }, 1000);
      }

      

    render() {
        const {carouselAdList, commonAdList, newsPagerList} = this.props;
        const separator = (sectionID, rowID) => (
            <div
              key={`${sectionID}-${rowID}`}
              style={{
                backgroundColor: '#F5F5F9',
                height: 8,
                borderTop: '1px solid #ECECED',
                borderBottom: '1px solid #ECECED',
              }}
            />
          );
          let index = data.length - 1;
          const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
              index = data.length - 1;
            }
            const obj = data[index--];
            return (
              <div key={rowID} style={{ padding: '0 15px' }}>
                <div
                  style={{
                    lineHeight: '50px',
                    color: '#888',
                    fontSize: 18,
                    borderBottom: '1px solid #F6F6F6',
                  }}
                >{obj.title}</div>
                <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
                  <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
                  <div style={{ lineHeight: 1 }}>
                    <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
                    <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>35</span>¥ {rowID}</div>
                  </div>
                </div>
              </div>
            );
          };


        return (
            <Fragment>
                <div className="art-main">
                      {
                        /*
                            <div className={scrollCss} style={{'visibility':current}}>
                                <div className={address}>上海</div>
                                <div>
                                    <input className={searchCss} placeholder="大家都在搜紫砂壶"/>
                                </div>
                                <div className="art-icon art-icon-helper"></div>
                            </div>
                        */
                      }
                        <CarouselBanner data={carouselAdList}/>
                        <div className="art-main__navitem">
                                {
                                    this.navDataList.map((navData, index) => {
                                        return (
                                            <div key={index.toString()}>
                                                <div className="art-main__navitem-img-wrapper" onClick={this.HandleJumpUrl.bind(this,navData.url)}>
                                                    <img className="art-main__navitem-img" src={navData.imageUrl}/>
                                                </div>
                                                <span className="art-main__navitem-title" >{navData.name}</span>
                                            </div>
                                        )
                                    })
                                }
                        </div>
                        <Letters data={newsPagerList}/>
                        <Advert commonAdList={commonAdList}/>
                        <Space/>
                        <Column cloumnData={cloumnData}  leftImgUrl={'/icon/8.png'} rightImgUrl={'/icon/9.png'}/>
                        <div className="art-main__recommend">
                            <Title title="为你推荐"/>
                            <div className="art-main__recommend-content">
                                {this.showRecomandItem()}
                            </div>
                        </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = ({home}) => {
    return {
        carouselAdList: home.carouselAdList,
        commonAdList: home.commonAdList,
        newsPagerList: home.newsPagerList,
        userLikeProducts: home.userLikeProducts,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAdvertList: type => dispatch(getAdvertList(type)),
        getNewsPagerList: data => dispatch(getNewsPagerList({CategoryId: 3, CurrentPage: 1, PageSize: 3})),
        getUserLikeProducts: (CustomerId, CurrentPage, PageSize = 2) => dispatch(getUserLikeProducts({CustomerId, Position: 1, CurrentPage, PageSize}))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);


