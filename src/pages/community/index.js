import React,{Fragment,useState,useEffect} from 'react';
import PublicHeader from './../../components/header';
import { Tabs } from 'antd-mobile';
import Scroll from 'react-bscroll'
import './index.scss';
import Waterfall from './waterfall';
import history from './../../utils/history';
import {connect} from 'react-redux'
import {dispatchCommunityList} from './store/actionCreators';
import {PRODIMGURL} from './../../utils/api';

const tabs = [
    { title: '发现' },
    { title: '关注' }
];

const loadMoreData = () =>{
       
}

const jumpUrl = () => {
    history.push('./communitydetail');
}

const Community = ({dispatchCommunityList,list}) => {
    const [count,setCount] = useState([]);
    var slide = [];
    console.log('list',list);
    if(list){
        for (let i = 1; i < list.length; i++) {
            slide.push(
              <div key={i} style={{height:430}} onClick={jumpUrl}>
                    <div style={{
                        background: `url(${PRODIMGURL + 'fengexian.png'}) 0% 0% / cover`,
                        background:'url("http://res.laoliwuyou.com/pic/public/upload/paimai/2019-05-24/art_ca5f74ac-4d75-4eda-b261-976f440d9635.jpg") 0% 0% / cover',
                        height:300,borderRadius:'5px'}}></div>
                    <div className="art-community-discover__left-font"> 
                            <h3>{list[i].TopicContent}</h3>
                            <div className="art-community-discover-visit">
                                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559229753129&di=856001c43d802d7bbdfdecb185a3a558&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fa12f24e688c1cda3ff4cc453f3486a88adaf08cc2cdb-tQvJqX_fw658"/>
                                <p>{list[i].LoginName}</p>
                            </div>
                    </div>
              </div>
            )
        }
    }
  

    async function getCommunityApi(){
        var params = {
            CustomerId:11,
            Type:0,
            CurrentPage:1,
            PageSize:10
        };
       const result = await  dispatchCommunityList(params);
       console.log('result',result.Data.DataList);
       setCount(result.Data.DataList);
    }

    useEffect(()=>{
        getCommunityApi();
    },[])
    
    return (
        <Fragment>
            <PublicHeader title="社区"/>
               
            <Tabs tabs={tabs} initalPage={'t2'}>
                    <div style={{ display: 'flex', justifyContent: 'center', height: '3000px',backgroundColor: '#fff' }}>

                            <div className="art-community__productlist">
                                {
                                        count && count.map((item,index)=>{
                                            return (
                                                <div  onClick={jumpUrl} className="art-master__productlist-item" key={index}>
                                                    <img src={PRODIMGURL+item.ImageName}/>
                                                    <h3>{item.TopicContent}</h3>
                                                    <p>
                                                        {item.LoginName}
                                                    </p>
                                                </div>
                                              )
                                        })
                                }
                            </div>

                                  {/* {
                                     count && count.map((item,index)=>{
                                         console.log('item',item);
                                          return (
                                            <div key={index} style={{height:430}} onClick={jumpUrl}>
                                                    <div style={{background:'url("http://res.laoliwuyou.com/pic/public/upload/paimai/2019-05-24/art_ca5f74ac-4d75-4eda-b261-976f440d9635.jpg") 0% 0% / cover',height:300,borderRadius:'5px'}}></div>
                                                    <div className="art-community-discover__left-font"> 
                                                            <h3>{item.TopicContent}</h3>
                                                            <div className="art-community-discover-visit">
                                                                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559229753129&di=856001c43d802d7bbdfdecb185a3a558&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fa12f24e688c1cda3ff4cc453f3486a88adaf08cc2cdb-tQvJqX_fw658"/>
                                                                <p>{item.LoginName}</p>
                                                            </div>
                                                    </div>
                                            </div>
                                          )
                                      })
                                  } */}
                                {/* <Waterfall margin={10} colCount={2}></Waterfall> */}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', height: '3000px',backgroundColor: '#fff' }}>
                                <Waterfall margin={10} colCount={2}>
                                            {slide}
                                </Waterfall>
                    </div>
            </Tabs>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    list: state.community.get('list').DataList
})

const mapDispatchToProps = (dispatch) => ({
    dispatchCommunityList:(data) => dispatch(dispatchCommunityList(data))
});

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Community));