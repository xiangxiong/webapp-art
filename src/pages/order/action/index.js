import React from 'react';
import './index.scss';
import history from './../../../utils/history';

function HandleSubmitOrder(){
    console.log('fdsa')
    history.push('./payorder');
}

const action = (props) =>{
    const {text,price} = props;
    
    return (
        <div className="art-order-detail__footer">
            <div>合计: <span>￥ {price}</span></div>
            <div onClick={HandleSubmitOrder}>{text}</div>
        </div>
    )
}

export default action;