import React,{Fragment,useState} from 'react';
import PublicHeader from './../../components/header';
import { Tabs } from 'antd-mobile';
import Scroll from 'react-bscroll'
import Product from './product';
import './index.scss';
import Waterfall from './waterfall';
import history from './../../utils/history';

const tabs = [
    { title: '发现' },
    { title: '关注' }
];

const loadMoreData = () =>{
}

const jumpUrl = () => {
    history.push('./communitydetail');
}

const Community = () =>{
    const [count,setCount] = useState(20);
    var slide = [];
    for (let i = 1; i < count; i++) {
        slide.push(
          <div key={i} style={{height: i%2 ===0 ? 390+30*Math.random():450+30*Math.random() }} onClick={jumpUrl}>
                <div style={{background:'url("http://res.laoliwuyou.com/pic/public/upload/paimai/2019-05-24/art_ca5f74ac-4d75-4eda-b261-976f440d9635.jpg") 0% 0% / cover',height:i%2 ===0 ? 260+30*Math.random():320+30*Math.random(),borderRadius:'5px'}}></div>
                <div className="art-community-discover__left-font"> 
                        <h3>今天刚出一把好壶，景德镇紫砂壶</h3>
                        <div className="art-community-discover-visit">
                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559229753129&di=856001c43d802d7bbdfdecb185a3a558&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fa12f24e688c1cda3ff4cc453f3486a88adaf08cc2cdb-tQvJqX_fw658"/>
                            <p>宇翔老者</p>
                        </div>
                </div>
          </div>
        )
    }

    return (
        <Fragment>
            <PublicHeader title="社区"/>
               
            <Tabs tabs={tabs} initalPage={'t2'}>
                    <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'center', height: '3000px',backgroundColor: '#fff' }}>
                        <Scroll
                            click={true}
                            pullUpLoad
                            pullUpLoadMoreData={loadMoreData()}
                            isPullUpTipHide={ false }>
                              <Waterfall margin={10} colCount={2}>
                                {slide}
                              </Waterfall>
                        </Scroll>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '10000px',backgroundColor: '#fff' }}>
                            <div>
                                    关注顶顶顶顶
                            </div>
                    </div>
            </Tabs>
        </Fragment>
    )
}

export default Community;