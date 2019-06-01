import React,{Fragment} from 'react';
import './index.scss';
import PublicHeader from './../../../components/header';

const ShopHomePage = () => {

    return (
        <Fragment>
            <PublicHeader title="商户"/>

            <div className="art-shop-home">
                <div className="art-shop-home__header">
                    <div className="art-shop-home__header-top">
                        <div>
                            <img className="art-shop-home__header-top-img" src="http://img12.360buyimg.com/focus/jfs/t12337/75/1409309351/5500/b04a2642/5a1fb8eeN05d4163e.jpg"/>
                        </div>
                        <div>
                            <h3 className="art-shop-home__header-top-h3">上海艺术大家浦江分店</h3>
                            <p className="art-shop-home__header-top-fans">粉丝：34679</p>
                            <p className="art-shop-home__header-top-category">主营品类：</p>
                        </div>
                        <div>
                            <span className="art-shop-home__header-like">+关注</span>
                        </div>
                    </div>
                    <div className="art-shop-home__header-bottom">
                        <div>
                            <p>232</p>
                            <p>商品</p>
                        </div>
                        <div>
                            <p>232</p>
                            <p>上新</p>
                        </div>
                        <div>
                            <p>232</p>
                            <p>实测</p>
                        </div>
                    </div>
                </div>

                <div className="art-shop-home__space">

                </div>
            </div>
       
          
        </Fragment>
    )
}

export default ShopHomePage;