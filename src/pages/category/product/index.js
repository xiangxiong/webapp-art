import React from 'react';
import './index.scss';
import  {pictureUrl} from '../../../utils/common';
import history from './../../../utils/history';
import { Link } from 'react-router-dom'

function  handleJumpUrl(ProductId){
    history.push('./detail', {ProductId})
}

const Product = (props) => {
    let {ImgPath = '', ProductName = '', SalePrice = '', MarketPrice = '', ProviderName = '', ProviderImg, index = 0, ProductId} = props;
    // onClick={() => {handleJumpUrl(ProductId)}}
    return (
       
            <div className="art-main__recommend-item" key={index.toString()}>
                 <Link to="/detail" to={{
                        pathname: "/detail",
                        search: "?sort=name",
                        hash: "#the-hash",
                        state: { ProductId: ProductId }
                    }}>
                <div className="art-main__recommend-img"
                    style={{
                        background: `url(${pictureUrl(ImgPath)}) 0% 0% / cover`
                    }}>
                </div>
                </Link>
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