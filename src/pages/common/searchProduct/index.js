import React from 'react';
import './index.scss';
import  {pictureUrl} from '../../../utils/common';
import history from './../../../utils/history';

function handleJumpUrl(id) {
    history.push('./detail', {ProductId: id})
}

const SearchProduct = (props) => {
    let {img = '', name = '', limitprice = '', id, index=0} = props;

    return (
        <div className="art-searchProduct__recommend-item" key={index.toString()} onClick={() => {
            handleJumpUrl(id)
        }}>
            <div className='art-searchProduct__recommend-img img-mrg-right'
                 style={{
                     background: `url(${pictureUrl(img)}) 0% 0% / cover`
                 }}>
            </div>
            <p>{name}</p>
            <p><i className="art-searchProduct__recommend-money">{`￥${limitprice}`}</i></p>
        </div>
    )
};

SearchProduct.defaultProps = {};

SearchProduct.propTypes = {};

export default SearchProduct;