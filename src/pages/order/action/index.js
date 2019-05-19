import React from 'react';
import './index.scss';

const action = (props) => {
    const {text, price, HandleSubmitOrder} = props;

    return (
        <div className="art-order-detail__footer">
            <div>合计: <span>￥ {price}</span></div>
            <div
                onClick={HandleSubmitOrder}>
                {text}
            </div>
        </div>
    )
}

export default action;