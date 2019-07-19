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
var selectAllProducts = [],selectImgs=[];
let allTotalPrice = 0;
let allTotalCount = 0;
let allProducts =[];
let imgs = [];

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


 function CartItem(props){
    const [cartItem,setCartItem] = useState({});
    const [selectCount,setSelectCount] = useState(0);
    const [cartTotalPrice,setCartTotalPrice] = useState(0);
    const [isForceUpdate,setIsForceUpdate] = useState(0);
    const [product,setProduct] = useState([]);
    const [checkItemUpdate,setCheckItemUpdate] = useState();

    async function loadCartData(){
            var payload ={
                CustomerId:Storage.Base.getInstance().get('userInfo').CustomerId,
                CurrentPage:1,
                PageSize:10
            };
            const result = await props.events.getQueryCarList(payload);
            var mulBusiness =[];
            result.Data.DataList.map((cartItem,index)=>{
                    let tProducts =[];
                    var productItem ={ };
                    productItem.ProviderName = cartItem.ProviderName;
                    productItem.products = tProducts;
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
                        productItem.products.push(product);
                    });
                    mulBusiness.push(productItem);
            });
            setCartItem(mulBusiness);
            setCartTotalPrice(0);
            setSelectCount(0);
            setProduct([]);
    }

    const selectedAllItem = useCallback((providers,selectedProvider,event)=>{

        providers.map((provider,key)=>{
            provider.products.map((item,index)=>{
                if(selectedProvider.products[0].ProviderId === item.ProviderId){
                    if(event.target.checked){
                        imgs.push(item.ProductImg);
                        setCartTotalPrice((prevCartTotalPrice)=>(
                            prevCartTotalPrice =  prevCartTotalPrice += item.CurrentPrice * item.Quantity
                        ));
                        setSelectCount((prevSelectCount)=>(
                            prevSelectCount =  prevSelectCount += item.Quantity
                        ));
                        item.Selected = true;
                        provider.Selected = true;
                    }
                    else{
                        let imgIndex = imgs.indexOf(item.ProductImg);
                        imgs.splice(imgIndex,1);
                      
                        setCartTotalPrice((prevCartTotalPrice)=>(
                            prevCartTotalPrice =  prevCartTotalPrice -= item.CurrentPrice * item.Quantity
                        ));
                        setSelectCount((prevSelectCount)=>(
                            prevSelectCount =  prevSelectCount -= item.Quantity
                        ));
                        item.Selected = false;
                        provider.Selected = false;
                    }
                }
            });
        });
        updateProducts(providers);
        setCheckItemUpdate(Math.random());
        setCartItem(providers);
    });

    const handleCheckedItem = (providers,product,event) =>{
        providers.map((provider,key)=>{
            provider.products.map((item,index)=>{
                if(item.ProdId === product.ProdId){
                    if(event.target.checked){
                        imgs.push(item.ProductImg);
                        setCartTotalPrice((prevCartTotalPrice)=>(
                            prevCartTotalPrice =  prevCartTotalPrice += item.CurrentPrice * item.Quantity
                        ));
                        setSelectCount((prevSelectCount)=>(
                            prevSelectCount =  prevSelectCount += item.Quantity
                        ));
                        item.Selected = true;
                        provider.Selected = true;
                    }
                    else{
                        let imgIndex = imgs.indexOf(item.ProductImg);
                        imgs.splice(imgIndex,1);
                        setCartTotalPrice((prevCartTotalPrice)=>(
                            prevCartTotalPrice =  prevCartTotalPrice -= item.CurrentPrice * item.Quantity
                        ));
                        setSelectCount((prevSelectCount)=>(
                            prevSelectCount =  prevSelectCount -= item.Quantity
                        ));
                        item.Selected = false;
                        provider.Selected = false;
                    }
                }
            });
        });
        updateProducts(providers);
        setCheckItemUpdate(Math.random());
        setCartItem(providers);
    };

    function updateProducts(providers){
        console.log('providers',providers);
        let selectdProducts = [];
        providers.map((provider,key)=>{
            provider.products.map((item,index)=>{
                if(item.Selected){
                    selectdProducts.push({
                            ProdId:item.ProdId,
                            KillPrice:item.CurrentPrice,
                            productNumber:item.Quantity,
                            Name: item.ProductName,
                            MainImgs:imgs
                    });
                }
            })
        });
        setProduct(selectdProducts);
    }

    useEffect(()=>{
        loadCartData();
    },[isForceUpdate]);

    useEffect(()=>{
        loadCartData();
    },[]);

    useEffect(()=>{
    },[checkItemUpdate]);


    return (
        <Fragment>
            {
                  cartItem.length>0 ? <Fragment>
                            <div className="art-cart__tips">
                                <span>. 30天无忧退货</span>
                                <span>. 48小时快速退款</span>
                                <span>. 全场免邮费</span>
                            </div>

                            {
                                cartItem.map((providerItem,key)=>(
                                    <Fragment>
                                    <List>
                                        <CheckboxItem  checked={providerItem.Selected}  onChange={(val)=>{
                                            selectedAllItem(cartItem,providerItem,val)
                                        }}>
                                        {providerItem.ProviderName &&  `卖家：`}  {providerItem.ProviderName}
                                        </CheckboxItem>
                                    </List>
                                    <List>
                                        {providerItem.products && providerItem.products.map((product,index) => (
                                            <CheckboxItem checked={product.Selected}  key={index} onChange={(event)=>{handleCheckedItem(cartItem,product,event)}}>
                                                <div className="art-cart__item">
                                                {/* style={{background:`url(${PRODIMGURL+product.ProductImg}) 0% 0% / cover`}} */}
                                                    <div className="art-cart__item-product">
                                                            <img src={PRODIMGURL+product.ProductImg}/>
                                                    </div>
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
                                                        <span className="art-icon art-icon-cart-del" onClick={()=>{
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
                                                                await props.events.dispatchBatchDelCart(payload);
                                                                setIsForceUpdate(Math.random());
                                                                // setCheckItemUpdate(Math.random());
                                                            }
                                                        }}></span>
                                                    </div>
                                                </div>
                                            </CheckboxItem>
                                        ))}
                                    </List>
                                    <div className="art-cart__white-space"></div>
                                    </Fragment>
                                ))
                            }
                            <Fragment>
                                <div className="art-cart__footer">
                                        <div>
                                        </div>
                                        <div>
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
                    </Fragment> : 
                    <div className="art-cart__empty" onClick={()=>{history.push('./home')}}></div>
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
        setCartList(result.Data.DataList);
    }
    
    useEffect(()=>{
        loadCartData();
    },[]);

    return (
        <Fragment>
            <PublicHeader title="购物车" isNoIcon={true}/>
            {
                cartList.length>0 ? (<>
                    <CartItem events={props} cartList={cartList} key={Math.random()}/>
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