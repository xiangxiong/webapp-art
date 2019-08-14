import React from 'react';
import {Toast} from 'antd-mobile';

function Cart(props){
    const addCart = (ProdId) =>{
        console.log('props',ProdId);
        console.log('props',props);
        let CustomerId = props.CustomerId;
        props.getModifyCart({CustomerId, CartId: 0, ProdId, Quantity: 1});
        Toast.success("加入成功");
        return ;
    }

    return (
       <>
        {
            props.render({
                addCart:addCart
            })
        }
       </>
    )
}

export default Cart;