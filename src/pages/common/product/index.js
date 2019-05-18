import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import  {pictureUrl} from '../../../utils/stringUtil';

const Product = (props) => {
    let {ImgPath = '', ProductName = '', SalePrice = '', MarketPrice = '', ProviderName = '', ProviderImg} = props;

    return (
        <div className="art-main__recommend-item">
            <div className="art-main__recommend-img img-mrg-right"
                 style={{
                     background: `url(${pictureUrl(ImgPath)})`,
                     marginRight: "3px",
                     backgroundRepeat: "repeat",
                     backgroundSize: "contain"
                 }}>
            </div>
            <p>{ProductName}</p>
            <p><i className="art-main__recommend-money">{`￥${SalePrice}`}</i>
            <i className="art-main__recommend-marketprice">{`￥${MarketPrice}`}</i></p>
            <div className="art-main__recommend-user">
                <span className="art-main__recommend-name">{ProviderName}</span>
                <img className="art-main__recommend-avatar" src={pictureUrl(ProviderImg)}/>
            </div>
        </div>
    )
}

Product.defaultProps = {
    
}

Product.propTypes = {

}

export default Product;