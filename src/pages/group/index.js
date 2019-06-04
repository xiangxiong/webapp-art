import PublicHeader from './../../components/header';
import React,{Fragment} from 'react';
import './index.scss';
import history from './../../utils/history';

const Group = () =>{
    return (
        <Fragment>
            <PublicHeader title="超值团购"/>
            <div className="art-group__banner">
                banner
            </div>
            <div className="art-group__product">
                <div className="art-group__product-item" onClick={()=>{ history.push('./groupdetail') }}>
                    <div style={{background: 'url("http://res.laoliwuyou.com/pic/public/upload/paimai/2019-05-24/art_ca5f74ac-4d75-4eda-b261-976f440d9635.jpg") 0% 0% / cover'}}>
                        ddd
                    </div>
                    <h4>景德镇紫砂壶</h4>
                    <p>团购价 <i className="art-group__product-price">原价：￥1998</i> </p>
                    <p>8人团购 <i className="art-group__product-join">已有5人参团</i></p>
                </div>
                <div className="art-group__product-item">
                    <div></div>
                    <p>团购价</p>
                    <p>8人团购</p>
                </div>
                <div className="art-group__product-item">
                    <div></div>
                    <p>团购价</p>
                    <p>8人团购</p>
                </div>
            </div>
        </Fragment>
    )
}

export default Group;