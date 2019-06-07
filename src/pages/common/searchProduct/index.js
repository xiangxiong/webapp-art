import React from 'react';
import './index.scss';
import  {pictureUrl} from '../../../utils/common';
import history from './../../../utils/history';

function handleJumpUrl(ProductId) {
    history.push('./detail', {ProductId})
}

const SearchProduct = (props) => {
    let {ImgPath = '', ProductName = '', SalePrice = '', MarketPrice = '', index = 0, ProductId} = props;

    return (
        <div className="art-searchProduct__recommend-item" key={index.toString()} onClick={() => {
            handleJumpUrl(ProductId)
        }}>
            <div className="art-searchProduct__recommend-img img-mrg-right"
                 style={{
                     background: `url(${pictureUrl(ImgPath)}) 0% 0% / cover`
                 }}>
            </div>
            <p>{ProductName}</p>
            <p><i className="art-searchProduct__recommend-money">{`￥${SalePrice}`}</i>
                <i className="art-searchProduct__recommend-marketprice">{`￥${MarketPrice}`}</i></p>
        </div>
    )
};

SearchProduct.defaultProps = {};

SearchProduct.propTypes = {};

export default SearchProduct;