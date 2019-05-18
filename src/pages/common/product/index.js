import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';

const Product = (props) => {
    
    return (
        <div className="art-main__recommend-item">
            <div className="art-main__recommend-img img-mrg-right">
            </div>
            <p>景德镇紫砂壶</p>
            <p><i className="art-main__recommend-money">￥1988</i> 
            <i className="art-main__recommend-marketprice">￥1988</i></p>
            <div className="art-main__recommend-user">
                <span className="art-main__recommend-name">宇翔老者</span>
                <img className="art-main__recommend-avatar" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558103882846&di=1762f1769f1c241ec54f8b8e04d26e48&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201606%2F23%2F20160623160926_fxMCc.jpeg"/>
            </div>
        </div>
    )
}

Product.defaultProps = {
    
}

Product.propTypes = {

}

export default Product;