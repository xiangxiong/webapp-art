/**
 * Created by huhaibin on 2019/5/13.
 */
import React, {PureComponent} from 'react';
import './index.scss';
import {SERVICEPICTUREURL} from '../../../utils/api';

export default class ProductionItem extends PureComponent {

    render() {
        const {ImgPath, IsGroup, ProductName = '', SalePrice = '', MarketPrice = '', ProviderName = '', ProviderImg = ''} = this.props;

        return (
            <div className='art-production_main'>
                <div className="art-production_main__picture"
                     style={{backgroundImage: 'url(' + `${SERVICEPICTUREURL}${ImgPath}` + ')', backgroundRepeat: 'no-repeat'}}>
                    {IsGroup ? (
                        <div>
                            <span>团购中</span>
                        </div>
                    ) : null}
                </div>
                <span>{ProductName}</span>
                <div className="art-production_main__price">
                    <span>{`￥${SalePrice}`}</span>
                    <span>
                        <s>{`￥${MarketPrice}`}</s>
                    </span>
                </div>

                <div className="art-production_main__author">
                    <span>{ProviderName}</span>
                    <img src={ProviderImg}/>
                </div>

            </div>
        )
    }
}
