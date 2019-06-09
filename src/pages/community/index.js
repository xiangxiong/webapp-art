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
import {Link} from 'react-router-dom';

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
    if(list){
        for (let i = 1; i < list.length; i++) {
            slide.push(
                <div className="art-master__productlist-item" key={i}>
                    <Link to={`/communitydetail?topicId=${list[i].TopicId}`}>
                            <img style={{height:'100%',width:'100%',borderRadius:'5px'}} src={PRODIMGURL+list[i].TopicMainImg}/>
                    </Link> 
                    <h3>{list[i].TopicContent}{list[i].TopicId}</h3>
                    <p style={{textAlign:'right'}}>
                        {list[i].LoginName}
                    </p>
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
    },[]);

    return (
        <Fragment>
            <PublicHeader title="社区"/>

            <Tabs tabs={tabs} initalPage={'t2'}>
                    <div style={{ height: '3000px',backgroundColor: '#fff' }}>
                            <div className="art-community__productlist">
                                {
                                    count && count.map((item,index)=>{
                                        return (
                                            <div className="art-master__productlist-item" key={index}>
                                                <Link to={`/communitydetail?topicId=${item.TopicId}`}>
                                                        <img style={{height:'100%',width:'100%',borderRadius:'5px'}} src={PRODIMGURL+item.TopicMainImg}/>
                                                </Link> 
                                                <h3>{item.TopicContent}{item.TopicId}</h3>
                                                <p style={{textAlign:'right'}}>
                                                    {item.LoginName}
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    </div>
                    <div style={{height: '3000px',backgroundColor: '#fff' }}>
                            <div className="art-community__productlist">
                                {slide}
                            </div>
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