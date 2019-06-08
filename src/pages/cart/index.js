import React, {Fragment,useCallback,useEffect,useState,useRef} from 'react';
import {Checkbox,List,Modal, Toast} from 'antd-mobile';
import './index.scss';
import {getQueryCarList, getModifyCart, getBatchDelCart} from './store/actionCreators';
import {connect} from 'react-redux';
import  {pictureUrl,} from '../../utils/common';
import history from '../../utils/history';
import {PRODIMGURL} from '../../utils/api';
import PublicHeader from './../../components/header';
const CheckboxItem = Checkbox.CheckboxItem;
var productList = {};
var selectAllProducts = [],selectImgs=[]

 async function useUpdateItem(product,type,events){
    let payload = {
        CustomerId:Storage.Base.getInstance().get('userInfo').CustomerId,
        CartId:product.TransactionNumber,
        ProductId:product.ProdId,
        Quantity: type === 'sub' ? product.Quantity - 1 :  product.Quantity + 1
    };

    if(type == 'add'){
        if(payload.Quantity>=product.AvailableQuantity){
            Toast.info('超过库存上线');
            return;
        }
    }
   const result = await events.dispatchModifyCart(payload);
   return result.Data.Status;
 
 }

 function useDelItem(product,events){
    Modal.alert('确定要删除', '', [
        { text: '确定', onPress: () => handleDel() },
        { text: '取消', onPress: () => console.log('cancel') },
    ]);

    async function handleDel(){
        let payload = {
            IsAllEmpty:false,
            CustomerId:Storage.Base.getInstance().get('userInfo').CustomerId,
            CartIds:[product.TransactionNumber]
        };
        const result = await events.dispatchBatchDelCart(payload);

        return result.Data.Status;
    }
 }

 function CartItem(props){

    const [cartItem,setCartItem] = useState({});
    const [totalPrice,setTotalPrice] = useState(0);
    const [totalCount,setTotalCount] = useState(0);
    const [isChecked,setIsChecked] = useState(true);
    const [selectCount,setSelectCount] = useState(0);
    const [cartTotalPrice,setCartTotalPrice] = useState(0);
    const [isForceUpdate,setIsForceUpdate] = useState(0);
    const [cartList,setCartList] = useState([]);
    const [product,setProduct] = useState([]);
    const [checkItemUpdate,setCheckItemUpdate] = useState();

    var tTotalPrice = 0,tTotalCount = 0;
    function initCart(){
        cartList.map((cartItem,index)=>{
                let tProducts =[];
                productList.ProviderName = cartItem.ProviderName;
                productList.products = tProducts;
                cartItem.Products.map((item,index)=>{
                    var product = {
                        TransactionNumber: item.TransactionNumber,
                        ProductName:item.ProductName,
                        ProviderId:item.ProviderId,
                        ProductImg:item.ProductImg,
                        CurrentPrice:item.CurrentPrice,
                        Quantity:item.Quantity,
                        Selected:false,
                        ProdId:item.ProdId,
                        AvailableQuantity:item.AvailableQuantity
                    };
                    productList.products.push(product);
                    tTotalCount += item.Quantity ;
                    tTotalPrice+= item.CurrentPrice*item.Quantity;
                });
        });
        setCartItem(productList);
        setTotalPrice(tTotalPrice);
        setTotalCount(tTotalCount);
    }

    async function loadCartData(){
            var payload ={
                CustomerId:Storage.Base.getInstance().get('userInfo').CustomerId,
                CurrentPage:1,
                PageSize:10
            };
            const result = await props.events.getQueryCarList(payload);
            result.Data.DataList.map((cartItem,index)=>{
                    let tProducts =[];
                    productList.ProviderName = cartItem.ProviderName;
                    productList.products = tProducts;
                    cartItem.Products.map((item,index)=>{
                        var product = {
                            TransactionNumber: item.TransactionNumber,
                            ProductName:item.ProductName,
                            ProviderId:item.ProviderId,
                            ProductImg:item.ProductImg,
                            CurrentPrice:item.CurrentPrice,
                            Quantity:item.Quantity,
                            Selected:false,
                            ProdId:item.ProdId,
                            AvailableQuantity:item.AvailableQuantity
                        };
                        productList.products.push(product);
                        tTotalCount += item.Quantity ;
                        tTotalPrice+= item.CurrentPrice*item.Quantity;
                    });
            });
            setCartItem(productList);
            setTotalPrice(tTotalPrice);
            setTotalCount(tTotalCount);
            setCartList(result.Data.DataList);
    }

    const selectedAllItem = useCallback(()=>{
        let nProducts = [];
        var list = {};
        let allTotalPrice = 0;
        let allTotalCount = 0;
        let allProducts =[];
        let imgs = [];

        list.ProviderName = cartItem.ProviderName;
        list.products = nProducts;
        cartItem.products.map((item,index)=>{
            nProducts.push({
                TransactionNumber: item.TransactionNumber,
                CurrentPrice: item.CurrentPrice,
                ProductImg: item.ProductImg,
                ProductName: item.ProductName,
                ProviderId: item.ProviderId,
                Quantity: item.Quantity,
                Selected: isChecked,
                ProdId: item.ProdId,
                AvailableQuantity:item.AvailableQuantity
            });
            imgs.push(item.ProductImg);
            allTotalPrice += item.CurrentPrice * item.Quantity;
            allTotalCount += item.Quantity;
            allProducts.push({
                ProdId:item.ProdId,
                KillPrice:item.CurrentPrice,
                productNumber:item.Quantity,
                Name: item.ProductName,
                MainImgs:imgs
            });
        });
        setIsChecked(!isChecked);
        setCartItem(list);
        setCartTotalPrice(isChecked ? allTotalPrice : 0);
        setSelectCount(isChecked ? allTotalCount : 0);
        setProduct(allProducts);
    });

    var checkedList = cartItem;

    const handleCheckedItem = (product) =>{
        let currentIndex = checkedList.products.findIndex(item =>item.ProdId === product.ProdId);
        console.log('currentIndex',currentIndex);
        product.Selected = !product.Selected;    
        checkedList.products.splice(currentIndex,1,product);

        // const {price,quantity} = useCaculatePrice(product);
        // You might have mismatching versions of React and the renderer (such as React DOM)
        // You might be breaking the Rules of Hooks

        setCartTotalPrice((prevCartTotalPrice)=>(prevCartTotalPrice = product.Selected ? prevCartTotalPrice + product.CurrentPrice * product.Quantity : 
            prevCartTotalPrice - product.CurrentPrice * product.Quantity));

        setSelectCount((prevSelectCount)=>(
            prevSelectCount =  product.Selected ? prevSelectCount + product.Quantity : prevSelectCount - product.Quantity
        ));

        selectImgs.push(product.ProductImg);
        setCartList(checkedList);
        selectAllProducts.push({
            ProdId:product.ProdId,
            KillPrice:product.CurrentPrice,
            productNumber:product.Quantity,
            Name: product.ProductName,
            MainImgs:selectImgs
        });
        console.log('selectAllProducts',selectAllProducts);
        setProduct(selectAllProducts);
        setCheckItemUpdate(Math.random());
    };

    useEffect(()=>{
        loadCartData();
        console.log('useEffect cartItem []');
    },[isForceUpdate]);

    useEffect(()=>{
        console.log('useEffect []');
        loadCartData();
    },[]);

    useEffect(()=>{
        console.log('checkItemUpdate useEffect');
    },[checkItemUpdate]);

    console.log('reredner,',cartItem);

    return (
        <Fragment>
            {
                    <Fragment>
                            <List>
                                   <CheckboxItem  onChange={()=>{
                                    selectedAllItem()
                                }}>
                                    卖家：{cartItem.ProviderName}
                                </CheckboxItem>
                            </List>
                            <List>
                            {cartItem.products && cartItem.products.map((product,index) => (
                                <CheckboxItem checked={product.Selected}  key={index} onChange={()=>{handleCheckedItem(product)}}>
                                    <div className="art-cart__item">
                                        <div className="art-cart__item-product" style={{background:`url(${PRODIMGURL+product.ProductImg}) 0% 0% / cover`}}>1</div>
                                        <div className="art-cart__item-desc">
                                            <h4>
                                                    {product.ProductName}
                                            </h4>
                                            <div className="art-cart__item-count">
                                                    <div className="art-cart__item-count-add" onClick={async()=>{
                                                        const result = await useUpdateItem(product,'sub',props.events);
                                                        if(result === 200){
                                                            setSelectCount(0);
                                                            setCartTotalPrice(0);
                                                            setIsForceUpdate(Math.random());
                                                        }
                                                    }}>
                                                        <div>-</div>
                                                    </div>
                                                    <div className="art-cart__item-count-input">
                                                        <input type="text" value={product.Quantity} readOnly/>
                                                    </div>
                                                    <div className="art-cart__item-count-sub" onClick={async()=>{ 
                                                        const result = await useUpdateItem(product,'add',props.events);
                                                        if(result === 200){
                                                            setCartTotalPrice(0);
                                                            setSelectCount(0);
                                                            setIsForceUpdate(Math.random());
                                                    }}}>
                                                        <div>+</div>
                                                    </div>
                                            </div>
                                        </div>
                                        <div className="art-cart__item-caculater">
                                            <p>￥{product.CurrentPrice}</p>
                                            <span className="art-icon art-icon-cart-del" onClick={async()=>{
                                                Modal.alert('确定要删除', '', [
                                                    { text: '确定', onPress: () => handleDel() },
                                                    { text: '取消', onPress: () => console.log('cancel') },
                                                ]);
                                                async function handleDel(){
                                                    let payload = {
                                                        IsAllEmpty:false,
                                                        CustomerId:Storage.Base.getInstance().get('userInfo').CustomerId,
                                                        CartIds:[product.TransactionNumber]
                                                    };
                                                    const result = await props.events.dispatchBatchDelCart(payload);
                                                    setIsForceUpdate(Math.random());
                                                }
                                            }}></span>
                                        </div>
                                    </div>
                                </CheckboxItem>
                            ))}
                            </List>
                                {/* <div className="art-cart__total-price">共 <i>{totalCount}</i> 件商品 合计: ￥<i>{totalPrice}</i></div> */}
                            <Fragment>
                                <div className="art-cart__white-space"></div>

                                <div className="art-cart__footer">
                                        <div>
                                            {/* <CheckboxItem onChange={()=>{selectedAllItem()}}>
                                            全选
                                            </CheckboxItem> */}
                                        </div>
                                        <div>
                                          {/* 全选 */}
                                        </div>
                                        <div> { cartTotalPrice === 0 ? ""  : "合计:￥"+cartTotalPrice}</div>
                                          <div onClick={()=>{ if(product.length>0) 
                                        {
                                            history.push('./submitorder', {productList:product})
                                        }else{
                                            Toast.info('请选择商品');
                                        }
                                    }}>去结算({selectCount})</div>
                                </div>
                            </Fragment>
                    </Fragment>
            }
        </Fragment>
    )
 }

 const Cart = (props) =>{
    const [cartList,setCartList] = useState([]);
    const {getQueryCarList,getModifyCart,getBatchDelCart} = props;

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
            {
                cartList.length>0 ? (<>
                    <div className="art-cart__tips">
                        <span>. 30天无忧退货</span>
                        <span>. 48小时快速退款</span>
                        <span>. 全场免邮费</span>
                    </div>
                    <CartItem events={props} cartList={cartList} key={3}/>
                </>) : <div className="art-cart__empty" onClick={()=>{history.push('./home')}}></div>
            }
        </Fragment>
    )
}

const mapDispatchToProps = (dispatch) => ({
    getQueryCarList: (data) => dispatch(getQueryCarList(data)),
    dispatchModifyCart: (data) => dispatch(getModifyCart(data)),
    dispatchBatchDelCart: (data) => dispatch(getBatchDelCart(data))
})

export default connect(null, mapDispatchToProps)(React.memo(Cart));