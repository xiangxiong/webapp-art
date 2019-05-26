import React from 'react';
import './index.scss';
import  {pictureUrl} from '../../../utils/common';
import history from './../../../utils/history';

function  handleJumpUrl(ProductId){
    history.push('./detail/'+ProductId, {ProductId})
}

const Product = (props) => {
    let {ImgPath = '', ProductName = '', SalePrice = '', MarketPrice = '', ProviderName = '', ProviderImg, index = 0, ProductId} = props;

    return (
        <div className="art-main__recommend-item" key={index.toString()} onClick={() => {handleJumpUrl(ProductId)}}>
            <div className="art-main__recommend-img img-mrg-right"
                 style={{
                     background: `url(${pictureUrl(ImgPath)}) 0% 0% / cover`
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