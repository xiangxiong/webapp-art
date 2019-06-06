import React, {Fragment,useCallback,useEffect,useState} from 'react';
import {Checkbox,List,Flex,InputItem} from 'antd-mobile';
import './index.scss';
import {getQueryCarList, getModifyCart, getBatchDelCart} from './store/actionCreators';
import {connect} from 'react-redux';
import  {pictureUrl,} from '../../utils/common';
import history from '../../utils/history';
import {PRODIMGURL} from '../../utils/api';
import PublicHeader from './../../components/header';
const CheckboxItem = Checkbox.CheckboxItem;
var productList = {};

const data = [
    { value: 0, label: 'Ph.D.' },
    { value: 1, label: 'Bachelor' },
    { value: 2, label: 'College diploma' },
];

var allTotalCounts = 0;

function CartItem(props){

    const [cartItem,setCartItem] = useState({});
    const [totalPrice,setTotalPrice] = useState(0);
    const [totalCount,setTotalCount] = useState(0);
    const [isChecked,setIsChecked] = useState(true);
    const [selectCount,setSelectCount] = useState(0);
    const [cartTotalPrice,setCartTotalPrice] = useState(0);


    var tTotalPrice = 0,tTotalCount = 0;
    function initCart(){
        console.log('useEffect');
        props.cartList.map((cartItem,index)=>{
                let tProducts =[];
                productList.ProviderName = cartItem.ProviderName;
                productList.products = tProducts;
                cartItem.Products.map((item,index)=>{
                    var product = [];
                    product.push({
                        ProductName:item.ProductName,
                        ProviderId:item.ProviderId,
                        ProductImg:item.ProductImg,
                        CurrentPrice:item.CurrentPrice,
                        Quantity:item.Quantity,
                        Selected:false,
                        ProdId:item.ProdId
                    });
                    productList.products = product;
                    tTotalCount += item.Quantity ;
                    tTotalPrice+= item.CurrentPrice*item.Quantity;
                });
        });

        setCartItem(productList);
        setTotalPrice(tTotalPrice);
        setTotalCount(tTotalCount);
    }

    function handleSelectedItem(productId){
        console.log('productId',productId);
    }

    useEffect(()=>{
        initCart();
    },[props]);

    return (
        <Fragment>
            {
                    <Fragment>
                            <List>
                                <CheckboxItem  onChange={()=>{
                                    let nProducts = [];
                                    var list = {};
                                    let allTotalPrice = 0;
                                    list.ProviderName = cartItem.ProviderName;
                                    list.products = nProducts;
                                    cartItem.products.map((item,index)=>{
                                        nProducts.push({
                                            CurrentPrice: item.CurrentPrice,
                                            ProductImg: item.ProductImg,
                                            ProductName: item.ProductName,
                                            ProviderId: item.ProviderId,
                                            Quantity: item.Quantity,
                                            Selected: isChecked,
                                            ProdId: item.ProdId
                                        });
                                        allTotalPrice += item.CurrentPrice * item.Quantity;
                                    });
                                    setIsChecked(!isChecked);
                                    setCartItem(list);
                                    setCartTotalPrice(isChecked ? allTotalPrice : 0);
                                    setSelectCount(isChecked ? nProducts.length : 0);
                                }}>
                                    卖家：{cartItem.ProviderName}
                                </CheckboxItem>
                            </List>
                            <List>
                            {cartItem.products && cartItem.products.map(product => (
                                <CheckboxItem checked={product.Selected}  key={product.ProviderId} onChange={()=>{handleSelectedItem(product.ProdId)}}>
                                    <div className="art-cart__item" onClick={()=>{console.log('fdsa');}}>
                                        <div className="art-cart__item-product" style={{background:`url(${PRODIMGURL+product.ProductImg}) 0% 0% / cover`}}>1</div>
                                        <div className="art-cart__item-desc">
                                            <h4>
                                                    {product.ProductName}
                                            </h4>
                                            <div className="art-cart__item-count">
                                                    <div className="art-cart__item-count-add">
                                                        <div>-</div>
                                                    </div>
                                                    <div className="art-cart__item-count-input">
                                                        <input type="text" value="1" readOnly/>
                                                    </div>
                                                    <div className="art-cart__item-count-sub">
                                                        <div>+</div>
                                                    </div>
                                            </div>
                                        </div>
                                        <div className="art-cart__item-caculater">
                                            <p>￥{product.CurrentPrice} <i> * {product.Quantity}</i> </p>
                                            <span className="art-icon art-icon-cart-del"></span>
                                        </div>
                                    </div>
                                </CheckboxItem>
                            ))}
                            </List>
                                <div className="art-cart__total-price">共 <i>{totalCount}</i> 件商品 合计: ￥<i>{totalPrice}</i></div>

                                <div className="art-cart__white-space"></div>

                                <div className="art-cart__footer">
                                        <div>
                                            <CheckboxItem>
                                            </CheckboxItem>
                                        </div>
                                        <div>
                                        已选({selectCount})
                                        </div>
                                        <div> { cartTotalPrice === 0 ? ""  : "￥"+cartTotalPrice}</div>
                                        <div>下单</div>
                                </div>
                    </Fragment>
            }
        </Fragment>
    )
}

const Cart = ({getQueryCarList,getModifyCart,getBatchDelCart}) =>{
    const [cartList,setCartList] = useState([]);

    async function loadCartData(){
        var payload ={
            CustomerId:Storage.Base.getInstance().get('userInfo').CustomerId,
            CurrentPage:1,
            PageSize:10
        };
        const result = await getQueryCarList(payload);
        console.log('result',result);
        setCartList(result.Data.DataList);
    }

    useEffect(()=>{
        loadCartData();
    },[]);

    return (
        <Fragment>
            <PublicHeader title="购物车"/>
            <div className="art-cart__tips">
                 <span>. 30天无忧退货</span>
                 <span>. 48小时快速退款</span>
                 <span>. 全场免邮费</span>
            </div>
            <CartItem cartList={cartList} key={3}/>
        </Fragment>
    )
}

const mapDispatchToProps = (dispatch) => ({
    getQueryCarList: (data) => dispatch(getQueryCarList(data)),
    getModifyCart: (data) => dispatch(getModifyCart(data)),
    getBatchDelCart: (data) => dispatch(getBatchDelCart({data}))
})

export default connect(null, mapDispatchToProps)(React.memo(Cart));