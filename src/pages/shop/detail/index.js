import React,{PureComponent,Fragment} from 'react';
import './index.scss';
import CarouselBanner from './../../common/carousel';
import PublicHeader from './../../../components/header';

class Detail extends PureComponent{
    render(){
        return (
            <Fragment>
                <div className="art-product">
                    <PublicHeader title="商品详情" bgColor="#E87908" share="share"/>
                    <CarouselBanner imgHeight="2.96rem"/>
                    <div className="art-product__detail">
                        <h4>新疆上等的玉料和田玉坠</h4>
                        <p>
                            上等的玉料已经浑然天成，在呈现给世人之前已然经过了大自然的造化神功。
                        </p>
                        <p className="art-product__detail-font">
                            <span>现价:</span>
                            <i>￥</i>
                            <i>52.0</i>
                            <span>
                            ￥128.0
                            </span>
                        </p>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Detail;